# Regenerates mobile/lib/ui-assets.ts after re-cutting the GUI board.
import json
m = json.load(open('mobile/assets/ui/manifest.json'))
out = ["// Generated from assets/ui (GUI board cut-outs). Re-run: python3 -I scripts/gen-mobile-ui.py", "/* eslint-disable */", "export const UI_SRC = {"]
out += [f"  '{n}': require('../assets/ui/{n}.png')," for n in sorted(m)] + ["} as const;"]
open('mobile/lib/ui-assets.ts', 'w').write("\n".join(out) + "\n")
