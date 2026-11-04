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

# Everything is placed by mapping the base reference character onto the stage:
#   stage = (pack - REF) * K + OFF   (the base character carries the cap exactly as drawn in the pack)
REF, K, OFF = (334, 60), 0.9, (10, 26)
T = lambda x, y: ((x - REF[0]) * K + OFF[0], (y - REF[1]) * K + OFF[1])
man = json.load(open(f'{D}/manifest.json')); ox, oy = man['base-blank']['origin']
for v in ('base-blank', 'base-blank-dark'):
    b = Image.open(f'{D}/{v}.png'); b = b.resize((round(b.width * K), round(b.height * K)), Image.LANCZOS)
    place('body' if v == 'base-blank' else 'body-dark', b, *T(ox, oy))
rays = Image.open(f'{D}/rays.png'); rays = rays.resize((int(rays.width * .6 * K), int(rays.height * .6 * K)), Image.LANCZOS); place('rays', rays, *T(574, 102))

# Faces: centered where the reference face sits; the expression sheet is drawn ~12% smaller than the base face
FACE_C = T(494, 203); FACE_S = 1.14 * K
rig['faces'] = {}
for f in ['smile', 'laugh', 'happy', 'xd', 'surprised', 'starry', 'skeptical', 'flat', 'worried', 'sad', 'sleepy', 'love']:
    im = Image.open(f'{D}/face-{f}.png'); cy = FACE_C[1] + (6 if f == 'sleepy' else 0)
    rig['faces'][f] = {'src': f'face-{f}', 'cx': round(FACE_C[0] / STAGE * 100, 2), 'cy': round(cy / STAGE * 100, 2),
                       'w': round(im.width * FACE_S / STAGE * 100, 2), 'h': round(im.height * FACE_S / STAGE * 100, 2)}

# Hands: where they float beside the bulb (center, scale)
SLOTS = {'right': (T(570, 225), .8), 'left': (T(392, 230), .8), 'front': (T(494, 280), .78), 'chin': (T(530, 265), .7)}
rig['hands'] = {}
for h in ['wave', 'point', 'thumbs', 'clap', 'peace', 'fist', 'book', 'tablet', 'pencil', 'magnifier', 'idea']:
    im = Image.open(f'{D}/hand-{h}.png'); rig['hands'][h] = {'src': f'hand-{h}', 'w': round(im.width / STAGE * 100, 2), 'h': round(im.height / STAGE * 100, 2)}
rig['slots'] = {k: {'cx': round(c[0] / STAGE * 100, 2), 'cy': round(c[1] / STAGE * 100, 2), 's': s} for k, (c, s) in SLOTS.items()}

# Effects: where they pop (stage px)
FX = {'question': (258, 46, .9), 'sparkles': (52, 20, .7), 'zzz': (244, 40, .8), 'burst': (40, 18, .62), 'burst-small': (160, 16, .7), 'exclaim': (256, 46, .8), 'bubble': (250, 30, .62)}
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
