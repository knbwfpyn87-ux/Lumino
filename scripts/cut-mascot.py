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
  'base':          ((334, 60, 566, 320), {'kill': [(334, 296, 430, 320), (520, 296, 566, 320), (334, 308, 447, 320), (503, 308, 566, 320), (334, 315, 566, 320)]}),
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
# 'base-blank': the reference character (cap sits exactly right) with its face painted out,
# so any expression can go on top. Face strokes are filled by diffusing the surrounding yellow inward.
import numpy as np
from PIL import Image
B = cutlib.board.copy(); FX0, FY0, FX1, FY1 = 444, 176, 548, 230
reg = B[FY0:FY1, FX0:FX1]; lum = reg @ [.299, .587, .114]
hole = lum < 200
from numpy.lib.stride_tricks import sliding_window_view as swv
hole = swv(np.pad(hole, 3), (7, 7)).any((-1, -2))
known = ~hole; val = np.where(known[..., None], reg, 0)
for _ in range(400):
    P = np.pad(val, ((1, 1), (1, 1), (0, 0))); K = np.pad(known.astype(float), 1)
    S = P[:-2, 1:-1] + P[2:, 1:-1] + P[1:-1, :-2] + P[1:-1, 2:]; N = K[:-2, 1:-1] + K[2:, 1:-1] + K[1:-1, :-2] + K[1:-1, 2:]
    fill = ~known & (N > 0); val = np.where(fill[..., None], S / np.maximum(N, 1)[..., None], val); known |= fill
    if known.all(): break
# Replace the hole with a smooth plane fitted to the surrounding yellow (no smudges left behind)
yy, xx = np.mgrid[0:reg.shape[0], 0:reg.shape[1]]; good = ~hole
A = np.c_[xx[good], yy[good], np.ones(good.sum())]
plane = np.stack([np.linalg.lstsq(A, reg[..., c][good], rcond=None)[0] for c in range(3)], 1)
fit = np.dstack([xx * plane[0, c] + yy * plane[1, c] + plane[2, c] for c in range(3)])
val = np.where(hole[..., None], fit, reg)
B[FY0:FY1, FX0:FX1] = val
saved = cutlib.board; cutlib.board = B
img = art(E['base'][0], **E['base'][1])
# Drop the floor shadow: light pixels connected to the bottom edge (the glass is enclosed by its outline, so it stays)
from collections import deque
A = np.asarray(img).copy(); h, w = A.shape[:2]; L = A[..., :3] @ [.299, .587, .114]
light = (A[..., 3] > 0) & (L > 140) & (A[..., 3] < 255) | (A[..., 3] > 0) & (L > 140) & (np.arange(h)[:, None] > h - 16)
clear = np.pad(A[..., 3] == 0, 1, constant_values=True); touch = clear[:-2, 1:-1] | clear[2:, 1:-1] | clear[1:-1, :-2] | clear[1:-1, 2:]
seen = np.zeros((h, w), bool); q = deque((y, x) for y, x in zip(*np.nonzero(light & touch)) if y > h - 16)
for y, x in q: seen[y, x] = True
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and light[ny, nx] and not seen[ny, nx] and ny > h - 16: seen[ny, nx] = True; q.append((ny, nx))
A[seen, 3] = 0; img = Image.fromarray(A)
img.save(f'{OUT}/base-blank.png', optimize=True)
cutlib.board = saved
# remember where the trimmed image sits on the pack (for the rig)
x0, y0, x1, y1 = E['base'][0]; d = np.abs(saved[y0:y1, x0:x1] - 250).sum(-1) > 40; ys, xs = np.nonzero(d)
meta['base-blank'] = {'size': list(img.size), 'origin': [int(x0 + xs.min()), int(y0 + ys.min())]}
for n, (b, o) in E.items():
    img = art(b, **o); img.save(f'{OUT}/{n}.png', optimize=True); meta[n] = {'size': list(img.size), 'box': list(b)}
# Sleepy face: drop its built-in zzz (Lumino uses the floating fx-zzz instead)
import numpy as np
from PIL import Image
im = Image.open(f'{OUT}/face-sleepy.png'); arr = np.asarray(im).copy(); arr[:int(arr.shape[0] * .42), int(arr.shape[1] * .45):, 3] = 0
out = Image.fromarray(arr); out.crop(out.getchannel('A').getbbox()).save(f'{OUT}/face-sleepy.png', optimize=True)
json.dump(meta, open(f'{OUT}/manifest.json', 'w'), indent=1)
print(len(meta), 'pieces')
