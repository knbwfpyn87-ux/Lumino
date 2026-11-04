# Synthesizes each scene line with the demo character voice; writes clips + durations.
import json, re, subprocess, wave, sys
from piper import PiperVoice
from piper.config import SynthesisConfig
model, pitch = sys.argv[1], float(sys.argv[2])
v = PiperVoice.load(model); cfg = SynthesisConfig(length_scale=0.95, noise_scale=0.6, noise_w_scale=0.8)
def spoken(t):  # how a teacher would read it aloud
    t = t.replace('Mr. ', 'Mister ').replace('…', '.').replace('−', ' minus ').replace('÷', ' divided by ').replace('=', ' equals ')
    t = re.sub(r'\((\d+), (\d+)\)', r'point \1 comma \2', t); t = re.sub(r'(\d)x\b', r'\1 x', t)
    return re.sub(r'\s+', ' ', t)
lines = json.load(open('lines.json')); dur = {}
for k, text in lines.items():
    raw = f'clip-{k.replace(":", "-")}.raw.wav'; out = f'clip-{k.replace(":", "-")}.wav'
    with wave.open(raw, 'wb') as w: v.synthesize_wav(spoken(text), w, syn_config=cfg)
    sr = wave.open(raw).getframerate()
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', f'asetrate={sr}*{pitch},aresample=44100,atempo=1/{pitch},silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse', out], check=True)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout)
    dur[k] = round(d * 1000); print(k, dur[k], 'ms |', spoken(text))
json.dump(dur, open('durations.json', 'w'), indent=1)
