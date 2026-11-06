-- Google Classroom connection. Run after 004_voice.sql.
-- Holds each student's Google refresh token so the google-classroom edge function can fetch their assignments.
-- Row level security is on with NO policies: browsers can never read tokens; only the edge function (service role) can.
create table public.google_links (
  user_id uuid primary key references public.profiles on delete cascade,
  refresh_token text not null,
  google_email text,
  connected_at timestamptz not null default now(),
  last_sync timestamptz
);
alter table public.google_links enable row level security;
