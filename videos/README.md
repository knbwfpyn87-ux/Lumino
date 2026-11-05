# Mr. Lumino videos & voice

- `lumino-ai.mp4`, `lumino-teacher.mp4`: voiced demo scenes (voice A). `lumino-moods.mp4`: all moods (no voice).
- `voice-samples/`: four candidate voices for Mr. Lumino (A–D), made with **Kokoro** (open model, Apache-2.0
  weights; kokoro-onnx is MIT), so these voices CAN be used commercially (ads, App Store previews, the app).
  - A: am_puck 50% + af_heart 50% (playful, kid-like). B: af_heart. C: am_puck. D: am_puck 35% + af_bella 65%.
- In the apps, Lumino reads dynamic text (quiz explanations, tutor replies) with the device's built-in voice,
  tuned near natural pitch and preferring neural/premium voices.

Re-make: install `kokoro-onnx soundfile`, download `kokoro-v1.0.onnx` + `voices-v1.0.bin` from the kokoro-onnx
GitHub releases, voice the lines, then record with `node scripts/record-scene.js`.
