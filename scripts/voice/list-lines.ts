// Prints the lines worth pre-recording as JSON [{key, text}] for a given voice version.
// Usage: npx tsx scripts/voice/list-lines.ts <version> [--free-tests] > lines.json
import { speakable, voiceKey } from '../../src/lib/voicekey';
import { fixedLines, teachLine } from '../../src/lib/lines';
import { GENERATED_TESTS } from '../../src/lib/generated';
import { tierOf } from '../../src/lib/plans';
const [version, ...flags] = process.argv.slice(2);
if (!version) { console.error('usage: list-lines.ts <version> [--free-tests]'); process.exit(1); }
const lines = new Set(fixedLines().map(speakable));
// Explanations for every free practice test (both "That's right!" and "Not quite" versions).
if (flags.includes('--free-tests')) for (const t of GENERATED_TESTS) if (tierOf(t) === 'free')
  t.questions.forEach((q, i) => { lines.add(speakable(teachLine(i, q, true, true))); lines.add(speakable(teachLine(i, q, true, false))); });
console.log(JSON.stringify([...lines].map(text => ({ key: voiceKey(text, version), text }))));
