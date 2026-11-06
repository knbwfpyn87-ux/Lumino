// Virtual labs (science) and real-world demos (math): sliders feed formulas, results show live, and a graph shows the pattern.
// Shared by the website and the iPhone app. Formulas use a tiny safe calculator, never eval.
//
//   lab: Pendulum timing                 (or  demo: Phone plan costs)
//   aim: What you're finding out.
//   set: L = 1 | Length (m) | 0.1 to 2 by 0.1        a slider: name = start | label | min to max by step
//   out: T = 2*pi*sqrt(L/g) | Period (s)              a result: name = formula | label   (can use earlier results;
//                                                     names starting with _ are hidden helper steps)
//   plot: L, T                                        graph T against slider L
//   step: Press Record for 4 different lengths.       procedure (labs)
//   noise: 2                                          labs only: ±% measurement error on recorded data
//   sim: pendulum | L=L, a=amp                        optional live physics animation (scenes in src/lib/physics.ts);
//                                                     each key=slider feeds a slider's value (or a fixed number) into the scene
//   result: What the data shows (revealed after 3 trials, or on request in a demo).

export type LabSet = { name: string; label: string; min: number; max: number; step: number; start: number };
export type LabOut = { name: string; label: string; expr: string };
export type LabBlock = { t: 'lab'; kind: 'lab' | 'demo'; title: string; aim: string; sets: LabSet[]; outs: LabOut[]; plot?: { x: string; y: string }; steps: string[]; noise: number; result: string; sim?: { scene: string; map: Record<string, string> } };

/** Scene names in src/lib/physics.ts (kept here so this file stays dependency-free). */
export const SCENE_NAMES = ['drop', 'projectile', 'pendulum', 'spring', 'collision'];

export const LAB_CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E, g: 9.8, R: 8.314, k: 8.99e9, c: 3e8, h: 6.626e-34, NA: 6.022e23 };

function fact(n: number) { n = Math.round(n); if (n < 0) return NaN; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
function erf(x: number) { // Abramowitz–Stegun 7.1.26
  const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x);
  return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x));
}
const D = Math.PI / 180;
export const FUNCS: Record<string, (...a: number[]) => number> = {
  sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log10, log2: Math.log2,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sind: x => Math.sin(x * D), cosd: x => Math.cos(x * D), tand: x => Math.tan(x * D), asind: x => Math.asin(x) / D, acosd: x => Math.acos(x) / D, atand: x => Math.atan(x) / D,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  min: Math.min, max: Math.max, round: Math.round, floor: Math.floor, ceil: Math.ceil, sign: Math.sign,
  fact, choose: (n, k) => fact(n) / (fact(k) * fact(n - k)), normcdf: z => 0.5 * (1 + erf(z / Math.SQRT2)), normpdf: z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI),
  if: (c, a, b) => (c > 0 ? a : b),
  mean: (...a) => a.reduce((s, x) => s + x, 0) / a.length, total: (...a) => a.reduce((s, x) => s + x, 0), length: (...a) => a.length,
  median: (...a) => { const b = [...a].sort((m, n) => m - n), k = b.length >> 1; return b.length % 2 ? b[k] : (b[k - 1] + b[k]) / 2; },
  stdev: (...a) => { const m = a.reduce((s, x) => s + x, 0) / a.length; return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); },
  stdevp: (...a) => { const m = a.reduce((s, x) => s + x, 0) / a.length; return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length); }, mod: (a, b) => ((a % b) + b) % b,
};

type Fn = (v: Record<string, number>) => number;
/** Compiles "2*pi*sqrt(L/g)" into a function. Supports + - * / ^, parentheses, unary minus, < > (give 1 or 0), constants and FUNCS. */
export function compile(src: string, extra: Record<string, (...a: number[]) => number> = {}): { fn: Fn; vars: string[] } {
  const toks = src.match(/\d+\.?\d*(?:e[+-]?\d+)?|\.\d+|[A-Za-z_]\w*|[-+*/^(),<>]/g) ?? [];
  if (toks.join('') !== src.replace(/\s+/g, '')) throw new Error(`can't read formula "${src}"`);
  let i = 0; const vars = new Set<string>();
  const peek = () => toks[i]; const take = (t?: string) => { const x = toks[i++]; if (t && x !== t) throw new Error(`expected "${t}" in "${src}"`); return x; };
  const cmp = (): Fn => { const a = sum(); const op = peek(); if (op === '<' || op === '>') { take(); const b = sum(); return op === '<' ? v => +(a(v) < b(v)) : v => +(a(v) > b(v)); } return a; };
  const sum = (): Fn => { let a = prod(); while (peek() === '+' || peek() === '-') { const op = take(); const l = a, r = prod(); a = op === '+' ? v => l(v) + r(v) : v => l(v) - r(v); } return a; };
  const prod = (): Fn => { let a = unary(); while (peek() === '*' || peek() === '/') { const op = take(); const l = a, r = unary(); a = op === '*' ? v => l(v) * r(v) : v => l(v) / r(v); } return a; };
  const unary = (): Fn => { if (peek() === '-') { take(); const a = unary(); return v => -a(v); } if (peek() === '+') { take(); return unary(); } return pow(); };
  const pow = (): Fn => { const b = atom(); if (peek() === '^') { take(); const ex = unary(); return v => Math.pow(b(v), ex(v)); } return b; };
  const atom = (): Fn => {
    const t = take(); if (t == null) throw new Error(`formula ends early: "${src}"`);
    if (t === '(') { const a = cmp(); take(')'); return a; }
    if (/^[\d.]/.test(t)) { const n = Number(t); return () => n; }
    if (/^[A-Za-z_]/.test(t)) {
      if (peek() === '(') {
        const f = extra[t] ?? FUNCS[t]; if (!f) throw new Error(`unknown function "${t}" in "${src}"`); take('(');
        const args: Fn[] = []; if (peek() !== ')') { args.push(cmp()); while (peek() === ',') { take(); args.push(cmp()); } } take(')');
        return v => f(...args.map(a => a(v)));
      }
      vars.add(t); return v => (t in v ? v[t] : LAB_CONSTANTS[t]);
    }
    throw new Error(`unexpected "${t}" in "${src}"`);
  };
  const fn = cmp(); if (i < toks.length) throw new Error(`unexpected "${toks[i]}" in "${src}"`);
  return { fn, vars: [...vars] };
}

export type LabModel = { run: (vals: Record<string, number>) => Record<string, number> };
export function labModel(b: LabBlock): LabModel {
  const outs = b.outs.map(o => ({ name: o.name, fn: compile(o.expr).fn }));
  return { run: vals => { const v: Record<string, number> = { ...vals }; for (const o of outs) v[o.name] = o.fn(v); return v; } };
}
export const startValues = (b: LabBlock) => Object.fromEntries(b.sets.map(s => [s.name, s.start]));
export const snap = (s: LabSet, x: number) => { const n = Math.round((Math.min(s.max, Math.max(s.min, x)) - s.min) / s.step); return +(s.min + n * s.step).toFixed(10); };

/** The curve for the graph: y against the plotted slider, with the other sliders where they are now. */
export function curve(b: LabBlock, m: LabModel, vals: Record<string, number>, n = 60) {
  if (!b.plot) return [];
  const s = b.sets.find(x => x.name === b.plot!.x)!; const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) { const x = s.min + (s.max - s.min) * i / n; const y = m.run({ ...vals, [s.name]: x })[b.plot.y]; if (Number.isFinite(y)) pts.push([x, y]); }
  return pts;
}
export function bounds(pts: [number, number][]) {
  let lo = Math.min(...pts.map(p => p[1])), hi = Math.max(...pts.map(p => p[1]));
  if (lo > 0 && lo < hi * 0.35) lo = 0; if (hi < 0 && hi > lo * 0.35) hi = 0;
  if (hi - lo < 1e-9) { lo -= 1; hi += 1; } const pad = (hi - lo) * 0.06;
  return { x0: Math.min(...pts.map(p => p[0])), x1: Math.max(...pts.map(p => p[0])), y0: lo === 0 ? 0 : lo - pad, y1: hi + pad };
}
/** Round-number axis ticks between a and b (like 0, 10, 20…). */
export function niceTicks(a: number, b: number, n = 5): number[] {
  const span = b - a; if (!(span > 0)) return [a];
  const raw = span / (n - 1); const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  const out: number[] = []; for (let x = Math.ceil(a / step - 1e-9) * step; x <= b + step * 1e-9; x += step) out.push(+x.toPrecision(12));
  return out;
}
/** Adds ±noise% random error, like a real measurement. */
export const measure = (y: number, noise: number) => (noise ? y * (1 + (Math.random() * 2 - 1) * noise / 100) : y);

export function fmt(x: number): string {
  if (!Number.isFinite(x)) return '—';
  const a = Math.abs(x); if (a === 0) return '0';
  if (a >= 1e6 || a < 1e-3) return x.toExponential(2).replace(/e\+?(-?)(\d+)/, (_, s, d) => ` × 10${toSup(s + d)}`);
  if (a >= 1000) return Math.round(x).toLocaleString('en-US');
  return String(+x.toPrecision(3));
}
const SUP: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const toSup = (s: string) => [...s].map(ch => SUP[ch] ?? ch).join('');

/** Problems with a lab (the build fails on these). */
export function lintLab(b: LabBlock): string[] {
  const out: string[] = []; const L = `${b.kind} "${b.title}"`;
  if (!b.aim) out.push(`${L}: missing aim:`);
  if (!b.result) out.push(`${L}: missing result:`);
  if (!b.sets.length) out.push(`${L}: needs at least one set: slider`);
  if (!b.outs.length) out.push(`${L}: needs at least one out: result`);
  if (b.kind === 'lab' && !b.steps.length) out.push(`${L}: needs step: lines`);
  if (!b.plot) out.push(`${L}: needs plot: x, y`);
  if (b.sim) {
    if (!SCENE_NAMES.includes(b.sim.scene)) out.push(`${L}: unknown sim scene "${b.sim.scene}" (${SCENE_NAMES.join(', ')})`);
    for (const [k, v] of Object.entries(b.sim.map)) if (!b.sets.some(s => s.name === v) && !b.outs.some(o => o.name === v) && !Number.isFinite(Number(v))) out.push(`${L}: sim ${k}=${v} isn't a slider, result or number`);
  }
  const names = new Set<string>();
  for (const s of b.sets) {
    if (!(s.min < s.max) || !(s.step > 0) || s.start < s.min || s.start > s.max) out.push(`${L}: slider ${s.name} has a bad range`);
    if ((s.max - s.min) / s.step > 2000) out.push(`${L}: slider ${s.name} has too many steps`);
    names.add(s.name);
  }
  for (const o of b.outs) {
    try { const { vars } = compile(o.expr); for (const v of vars) if (!names.has(v) && !(v in LAB_CONSTANTS)) out.push(`${L}: ${o.name} uses unknown "${v}"`); }
    catch (e) { out.push(`${L}: ${(e as Error).message}`); }
    names.add(o.name);
  }
  if (b.plot && (!b.sets.some(s => s.name === b.plot!.x) || !b.outs.some(o => o.name === b.plot!.y))) out.push(`${L}: plot must be "slider, result"`);
  if (out.length) return out;
  const m = labModel(b); const st = startValues(b);
  const bad = (v: Record<string, number>) => b.outs.find(o => !Number.isFinite(v[o.name]));
  const first = bad(m.run(st)); if (first) out.push(`${L}: ${first.name} isn't a number at the starting values`);
  for (const s of b.sets) for (const x of [s.min, s.max]) { const o = bad(m.run({ ...st, [s.name]: x })); if (o) { out.push(`${L}: ${o.name} isn't a number when ${s.name} = ${x}`); break; } }
  return out;
}
