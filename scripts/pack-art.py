"""Packs the cut GUI art and Mr. Lumino's layers into ONE file the apps load: src/assets/art.json
(keeps the repo small enough to upload by drag-and-drop). Run after cut-gui / cut-mascot / build-rig:
  python3 -I scripts/pack-art.py
"""
import json, base64, os
def uri(p): return 'data:image/png;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
ui_meta = json.load(open('src/assets/ui/manifest.json'))
rig = json.load(open('src/assets/lumino/rig.json'))
used = {v['src'] for k in ('layers', 'faces', 'hands', 'fx', 'poses') for v in rig[k].values()}
art = {'ui': {n: uri(f'src/assets/ui/{n}.png') for n in ui_meta if os.path.exists(f'src/assets/ui/{n}.png')}, 'uiMeta': ui_meta,
       'lumino': {n: uri(f'src/assets/lumino/{n}.png') for n in sorted(used)}, 'rig': rig}
json.dump(art, open('src/assets/art.json', 'w'), separators=(',', ':'))
print(len(art['ui']), 'ui images,', len(art['lumino']), 'lumino layers,', round(os.path.getsize('src/assets/art.json') / 1e6, 2), 'MB')
