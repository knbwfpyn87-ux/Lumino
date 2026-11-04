// Generated practice bank. Math answers are COMPUTED, never typed, and every question is
// checked by scripts/check-bank.ts (one correct answer, four distinct choices).
// Deterministic: the same seed always produces the same tests, so tiers and leaderboards stay stable.
import type { Question, Test } from './store';
import type { Tier } from './plans';

export type Gen = (r: Rng) => { prompt: string; correct: string; wrong: string[]; explanation: string; code?: string };

export class Rng {
  s: number;
  constructor(seed: number) { this.s = seed >>> 0 || 1; }
  next() { this.s ^= this.s << 13; this.s >>>= 0; this.s ^= this.s >> 17; this.s ^= this.s << 5; this.s >>>= 0; return this.s / 4294967296; }
  int(a: number, b: number) { return a + Math.floor(this.next() * (b - a + 1)); }
  nz(a: number, b: number) { let v = 0; while (v === 0) v = this.int(a, b); return v; }
  pick<T>(xs: readonly T[]): T { return xs[Math.floor(this.next() * xs.length)]; }
  shuffle<T>(xs: T[]): T[] { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
}

const fmt = (n: number) => { const r = Math.round(n * 100) / 100; return Object.is(r, -0) ? '0' : String(r); };
const signed = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);
const term = (c: number, v: string) => (c === 1 ? v : c === -1 ? `−${v}` : `${c}${v}`);

// ---------- Math generators ----------
const linear: Gen = r => { const x = r.int(-12, 15), a = r.nz(-9, 9), b = r.int(-20, 20), c = a * x + b;
  return { prompt: `If ${term(a, 'x')} ${signed(b)} = ${c}, what is x?`, correct: fmt(x), wrong: [fmt(x + 1), fmt(-x), fmt((c + b) / a), fmt(x - 2)],
    explanation: `${term(a, 'x')} = ${c} ${signed(-b)} = ${c - b}, so x = ${c - b} ÷ ${a} = ${x}.` }; };
const slope: Gen = r => { const x1 = r.int(-8, 8), y1 = r.int(-8, 8), dx = r.nz(-6, 6), m = r.nz(-5, 5), x2 = x1 + dx, y2 = y1 + m * dx;
  return { prompt: `What is the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`, correct: fmt(m), wrong: [fmt(-m), fmt(1 / m), fmt(m + 1), fmt(dx)],
    explanation: `Slope = (${y2} − ${y1}) ÷ (${x2} − ${x1}) = ${y2 - y1} ÷ ${dx} = ${m}.` }; };
const percentOf: Gen = r => { const p = r.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80]), n = r.int(2, 40) * 20, v = p * n / 100;
  return { prompt: `What is ${p}% of ${n}?`, correct: fmt(v), wrong: [fmt(v * 2), fmt(v / 2), fmt(n - v), fmt(v + p)], explanation: `${p}% × ${n} = ${p / 100} × ${n} = ${fmt(v)}.` }; };
const percentChange: Gen = r => { const a = r.int(2, 30) * 10, p = r.pick([10, 20, 25, 30, 40, 50, 60, 75]), up = r.next() < 0.6, b = up ? a * (1 + p / 100) : a * (1 - p / 100);
  return { prompt: `A price changes from $${a} to $${fmt(b)}. What is the percent ${up ? 'increase' : 'decrease'}?`, correct: `${p}%`,
    wrong: [`${fmt(Math.abs(b - a))}%`, `${fmt(Math.abs(b - a) / b * 100)}%`, `${p + 5}%`, `${100 - p}%`],
    explanation: `Change = ${fmt(Math.abs(b - a))}; ${fmt(Math.abs(b - a))} ÷ ${a} = ${p / 100} = ${p}%.` }; };
const meanFind: Gen = r => { const xs = Array.from({ length: 4 }, () => r.int(2, 30)), target = r.int(8, 25), missing = target * 5 - xs.reduce((s, v) => s + v, 0);
  return { prompt: `The mean of ${xs.join(', ')}, and x is ${target}. What is x?`, correct: fmt(missing), wrong: [fmt(target), fmt(missing + 5), fmt(target * 4 - xs.reduce((s, v) => s + v, 0)), fmt(missing - 3)],
    explanation: `Five numbers with mean ${target} add to ${target * 5}. x = ${target * 5} − ${xs.reduce((s, v) => s + v, 0)} = ${missing}.` }; };
const median: Gen = r => { const n = r.pick([5, 7]), xs = Array.from({ length: n }, () => r.int(1, 50)), s = [...xs].sort((a, b) => a - b), m = s[(n - 1) / 2], mean = xs.reduce((a, b) => a + b, 0) / n;
  return { prompt: `What is the median of ${xs.join(', ')}?`, correct: fmt(m), wrong: [fmt(xs[(n - 1) / 2]), fmt(mean), fmt(s[n - 1] - s[0]), fmt(m + 1)], explanation: `Sorted: ${s.join(', ')}. The middle value is ${m}.` }; };
const pyth: Gen = r => { const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]] as const), k = r.int(1, 4), findHyp = r.next() < 0.5;
  return findHyp
    ? { prompt: `A right triangle has legs ${a * k} and ${b * k}. How long is the hypotenuse?`, correct: fmt(c * k), wrong: [fmt((a + b) * k), fmt(c * k + 1), fmt((b - a) * k), fmt(c * k - 2)], explanation: `√(${a * k}² + ${b * k}²) = √${(c * k) ** 2} = ${c * k}.` }
    : { prompt: `A right triangle has hypotenuse ${c * k} and one leg ${a * k}. How long is the other leg?`, correct: fmt(b * k), wrong: [fmt((c - a) * k), fmt(b * k + 1), fmt((c + a) * k), fmt(b * k - 2)], explanation: `√(${c * k}² − ${a * k}²) = √${(b * k) ** 2} = ${b * k}.` }; };
const area: Gen = r => { const kind = r.int(0, 2);
  if (kind === 0) { const w = r.int(2, 20), h = r.int(2, 20); return { prompt: `What is the area of a rectangle that is ${w} by ${h}?`, correct: fmt(w * h), wrong: [fmt(2 * (w + h)), fmt(w * h / 2), fmt(w + h), fmt(w * h + w)], explanation: `Area = ${w} × ${h} = ${w * h}.` }; }
  if (kind === 1) { const b = r.int(2, 20) * 2, h = r.int(2, 20); return { prompt: `What is the area of a triangle with base ${b} and height ${h}?`, correct: fmt(b * h / 2), wrong: [fmt(b * h), fmt(b + h), fmt(b * h / 4), fmt(b * h / 2 + h)], explanation: `Area = ½ × ${b} × ${h} = ${b * h / 2}.` }; }
  const rad = r.int(2, 12); return { prompt: `What is the area of a circle with radius ${rad}?`, correct: `${rad * rad}π`, wrong: [`${2 * rad}π`, `${rad}π`, `${4 * rad * rad}π`, `${rad * rad + 1}π`], explanation: `Area = πr² = π × ${rad}² = ${rad * rad}π.` }; };
const funcEval: Gen = r => { const a = r.nz(-4, 4), b = r.int(-6, 6), c = r.int(-9, 9), x = r.int(-4, 4), v = a * x * x + b * x + c;
  return { prompt: `If f(x) = ${term(a, 'x²')} ${signed(b)}x ${signed(c)}, what is f(${x})?`, correct: fmt(v), wrong: [fmt(-a * x * x + b * x + c), fmt(a * x * 2 + b * x + c), fmt(v + 1), fmt(a * x * x - b * x + c)],
    explanation: `f(${x}) = ${a}(${x})² + ${b}(${x}) + ${c} = ${a * x * x} + ${b * x} + ${c} = ${v}.` }; };
const system2: Gen = r => { const x = r.int(-6, 9), y = r.int(-6, 9), a = r.nz(1, 4), b = r.nz(-4, 4), d = r.nz(1, 4); let e = r.nz(-4, 4); if (a * e === b * d) e = e + 1 === 0 ? 2 : e + 1;
  return { prompt: `If ${term(a, 'x')} ${signed(b)}y = ${a * x + b * y} and ${term(d, 'x')} ${signed(e)}y = ${d * x + e * y}, what is x?`, correct: fmt(x), wrong: [fmt(y), fmt(x + 1), fmt(-x), fmt(x + y)],
    explanation: `Solving the system gives x = ${x}, y = ${y}. Check: ${a}(${x}) + ${b}(${y}) = ${a * x + b * y}.` }; };
const quadRoots: Gen = r => { const p = r.int(-9, 9), q = r.int(-9, 9), B = -(p + q), C = p * q, askSum = r.next() < 0.5;
  const eq = `x² ${signed(B)}x ${signed(C)} = 0`.replace('+ 0x ', '').replace(' + 0 = 0', ' = 0');
  return askSum
    ? { prompt: `What is the sum of the solutions of ${eq}?`, correct: fmt(p + q), wrong: [fmt(B), fmt(C), fmt(p + q + 1), fmt(-C)], explanation: `For x² + bx + c = 0 the solutions add to −b = ${p + q}. (Roots: ${p} and ${q}.)` }
    : { prompt: `What is the product of the solutions of ${eq}?`, correct: fmt(C), wrong: [fmt(-C), fmt(p + q), fmt(B), fmt(C + 1)], explanation: `For x² + bx + c = 0 the solutions multiply to c = ${C}. (Roots: ${p} and ${q}.)` }; };
const exponent: Gen = r => { const base = r.pick([2, 3, 5, 10]), m = r.int(1, 5), n = r.int(1, 4), op = r.int(0, 1);
  return op === 0
    ? { prompt: `Simplify: ${base}^${m} × ${base}^${n}`, correct: `${base}^${m + n}`, wrong: [`${base}^${m * n}`, `${base * base}^${m + n}`, `${base}^${Math.abs(m - n)}`, `${base}^${m + n + 1}`], explanation: `Same base, add exponents: ${m} + ${n} = ${m + n}.` }
    : { prompt: `Simplify: (${base}^${m})^${n}`, correct: `${base}^${m * n}`, wrong: [`${base}^${m + n}`, `${base * n}^${m}`, `${base}^${m * n + 1}`, `${base}^${m ** n}`], explanation: `Power of a power, multiply exponents: ${m} × ${n} = ${m * n}.` }; };
const proportion: Gen = r => { const a = r.int(2, 9), b = r.int(2, 12) * a, c = r.int(2, 15) * a, ans = b / a * c;
  return { prompt: `${a} notebooks cost $${b}. At the same rate, how much do ${c} notebooks cost?`, correct: `$${fmt(ans)}`, wrong: [`$${fmt(b * c)}`, `$${fmt(ans / 2)}`, `$${fmt(b + c)}`, `$${fmt(ans + b / a)}`], explanation: `$${b} ÷ ${a} = $${b / a} each; × ${c} = $${ans}.` }; };
const inequality: Gen = r => { const a = r.nz(-6, 6), x = r.int(-8, 8), b = r.int(-15, 15), c = a * x + b, rel = a > 0 ? '>' : '<';
  return { prompt: `Which describes all solutions of ${term(a, 'x')} ${signed(b)} > ${c}?`, correct: `x ${rel} ${x}`, wrong: [`x ${rel === '>' ? '<' : '>'} ${x}`, `x ${rel} ${-x}`, `x ${rel} ${x + 1}`, `x = ${x}`],
    explanation: `${term(a, 'x')} > ${c - b}. Divide by ${a}${a < 0 ? ' and flip the sign' : ''}: x ${rel} ${x}.` }; };
const angles: Gen = r => { const a = r.int(20, 90), b = r.int(20, 160 - a), c = 180 - a - b;
  return { prompt: `Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`, correct: `${c}°`, wrong: [`${360 - a - b}°`, `${c + 10}°`, `${a + b}°`, `${90 - Math.min(a, 89)}°`], explanation: `Angles add to 180°: 180 − ${a} − ${b} = ${c}°.` }; };
const drt: Gen = r => { const s = r.int(3, 15) * 5, t = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), d = s * t;
  return { prompt: `A car travels ${fmt(d)} miles in ${t} hours. What is its average speed in miles per hour?`, correct: fmt(s), wrong: [fmt(d * t), fmt(s + 5), fmt(d / (t + 1)), fmt(s - 5)], explanation: `Speed = ${fmt(d)} ÷ ${t} = ${s} mph.` }; };

// ---------- English (hand-checked banks) ----------
const VOCAB: [string, string][] = [
  ['abundant', 'existing in large amounts'], ['ambiguous', 'having more than one possible meaning'], ['benevolent', 'kind and generous'], ['candid', 'honest and direct'],
  ['concise', 'brief but complete'], ['diligent', 'hardworking and careful'], ['eloquent', 'fluent and persuasive in speech'], ['ephemeral', 'lasting a very short time'],
  ['frugal', 'careful not to waste money'], ['gregarious', 'enjoying the company of others'], ['hinder', 'to slow down or get in the way of'], ['impartial', 'not favoring one side'],
  ['meticulous', 'showing great attention to detail'], ['novel', 'new and original'], ['obsolete', 'no longer in use'], ['pragmatic', 'focused on practical results'],
  ['prudent', 'showing good judgment about the future'], ['resilient', 'able to recover quickly'], ['scrutinize', 'to examine closely'], ['skeptical', 'doubtful; not easily convinced'],
  ['tenacious', 'refusing to give up'], ['trivial', 'of little importance'], ['undermine', 'to weaken gradually'], ['verbose', 'using more words than needed'],
  ['vindicate', 'to prove someone right or blameless'], ['wary', 'cautious about possible danger'], ['zealous', 'very enthusiastic and devoted'], ['alleviate', 'to make less severe'],
  ['arbitrary', 'based on random choice, not reason'], ['bolster', 'to support or strengthen'], ['coherent', 'logical and consistent'], ['complacent', 'too satisfied to try to improve'],
  ['corroborate', 'to confirm with evidence'], ['deter', 'to discourage from acting'], ['discern', 'to notice or recognize'], ['disparate', 'very different from each other'],
  ['empirical', 'based on observation or experiment'], ['exacerbate', 'to make worse'], ['feasible', 'possible to do'], ['futile', 'having no useful result'],
  ['hypothesis', 'a proposed explanation to be tested'], ['inevitable', 'certain to happen'], ['innate', 'present from birth; natural'], ['lucid', 'clear and easy to understand'],
  ['mitigate', 'to reduce the harm of'], ['nuance', 'a subtle difference'], ['ostensibly', 'apparently, but perhaps not actually'], ['paradox', 'a statement that seems to contradict itself'],
  ['plausible', 'seeming reasonable or likely'], ['precedent', 'an earlier example used as a guide'], ['proliferate', 'to increase rapidly in number'], ['reluctant', 'unwilling or hesitant'],
  ['replicate', 'to copy or reproduce'], ['sporadic', 'happening at irregular intervals'], ['substantiate', 'to support with proof'], ['superfluous', 'more than is needed'],
  ['tentative', 'not certain or fixed'], ['ubiquitous', 'found everywhere'], ['viable', 'capable of working successfully'], ['volatile', 'likely to change suddenly'],
];
const vocab: Gen = r => { const [word, def] = r.pick(VOCAB); const others = r.shuffle(VOCAB.filter(v => v[0] !== word)).slice(0, 4);
  return r.next() < 0.5
    ? { prompt: `Which word best means "${def}"?`, correct: word, wrong: others.map(o => o[0]), explanation: `"${word}" means ${def}.` }
    : { prompt: `As used in a sentence, "${word}" most nearly means`, correct: def, wrong: others.map(o => o[1]), explanation: `"${word}" means ${def}.` }; };

const SVA: { s: string; sing: boolean }[] = [
  { s: 'Each of the players', sing: true }, { s: 'Neither the teacher nor the students', sing: false }, { s: 'The box of old photos', sing: true },
  { s: 'Everyone on both teams', sing: true }, { s: 'The members of the club', sing: false }, { s: 'Either the coach or the captain', sing: true },
  { s: 'The list of required books', sing: true }, { s: 'My brother and his friends', sing: false }, { s: 'One of the experiments', sing: true },
  { s: 'The results of the survey', sing: false }, { s: 'Nobody in the three classes', sing: true }, { s: 'The data from both trials', sing: false },
];
const VERBS: [string, string, string][] = [['is', 'are', 'ready for the game'], ['has', 'have', 'finished the assignment'], ['was', 'were', 'late to practice'], ['seems', 'seem', 'confident about the test']];
const sva: Gen = r => { const { s, sing } = r.pick(SVA), [v1, v2, rest] = r.pick(VERBS);
  // "The data" is treated as plural on the SAT.
  return { prompt: `Choose the correct verb: "${s} ___ ${rest}."`, correct: sing ? v1 : v2, wrong: [sing ? v2 : v1, sing ? `${v2} being` : `${v1} being`, 'be', 'been'],
    explanation: sing ? `The subject is singular, so use "${v1}".` : `The subject is plural (or the nearer subject is plural), so use "${v2}".` }; };

const TRANS: { a: string; b: string; t: 'contrast' | 'cause' | 'add' | 'example' }[] = [
  { a: 'The trail was steep and rocky.', b: 'the hikers reached the summit by noon.', t: 'contrast' },
  { a: 'The factory switched to solar power.', b: 'its electricity costs dropped sharply.', t: 'cause' },
  { a: 'Octopuses can change color in milliseconds.', b: 'they can change the texture of their skin.', t: 'add' },
  { a: 'Many birds use tools.', b: 'crows bend wire into hooks to reach food.', t: 'example' },
  { a: 'The novel received poor reviews.', b: 'it became a bestseller within months.', t: 'contrast' },
  { a: 'The river flooded the valley.', b: 'farmers had to replant their crops.', t: 'cause' },
  { a: 'The city expanded its bus routes.', b: 'it added bike lanes downtown.', t: 'add' },
  { a: 'Some plants survive with very little water.', b: 'cacti store water in thick stems.', t: 'example' },
  { a: 'The team practiced every day.', b: 'they won the championship.', t: 'cause' },
  { a: 'Solar panels are getting cheaper.', b: 'many homeowners still find them too expensive.', t: 'contrast' },
];
const WORDS = { contrast: ['However', 'Nevertheless', 'Still'], cause: ['As a result', 'Therefore', 'Consequently'], add: ['Furthermore', 'In addition', 'Moreover'], example: ['For example', 'For instance', 'Specifically'] };
const transition: Gen = r => { const { a, b, t } = r.pick(TRANS), right = r.pick(WORDS[t]);
  const wrongTypes = (Object.keys(WORDS) as (keyof typeof WORDS)[]).filter(k => k !== t);
  return { prompt: `${a} ___, ${b} Which transition fits best?`, correct: right, wrong: wrongTypes.map(k => r.pick(WORDS[k])), explanation: `The second sentence shows ${t === 'add' ? 'an addition' : t === 'cause' ? 'a result' : t === 'example' ? 'an example' : 'a contrast'}, so "${right}" fits.` }; };

export const G = { linear, slope, percentOf, percentChange, meanFind, median, pyth, area, funcEval, system2, quadRoots, exponent, proportion, inequality, angles, drt, vocab, sva, transition };

// ---------- Assemble ----------
const SETS: { title: string; subject: string; level: string; gens: Gen[] }[] = [
  { title: 'SAT Math Drill', subject: 'SAT', level: 'Standard', gens: [linear, slope, percentOf, system2, funcEval, quadRoots, inequality, pyth, median, proportion] },
  { title: 'SAT Reading & Writing Drill', subject: 'SAT', level: 'Standard', gens: [vocab, vocab, vocab, sva, sva, transition, transition, vocab, sva, transition] },
  { title: 'Algebra I Practice', subject: 'Algebra I', level: 'Standard', gens: [linear, linear, slope, inequality, proportion, percentOf, system2, exponent, linear, slope] },
  { title: 'Geometry Practice', subject: 'Geometry', level: 'Standard', gens: [pyth, area, angles, pyth, area, angles, area, pyth, angles, area] },
  { title: 'Algebra II Practice', subject: 'Algebra II', level: 'Honors', gens: [quadRoots, funcEval, exponent, system2, quadRoots, funcEval, exponent, inequality, quadRoots, funcEval] },
  { title: 'Statistics & Data Practice', subject: 'AP Statistics', level: 'AP', gens: [median, meanFind, percentChange, percentOf, median, meanFind, drt, percentChange, proportion, median] },
];

export function build(gen: Gen, r: Rng, id: string): Question {
  for (let tries = 0; tries < 50; tries++) {
    const g = gen(r);
    const wrong = [...new Set(g.wrong.filter(w => w !== g.correct))].slice(0, 3);
    if (wrong.length < 3) continue; // retry if distractors collided
    const choices = r.shuffle([g.correct, ...wrong]);
    return { id, prompt: g.prompt, code: g.code, choices, answer: choices.indexOf(g.correct), explanation: g.explanation };
  }
  throw new Error('could not build question ' + id);
}

export const TESTS_PER_SET = 19; // 6 sets × 19 tests × 10 questions = 1,140 questions
export const GENERATED_TESTS: (Test & { tier: Tier })[] = [];
SETS.forEach((set, si) => {
  for (let n = 0; n < TESTS_PER_SET; n++) {
    const r = new Rng(1000 * (si + 1) + n * 7919);
    const id = `gen-${si}-${n}`;
    // Per set: tests 1–2 Basic (free), 3–9 Premium, 10–19 Premium+.
    const tier: Tier = n < 2 ? 'free' : n < 9 ? 'plus' : 'pro';
    GENERATED_TESTS.push({ id, tier, title: `${set.title} #${n + 1}`, subject: set.subject, level: set.level, author: 'Lumino',
      questions: set.gens.map((g, qi) => build(g, r, `${id}-${qi}`)) });
  }
});
