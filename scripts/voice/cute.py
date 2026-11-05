# Usage: cute.py MODEL OUT.wav "text" PITCH  -> Mr. Lumino's smooth, cute demo voice
# Chosen by measurement: steadier Piper rhythm + clean resample pitch-up (smoother than rubberband here).
import sys, wave, subprocess
from piper import PiperVoice
from piper.config import SynthesisConfig
model, out, text, pitch = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
v = PiperVoice.load(model)
raw = out + '.raw.wav'
with wave.open(raw, 'wb') as w: v.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=1.05, noise_scale=0.5, noise_w_scale=0.45))
sr = wave.open(raw).getframerate()
chain = (f"asetrate={sr}*{pitch},aresample=44100:resampler=soxr,atempo={1 / pitch:.4f},highpass=f=90,"
         "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
         "afade=t=in:d=0.02,areverse,afade=t=in:d=0.08,areverse")
mid = out + '.mid.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', chain, '-ar', '44100', '-ac', '1', mid], check=True)
# One fixed gain (no moment-to-moment leveling, which adds wobble): bring average loudness to about -18 dB
import re
info = subprocess.run(['ffmpeg', '-hide_banner', '-i', mid, '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
mean, peak = float(re.search(r'mean_volume: (-?[\d.]+)', info).group(1)), float(re.search(r'max_volume: (-?[\d.]+)', info).group(1))
gain = min(-18 - mean, -1.0 - peak)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mid, '-af', f'volume={gain:.2f}dB', out], check=True)
