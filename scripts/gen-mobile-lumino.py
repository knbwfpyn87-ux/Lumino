# Copies Mr. Lumino's layers to the iPhone app and regenerates mobile/lib/lumino-assets.ts
import os, shutil
os.makedirs('mobile/assets/lumino', exist_ok=True)
for f in os.listdir('src/assets/lumino'):
    if f.endswith('.png') or f == 'rig.json': shutil.copy(f'src/assets/lumino/{f}', 'mobile/assets/lumino/')
names = sorted(f[:-4] for f in os.listdir('mobile/assets/lumino') if f.endswith('.png'))
open('mobile/lib/lumino-assets.ts', 'w').write("\n".join(["// Generated: Mr. Lumino layers. Re-run: python3 -I scripts/gen-mobile-lumino.py", "/* eslint-disable */", "export const LUM_SRC = {"] + [f"  '{n}': require('../assets/lumino/{n}.png')," for n in names] + ["} as const;"]) + "\n")
