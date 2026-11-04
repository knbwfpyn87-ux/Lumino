"""Builds Mr. Lumino's animation rig: every layer pre-positioned on one 300x300 stage.
Positions match the base character reference (bulb fitted at 91% overlap). Output: src/assets/lumino/rig.json
Run after cut-mascot.py: python3 -I scripts/build-rig.py src/assets/lumino
"""
import sys, json
from PIL import Image
D = sys.argv[1]; STAGE = 300
def save(im, name): im.save(f'{D}/rig-{name}.png', optimize=True); return name

rig = {'stage': STAGE, 'layers': {}}
def place(name, img, x, y):  # x, y = top-left on the stage
    rig['layers'][name] = {'src': f'rig-{name}', 'x': round(x / STAGE * 100, 2), 'y': round(y / STAGE * 100, 2),
                           'w': round(img.width / STAGE * 100, 2), 'h': round(img.height / STAGE * 100, 2)}
    save(img, name)

S = 0.78  # body scale that matches the reference
rays = Image.open(f'{D}/rays.png'); rays = rays.resize((int(rays.width * .6), int(rays.height * .6)), Image.LANCZOS); place('rays', rays, 236, 84)
for v in ('body', 'body-dark'):
    b = Image.open(f'{D}/{v}.png'); b = b.resize((int(b.width * S), int(b.height * S)), Image.LANCZOS); place(v, b, 92, 76)
cap = Image.open(f'{D}/cap.png').transpose(Image.FLIP_LEFT_RIGHT).rotate(-6, resample=Image.BICUBIC, expand=True)
cap = cap.resize((int(cap.width * .78), int(cap.height * .78)), Image.LANCZOS); place('cap', cap, 52, 8)

# Faces: centered on the bulb's face spot
FACE_C = (190, 162)
rig['faces'] = {}
for f in ['smile', 'laugh', 'happy', 'xd', 'surprised', 'starry', 'skeptical', 'flat', 'worried', 'sad', 'sleepy', 'love']:
    im = Image.open(f'{D}/face-{f}.png'); cy = FACE_C[1] + (8 if f == 'sleepy' else 0)
    rig['faces'][f] = {'src': f'face-{f}', 'cx': round(FACE_C[0] / STAGE * 100, 2), 'cy': round(cy / STAGE * 100, 2),
                       'w': round(im.width / STAGE * 100, 2), 'h': round(im.height / STAGE * 100, 2)}

# Hands: where they float in each slot (center, scale)
SLOTS = {'right': ((262, 196), .95), 'left': ((86, 206), .95), 'front': ((188, 246), .9), 'chin': ((214, 232), .8)}
rig['hands'] = {}
for h in ['wave', 'point', 'thumbs', 'clap', 'peace', 'fist', 'book', 'tablet', 'pencil', 'magnifier', 'idea']:
    im = Image.open(f'{D}/hand-{h}.png'); rig['hands'][h] = {'src': f'hand-{h}', 'w': round(im.width / STAGE * 100, 2), 'h': round(im.height / STAGE * 100, 2)}
rig['slots'] = {k: {'cx': round(c[0] / STAGE * 100, 2), 'cy': round(c[1] / STAGE * 100, 2), 's': s} for k, (c, s) in SLOTS.items()}

# Effects: where they pop
FX = {'question': (250, 40, .9), 'sparkles': (40, 70, .8), 'zzz': (238, 30, .8), 'burst': (40, 40, .75), 'burst-small': (190, 18, .7), 'exclaim': (248, 40, .8), 'bubble': (232, 20, .62)}
rig['fx'] = {}
for k, (cx, cy, s) in FX.items():
    im = Image.open(f'{D}/fx-{k}.png'); rig['fx'][k] = {'src': f'fx-{k}', 'cx': round(cx / STAGE * 100, 2), 'cy': round(cy / STAGE * 100, 2),
                                                        'w': round(im.width * s / STAGE * 100, 2), 'h': round(im.height * s / STAGE * 100, 2)}
# Full poses (fill the stage, bottom-aligned)
rig['poses'] = {}
for p in ['reading', 'laptop', 'thinking', 'idea', 'wink']:
    im = Image.open(f'{D}/pose-{p}.png'); sc = 268 / max(im.width, im.height)
    rig['poses'][p] = {'src': f'pose-{p}', 'w': round(im.width * sc / STAGE * 100, 2), 'h': round(im.height * sc / STAGE * 100, 2)}
json.dump(rig, open(f'{D}/rig.json', 'w'), indent=1)
print('rig layers:', len(rig['layers']), 'faces:', len(rig['faces']), 'hands:', len(rig['hands']), 'fx:', len(rig['fx']), 'poses:', len(rig['poses']))
