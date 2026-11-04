"""Cuts the Mr. Lumino asset pack (docs/mr-lumino-assets.png) into layered character parts.
Run: python3 -I scripts/cut-mascot.py docs/mr-lumino-assets.png src/assets/lumino
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cutlib
from cutlib import art

SRC, OUT = sys.argv[1], sys.argv[2]
cutlib.load(SRC)

E = {  # name: (box on the 1536x1024 pack, options)
  # Base character + layered parts
  'base':          ((334, 60, 566, 320), {'kill': [(334, 302, 440, 320), (516, 302, 566, 320), (334, 314, 566, 320)]}),
  'body':          ((20, 404, 248, 672), {}),
  'cap':           ((284, 400, 558, 630), {'kill': [(284, 572, 392, 630)]}),
  'rays':          ((572, 420, 686, 616), {}),
  'socket':        ((254, 580, 384, 668), {}),
  # Faces (expression layer)
  'face-smile':     ((710, 96, 798, 148), {}), 'face-laugh':   ((842, 94, 938, 161), {}),
  'face-happy':     ((979, 94, 1075, 146), {}), 'face-xd':     ((1112, 88, 1208, 161), {}),
  'face-surprised': ((1262, 96, 1345, 155), {}), 'face-starry': ((1390, 85, 1493, 159), {}),
  'face-skeptical': ((715, 199, 800, 268), {}), 'face-flat':   ((844, 214, 940, 243), {}),
  'face-worried':   ((991, 211, 1070, 266), {}), 'face-sad':    ((1119, 211, 1213, 266), {}),
  'face-sleepy':    ((1255, 184, 1363, 274), {}), 'face-love':  ((1395, 209, 1490, 275), {}),
  # Hands
  'hand-wave':  ((772, 399, 870, 493), {}), 'hand-point': ((909, 400, 986, 494), {}),
  'hand-thumbs': ((1024, 400, 1109, 494), {}), 'hand-clap': ((1147, 417, 1248, 488), {}),
  'hand-peace': ((1282, 399, 1361, 493), {}), 'hand-fist': ((1402, 412, 1485, 498), {}),
  'hand-book':  ((749, 532, 916, 645), {}), 'hand-tablet': ((945, 540, 1084, 629), {}),
  'hand-pencil': ((1111, 542, 1210, 635), {}), 'hand-magnifier': ((1239, 519, 1344, 648), {}),
  'hand-idea':  ((1371, 505, 1498, 648), {}),
  # Full poses
  'pose-reading': ((26, 786, 204, 979), {}), 'pose-laptop': ((206, 786, 397, 959), {}),
  'pose-thinking': ((389, 776, 559, 954), {}), 'pose-idea': ((559, 761, 767, 944), {}),
  'pose-wink': ((761, 781, 954, 949), {}),
  # Effects
  'fx-burst': ((999, 770, 1113, 873), {}), 'fx-sparkles': ((1155, 780, 1249, 889), {}),
  'fx-question': ((1302, 775, 1360, 858), {}), 'fx-zzz': ((1405, 772, 1508, 859), {}),
  'fx-burst-small': ((1025, 899, 1125, 964), {}),
  'fx-exclaim': ((1210, 886, 1290, 970), {'kill': [(1210, 940, 1236, 970)]}),
  'fx-bubble': ((1346, 879, 1490, 980), {}),
}
meta = {}
for n, (b, o) in E.items():
    img = art(b, **o); img.save(f'{OUT}/{n}.png', optimize=True); meta[n] = {'size': list(img.size), 'box': list(b)}
# Sleepy face: drop its built-in zzz (Lumino uses the floating fx-zzz instead)
import numpy as np
from PIL import Image
im = Image.open(f'{OUT}/face-sleepy.png'); arr = np.asarray(im).copy(); arr[:int(arr.shape[0] * .42), int(arr.shape[1] * .45):, 3] = 0
out = Image.fromarray(arr); out.crop(out.getchannel('A').getbbox()).save(f'{OUT}/face-sleepy.png', optimize=True)
json.dump(meta, open(f'{OUT}/manifest.json', 'w'), indent=1)
print(len(meta), 'pieces')
