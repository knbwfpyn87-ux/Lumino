-- Mr. Lumino's ElevenLabs voice. Run after 003_billing_ai.sql.
-- Audio is cached in a public storage bucket named by a hash of the words, so each line is paid for once and then reused by everyone.

insert into storage.buckets (id, name, public) values ('voice', 'voice', true) on conflict (id) do nothing;
-- Anyone can play cached lines; only the tts edge function (service role) writes them.
create policy "voice clips are public" on storage.objects for select using (bucket_id = 'voice');

-- New (not yet cached) characters generated per user per day. Cached lines are free and don't count.
create table public.voice_usage (
  user_id uuid references public.profiles on delete cascade,
  day date not null default current_date,
  chars int not null default 0,
  primary key (user_id, day)
);
alter table public.voice_usage enable row level security;
create policy "see own voice usage" on public.voice_usage for select to authenticated using (user_id = auth.uid());

-- Atomically add n characters; returns false (and adds nothing) if that would go over today's limit.
create function public.use_voice_chars(uid uuid, n int, daily_limit int) returns boolean language plpgsql security definer set search_path = public as $$
declare total int;
begin
  insert into voice_usage (user_id, day, chars) values (uid, current_date, n)
  on conflict (user_id, day) do update set chars = voice_usage.chars + n
  returning chars into total;
  if total > daily_limit then
    update voice_usage set chars = chars - n where user_id = uid and day = current_date;
    return false;
  end if;
  return true;
end $$;
revoke execute on function public.use_voice_chars(uuid, int, int) from public, anon, authenticated;
