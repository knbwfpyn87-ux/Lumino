"""Dark-mode versions of the brand art: no white pixels, and a softer outer outline.
Run after cut-gui.py:  python3 -I scripts/make-dark-art.py src/assets/ui
"""
import sys, json, numpy as np
from PIL import Image
from collections import deque
from numpy.lib.stride_tricks import sliding_window_view as swv

D = sys.argv[1]
PAGE = np.array([23, 26, 38], float)        # dark-mode sidebar/page background (#171a26)
SKY = np.array([88, 178, 240], float)       # the cap's sky blue
SUN = np.array([255, 222, 104], float)      # soft bulb yellow
SOFTEN = 0.62                               # how far the outer outline fades toward the page (0 = none, 1 = invisible)

def local_mean(rgb, mask, k=7):
    p = k // 2; num = swv(np.pad(rgb * mask[..., None], ((p, p), (p, p), (0, 0))), (k, k), (0, 1)).sum((-1, -2))
    den = swv(np.pad(mask.astype(float), p), (k, k)).sum((-1, -2)); return num / np.maximum(den, 1)[..., None], den

def darkify(name):
    im = np.asarray(Image.open(f'{D}/{name}.png').convert('RGBA')).astype(float); rgb, a = im[..., :3], im[..., 3] / 255
    lum = rgb @ [.299, .587, .114]; chroma = rgb.max(-1) - rgb.min(-1)
    # 1) whites and pale near-whites -> recolor from their surroundings (shine -> soft yellow, glass/others -> sky blue)
    white = (a > 0.03) & (lum > 140) & (chroma < 100)
    # decide per white pixel: are there more yellow or more blue pixels around it? (dark outline pixels ignored)
    yel = (a > 0.6) & (rgb[..., 0] > 190) & (rgb[..., 1] > 150) & (rgb[..., 2] < 140)
    blu = (a > 0.6) & (rgb[..., 2] > 170) & (rgb[..., 2] > rgb[..., 0] + 60) & (lum > 110)
    k = 11; p = k // 2
    ny = swv(np.pad(yel.astype(float), p), (k, k)).sum((-1, -2)); nb = swv(np.pad(blu.astype(float), p), (k, k)).sum((-1, -2))
    # one color per white patch (so a patch never comes out half yellow, half blue)
    h0, w0 = white.shape; lab = np.zeros((h0, w0), int); sun = {}; n = 0
    for sy, sx in zip(*np.nonzero(white)):
        if lab[sy, sx]: continue
        n += 1; q = deque([(sy, sx)]); lab[sy, sx] = n; ty = tb = 0
        while q:
            y, x = q.popleft(); ty += ny[y, x]; tb += nb[y, x]
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < h0 and 0 <= xx < w0 and white[yy, xx] and not lab[yy, xx]: lab[yy, xx] = n; q.append((yy, xx))
        sun[n] = ty >= tb
    is_sun = np.vectorize(lambda v: sun.get(v, False))(lab) if n else np.zeros_like(white)
    target = np.where(is_sun[..., None], SUN, SKY)
    rgb = np.where(white[..., None], target, rgb)
    # 2) outer outline -> fade toward the page so it reads softer (eyes/mouth/inner lines untouched)
    h, w = a.shape; outside = np.zeros((h, w), bool); q = deque()
    for y in range(h):
        for x in (0, w - 1):
            if a[y, x] < 0.35: outside[y, x] = True; q.append((y, x))
    for x in range(w):
        for y in (0, h - 1):
            if a[y, x] < 0.35 and not outside[y, x]: outside[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not outside[ny, nx] and a[ny, nx] < 0.35: outside[ny, nx] = True; q.append((ny, nx))
    near = swv(np.pad(outside, 4), (9, 9)).any((-1, -2))
    outline = near & ~outside & (rgb @ [.299, .587, .114] < 62) & (rgb[..., 2] >= rgb[..., 0])  # only the dark navy line
    rgb = np.where(outline[..., None], rgb * (1 - SOFTEN) + PAGE * SOFTEN, rgb)
    out = np.dstack([np.clip(rgb, 0, 255), a * 255]).astype(np.uint8)
    Image.fromarray(out, 'RGBA').save(f'{D}/{name}-dark.png', optimize=True)
    left = ((out[..., 3] > 10) & (out[..., :3] @ [.299, .587, .114] > 190) & (out[..., :3].max(-1).astype(int) - out[..., :3].min(-1) < 60)).sum()
    return int(left)

meta = json.load(open(f'{D}/manifest.json'))
for n in ['logo-mascot', 'logo-wordmark', 'mascot-hero']:
    print(n, 'white pixels left:', darkify(n)); meta[n + '-dark'] = {'kind': 'art', 'size': meta[n]['size']}
m, wm = Image.open(f'{D}/logo-mascot-dark.png'), Image.open(f'{D}/logo-wordmark-dark.png')
W = max(m.width, wm.width); logo = Image.new('RGBA', (W, m.height + wm.height + 6))
logo.alpha_composite(m, ((W - m.width) // 2 + 6, 0)); logo.alpha_composite(wm, ((W - wm.width) // 2, m.height + 6))
logo.save(f'{D}/logo-full-dark.png', optimize=True); meta['logo-full-dark'] = {'kind': 'art', 'size': list(logo.size)}
json.dump(meta, open(f'{D}/manifest.json', 'w'), indent=1)
