# Synthesizes every scene line with Mr. Lumino's demo voice (cute.py); writes clip-*.wav + durations.json.
import json, re, subprocess, sys
model, pitch = sys.argv[1], sys.argv[2]
def spoken(t):  # read it the way a teacher would say it
    t = t.replace('Mr. ', 'Mister ').replace('…', '.').replace('−', ' minus ').replace('÷', ' divided by ').replace('=', ' equals ')
    t = re.sub(r'\((\d+), (\d+)\)', r'point \1 comma \2', t); t = re.sub(r'(\d)x\b', r'\1 x', t)
    return re.sub(r'\s+', ' ', t)
lines = json.load(open('lines.json')); dur = {}
for k, text in lines.items():
    out = f'clip-{k.replace(":", "-")}.wav'
    subprocess.run([sys.executable, 'cute.py', model, out, spoken(text), pitch], check=True, stderr=subprocess.DEVNULL)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout)
    dur[k] = round(d * 1000); print(k, dur[k], 'ms')
json.dump(dur, open('durations.json', 'w'), indent=1)
