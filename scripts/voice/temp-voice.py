# Temporary Mr. Lumino voice (Kokoro, Apache-2.0 weights: free for commercial use) until ElevenLabs is set up.
# Records lines into public/voice/ in the same format the app plays (mp3 + word timings in manifest.json).
# Usage (from a folder holding kokoro-v1.0.onnx + voices-v1.0.bin, with kokoro-onnx installed):
#   npx tsx scripts/voice/list-lines.ts kokoro-temp-1 --free-tests > lines.json
#   python temp-voice.py lines.json /path/to/lumino/public/voice kokoro-temp-1
import json, os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

lines_file, out_dir, version = sys.argv[1], sys.argv[2], sys.argv[3]
VOICE = 'am_puck:0.5,af_heart:0.5'   # "voice A": the playful blend used in the demo videos
k = Kokoro('kokoro-v1.0.onnx', 'voices-v1.0.bin')
style = sum(k.get_voice_style(n) * float(w) for n, w in (p.split(':') for p in VOICE.split(',')))
os.makedirs(out_dir, exist_ok=True)
mf = os.path.join(out_dir, 'manifest.json')
manifest = json.load(open(mf)) if os.path.exists(mf) else {}
if manifest.get('version') != version: manifest = {'version': version, 'voice': 'temp', 'lines': {}}

def word_times(text, dur):
    """Estimate when each word starts: proportional to letters, with extra time for pauses at punctuation."""
    w, starts, total = [], [], 0.0
    for i, ch in enumerate(text):
        if ch != ' ' and (i == 0 or text[i - 1] == ' '): starts.append((i, total))
        total += 1 + (5 if ch in ',;:' else 9 if ch in '.!?' else 0)
    lead, tail = 0.05, 0.12
    return [[i, round(lead + (dur - lead - tail) * t / total, 3)] for i, t in starts]

wanted = json.load(open(lines_file)); keep = {l['key'] for l in wanted}
for key in [k for k in manifest['lines'] if k not in keep]:  # lines whose wording changed: remove the old recording
    del manifest['lines'][key]
    if os.path.exists(os.path.join(out_dir, key + '.mp3')): os.remove(os.path.join(out_dir, key + '.mp3'))
json.dump(manifest, open(mf, 'w'), separators=(',', ':'))
todo = [l for l in wanted if l['key'] not in manifest['lines']]
print(f'{len(todo)} lines to record', flush=True)
tmp = tempfile.mkdtemp()
for n, line in enumerate(todo, 1):
    audio, sr = k.create(line['text'], voice=style, speed=1.0, lang='en-us')
    # trim silence at the ends, keep a tiny pad
    idx = np.where(np.abs(audio) > 0.01)[0]
    if len(idx): audio = audio[max(0, idx[0] - int(.03 * sr)): idx[-1] + int(.08 * sr)]
    raw = os.path.join(tmp, 'raw.wav'); sf.write(raw, audio, sr)
    # clean and even: rumble cut, a touch of presence, fixed loudness, soft limiter (no pumping)
    # level every line to the same loudness: RMS over 20 ms frames that contain speech, target -16 dBFS
    fr = int(.02 * sr); frames = audio[: len(audio) // fr * fr].reshape(-1, fr) if len(audio) >= fr else audio.reshape(1, -1)
    rms = np.sqrt((frames ** 2).mean(axis=1)); voiced = rms[rms > 10 ** (-40 / 20)]
    level = 20 * np.log10(np.sqrt((voiced ** 2).mean())) if len(voiced) else -30
    gain = min(-16 - level, 20)
    out = os.path.join(out_dir, line['key'] + '.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af',
                    f'highpass=f=70,equalizer=f=3200:t=q:w=1.2:g=2,volume={gain:.2f}dB,alimiter=limit=0.89:level=false',
                    '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '48k', out], check=True)
    dur = len(audio) / sr
    manifest['lines'][line['key']] = {'w': word_times(line['text'], dur), 'd': round(dur, 3)}
    if n % 20 == 0 or n == len(todo):
        json.dump(manifest, open(mf, 'w'), separators=(',', ':')); print(f'{n}/{len(todo)}', flush=True)
