"""Cuts every GUI element out of the Lumino GUI board with clean, soft edges.

Two methods:
  icon  - one-color line icons -> alpha comes from how much darker/more colorful the ink is than the
          background (the board's light glow around strokes is ignored). Saved as a flat-color PNG plus an
          alpha mask (so CSS can recolor it for dark mode).
  art   - multi-color artwork -> background is found by flooding in from the crop's edges; anything the
          flood can't reach (enclosed highlights, glass, white figures) stays solid. Edge pixels get soft
          alpha and their background tint removed.

Run: python3 -I scripts/cut-gui.py docs/gui-board.png public/brand/ui
"""
import sys, json, numpy as np
from PIL import Image
from collections import deque

SRC, OUT = sys.argv[1], sys.argv[2]
board = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
lum = lambda c: c[..., 0] * .299 + c[..., 1] * .587 + c[..., 2] * .114
chroma = lambda c: c.max(-1) - c.min(-1)

def bg_estimate(crop, gradient):
    if not gradient:
        ring = np.concatenate([crop[0], crop[-1], crop[:, 0], crop[:, -1]])
        return np.broadcast_to(np.median(ring, 0), crop.shape).copy()
    h, w, _ = crop.shape
    def sm(v, k=10):
        p = np.pad(v, ((k, k), (0, 0)), mode='edge'); ker = np.ones(2 * k + 1) / (2 * k + 1)
        # median-ish robustness: clip outliers toward the ring median before smoothing
        med = np.median(v, 0); p = np.where(np.abs(p - med).sum(-1, keepdims=True) > 60, med, p)
        return np.stack([np.convolve(p[:, c], ker, 'valid') for c in range(3)], 1)
    t, b, l, r = sm(crop[0]), sm(crop[-1]), sm(crop[:, 0]), sm(crop[:, -1])
    u = np.linspace(0, 1, w)[None, :, None]; v = np.linspace(0, 1, h)[:, None, None]
    L = (1 - v) * t[None] + v * b[None] + (1 - u) * l[:, None] + u * r[:, None]
    B = (1 - u) * (1 - v) * t[0] + u * (1 - v) * t[-1] + (1 - u) * v * b[0] + u * v * b[-1]
    return L - B

def trim(img):
    bb = img.getchannel('A').point(lambda p: 255 if p > 6 else 0).getbbox()
    return img.crop((max(bb[0] - 1, 0), max(bb[1] - 1, 0), min(bb[2] + 1, img.width), min(bb[3] + 1, img.height))) if bb else img

def components(mask):
    h, w = mask.shape; lab = np.zeros((h, w), np.int32); sizes = [0]; n = 0
    for sy, sx in zip(*np.nonzero(mask)):
        if lab[sy, sx]: continue
        n += 1; q = deque([(sy, sx)]); lab[sy, sx] = n; c = 0
        while q:
            y, x = q.popleft(); c += 1
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; q.append((ny, nx))
        sizes.append(c)
    return lab, np.array(sizes)

def drop_specks(a, frac=0.03):
    lab, sizes = components(a > 0.25)
    if len(sizes) < 2: return a
    keep = sizes >= sizes[1:].max() * frac; keep[0] = False
    k = keep[lab]
    from numpy.lib.stride_tricks import sliding_window_view as swv
    k = swv(np.pad(k, 1), (3, 3)).any((-1, -2))  # keep the soft rim next to kept parts
    return np.where(k, a, 0)

def icon(box, gradient=False, gamma=1.0, specks=0.03, kill=(), drop_yellow=False):
    x0, y0, x1, y1 = box; c = board[y0:y1, x0:x1].copy(); bg = bg_estimate(c, gradient)
    if drop_yellow:  # remove the notification dot: warm, bright, saturated pixels (+1px rim)
        yl = (c[..., 0] > 170) & (c[..., 1] > 120) & (c[..., 2] < c[..., 1] - 40)
        from numpy.lib.stride_tricks import sliding_window_view as swv0
        yl = swv0(np.pad(yl, 2), (5, 5)).any((-1, -2))
        c = np.where(yl[..., None], bg, c)
    for kx0, ky0, kx1, ky1 in kill: c[ky0 - y0:ky1 - y0, kx0 - x0:kx1 - x0] = bg[ky0 - y0:ky1 - y0, kx0 - x0:kx1 - x0]
    dl = lum(bg) - lum(c)                         # darker than background
    dc = chroma(c) - chroma(bg)                   # more colorful than background
    # the ink = the strongest pixels; its strength sets 100% alpha
    s = np.maximum(dl, dc * 0.9); full = np.percentile(s[s > 8], 80) if (s > 8).any() else 1
    a = np.clip((s - 10) / max(full - 10, 1), 0, 1) ** gamma
    a = drop_specks(a, specks)
    ink = np.median(c[a > 0.9], 0) if (a > 0.9).any() else c.reshape(-1, 3).min(0)
    rgba = np.dstack([np.broadcast_to(ink, c.shape), a * 255]).astype(np.uint8)
    img = Image.fromarray(rgba, 'RGBA')
    return (img if drop_yellow else trim(img)), [int(v) for v in ink]

def art(box, gradient=False, tol=26, lo=12, hi=60, kill=(), fill_holes=True, specks=0.01, unmix=True):
    x0, y0, x1, y1 = box; c = board[y0:y1, x0:x1].copy(); h, w, _ = c.shape; bg = bg_estimate(c, gradient)
    d = np.sqrt(((c - bg) ** 2).sum(-1))
    lighter = (lum(c) >= lum(bg) - 4) & (chroma(c) <= chroma(bg) + 18)   # the board's soft white glow
    bglike = (d < tol) | lighter
    for kx0, ky0, kx1, ky1 in kill: bglike[ky0 - y0:ky1 - y0, kx0 - x0:kx1 - x0] = True  # areas to discard
    killmask = np.zeros((h, w), bool)
    for kx0, ky0, kx1, ky1 in kill: killmask[ky0 - y0:ky1 - y0, kx0 - x0:kx1 - x0] = True
    outside = np.zeros((h, w), bool); q = deque()
    for y in range(h):
        for x in (0, w - 1):
            if bglike[y, x] and not outside[y, x]: outside[y, x] = True; q.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if bglike[y, x] and not outside[y, x]: outside[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not outside[ny, nx] and bglike[ny, nx]: outside[ny, nx] = True; q.append((ny, nx))
    fg = ~outside if fill_holes else ~bglike
    fg &= ~killmask
    # soft rim: fg pixels touching the outside get alpha from how far they are from the background
    from numpy.lib.stride_tricks import sliding_window_view as swv
    touch = swv(np.pad(outside, 1), (3, 3)).any((-1, -2))
    soft = np.clip((d - lo) / (hi - lo), 0, 1); soft = soft * soft * (3 - 2 * soft)
    a = np.where(fg, np.where(touch, np.maximum(soft, 0.0), 1.0), 0.0)
    a = drop_specks(a, specks)
    # Edge pixels take the color of the solid artwork just inside them (no background tint, no halos)
    F = c.copy(); solid = (a >= 0.98) & ~touch; filled = solid.copy()
    for _ in range(4):
        P = np.pad(F * filled[..., None], ((1, 1), (1, 1), (0, 0))); M = np.pad(filled.astype(np.float32), 1)
        S = sum(P[1 + dy:h + 1 + dy, 1 + dx:w + 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        N = sum(M[1 + dy:h + 1 + dy, 1 + dx:w + 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        grow = ~filled & (N > 0) & (a > 0)
        F = np.where(grow[..., None], S / np.maximum(N, 1)[..., None], F); filled |= grow
    # Rim alpha by unmixing: pixel = a*F + (1-a)*bg  ->  a = |c-bg| / |F-bg|
    if unmix:
        num = np.sqrt(((c - bg) ** 2).sum(-1)); den = np.sqrt(((F - bg) ** 2).sum(-1))
        ua = np.clip(num / np.maximum(den, 1), 0, 1)
        rim = touch & (a > 0) | (touch & fg)
        a = np.where(rim & filled, ua, a)
    rgba = np.dstack([np.clip(F, 0, 255), a * 255]).astype(np.uint8)
    return trim(Image.fromarray(rgba, 'RGBA'))

def chroma_key(box, lo=70, hi=120, yellow_only=False):
    x0, y0, x1, y1 = box; c = board[y0:y1, x0:x1]; h, w, _ = c.shape
    ch = chroma(c); a = np.clip((ch - lo) / (hi - lo), 0, 1); a = a * a * (3 - 2 * a)
    if yellow_only: a = np.where((c[..., 0] > c[..., 2] + 60) & (c[..., 1] > c[..., 2] + 30), a, 0)
    a = drop_specks(a, 0.02)
    # close hairline seams where two colors meet (blended pixels look less colorful): 2px morphological closing
    from numpy.lib.stride_tricks import sliding_window_view as swv
    k = 5; dil = swv(np.pad(a, k // 2, mode='edge'), (k, k)).max((-1, -2)); clo = swv(np.pad(dil, k // 2, mode='edge'), (k, k)).min((-1, -2))
    a = np.maximum(a, clo)
    F = c.copy(); filled = a >= 0.98
    for _ in range(4):
        P = np.pad(F * filled[..., None], ((1, 1), (1, 1), (0, 0))); M = np.pad(filled.astype(np.float32), 1)
        S = sum(P[1 + dy:h + 1 + dy, 1 + dx:w + 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        N = sum(M[1 + dy:h + 1 + dy, 1 + dx:w + 1 + dx] for dy in (-1, 0, 1) for dx in (-1, 0, 1))
        grow = ~filled & (N > 0) & (a > 0); F = np.where(grow[..., None], S / np.maximum(N, 1)[..., None], F); filled |= grow
    return Image.fromarray(np.dstack([np.clip(F, 0, 255), a * 255]).astype(np.uint8), 'RGBA')  # untrimmed: keeps its corner anchoring

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
