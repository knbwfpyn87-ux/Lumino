# Median pitch (Hz) of voiced frames, by autocorrelation
import sys, wave, numpy as np
w = wave.open(sys.argv[1]); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
if w.getnchannels() > 1: x = x.reshape(-1, w.getnchannels()).mean(1)
f, hop = int(.04 * sr), int(.01 * sr); out = []
for i in range(0, len(x) - f, hop):
    s = x[i:i + f] * np.hanning(f)
    if np.sqrt((s ** 2).mean()) < 300: continue
    ac = np.correlate(s, s, 'full')[f - 1:]; lo, hi = int(sr / 600), int(sr / 70)
    k = lo + np.argmax(ac[lo:hi]);
    if ac[k] > .35 * ac[0]: out.append(sr / k)
print(f"{np.median(out):.0f} Hz median pitch, {len(out)} voiced frames")
