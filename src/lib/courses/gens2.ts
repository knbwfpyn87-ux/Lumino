// More calculated generators for the rewritten math classes (gen: alg.orderOps …). Every answer is computed.
import type { Gen } from '../generated';

const neg = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const sgn = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);
const coef = (c: number, v: string) => (c === 1 ? v : c === -1 ? `−${v}` : `${c < 0 ? '−' + -c : c}${v}`);
const num = (n: number) => (n < 0 ? `−${-n}` : String(n));

const orderOps: Gen = r => { const a = r.int(2, 9), b = r.int(2, 6), c = r.int(2, 5), d = r.int(1, 9), form = r.int(0, 2);
  if (form === 0) { const v = a + b * c - d; return { prompt: `Evaluate: ${a} + ${b} × ${c} − ${d}`, correct: String(v), wrong: [String((a + b) * c - d), String(a + b * (c - d)), String(v + 2)], explanation: `Multiply first: ${b} × ${c} = ${b * c}. Then ${a} + ${b * c} − ${d} = ${v}.` }; }
  if (form === 1) { const v = (a + b) * c - d; return { prompt: `Evaluate: (${a} + ${b}) × ${c} − ${d}`, correct: String(v), wrong: [String(a + b * c - d), String((a + b) * (c - d)), String(v - c)], explanation: `Parentheses first: ${a + b}. Then × ${c} = ${(a + b) * c}, minus ${d} = ${v}.` }; }
  const v = a * a - b * c; return { prompt: `Evaluate: ${a}² − ${b} × ${c}`, correct: String(v), wrong: [String(a * 2 - b * c), String((a * a - b) * c), String(v + b)], explanation: `Exponent first: ${a}² = ${a * a}. Then ${b} × ${c} = ${b * c}. ${a * a} − ${b * c} = ${v}.` }; };

const evalExpr: Gen = r => { const x = r.nz(-6, 6), a = r.int(2, 5), b = r.int(1, 9), c = r.int(1, 9), v = a * x * x - b * x + c;
  return { prompt: `Evaluate ${a}x² − ${b}x + ${c} when x = ${num(x)}.`, correct: String(v), wrong: [String(a * x * x + b * x + c), String((a * x) ** 2 - b * x + c), String(-a * x * x - b * x + c)].map(String), explanation: `${a}·${neg(x)}² − ${b}·${neg(x)} + ${c} = ${a * x * x} ${sgn(-b * x)} + ${c} = ${v}.` }; };

const likeTerms: Gen = r => { const a = r.nz(-7, 9), b = r.nz(-7, 9), c = r.nz(-9, 9), d = r.nz(-9, 9), xs = a + b, k = c + d;
  const ans = (p: number, q: number) => `${p === 0 ? '' : coef(p, 'x')}${p === 0 ? num(q) : q === 0 ? '' : ` ${sgn(q)}`}`.trim() || '0';
  return { prompt: `Simplify: ${coef(a, 'x')} ${sgn(c)} ${b < 0 ? '−' : '+'} ${coef(Math.abs(b), 'x')} ${sgn(d)}`, correct: ans(xs, k), wrong: [ans(xs + k, 0), ans(a - b, k), ans(xs, c - d)], explanation: `x-terms: ${num(a)} + ${num(b)} = ${num(xs)}. Numbers: ${num(c)} + ${num(d)} = ${num(k)}. Answer: ${ans(xs, k)}.` }; };

const distribute: Gen = r => { const a = r.nz(-6, 7), b = r.int(2, 6), c = r.nz(-9, 9);
  const show = (p: number, q: number) => `${coef(p, 'x')} ${sgn(q)}`;
  return { prompt: `Expand: ${num(a)}(${b}x ${sgn(c)})`, correct: show(a * b, a * c), wrong: [show(a * b, c), show(a + b, a * c), show(a * b, -a * c)], explanation: `Multiply ${num(a)} by each term: ${num(a)}·${b}x = ${coef(a * b, 'x')} and ${num(a)}·${neg(c)} = ${num(a * c)}.` }; };

const factorTri: Gen = r => { let p = r.nz(-9, 9), q = r.nz(-9, 9); if (p === -q) q += 1; const b = p + q, c = p * q;
  const f = (m: number, n: number) => `(x ${sgn(m)})(x ${sgn(n)})`;
  return { prompt: `Factor: x² ${sgn(b)}x ${sgn(c)}`.replace(' + 1x', ' + x').replace(' − 1x', ' − x'), correct: f(p, q), wrong: [f(-p, -q), f(p, -q), f(b, 1) === f(p, q) ? f(c, 1) : f(b, 1)], explanation: `Find two numbers that multiply to ${num(c)} and add to ${num(b)}: ${num(p)} and ${num(q)}. So ${f(p, q)}.` }; };

const vertex: Gen = r => { const a = r.pick([1, 2, -1, 3, -2]), h = r.int(-6, 6), k = r.int(-9, 9), b = -2 * a * h, c = a * h * h + k;
  const ans = (x: number, y: number) => `(${num(x)}, ${num(y)})`;
  return { prompt: `What is the vertex of y = ${coef(a, 'x²')} ${sgn(b)}x ${sgn(c)}?`.replace(' + 0x', '').replace(' − 0x', ''), correct: ans(h, k), wrong: [ans(-h, k), ans(h, -k), ans(k, h)], explanation: `x = −b ÷ (2a) = ${num(-b)} ÷ ${2 * a} = ${num(h)}. Plug in: y = ${num(k)}. Vertex ${ans(h, k)}.` }; };

const expGrowth: Gen = r => { const P = r.pick([100, 200, 500, 1000, 50]), pct = r.pick([10, 20, 50, 100, 25]), t = r.int(2, 4), grow = r.next() < 0.6;
  const f = grow ? 1 + pct / 100 : 1 - Math.min(pct, 50) / 100, p = grow ? pct : Math.min(pct, 50), v = Math.round(P * f ** t * 100) / 100;
  return { prompt: `A population of ${P} ${grow ? 'grows' : 'shrinks'} by ${p}% each year. About how large is it after ${t} years?`, correct: String(v), wrong: [String(Math.round(P * (1 + (grow ? 1 : -1) * p / 100 * t))), String(Math.round(P * f ** (t + 1) * 100) / 100), String(Math.round(P * f * 100) / 100)], explanation: `Multiply by ${f} each year: ${P} × ${f}^${t} = ${v}.` }; };

const lineEq: Gen = r => { const m = r.nz(-5, 5), x1 = r.int(-6, 6), y1 = r.int(-9, 9), b = y1 - m * x1;
  const eq = (mm: number, bb: number) => `y = ${coef(mm, 'x')}${bb === 0 ? '' : ` ${sgn(bb)}`}`;
  return { prompt: `Which line has slope ${num(m)} and passes through (${num(x1)}, ${num(y1)})?`, correct: eq(m, b), wrong: [eq(m, y1), eq(m, y1 + m * x1), eq(-m, b)].filter(w => w !== eq(m, b)).concat(eq(m, b + 1)), explanation: `y = mx + b: ${num(y1)} = ${num(m)}·${neg(x1)} + b, so b = ${num(b)}. ${eq(m, b)}.` }; };

const absEq: Gen = r => { const a = r.int(1, 4), h = r.int(-8, 8), k = r.int(1, 12);
  const s1 = (k + a * h) / a, s2 = (-k + a * h) / a; if (!Number.isInteger(s1) || !Number.isInteger(s2)) return absEq(r);
  const ans = (p: number, q: number) => `x = ${num(Math.min(p, q))} or x = ${num(Math.max(p, q))}`;
  return { prompt: `Solve: |${coef(a, 'x')} ${sgn(-a * h)}| = ${k}`.replace(' + 0|', '|').replace(' − 0|', '|'), correct: ans(s1, s2), wrong: [ans(s1, -s1), `x = ${num(s1)} only`, ans(s1 + 1, s2 - 1)], explanation: `Split into two equations: ${coef(a, 'x')} ${sgn(-a * h)} = ${k} or = −${k}. So x = ${num(s1)} or x = ${num(s2)}.` }; };

const sciNote: Gen = r => { const m = r.int(11, 99) / 10, e = r.int(-6, 9), v = m * 10 ** e;
  const plain = (x: number) => x >= 1 ? Math.round(x).toLocaleString('en-US') : x.toFixed(Math.max(0, -e + 1)).replace(/0+$/, '');
  return r.next() < 0.5
    ? { prompt: `Write ${plain(v)} in scientific notation.`, correct: `${m} × 10^${e}`, wrong: [`${m} × 10^${e + 1}`, `${m} × 10^${-e}`, `${m} × 10^${e - 1}`], explanation: `Move the decimal so one nonzero digit is in front: ${m} × 10^${e}.` }
    : { prompt: `What is (${m} × 10^${e}) × (2 × 10^3) in scientific notation?`, correct: m * 2 >= 10 ? `${Math.round(m * 2) / 10} × 10^${e + 4}` : `${Math.round(m * 20) / 10} × 10^${e + 3}`, wrong: [`${Math.round(m * 20) / 10} × 10^${e * 3}`, `${m + 2} × 10^${e + 3}`, `${Math.round(m * 20) / 10} × 10^${e + 2}`], explanation: `Multiply the numbers (${m} × 2 = ${Math.round(m * 20) / 10}) and add the exponents (${e} + 3 = ${e + 3}), then adjust if needed.` }; };

export const ALG = { orderOps, evalExpr, likeTerms, distribute, factorTri, vertex, expGrowth, lineEq, absEq, sciNote };
