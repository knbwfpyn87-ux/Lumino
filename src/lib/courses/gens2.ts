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

// ---------------- Algebra II ----------------
const cx = (a: number, b: number) => b === 0 ? num(a) : a === 0 ? `${b === 1 ? '' : b === -1 ? '−' : num(b)}i` : `${num(a)} ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}i`;
const complex: Gen = r => { const a = r.nz(-6, 6), b = r.nz(-6, 6), c = r.nz(-6, 6), d = r.nz(-6, 6);
  if (r.next() < 0.4) return { prompt: `Simplify (${cx(a, b)}) + (${cx(c, d)})`, correct: cx(a + c, b + d), wrong: [cx(a + c, b - d), cx(a * c, b * d), cx(a - c, b + d)], explanation: `Add real parts (${num(a)} + ${num(c)} = ${num(a + c)}) and imaginary parts (${num(b)} + ${num(d)} = ${num(b + d)}).` };
  return { prompt: `Simplify (${cx(a, b)})(${cx(c, d)})`, correct: cx(a * c - b * d, a * d + b * c), wrong: [cx(a * c + b * d, a * d + b * c), cx(a * c, b * d), cx(a * c - b * d, a * d - b * c)], explanation: `FOIL, then use i² = −1: ${num(a * c)} + ${num(a * d + b * c)}i ${sgn(-b * d)} → ${cx(a * c - b * d, a * d + b * c)}.` }; };
const remainder: Gen = r => { const a = r.nz(-3, 3), p = [r.int(1, 3), r.int(-5, 5), r.int(-6, 6), r.int(-9, 9)], v = ((p[0] * a + p[1]) * a + p[2]) * a + p[3];
  const poly = `${coef(p[0], 'x³')} ${sgn(p[1])}x² ${sgn(p[2])}x ${sgn(p[3])}`.replace(/ [+−] 0x²| [+−] 0x(?!²)/g, '').replace(/([+−]) 1x/g, '$1 x');
  return { prompt: `What is the remainder when ${poly} is divided by (x ${sgn(-a)})?`, correct: num(v), wrong: [num(((p[0] * -a + p[1]) * -a + p[2]) * -a + p[3]), num(v + p[3]), num(p[3])].filter(w => w !== num(v)).concat(num(v - 1)), explanation: `Remainder Theorem: the remainder is p(${num(a)}) = ${num(v)}.` }; };
const ratExp: Gen = r => { const [base, root] = r.pick([[8, 3], [27, 3], [16, 4], [32, 5], [64, 3], [81, 4], [25, 2], [36, 2], [125, 3], [64, 2]]), n = r.pick([1, 2, 3].filter(k => k % root !== 0)), rt = Math.round(base ** (1 / root)), v = rt ** n;
  return { prompt: `Evaluate ${base}^(${n}/${root})`, correct: String(v), wrong: [String(Math.round(base * n / root)), String(rt), String(v * rt)].filter(w => w !== String(v)).concat(String(v + 1)), explanation: `${base}^(${n}/${root}) = (${root === 2 ? '√' : root + 'th root of '}${base})^${n} = ${rt}^${n} = ${v}.` }; };
const inverseLin: Gen = r => { const a = r.nz(-6, 6), b = r.nz(-9, 9);
  const show = (m: string, c: number) => `f⁻¹(x) = ${m}${c === 0 ? '' : ` ${sgn(c)}`}`;
  return { prompt: `Find the inverse of f(x) = ${coef(a, 'x')} ${sgn(b)}`, correct: `f⁻¹(x) = (x ${sgn(-b)}) / ${num(a)}`, wrong: [`f⁻¹(x) = (x ${sgn(b)}) / ${num(a)}`, show(`${num(a)}x`, -b), `f⁻¹(x) = 1 / (${coef(a, 'x')} ${sgn(b)})`], explanation: `Swap x and y: x = ${num(a)}y ${sgn(b)}. Solve for y: y = (x ${sgn(-b)}) / ${num(a)}.` }; };
const asymptote: Gen = r => { const a = r.nz(-6, 6), h = r.nz(-6, 6), k = r.int(1, 5), deg = r.int(0, 2);
  if (deg === 0) return { prompt: `What is the vertical asymptote of f(x) = ${k} / (x ${sgn(-h)})?`, correct: `x = ${num(h)}`, wrong: [`x = ${num(-h)}`, `y = ${num(h)}`, `x = ${k}`], explanation: `The denominator is zero at x = ${num(h)}, so that's a vertical asymptote.` };
  if (deg === 1) return { prompt: `What is the horizontal asymptote of f(x) = (${coef(a, 'x')} + ${k}) / (x ${sgn(-h)})?`, correct: `y = ${num(a)}`, wrong: [`y = 0`, `x = ${num(h)}`, `y = ${k}`].filter(w => w !== `y = ${num(a)}`).concat(`y = ${num(-a)}`), explanation: `Degrees are equal, so the horizontal asymptote is the ratio of leading coefficients: y = ${num(a)}.` };
  return { prompt: `What is the horizontal asymptote of f(x) = ${k} / (x² + ${Math.abs(h)})?`, correct: 'y = 0', wrong: [`y = ${k}`, `x = ${Math.abs(h)}`, 'none'], explanation: `The denominator's degree is bigger, so the horizontal asymptote is y = 0.` }; };
const expSolve: Gen = r => { const b = r.pick([2, 3, 5, 4]), x = r.int(2, b === 2 ? 7 : 4), v = b ** x, m = r.int(1, 3);
  return r.next() < 0.5
    ? { prompt: `Solve ${b}^x = ${v}`, correct: `x = ${x}`, wrong: [`x = ${v / b}`, `x = ${x + 1}`, `x = ${x - 1}`], explanation: `${v} = ${b}^${x}, so x = ${x}.` }
    : { prompt: `Solve log base ${b} of (x) = ${x}`, correct: `x = ${v}`, wrong: [`x = ${b * x}`, `x = ${x ** b}`, `x = ${v / b}`], explanation: `Rewrite in exponential form: x = ${b}^${x} = ${v}.` }; };

// ---------------- Chemistry ----------------
const halfLife: Gen = r => { const m = r.pick([80, 160, 200, 320, 400, 64, 96]), hl = r.pick([2, 5, 8, 10, 12, 30]), n = r.int(1, 4), left = m / 2 ** n;
  return { prompt: `A ${m} g sample has a half-life of ${hl} days. How much is left after ${hl * n} days?`, correct: `${r2(left)} g`, wrong: [`${r2(m / (2 * n))} g`, `${r2(m - m / 2 ** n)} g`, `${r2(m / 2 ** (n + 1))} g`], explanation: `${hl * n} days is ${n} half-lives: ${m} × (1/2)^${n} = ${r2(left)} g.` }; };
const idealGas: Gen = r => { const n = r.pick([0.5, 1, 2, 3, 4]), T = r.pick([273, 300, 350, 400]), V = r.pick([10, 20, 22.4, 40, 50]), R = 0.0821, P = n * R * T / V;
  return { prompt: `What is the pressure of ${n} mol of gas at ${T} K in a ${V} L container? (R = 0.0821 L·atm/mol·K)`, correct: `${r2(P)} atm`, wrong: [`${r2(P / 2)} atm`, `${r2(n * T / V)} atm`, `${r2(P * 2)} atm`], explanation: `P = nRT ÷ V = ${n} × 0.0821 × ${T} ÷ ${V} = ${r2(P)} atm.` }; };
const EQS: [string, number[]][] = [['_H₂ + _O₂ → _H₂O', [2, 1, 2]], ['_N₂ + _H₂ → _NH₃', [1, 3, 2]], ['_CH₄ + _O₂ → _CO₂ + _H₂O', [1, 2, 1, 2]], ['_Na + _Cl₂ → _NaCl', [2, 1, 2]], ['_Al + _O₂ → _Al₂O₃', [4, 3, 2]],
  ['_Fe + _O₂ → _Fe₂O₃', [4, 3, 2]], ['_C₃H₈ + _O₂ → _CO₂ + _H₂O', [1, 5, 3, 4]], ['_KClO₃ → _KCl + _O₂', [2, 2, 3]], ['_Mg + _HCl → _MgCl₂ + _H₂', [1, 2, 1, 1]], ['_Zn + _HCl → _ZnCl₂ + _H₂', [1, 2, 1, 1]], ['_H₂O₂ → _H₂O + _O₂', [2, 2, 1]], ['_C₂H₆ + _O₂ → _CO₂ + _H₂O', [2, 7, 4, 6]]];
const balance: Gen = r => { const [eq, cs] = r.pick(EQS); const show = (c: number[]) => { let i = 0; return eq.replace(/_/g, () => { const v = c[i++]; return v === 1 ? '' : String(v); }); };
  const bad = (k: number) => cs.map((c, i) => (i === k ? c + 1 : c));
  return { prompt: `Which equation is correctly balanced?`, correct: show(cs), wrong: [show(bad(0)), show(bad(cs.length - 1)), show(cs.map(() => 1))].filter(w => w !== show(cs)).concat(show(bad(1))), explanation: `Count atoms of each element on both sides: ${show(cs)} has the same number of each kind of atom on each side.` }; };
const specificHeat: Gen = r => { const m = r.pick([50, 100, 200, 250, 500]), dT = r.int(5, 40), c = 4.18, q = m * c * dT;
  return { prompt: `How much heat is needed to warm ${m} g of water by ${dT}°C? (c = 4.18 J/g·°C)`, correct: `${r2(q)} J`, wrong: [`${r2(m * dT)} J`, `${r2(q / 1000)} J`, `${r2(m * c)} J`], explanation: `q = mcΔT = ${m} × 4.18 × ${dT} = ${r2(q)} J.` }; };

// ---------------- Calculus ----------------
const productRule: Gen = r => { const a = r.int(1, 5), n = r.int(2, 4), b = r.nz(-6, 6), x = r.int(1, 3);
  // f(x) = a x^n (x + b); f'(x) = a n x^(n-1)(x+b) + a x^n
  const v = a * n * x ** (n - 1) * (x + b) + a * x ** n;
  return { prompt: `If f(x) = ${a === 1 ? '' : a}x^${n}(x ${sgn(b)}), what is f′(${x})?`, correct: num(v), wrong: [num(a * n * x ** (n - 1)), num(a * n * x ** (n - 1) * (x + b)), num(v + a)], explanation: `Product rule: f′ = (${a * n}x^${n - 1})(x ${sgn(b)}) + (${a}x^${n})(1). At x = ${x}: ${a * n * x ** (n - 1) * (x + b)} + ${a * x ** n} = ${v}.` }; };
const tangentLine: Gen = r => { const a = r.nz(-3, 3), b = r.int(-5, 5), c = r.int(-6, 6), x0 = r.int(-3, 3), y0 = a * x0 * x0 + b * x0 + c, m = 2 * a * x0 + b, k = y0 - m * x0;
  const eq = (mm: number, kk: number) => `y = ${coef(mm, 'x') === '' ? '0' : mm === 0 ? '' : coef(mm, 'x')}${mm === 0 ? num(kk) : kk === 0 ? '' : ` ${sgn(kk)}`}`;
  return { prompt: `What is the tangent line to f(x) = ${coef(a, 'x²')} ${sgn(b)}x ${sgn(c)} at x = ${num(x0)}?`.replace(' + 0x', '').replace(' − 0x', ''), correct: eq(m, k), wrong: [eq(m, y0), eq(a * x0, k), eq(m + 1, k - x0)].filter(w => w !== eq(m, k)).concat(eq(-m, k)), explanation: `f(${num(x0)}) = ${num(y0)} and f′(x) = ${coef(2 * a, 'x')} ${sgn(b)}, so the slope is ${num(m)}. y − ${neg(y0)} = ${num(m)}(x − ${neg(x0)}) → ${eq(m, k)}.` }; };
const critical: Gen = r => { const p = r.int(-5, 3), q = p + r.int(1, 5), a = 1; // f'(x) = 3(x-p)(x-q) for f = x^3 - 1.5(p+q)x^2 + 3pq x
  const B = -1.5 * (p + q), C = 3 * p * q;
  if (!Number.isInteger(B)) return critical(r);
  return { prompt: `Where does f(x) = x³ ${sgn(B)}x² ${sgn(C)}x have a local maximum?`.replace(' + 0x²', '').replace(' + 0x', '').replace(' − 0x', ''), correct: `x = ${num(p)}`, wrong: [`x = ${num(q)}`, `x = ${num((p + q) / 2)}`, `x = ${num(-p)}`].filter(w => w !== `x = ${num(p)}`).concat(`x = ${num(p - 1)}`), explanation: `f′(x) = 3x² ${sgn(2 * B)}x ${sgn(C)} = 3(x ${sgn(-p)})(x ${sgn(-q)}). f′ changes from + to − at x = ${num(p)}, so that's a local max (x = ${num(q)} is a local min).` }; };
const riemann: Gen = r => { const n = r.pick([2, 4]), b = r.pick([2, 4]), dx = b / n, xs = Array.from({ length: n }, (_, i) => i * dx), left = xs.reduce((s, x) => s + x * x * dx, 0), right = xs.reduce((s, x) => s + (x + dx) ** 2 * dx, 0), useLeft = r.next() < 0.5;
  return { prompt: `Estimate ∫ from 0 to ${b} of x² dx with a ${useLeft ? 'left' : 'right'} Riemann sum using ${n} equal subintervals.`, correct: r2(useLeft ? left : right), wrong: [r2(useLeft ? right : left), r2(b ** 3 / 3), r2((left + right) / 2 + 1)], explanation: `Width ${dx}. ${useLeft ? 'Left' : 'Right'} endpoints: ${xs.map(x => r2(useLeft ? x : x + dx)).join(', ')}. Sum of f × width = ${r2(useLeft ? left : right)}. (The exact value is ${r2(b ** 3 / 3)}.)` }; };
const avgValue: Gen = r => { const a = r.int(1, 4), b = a + r.pick([2, 3, 4]), k = r.int(1, 3); // f(x) = k x on [a, b] -> avg = k(a+b)/2 ; or x^2
  if (r.next() < 0.5) { const v = k * (a + b) / 2; return { prompt: `What is the average value of f(x) = ${k === 1 ? '' : k}x on [${a}, ${b}]?`, correct: r2(v), wrong: [r2(k * (b * b - a * a) / 2), r2(k * b), r2(v + k)], explanation: `Average = (1/(b − a)) ∫ f dx = (1/${b - a}) × ${r2(k * (b * b - a * a) / 2)} = ${r2(v)}.` }; }
  const I = (b ** 3 - a ** 3) / 3, v = I / (b - a); return { prompt: `What is the average value of f(x) = x² on [${a}, ${b}]?`, correct: r2(v), wrong: [r2(I), r2((a * a + b * b) / 2), r2(b * b - a * a)], explanation: `∫ x² dx from ${a} to ${b} = ${r2(I)}. Divide by ${b - a}: ${r2(v)}.` }; };
const expModel: Gen = r => { const y0 = r.pick([100, 200, 500, 50]), k = r.pick([0.1, 0.2, -0.1, 0.05, -0.2]), t = r.pick([5, 10]), v = Math.round(y0 * Math.exp(k * t) * 100) / 100;
  return { prompt: `dy/dt = ${k}y and y(0) = ${y0}. What is y(${t})? (Round to 2 decimals.)`, correct: String(v), wrong: [String(Math.round(y0 * (1 + k * t) * 100) / 100), String(Math.round(y0 * Math.exp(k) * 100) / 100), String(Math.round(y0 * Math.exp(-k * t) * 100) / 100)], explanation: `The solution of dy/dt = ky is y = y₀e^(kt) = ${y0}e^(${r2(k * t)}) ≈ ${v}.` }; };

export const CALC = { productRule, tangentLine, critical, riemann, avgValue, expModel };

export const CHEM2 = { halfLife, idealGas, balance, specificHeat };

export const ALG2 = { complex, remainder, ratExp, inverseLin, asymptote, expSolve };

export const GEO = { midpoint, distance, polygonAngles, specialRight, trigRatio, similar, arcSector, volume, circleEq };

export const ALG = { orderOps, evalExpr, likeTerms, distribute, factorTri, vertex, expGrowth, lineEq, absEq, sciNote };
