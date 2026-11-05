-- Safety: report & block, bans, moderators, auto-deleting chat. Run after 001_init.sql.
create extension if not exists pg_cron;

alter table public.profiles add column if not exists is_moderator boolean not null default false;
alter table public.profiles add column if not exists banned boolean not null default false;
alter table public.groups add column if not exists message_ttl_days int not null default 7 check (message_ttl_days in (1, 7, 30));

-- Users can't promote or unban themselves.
create or replace function public.protect_profile_flags() returns trigger language plpgsql as $$
begin
  if (new.is_moderator is distinct from old.is_moderator or new.banned is distinct from old.banned)
     and auth.uid() is not null and not coalesce((select is_moderator from public.profiles where id = auth.uid()), false) then
    raise exception 'not allowed';
  end if;
  return new;
end $$;
-- SQL editor runs as postgres (auth.uid() is null), so it is allowed through.
create trigger profiles_protect_flags before update on public.profiles for each row execute function public.protect_profile_flags();

create function public.is_moderator() returns boolean language sql security definer stable set search_path = public as
$$ select coalesce((select is_moderator from profiles where id = auth.uid()), false) $$;
create function public.is_banned() returns boolean language sql security definer stable set search_path = public as
$$ select coalesce((select banned from profiles where id = auth.uid()), false) $$;

-- Blocks: hide someone's messages from you.
create table public.blocks (
  blocker uuid references public.profiles on delete cascade,
  blocked uuid references public.profiles on delete cascade,
  created_at timestamptz default now(),
  primary key (blocker, blocked),
  check (blocker <> blocked)
);
alter table public.blocks enable row level security;
create policy "see own blocks" on public.blocks for select to authenticated using (blocker = auth.uid());
create policy "block" on public.blocks for insert to authenticated with check (blocker = auth.uid());
create policy "unblock" on public.blocks for delete to authenticated using (blocker = auth.uid());

-- Reports keep a copy of the message so evidence survives auto-delete.
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter uuid not null references public.profiles on delete cascade,
  reported_user uuid not null references public.profiles on delete cascade,
  group_id uuid references public.groups on delete set null,
  message_id uuid,
  message_text text not null,
  reason text not null check (reason in ('harassment','bullying','inappropriate','spam','cheating','safety','other')),
  details text check (char_length(details) <= 1000),
  status text not null default 'open' check (status in ('open','actioned','dismissed')),
  created_at timestamptz default now()
);
alter table public.reports enable row level security;
create policy "file report" on public.reports for insert to authenticated with check (reporter = auth.uid() and (group_id is null or is_member(group_id)));
create policy "see own reports or moderate" on public.reports for select to authenticated using (reporter = auth.uid() or is_moderator());
create policy "moderators update reports" on public.reports for update to authenticated using (is_moderator());

-- Banned users can't post.
drop policy "members post chat" on public.messages;
create policy "members post chat" on public.messages for insert to authenticated with check (user_id = auth.uid() and is_member(group_id) and not is_banned());
drop policy "post responses" on public.photo_responses;
create policy "post responses" on public.photo_responses for insert to authenticated with check (user_id = auth.uid() and not is_banned() and exists (select 1 from photo_quizzes q where q.id = quiz_id and (q.author = auth.uid() or is_member(q.group_id))));

-- Moderators can delete any message and ban users.
create policy "moderators delete messages" on public.messages for delete to authenticated using (is_moderator() or user_id = auth.uid());
create policy "moderators update profiles" on public.profiles for update to authenticated using (is_moderator());

-- Auto-delete chat older than each group's setting (runs hourly).
create function public.purge_old_messages() returns void language sql security definer set search_path = public as $$
  delete from messages m using groups g where m.group_id = g.id and m.created_at < now() - make_interval(days => g.message_ttl_days);
$$;
select cron.schedule('purge-old-messages', '0 * * * *', $$select public.purge_old_messages()$$);

-- To make yourself a moderator, run once in the SQL editor:
--   update public.profiles set is_moderator = true where username = 'YOUR_USERNAME';
-- (Run it with triggers disabled or as the postgres role, which the SQL editor uses.)
