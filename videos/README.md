# Mr. Lumino videos & voice

- `lumino-ai.mp4`, `lumino-teacher.mp4`: voiced demo scenes (voice A). `lumino-moods.mp4`: all moods (no voice).
- `voice-samples/`: four candidate voices for Mr. Lumino (A–D), made with **Kokoro** (open model, Apache-2.0
  weights; kokoro-onnx is MIT), so these voices CAN be used commercially (ads, App Store previews, the app).
  - A: am_puck 50% + af_heart 50% (playful, kid-like). B: af_heart. C: am_puck. D: am_puck 35% + af_bella 65%.
- In the apps, Lumino reads dynamic text (quiz explanations, tutor replies) with the device's built-in voice,
  tuned near natural pitch and preferring neural/premium voices.

Re-make: install `kokoro-onnx soundfile`, download `kokoro-v1.0.onnx` + `voices-v1.0.bin` from the kokoro-onnx
GitHub releases, voice the lines, then record with `node scripts/record-scene.js`.

## ElevenLabs voice (chosen)
Mr. Lumino's real voice is ElevenLabs. Pick or design the voice with `npm run voice -- find|design|audition` (needs `ELEVENLABS_API_KEY`),
then `npm run voice -- prebake` records his fixed lines into `public/voice/`. Everything else is made on demand by the `tts` edge function
and cached in the Supabase `voice` bucket, so each line is only paid for once. The Kokoro samples above stay as a free fallback option.
