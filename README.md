# Lumino

Study group app: flashcards, practice tests (Standard / Honors / AP / SAT / ACT), uploadable tests by teachers or students, group chat, calls, and an internal-only AI tutor.

```bash
npm install
npm run dev
```

- Data is stored in localStorage for now (`src/lib/store.ts`) — swap for a real backend when bots/services are attached.
- Calls are a placeholder — plug in WebRTC/LiveKit.
- AI tutor is hidden unless `VITE_ENABLE_TUTOR=true` (not for public release).
- Upload tests as JSON: `{ "title", "subject", "level", "questions": [{ "prompt", "choices": [], "answer": 0, "explanation" }] }`
