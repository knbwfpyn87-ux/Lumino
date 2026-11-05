# Choppiness proxy: frame-to-frame pitch jumps (%) and loudness jumps (dB) inside voiced speech. Lower = smoother.
import sys, wave, numpy as np
w = wave.open(sys.argv[1]); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
if w.getnchannels() > 1: x = x.reshape(-1, w.getnchannels()).mean(1)
f, hop = int(.04 * sr), int(.01 * sr); f0 = []; db = []
for i in range(0, len(x) - f, hop):
    s = x[i:i + f] * np.hanning(f); rms = np.sqrt((s ** 2).mean())
    if rms < 300: f0.append(None); db.append(None); continue
    ac = np.correlate(s, s, 'full')[f - 1:]; lo, hi = int(sr / 600), int(sr / 70); k = lo + np.argmax(ac[lo:hi])
    f0.append(sr / k if ac[k] > .35 * ac[0] else None); db.append(20 * np.log10(rms))
jp = [abs(b - a) / a * 100 for a, b in zip(f0, f0[1:]) if a and b]; jd = [abs(b - a) for a, b in zip(db, db[1:]) if a and b]
print(f"pitch jumps {np.median(jp):.1f}% (90th pct {np.percentile(jp, 90):.1f}%), loudness jumps {np.median(jd):.2f} dB")
