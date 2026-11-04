-- Subscriptions (Stripe) + AI assistant usage limits. Run after 002_safety.sql.
-- Plans: free, plus ($1.99/mo), pro ($3.99/mo).

alter table public.profiles add column if not exists plan text not null default 'free' check (plan in ('free','plus','pro'));
alter table public.profiles add column if not exists stripe_customer_id text unique;
alter table public.profiles add column if not exists plan_renews_at timestamptz;
alter table public.profiles add column if not exists birth_year int check (birth_year between 1900 and 2100);

-- Only the server (service role, via the Stripe webhook) may change plan fields.
create or replace function public.protect_plan() returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and (new.plan is distinct from old.plan or new.stripe_customer_id is distinct from old.stripe_customer_id or new.plan_renews_at is distinct from old.plan_renews_at) then
    raise exception 'plan is managed by billing';
  end if;
  return new;
end $$;
create trigger profiles_protect_plan before update on public.profiles for each row execute function public.protect_plan();

create function public.my_plan() returns text language sql security definer stable set search_path = public as
$$ select coalesce((select plan from profiles where id = auth.uid()), 'free') $$;

-- AI usage counter, one row per user per day.
create table public.ai_usage (
  user_id uuid references public.profiles on delete cascade,
  day date not null default current_date,
  messages int not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;
create policy "see own usage" on public.ai_usage for select to authenticated using (user_id = auth.uid());
-- Writes happen only in the ai-assistant edge function (service role).

-- Atomically count one AI message; returns false if over today's limit.
create function public.use_ai_message(uid uuid, daily_limit int) returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  insert into ai_usage (user_id, day, messages) values (uid, current_date, 1)
  on conflict (user_id, day) do update set messages = ai_usage.messages + 1
  returning messages into n;
  if n > daily_limit then
    update ai_usage set messages = messages - 1 where user_id = uid and day = current_date;
    return false;
  end if;
  return true;
end $$;
revoke execute on function public.use_ai_message(uuid, int) from public, anon, authenticated;
