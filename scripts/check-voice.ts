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
