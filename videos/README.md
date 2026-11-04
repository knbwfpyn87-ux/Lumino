# Mr. Lumino videos

- `lumino-ai.mp4`, `lumino-teacher.mp4`: voiced demo scenes. `lumino-moods.mp4`: all moods (no voice).
- `voice-samples/`: three candidate character voices (A, B, C).

**Demo voices are NOT licensed for the product.** They were made with Piper voices whose training data is
non-commercial or research-only (Ryan: CC BY-NC-SA 4.0; Lessac: Blizzard research license; Amy: unclear).
Use them only for internal demos. For ads, App Store previews or anything public, re-voice with a commercial
TTS license or a hired voice actor. In the app itself, Lumino uses the device's built-in voice (licensed for apps).

Re-make: `scripts/make-scene-voice.py` (needs piper-tts + a voice model) then `node scripts/record-scene.js`.
