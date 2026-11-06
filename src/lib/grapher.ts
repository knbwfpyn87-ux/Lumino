// Lumino's graphing calculator engine (shared by the website and the iPhone app).
// Each line is read like a graphing calculator would:
//   y = 2x + 1        a graph                 x^2 - 4x + 3     a graph (y = is optional)
//   3x + 2y = 12      solved for y            x^2 + y^2 = 25   a circle (two branches)
//   3(x+2) = 2x + 11  an equation: shows x = 5          x = 3   a vertical line
//   y > 2x - 1        a shaded inequality     (2, 5)           a point
//   f(x) = x^2 - 3    a function; then f(4) gives 13    k = 2   a slider value
//   L = [3, 8, 8, 12] a list; mean(L), median(L), stdev(L)     0.15*80   a number
// Any unknown letter (like k) gets a slider automatically.
import { compile, FUNCS } from './courses/lab';

type F = (x: number) => number;
export type Curve = { fs: F[]; shade?: 'above' | 'below' | null; dashed?: boolean };
export type Item =
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'value'; value: number }
  | { kind: 'curve'; curve: Curve; note?: string }
  | { kind: 'vline'; xs: number[]; note: string }
  | { kind: 'point'; x: number; y: number }
  | { kind: 'def'; note: string };
export type Settings = { degrees: boolean };
export type Result = { items: Item[]; sliders: string[] };

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };
const KNOWN = new Set([...Object.keys(FUNCS), ...Object.keys(CONSTS)]);
const TRIG = new Set(['sin', 'cos', 'tan', 'asin', 'acos', 'atan']);

/** Turns what people type ("2x", "3(x+2)", "x²", "√(x)") into explicit math ("2*x", "3*(x+2)", "x^2", "sqrt(x)"). */
export function normalize(src: string, fnNames: Set<string>, multi: Set<string>, degrees: boolean): string {
  const s = src.replace(/−/g, '-').replace(/×|·/g, '*').replace(/÷/g, '/').replace(/²/g, '^2').replace(/³/g, '^3').replace(/π/g, 'pi')
    .replace(/√\s*\(/g, 'sqrt(').replace(/√\s*(\w+)/g, 'sqrt($1)').replace(/\[|\]/g, '').replace(/\s+/g, '');
  const raw = s.match(/\d+\.?\d*(?:e[+-]?\d+)?|\.\d+|[A-Za-z]\w*|[-+*/^(),<>=]/g) ?? [];
  // split unknown multi-letter names into single letters (xy → x*y), keeping functions, constants and named things
  const toks: string[] = [];
  for (const t of raw) {
    if (/^[A-Za-z]/.test(t) && t.length > 1 && !KNOWN.has(t) && !fnNames.has(t) && !multi.has(t) && !/^[A-Za-z]_\w+$/.test(t)) toks.push(...t.split(''));
    else toks.push(t);
  }
  const isFn = (t: string) => KNOWN.has(t) && t in FUNCS || fnNames.has(t);
  const out: string[] = [];
  toks.forEach((t, i) => {
    const prev = toks[i - 1];
    const leftOk = prev != null && (/^[\d.]/.test(prev) || prev === ')' || (/^[A-Za-z]/.test(prev) && !isFn(prev)));
    const rightOk = /^[\d.A-Za-z(]/.test(t);
    if (leftOk && rightOk) out.push('*');
    out.push(degrees && TRIG.has(t) ? `${t}d` : t);
  });
  return out.join('');
}

const num = (v: number) => (Number.isFinite(v) ? v : NaN);

/** Reads all lines. `sliders` holds values for slider letters (default 1). */
export function analyze(lines: string[], sliders: Record<string, number>, set: Settings): Result {
  const fnNames = new Set<string>(); const lists: Record<string, number[]> = {}; const vars: Record<string, number> = {};
  const userFns: Record<string, (...a: number[]) => number> = {};
  const sliderNames = new Set<string>();
  // first pass: names of functions, lists and assigned letters
  for (const l of lines) {
    const t = l.replace(/\s+/g, '');
    let m = /^([A-Za-z])\(([a-z])\)=/.exec(t); if (m) fnNames.add(m[1]);
    m = /^([A-Za-z]\w*)=\[/.exec(t); if (m) lists[m[1]] = [];
    m = /^([a-wzA-Z])=(-?[\d.]+)$/.exec(t); if (m) { vars[m[1]] = sliders[m[1]] ?? Number(m[2]); sliderNames.add(m[1]); }
  }
  const multi = new Set([...Object.keys(lists)]);
  const env = () => ({ ...CONSTS, ...Object.fromEntries([...sliderNames].map(n => [n, sliders[n] ?? vars[n] ?? 1])), ...vars });
  const expand = (s: string) => s.replace(/\b([A-Za-z]\w*)\b/g, (w) => (lists[w]?.length ? lists[w].join(',') : w));
  const build = (src: string, free: string[]) => {
    const { fn, vars: used } = compile(normalize(expand(src), fnNames, multi, set.degrees), userFns);
    for (const u of used) if (!free.includes(u) && !(u in CONSTS) && !(u in vars) && !fnNames.has(u) && /^[A-Za-z]$/.test(u)) sliderNames.add(u);
    return fn;
  };

  const items: Item[] = lines.map((line): Item => {
    const t = line.trim(); if (!t) return { kind: 'empty' };
    try {
      if (t.includes('~')) return { kind: 'error', message: 'Regression (~) isn\'t available here. Use Desmos for that.' };
      const flat = t.replace(/\s+/g, '');
      let m = /^([A-Za-z]\w*)=\[(.*)\]$/.exec(flat);
      if (m) { const vals = m[2].split(',').filter(Boolean).map(v => build(v, [])(env())); lists[m[1]] = vals; return { kind: 'def', note: `${vals.length} values` }; }
      m = /^([A-Za-z])\(([a-z])\)=(.+)$/.exec(flat);
      if (m) { const [, name, p, body] = m; const f = build(body, [p]); userFns[name] = (a: number) => num(f({ ...env(), [p]: a })); return { kind: 'curve', curve: { fs: [x => userFns[name](x)] } }; }
      m = /^([a-wzA-Z])=(-?[\d.]+)$/.exec(flat); if (m) return { kind: 'def', note: 'slider' };
      m = /^\((.+),(.+)\)$/.exec(flat);
      if (m && !/[=<>]/.test(flat)) return { kind: 'point', x: build(m[1], [])(env()), y: build(m[2], [])(env()) };
      m = /^y(<=|>=|<|>|≤|≥)(.+)$/.exec(flat);
      if (m) { const f = build(m[2], ['x']); const above = m[1].startsWith('>') || m[1] === '≥';
        return { kind: 'curve', curve: { fs: [x => num(f({ ...env(), x }))], shade: above ? 'above' : 'below', dashed: m[1].length === 1 && m[1] !== '≥' && m[1] !== '≤' } }; }
      if (flat.includes('=')) {
        const [L, R] = flat.split('=');
        if (!L || !R || flat.split('=').length > 2) return { kind: 'error', message: 'Use one = sign.' };
        if (L === 'y' && !/\by\b/.test(R.replace(/[A-Za-z]{2,}\w*/g, ''))) { const f = build(R, ['x']); return { kind: 'curve', curve: { fs: [x => num(f({ ...env(), x }))] } }; }
        const g = build(`(${L})-(${R})`, ['x', 'y']); const G = (x: number, y: number) => g({ ...env(), x, y });
        const hasY = /y/.test(normalize(flat, fnNames, multi, false).replace(/[A-Za-z]{2,}\w*/g, ''));
        if (!hasY) {
          // an equation in x only: solve it (vertical lines at the solutions)
          const xs = solve(x => G(x, 0), -1000, 1000);
          if (!/x/.test(normalize(flat, fnNames, multi, false).replace(/[A-Za-z]{2,}\w*/g, ''))) return { kind: 'error', message: 'This equation has no x or y to graph.' };
          return { kind: 'vline', xs, note: xs.length ? xs.map(x => `x = ${fmtNum(x)}`).join(', ') : 'no real solution' };
        }
        // solve for y: linear (a + b·y) or quadratic (a + b·y + c·y²) in y
        const branches: F[] = [
          x => { const a = G(x, 0), g1 = G(x, 1), gm = G(x, -1), c = (g1 + gm) / 2 - a, b = (g1 - gm) / 2;
            if (Math.abs(c) < 1e-9) return num(-a / b); const d = b * b - 4 * c * a; return d < 0 ? NaN : (-b + Math.sqrt(d)) / (2 * c); },
          x => { const a = G(x, 0), g1 = G(x, 1), gm = G(x, -1), c = (g1 + gm) / 2 - a, b = (g1 - gm) / 2;
            if (Math.abs(c) < 1e-9) return NaN; const d = b * b - 4 * c * a; return d < 0 ? NaN : (-b - Math.sqrt(d)) / (2 * c); },
        ];
        const xt = 0.37, ok = [-1, 2, 3].every(y => { const a = G(xt, 0), g1 = G(xt, 1), gm = G(xt, -1); const c = (g1 + gm) / 2 - a, b = (g1 - gm) / 2;
          return Math.abs(a + b * y + c * y * y - G(xt, y)) < 1e-6 * (1 + Math.abs(G(xt, y))); });
        if (!ok) return { kind: 'error', message: 'This equation is too complex to graph here.' };
        return { kind: 'curve', curve: { fs: branches } };
      }
      const f = build(flat, ['x']); const usesX = /x/.test(normalize(flat, fnNames, multi, false).replace(/[A-Za-z]{2,}\w*/g, ''));
      if (usesX) return { kind: 'curve', curve: { fs: [x => num(f({ ...env(), x }))] } };
      return { kind: 'value', value: f(env()) };
    } catch (e) { return { kind: 'error', message: friendly((e as Error).message) }; }
  });
  return { items, sliders: [...sliderNames].filter(n => n !== 'x' && n !== 'y').sort() };
}

const friendly = (m: string) => (/unknown function/.test(m) ? m.replace(/ in ".*"$/, '') : /expected|unexpected|can't read|ends early/.test(m) ? 'Check this line for a typo.' : m);

/** All roots of f in [a, b] (sign changes, refined by bisection). */
export function solve(f: F, a: number, b: number, n = 4000): number[] {
  const out: number[] = []; let px = a, py = f(a);
  for (let i = 1; i <= n; i++) {
    const x = a + (b - a) * i / n, y = f(x);
    if (Number.isFinite(py) && Number.isFinite(y)) {
      if (py === 0) out.push(px);
      else if (py * y < 0) { let lo = px, hi = x, flo = py; for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2, fm = f(mid); if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; } }
        const r = (lo + hi) / 2; if (Math.abs(f(r)) < 1e-6 * (1 + Math.abs(f(lo)) + Math.abs(f(hi))) || Math.abs(hi - lo) < 1e-9) out.push(r); }
    }
    px = x; py = y;
  }
  return dedupe(out);
}
const dedupe = (xs: number[]) => xs.filter((x, i) => i === 0 || Math.abs(x - xs[i - 1]) > 1e-7).map(x => (Math.abs(x - Math.round(x)) < 1e-9 ? Math.round(x) : x));

export type Poi = { x: number; y: number; label: string };
/** Zeros, maximums, minimums, y-intercepts and intersections visible in the window. */
export function pointsOfInterest(curves: Curve[], x0: number, x1: number, y0: number, y1: number): Poi[] {
  const out: Poi[] = []; const fs = curves.filter(c => !c.shade).flatMap(c => c.fs);
  const inView = (x: number, y: number) => x >= x0 && x <= x1 && y >= y0 && y <= y1;
  for (const f of fs) {
    for (const x of solve(f, x0, x1, 800)) if (inView(x, 0)) out.push({ x, y: 0, label: 'zero' });
    const y0v = f(0); if (Number.isFinite(y0v) && inView(0, y0v)) out.push({ x: 0, y: y0v, label: 'y-intercept' });
    const h = (x1 - x0) / 800; const d = (x: number) => (f(x + h / 10) - f(x - h / 10)) / (h / 5);
    for (const x of solve(d, x0, x1, 800)) { const y = f(x); if (!Number.isFinite(y) || !inView(x, y)) continue;
      const kind = f(x - h) > y && f(x + h) > y ? 'minimum' : f(x - h) < y && f(x + h) < y ? 'maximum' : null; if (kind) out.push({ x, y, label: kind }); }
  }
  for (let i = 0; i < fs.length; i++) for (let j = i + 1; j < fs.length; j++) {
    const f = fs[i], g = fs[j]; for (const x of solve(t => f(t) - g(t), x0, x1, 800)) { const y = f(x); if (Number.isFinite(y) && inView(x, y)) out.push({ x, y, label: 'intersection' }); }
  }
  return out.slice(0, 40);
}

export function fmtNum(x: number): string {
  if (!Number.isFinite(x)) return 'undefined';
  if (Math.abs(x) < 1e-10) return '0';
  const a = Math.abs(x); if (a >= 1e7 || a < 1e-4) return x.toExponential(4);
  return String(+x.toPrecision(Math.abs(x - Math.round(x)) < 1e-9 ? 12 : 6));
}

/** Nice grid spacing for a span (1, 2 or 5 × 10ⁿ). */
export function gridStep(span: number, target = 8) {
  const raw = span / target; const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}
