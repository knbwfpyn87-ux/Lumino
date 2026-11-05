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

// ---------------- Geometry ----------------
const r2 = (n: number) => String(Math.round(n * 100) / 100);
const pt = (x: number, y: number) => `(${num(x)}, ${num(y)})`;
const midpoint: Gen = r => { const x1 = r.int(-9, 9), y1 = r.int(-9, 9), x2 = x1 + 2 * r.int(-5, 5), y2 = y1 + 2 * r.nz(-5, 5), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return { prompt: `What is the midpoint of ${pt(x1, y1)} and ${pt(x2, y2)}?`, correct: pt(mx, my), wrong: [pt(x2 - x1, y2 - y1), pt(mx, -my), pt(my, mx)], explanation: `Average the coordinates: ((${num(x1)} + ${num(x2)}) ÷ 2, (${num(y1)} + ${num(y2)}) ÷ 2) = ${pt(mx, my)}.` }; };
const distance: Gen = r => { const [a, b, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]), x1 = r.int(-6, 6), y1 = r.int(-6, 6), sx = r.pick([1, -1]), sy = r.pick([1, -1]);
  return { prompt: `What is the distance between ${pt(x1, y1)} and ${pt(x1 + sx * a, y1 + sy * b)}?`, correct: String(c), wrong: [String(a + b), String(c + 1), String(a * b / 2)], explanation: `d = √(${a}² + ${b}²) = √${a * a + b * b} = ${c}.` }; };
const polygonAngles: Gen = r => { const n = r.int(5, 12), names: Record<number, string> = { 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 11: '11-gon', 12: 'dodecagon' }, sum = (n - 2) * 180;
  if (r.next() < 0.5) return { prompt: `What is the sum of the interior angles of a ${names[n]}?`, correct: `${sum}°`, wrong: [`${n * 180}°`, `${(n - 1) * 180}°`, `${360}°`], explanation: `Sum = (n − 2) × 180° = (${n} − 2) × 180° = ${sum}°.` };
  const each = Math.round(sum / n * 100) / 100; return { prompt: `What is the measure of each interior angle of a regular ${names[n]}?`, correct: `${each}°`, wrong: [`${Math.round(360 / n * 100) / 100}°`, `${sum}°`, `${Math.round((n * 180) / n)}°`], explanation: `(${n} − 2) × 180° = ${sum}°, divided by ${n} angles = ${each}°.` }; };
const specialRight: Gen = r => { const k = r.int(2, 12);
  if (r.next() < 0.5) return { prompt: `A 45-45-90 triangle has legs of length ${k}. How long is the hypotenuse?`, correct: `${k}√2`, wrong: [`${k}√3`, `${2 * k}`, `${k * k}`], explanation: `In a 45-45-90 triangle, hypotenuse = leg × √2 = ${k}√2.` };
  return { prompt: `In a 30-60-90 triangle the short leg is ${k}. How long is the long leg?`, correct: `${k}√3`, wrong: [`${k}√2`, `${2 * k}`, `${k * 3}`], explanation: `Sides are in the ratio 1 : √3 : 2, so the long leg is ${k}√3 (and the hypotenuse is ${2 * k}).` }; };
const trigRatio: Gen = r => { const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), f = r.pick(['sin', 'cos', 'tan'] as const);
  const v = { sin: `${a}/${c}`, cos: `${b}/${c}`, tan: `${a}/${b}` }; const w = { sin: [`${b}/${c}`, `${c}/${a}`, `${a}/${b}`], cos: [`${a}/${c}`, `${c}/${b}`, `${b}/${a}`], tan: [`${b}/${a}`, `${a}/${c}`, `${c}/${b}`] };
  return { prompt: `In right triangle ABC, the side opposite angle A is ${a}, the side adjacent to A is ${b}, and the hypotenuse is ${c}. What is ${f} A?`, correct: v[f], wrong: w[f], explanation: `SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent. ${f} A = ${v[f]}.` }; };
const similar: Gen = r => { const k = r.pick([2, 3, 4, 1.5, 2.5]), a = r.int(3, 10), b = r.int(3, 12);
  return { prompt: `Two triangles are similar with scale factor ${k}. A side of ${a} in the small triangle matches which length in the large one, and if the small one has area ${b}, what is the large one's area?`, correct: `${r2(a * k)}; ${r2(b * k * k)}`, wrong: [`${r2(a * k)}; ${r2(b * k)}`, `${r2(a + k)}; ${r2(b * k * k)}`, `${r2(a * k * k)}; ${r2(b * k)}`], explanation: `Lengths multiply by ${k}; areas multiply by ${k}² = ${k * k}.` }; };
const arcSector: Gen = r => { const rad = r.int(2, 12), deg = r.pick([30, 45, 60, 90, 120, 135, 150, 180, 240, 270]), frac = deg / 360;
  if (r.next() < 0.5) return { prompt: `A circle has radius ${rad}. What is the length of an arc with a central angle of ${deg}°? (Leave your answer in terms of π.)`, correct: `${r2(2 * rad * frac)}π`, wrong: [`${r2(rad * rad * frac)}π`, `${r2(rad * frac)}π`, `${r2(2 * rad * frac * 2)}π`], explanation: `Arc length = (${deg}/360) × 2π(${rad}) = ${r2(2 * rad * frac)}π.` };
  return { prompt: `A circle has radius ${rad}. What is the area of a sector with a central angle of ${deg}°? (In terms of π.)`, correct: `${r2(rad * rad * frac)}π`, wrong: [`${r2(2 * rad * frac)}π`, `${r2(rad * rad)}π`, `${r2(rad * frac)}π`], explanation: `Sector area = (${deg}/360) × π(${rad})² = ${r2(rad * rad * frac)}π.` }; };
const volume: Gen = r => { const rad = r.int(1, 9), h = r.int(2, 12), kind = r.int(0, 3);
  if (kind === 0) return { prompt: `What is the volume of a cylinder with radius ${rad} and height ${h}? (In terms of π.)`, correct: `${rad * rad * h}π`, wrong: [`${r2(rad * rad * h / 3)}π`, `${2 * rad * h}π`, `${rad * h}π`], explanation: `V = πr²h = π(${rad})²(${h}) = ${rad * rad * h}π.` };
  if (kind === 1) return { prompt: `What is the volume of a cone with radius ${rad} and height ${h}? (In terms of π.)`, correct: `${r2(rad * rad * h / 3)}π`, wrong: [`${rad * rad * h}π`, `${r2(rad * h / 3)}π`, `${r2(rad * rad * h / 2)}π`], explanation: `V = ⅓πr²h = ⅓π(${rad})²(${h}) = ${r2(rad * rad * h / 3)}π.` };
  if (kind === 2) return { prompt: `What is the volume of a sphere with radius ${rad}? (In terms of π.)`, correct: `${r2(4 * rad ** 3 / 3)}π`, wrong: [`${4 * rad * rad}π`, `${r2(rad ** 3)}π`, `${r2(4 * rad ** 2 / 3)}π`], explanation: `V = (4/3)πr³ = (4/3)π(${rad})³ = ${r2(4 * rad ** 3 / 3)}π.` };
  const l = r.int(2, 10), w = r.int(2, 10); return { prompt: `What is the volume of a rectangular prism ${l} by ${w} by ${h}?`, correct: String(l * w * h), wrong: [String(2 * (l * w + l * h + w * h)), String(l + w + h), String(r2(l * w * h / 3))], explanation: `V = lwh = ${l} × ${w} × ${h} = ${l * w * h}.` }; };
const circleEq: Gen = r => { const h = r.int(-8, 8), k = r.int(-8, 8), rad = r.int(1, 9);
  const xp = h === 0 ? 'x²' : `(x ${sgn(-h)})²`, yp = k === 0 ? 'y²' : `(y ${sgn(-k)})²`;
  return { prompt: `What are the center and radius of ${xp} + ${yp} = ${rad * rad}?`, correct: `center ${pt(h, k)}, radius ${rad}`, wrong: [`center ${pt(-h, -k)}, radius ${rad}`, `center ${pt(h, k)}, radius ${rad * rad}`, `center ${pt(k, h)}, radius ${rad}`].filter(w => w !== `center ${pt(h, k)}, radius ${rad}`).concat(`center ${pt(-h, k)}, radius ${rad * rad}`), explanation: `(x − h)² + (y − k)² = r² has center (h, k) and radius r = √${rad * rad} = ${rad}.` }; };

export const GEO = { midpoint, distance, polygonAngles, specialRight, trigRatio, similar, arcSector, volume, circleEq };

export const ALG = { orderOps, evalExpr, likeTerms, distribute, factorTri, vertex, expGrowth, lineEq, absEq, sciNote };
