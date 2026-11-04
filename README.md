# Lumino

Study app for high school through college: flashcards with spaced repetition, practice tests (Standard / Honors / AP / College / SAT), uploadable tests, photo quizzes worked through together, study groups with live chat, XP, levels and daily streaks.

## Run locally
```bash
npm install
npm run dev
```
Without Supabase keys the app runs in **demo mode** (everything saved in the browser, no sign-in).

## Go live (accounts + shared data)

1. **Create a Supabase project** (free) at supabase.com.
2. **Create the database:** Supabase → SQL Editor → paste `supabase/migrations/001_init.sql` → Run.
3. **Get keys:** Project Settings → API → copy the Project URL and the `anon` public key.
4. **Locally:** copy `.env.example` to `.env` and fill in the two keys.
5. **Auth settings:** Authentication → URL Configuration → set Site URL to your live URL (e.g. `https://<you>.github.io/<repo>/`) and add `http://localhost:5173` to Redirect URLs.
6. **Optional Google sign-in:** Authentication → Providers → Google (needs a Google Cloud OAuth client).
7. **Deploy on GitHub Pages:** push to `main`, then in the repo: Settings → Pages → Source: GitHub Actions; Settings → Secrets → Actions → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Each push redeploys.

The `anon` key is safe in the browser; access is enforced by row-level security in the SQL file.

## What syncs when live
Accounts & usernames (student/teacher, high school/college), study groups with invite codes, live group chat, uploaded tests, group test leaderboards, photo quizzes (photos in private storage) with live answers, XP and streak on your profile.

Still local per device: flashcard decks and the daily-goal history. Calls need a video provider (e.g. LiveKit) — placeholder for now. AI tutor stays off unless `VITE_ENABLE_TUTOR=true` (internal only).

## Uploading tests as JSON
`{ "title", "subject", "level", "questions": [{ "prompt", "choices": [], "answer": 0, "explanation" }] }`
