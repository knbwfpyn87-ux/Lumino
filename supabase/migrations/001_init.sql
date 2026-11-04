-- Lumino schema. Run in Supabase: SQL Editor -> paste -> Run (or `supabase db push`).

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null check (char_length(username) between 2 and 30),
  role text not null default 'student' check (role in ('student','teacher')),
  school_level text default 'high_school' check (school_level in ('high_school','college')),
  xp int not null default 0,
  streak int not null default 0,
  last_day date,
  created_at timestamptz default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null default upper(substr(md5(random()::text), 1, 6)),
  owner uuid not null references public.profiles on delete cascade,
  created_at timestamptz default now()
);

create table public.group_members (
  group_id uuid references public.groups on delete cascade,
  user_id uuid references public.profiles on delete cascade,
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  text text not null check (char_length(text) between 1 and 2000),
  created_at timestamptz default now()
);

create table public.tests (
  id uuid primary key default gen_random_uuid(),
  title text not null, subject text not null, level text not null,
  author uuid not null references public.profiles on delete cascade,
  questions jsonb not null,
  created_at timestamptz default now()
);

create table public.group_tests (
  group_id uuid references public.groups on delete cascade,
  test_id text not null,            -- built-in ids (e.g. 'sat-alg-1') or uploaded test uuid
  primary key (group_id, test_id)
);

create table public.results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  test_id text not null, title text not null,
  score int not null, total int not null,
  group_id uuid references public.groups on delete set null,
  created_at timestamptz default now()
);

create table public.photo_quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author uuid not null references public.profiles on delete cascade,
  group_id uuid references public.groups on delete cascade,
  pages text[] not null,            -- storage paths in the 'photos' bucket
  created_at timestamptz default now()
);

create table public.photo_responses (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.photo_quizzes on delete cascade,
  page int not null,
  user_id uuid not null references public.profiles on delete cascade,
  text text not null check (char_length(text) between 1 and 4000),
  created_at timestamptz default now()
);

-- Helper: is the current user in this group?
create function public.is_member(g uuid) returns boolean language sql security definer stable set search_path = public as
$$ select exists (select 1 from group_members where group_id = g and user_id = auth.uid()) $$;

-- Join a group by invite code without exposing the groups table.
create function public.join_group(code text) returns uuid language plpgsql security definer set search_path = public as $$
declare g uuid;
begin
  select id into g from groups where invite_code = upper(code);
  if g is null then raise exception 'Invalid invite code'; end if;
  insert into group_members (group_id, user_id) values (g, auth.uid()) on conflict do nothing;
  return g;
end $$;

-- Owner auto-joins their group.
create function public.add_owner() returns trigger language plpgsql security definer set search_path = public as
$$ begin insert into group_members values (new.id, new.owner, now()); return new; end $$;
create trigger groups_add_owner after insert on public.groups for each row execute function public.add_owner();

-- Row level security
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.messages enable row level security;
alter table public.tests enable row level security;
alter table public.group_tests enable row level security;
alter table public.results enable row level security;
alter table public.photo_quizzes enable row level security;
alter table public.photo_responses enable row level security;

create policy "profiles readable by signed-in users" on public.profiles for select to authenticated using (true);
create policy "insert own profile" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "update own profile" on public.profiles for update to authenticated using (id = auth.uid());

create policy "members see group" on public.groups for select to authenticated using (is_member(id) or owner = auth.uid());
create policy "create group" on public.groups for insert to authenticated with check (owner = auth.uid());
create policy "owner edits group" on public.groups for update to authenticated using (owner = auth.uid());
create policy "owner deletes group" on public.groups for delete to authenticated using (owner = auth.uid());

create policy "members see members" on public.group_members for select to authenticated using (is_member(group_id));
create policy "leave group" on public.group_members for delete to authenticated using (user_id = auth.uid());

create policy "members read chat" on public.messages for select to authenticated using (is_member(group_id));
create policy "members post chat" on public.messages for insert to authenticated with check (user_id = auth.uid() and is_member(group_id));

create policy "tests are public to signed-in users" on public.tests for select to authenticated using (true);
create policy "upload own tests" on public.tests for insert to authenticated with check (author = auth.uid());
create policy "delete own tests" on public.tests for delete to authenticated using (author = auth.uid());

create policy "members see group tests" on public.group_tests for select to authenticated using (is_member(group_id));
create policy "members assign tests" on public.group_tests for insert to authenticated with check (is_member(group_id));

create policy "see own or group results" on public.results for select to authenticated using (user_id = auth.uid() or (group_id is not null and is_member(group_id)));
create policy "save own results" on public.results for insert to authenticated with check (user_id = auth.uid() and (group_id is null or is_member(group_id)));

create policy "see photo quizzes" on public.photo_quizzes for select to authenticated using (author = auth.uid() or (group_id is not null and is_member(group_id)));
create policy "create photo quizzes" on public.photo_quizzes for insert to authenticated with check (author = auth.uid() and (group_id is null or is_member(group_id)));
create policy "delete own photo quizzes" on public.photo_quizzes for delete to authenticated using (author = auth.uid());

create policy "see responses" on public.photo_responses for select to authenticated using (exists (select 1 from photo_quizzes q where q.id = quiz_id and (q.author = auth.uid() or is_member(q.group_id))));
create policy "post responses" on public.photo_responses for insert to authenticated with check (user_id = auth.uid() and exists (select 1 from photo_quizzes q where q.id = quiz_id and (q.author = auth.uid() or is_member(q.group_id))));

-- Live chat + live answers
alter publication supabase_realtime add table public.messages, public.photo_responses;

-- Photo storage (private bucket). Files are stored under <user id>/...
insert into storage.buckets (id, name, public) values ('photos', 'photos', false) on conflict do nothing;
create policy "upload own photos" on storage.objects for insert to authenticated with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "signed-in users read photos" on storage.objects for select to authenticated using (bucket_id = 'photos');
