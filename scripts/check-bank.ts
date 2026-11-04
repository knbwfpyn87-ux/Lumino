// Verifies every question in the built-in bank: run `npm run check:bank`.
import { GENERATED_TESTS } from '../src/lib/generated.ts';
import { SAT_TESTS } from '../src/lib/sat.ts';
import { BUILTIN_TESTS } from '../src/lib/catalog.ts';
import { TEST_TIERS } from '../src/lib/plans.ts';

let errors = 0; const prompts = new Set<string>();
const all = [...BUILTIN_TESTS.map(t => ({ ...t, tier: TEST_TIERS[t.id] ?? 'free' })), ...SAT_TESTS.map(t => ({ ...t, tier: TEST_TIERS[t.id] ?? 'free' })), ...GENERATED_TESTS];
for (const t of all) for (const q of t.questions) {
  const bad = (m: string) => { errors++; console.error(`✗ ${q.id}: ${m}\n   ${q.prompt} | ${q.choices.join(' | ')}`); };
  if (q.choices.length !== 4) bad('needs 4 choices');
  if (new Set(q.choices).size !== q.choices.length) bad('duplicate choices');
  if (!(q.answer >= 0 && q.answer < q.choices.length)) bad('answer index out of range');
  if (q.choices.some(c => !c || c === 'NaN' || c.includes('Infinity'))) bad('invalid choice text');
  prompts.add(q.prompt);
}
// Independently re-solve the generated math questions we can parse.
for (const t of GENERATED_TESTS) for (const q of t.questions) {
  const key = q.choices[q.answer];
  let m = q.prompt.match(/^If (−?\d*)x ([+−]) (\d+) = (−?\d+), what is x\?$/);
  if (m) { const a = m[1] === '' ? 1 : m[1] === '−' ? -1 : Number(m[1].replace('−', '-')); const b = (m[2] === '−' ? -1 : 1) * Number(m[3]); const c = Number(m[4].replace('−', '-'));
    const x = (c - b) / a; if (Math.abs(x - Number(key)) > 1e-9) { errors++; console.error(`✗ ${q.id} linear: expected ${x}, key ${key}`); } }
  m = q.prompt.match(/^What is (\d+)% of (\d+)\?$/);
  if (m && Math.abs(Number(m[1]) * Number(m[2]) / 100 - Number(key)) > 1e-9) { errors++; console.error(`✗ ${q.id} percent`); }
  m = q.prompt.match(/^What is the median of ([\d, ]+)\?$/);
  if (m) { const s = m[1].split(', ').map(Number).sort((a, b) => a - b); if (s[(s.length - 1) / 2] !== Number(key)) { errors++; console.error(`✗ ${q.id} median`); } }
  m = q.prompt.match(/^Two angles of a triangle are (\d+)° and (\d+)°/);
  if (m && `${180 - Number(m[1]) - Number(m[2])}°` !== key) { errors++; console.error(`✗ ${q.id} angles`); }
  m = q.prompt.match(/^What is the slope of the line through \((−?\d+), (−?\d+)\) and \((−?\d+), (−?\d+)\)\?$/);
  if (m) { const [x1, y1, x2, y2] = m.slice(1).map(v => Number(v.replace('−', '-'))); if ((y2 - y1) / (x2 - x1) !== Number(key)) { errors++; console.error(`✗ ${q.id} slope`); } }
}
const count = (tier: string) => all.filter(t => tier === 'free' ? t.tier === 'free' : tier === 'plus' ? t.tier !== 'pro' : true).reduce((n, t) => n + t.questions.length, 0);
console.log(`Basic: ${count('free')} · Premium: ${count('plus')} · Premium+: ${count('pro')} questions · ${prompts.size} unique prompts`);
console.log(errors ? `${errors} problem(s) found` : '✓ All answer keys check out');
process.exit(errors ? 1 : 0);
