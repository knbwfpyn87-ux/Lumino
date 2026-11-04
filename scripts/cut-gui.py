"""Cuts every GUI element out of the Lumino GUI board.
Run: python3 -I scripts/cut-gui.py docs/gui-board.png src/assets/ui
"""
import sys, os, json, numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cutlib
from cutlib import *
SRC, OUT = sys.argv[1], sys.argv[2]
board = cutlib.load(SRC)

ICONS = {  # name: (box, opts)
  'nav-classes': ((30, 304, 82, 352), {}), 'nav-study': ((30, 376, 82, 420), {}),
  'nav-friends': ((30, 442, 84, 490), {}), 'nav-groups': ((30, 505, 84, 550), {}), 'nav-ai': ((34, 571, 78, 616), {}),
  'nav-settings': ((171, 692, 220, 740), {}),
  'nav-bell': ((48, 692, 98, 740), {'drop_yellow': True}), 'top-bell': ((1445, 76, 1494, 125), {'drop_yellow': True}), 'top-search': ((1325, 88, 1375, 118), {}),
  'icon-classes': ((304, 452, 350, 490), {}), 'icon-calendar': ((748, 448, 792, 492), {}), 'icon-friends': ((1184, 198, 1249, 247), {}),
  'icon-ai-yellow': ((1184, 434, 1232, 481), {}), 'icon-progress': ((1181, 578, 1226, 624), {}), 'icon-book': ((308, 728, 360, 771), {}),
  'icon-video': ((1094, 728, 1148, 770), {}), 'icon-video-room': ((1208, 347, 1260, 390), {'gradient': True}),
  'icon-room': ((1104, 790, 1150, 830), {'gradient': True}),
  'tool-flashcards': ((346, 794, 408, 854), {'gradient': True}), 'tool-notes': ((498, 794, 556, 852), {'gradient': True}),
  'tool-practice': ((644, 794, 704, 853), {'gradient': True}), 'tool-timer': ((794, 794, 852, 854), {'gradient': True}),
  'tool-ai': ((942, 794, 1004, 852), {'gradient': True}),
  'sparkle-greeting': ((286, 24, 346, 92), {'specks': 0.1, 'kill': [(336, 78, 346, 92)]}),
}
ARTS = {
  'logo-mascot': ((52, 18, 202, 130), {}),
  'logo-wordmark': ((30, 132, 238, 186), {'fill_holes': False, 'tol': 22}),
  'mascot-hero': ((322, 196, 584, 412), {'gradient': True, 'tol': 30, 'kill': [(322, 362, 390, 412)]}),
  'nav-home': ((30, 234, 82, 278), {'gradient': True, 'tol': 30}),
  'top-avatar': ((1536, 61, 1622, 145), {}),
  'avatar-blue': ((1189, 261, 1254, 324), {}), 'avatar-yellow': ((1264, 261, 1329, 324), {}),
  'avatar-purple': ((1340, 261, 1405, 324), {}), 'avatar-gray': ((1416, 261, 1481, 324), {}),
  'btn-send': ((1569, 489, 1631, 535), {'specks': 0.2}), 'btn-play': ((1574, 791, 1630, 841), {'gradient': True, 'tol': 14}),
  'dot-online': ((1352, 797, 1374, 819), {}),
}
meta = {}
for n, (b, o) in {'wave-sidebar': ((0, 770, 258, 941), {}), 'wave-topright': ((1380, 0, 1672, 112), {'yellow_only': True}),
                  'wave-hero': ((880, 236, 1137, 420), {'lo': 80, 'hi': 125})}.items():
    img = chroma_key(b, **o); img.save(f'{OUT}/{n}.png', optimize=True); meta[n] = {'kind': 'art', 'size': img.size}
def dot_geometry(box):
    x0, y0, x1, y1 = box; c = board[y0:y1, x0:x1]
    yl = (c[..., 0] > 170) & (c[..., 1] > 120) & (c[..., 2] < c[..., 1] - 40); ys, xs = np.nonzero(yl)
    w, h = x1 - x0, y1 - y0; r = np.sqrt(yl.sum() / np.pi)
    return {'cx': round(xs.mean() / w * 100, 1), 'cy': round(ys.mean() / h * 100, 1), 'd': round(2 * r / w * 100, 1),
            'color': '#%02x%02x%02x' % tuple(int(v) for v in np.median(c[yl], 0))}
for n, (b, o) in ICONS.items():
    img, ink = icon(b, **o)  # bells (drop_yellow) stay untrimmed so the dot can be re-drawn at its exact spot
    img.save(f'{OUT}/{n}.png', optimize=True); meta[n] = {'kind': 'icon', 'ink': '#%02x%02x%02x' % tuple(ink), 'size': img.size}
    if o.get('drop_yellow'): meta[n]['dot'] = dot_geometry(b)
for n, (b, o) in ARTS.items():
    img = art(b, **o); img.save(f'{OUT}/{n}.png', optimize=True); meta[n] = {'kind': 'art', 'size': img.size}
# Full logo = mascot + wordmark at their positions on the board
m, wm = Image.open(f'{OUT}/logo-mascot.png'), Image.open(f'{OUT}/logo-wordmark.png')
W = max(m.width, wm.width); logo = Image.new('RGBA', (W, m.height + wm.height + 6))
logo.alpha_composite(m, ((W - m.width) // 2 + 6, 0)); logo.alpha_composite(wm, ((W - wm.width) // 2, m.height + 6))
logo.save(f'{OUT}/logo-full.png', optimize=True); meta['logo-full'] = {'kind': 'art', 'size': logo.size}
json.dump(meta, open(f'{OUT}/manifest.json', 'w'), indent=1)
print(len(meta), 'elements')
