// Checks the voice key is identical on the website/app and the server, and lists how much pre-recording costs.
import { readFileSync } from 'node:fs';
import * as web from '../src/lib/voicekey';
import * as srv from '../supabase/functions/_shared/voicekey';
import { fixedLines } from '../src/lib/lines';
const a = readFileSync('src/lib/voicekey.ts', 'utf8').split('\n').slice(1).join('\n');
const b = readFileSync('supabase/functions/_shared/voicekey.ts', 'utf8').split('\n').slice(1).join('\n');
if (a !== b) throw new Error('supabase/functions/_shared/voicekey.ts is out of sync with src/lib/voicekey.ts');
const lines = fixedLines().map(web.speakable);
for (const l of lines) if (web.voiceKey(l) !== srv.voiceKey(l)) throw new Error('key mismatch: ' + l);
if (new Set(lines.map(l => web.voiceKey(l))).size !== lines.length) throw new Error('key collision');
console.log(`voice ok: ${lines.length} fixed lines, ${lines.reduce((n, l) => n + l.length, 0)} characters to pre-record. Example key: ${web.voiceKey(lines[0])}`);

// Pre-recorded lines (public/voice): every entry needs its mp3, and every fixed line should be covered.
import { existsSync } from 'node:fs';
if (existsSync('public/voice/manifest.json')) {
  const b = JSON.parse(readFileSync('public/voice/manifest.json', 'utf8')) as web.VoiceBundle;
  const missing = Object.keys(b.lines).filter(k => !existsSync(`public/voice/${k}.mp3`));
  if (missing.length) throw new Error(`${missing.length} recorded lines have no mp3, e.g. ${missing[0]}`);
  const uncovered = lines.filter(l => !b.lines[web.voiceKey(l, b.version)]);
  console.log(`bundle ${b.version}: ${Object.keys(b.lines).length} lines recorded, ${lines.length - uncovered.length}/${lines.length} fixed lines covered`);
  if (uncovered.length) console.log('  not recorded yet:', uncovered.slice(0, 3));
}
