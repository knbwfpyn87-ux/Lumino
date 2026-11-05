// Calculated question generators for STEM, test prep and more. Every answer is computed, never typed.
import type { Gen } from '../generated';

const f2 = (n: number) => { const r = Math.round(n * 100) / 100; return Object.is(r, -0) ? '0' : String(r); };
const u = (n: number, unit: string) => `${f2(n)} ${unit}`;
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const frac = (a: number, b: number) => { if (a === 0) return '0'; const g = gcd(a, b); return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`; };

// ---------------- Physics ----------------
const speed: Gen = r => { const v = r.int(2, 30), t = r.int(2, 12), d = v * t;
  return { prompt: `A runner covers ${d} m in ${t} s. What is the average speed?`, correct: u(v, 'm/s'), wrong: [u(d * t, 'm/s'), u(v + 2, 'm/s'), u(t / d, 'm/s')], explanation: `Speed = distance ÷ time = ${d} ÷ ${t} = ${v} m/s.` }; };
const accel: Gen = r => { const vi = r.int(0, 10), a = r.int(1, 6), t = r.int(2, 8), vf = vi + a * t;
  return { prompt: `A car speeds up from ${vi} m/s to ${vf} m/s in ${t} s. What is its acceleration?`, correct: u(a, 'm/s²'), wrong: [u(vf / t, 'm/s²'), u((vf + vi) / t, 'm/s²'), u(a + 1, 'm/s²')], explanation: `a = (v_f − v_i) ÷ t = (${vf} − ${vi}) ÷ ${t} = ${a} m/s².` }; };
const newton2: Gen = r => { const m = r.int(2, 50), a = r.int(1, 10), F = m * a, ask = r.int(0, 2);
  if (ask === 0) return { prompt: `What net force accelerates a ${m} kg cart at ${a} m/s²?`, correct: u(F, 'N'), wrong: [u(m + a, 'N'), u(m / a, 'N'), u(F / 2, 'N')], explanation: `F = ma = ${m} × ${a} = ${F} N.` };
  if (ask === 1) return { prompt: `A ${F} N net force acts on a ${m} kg object. What is its acceleration?`, correct: u(a, 'm/s²'), wrong: [u(F * m, 'm/s²'), u(a + 2, 'm/s²'), u(m / F, 'm/s²')], explanation: `a = F ÷ m = ${F} ÷ ${m} = ${a} m/s².` };
  return { prompt: `A ${F} N net force gives an object an acceleration of ${a} m/s². What is its mass?`, correct: u(m, 'kg'), wrong: [u(F * a, 'kg'), u(m + 3, 'kg'), u(F - a, 'kg')], explanation: `m = F ÷ a = ${F} ÷ ${a} = ${m} kg.` }; };
const weight: Gen = r => { const m = r.int(2, 100);
  return { prompt: `What is the weight of a ${m} kg object on Earth? (g = 9.8 m/s²)`, correct: u(m * 9.8, 'N'), wrong: [u(m, 'N'), u(m / 9.8, 'N'), u(m * 9.8 + 9.8, 'N')], explanation: `W = mg = ${m} × 9.8 = ${f2(m * 9.8)} N.` }; };
const kinetic: Gen = r => { const m = r.int(1, 20), v = r.int(1, 12), K = 0.5 * m * v * v;
  return { prompt: `What is the kinetic energy of a ${m} kg ball moving at ${v} m/s?`, correct: u(K, 'J'), wrong: [u(m * v * v, 'J'), u(0.5 * m * v, 'J'), u(m * v, 'J')], explanation: `KE = ½mv² = ½ × ${m} × ${v}² = ${f2(K)} J.` }; };
const potential: Gen = r => { const m = r.int(1, 20), h = r.int(1, 20), P = m * 9.8 * h;
  return { prompt: `How much gravitational potential energy does a ${m} kg box gain when lifted ${h} m? (g = 9.8 m/s²)`, correct: u(P, 'J'), wrong: [u(m * h, 'J'), u(0.5 * m * 9.8 * h, 'J'), u(m * 9.8, 'J')], explanation: `PE = mgh = ${m} × 9.8 × ${h} = ${f2(P)} J.` }; };
const momentum: Gen = r => { const m = r.int(1, 40), v = r.int(1, 15);
  return { prompt: `What is the momentum of a ${m} kg object moving at ${v} m/s?`, correct: u(m * v, 'kg·m/s'), wrong: [u(m + v, 'kg·m/s'), u(0.5 * m * v * v, 'kg·m/s'), u(m / v, 'kg·m/s')], explanation: `p = mv = ${m} × ${v} = ${m * v} kg·m/s.` }; };
const work: Gen = r => { const F = r.int(5, 100), d = r.int(1, 20);
  return { prompt: `How much work is done pushing a crate with a ${F} N force for ${d} m (in the direction of the force)?`, correct: u(F * d, 'J'), wrong: [u(F + d, 'J'), u(F / d, 'J'), u(0.5 * F * d, 'J')], explanation: `W = Fd = ${F} × ${d} = ${F * d} J.` }; };
const power: Gen = r => { const P = r.int(1, 50) * 10, t = r.int(2, 20), W = P * t;
  return { prompt: `A motor does ${W} J of work in ${t} s. What is its power output?`, correct: u(P, 'W'), wrong: [u(W * t, 'W'), u(P + 10, 'W'), u(P / 2, 'W')], explanation: `P = W ÷ t = ${W} ÷ ${t} = ${P} W.` }; };
const ohm: Gen = r => { const I = r.int(1, 10), R = r.int(2, 50), V = I * R, ask = r.int(0, 2);
  if (ask === 0) return { prompt: `A ${R} Ω resistor carries ${I} A. What is the voltage across it?`, correct: u(V, 'V'), wrong: [u(R / I, 'V'), u(I + R, 'V'), u(V * 2, 'V')], explanation: `V = IR = ${I} × ${R} = ${V} V.` };
  if (ask === 1) return { prompt: `A ${V} V battery is connected to a ${R} Ω resistor. What current flows?`, correct: u(I, 'A'), wrong: [u(V * R, 'A'), u(R / V, 'A'), u(I + 1, 'A')], explanation: `I = V ÷ R = ${V} ÷ ${R} = ${I} A.` };
  return { prompt: `A ${V} V source drives ${I} A through a resistor. What is its resistance?`, correct: u(R, 'Ω'), wrong: [u(V * I, 'Ω'), u(R + 4, 'Ω'), u(I / V, 'Ω')], explanation: `R = V ÷ I = ${V} ÷ ${I} = ${R} Ω.` }; };
const elecPower: Gen = r => { const V = r.pick([3, 6, 9, 12, 24, 120]), I = r.int(1, 10);
  return { prompt: `A device draws ${I} A from a ${V} V supply. How much power does it use?`, correct: u(V * I, 'W'), wrong: [u(V / I, 'W'), u(V + I, 'W'), u(V * I * I, 'W')], explanation: `P = VI = ${V} × ${I} = ${V * I} W.` }; };
const wave: Gen = r => { const f = r.int(2, 50), l = r.int(1, 20) / 2, v = f * l, ask = r.int(0, 1);
  return ask === 0
    ? { prompt: `A wave has frequency ${f} Hz and wavelength ${f2(l)} m. What is its speed?`, correct: u(v, 'm/s'), wrong: [u(f / l, 'm/s'), u(f + l, 'm/s'), u(l / f, 'm/s')], explanation: `v = fλ = ${f} × ${f2(l)} = ${f2(v)} m/s.` }
    : { prompt: `A wave travels at ${f2(v)} m/s with wavelength ${f2(l)} m. What is its frequency?`, correct: u(f, 'Hz'), wrong: [u(v * l, 'Hz'), u(f + 5, 'Hz'), u(l / v, 'Hz')], explanation: `f = v ÷ λ = ${f2(v)} ÷ ${f2(l)} = ${f} Hz.` }; };
const density: Gen = r => { const rho = r.pick([0.5, 0.8, 1, 2, 2.7, 4, 7.9]), V = r.int(2, 20), m = rho * V;
  return { prompt: `A block has mass ${f2(m)} g and volume ${V} cm³. What is its density?`, correct: u(rho, 'g/cm³'), wrong: [u(m * V, 'g/cm³'), u(V / m, 'g/cm³'), u(rho + 1, 'g/cm³')], explanation: `ρ = m ÷ V = ${f2(m)} ÷ ${V} = ${f2(rho)} g/cm³.` }; };
const pressure: Gen = r => { const A = r.pick([0.5, 1, 2, 4, 5]), P = r.int(2, 60) * 10, F = P * A;
  return { prompt: `A ${f2(F)} N force presses on an area of ${f2(A)} m². What is the pressure?`, correct: u(P, 'Pa'), wrong: [u(F * A === P ? P * 2 : F * A, 'Pa'), u(P / 2, 'Pa'), u(P + 10, 'Pa')], explanation: `P = F ÷ A = ${f2(F)} ÷ ${f2(A)} = ${P} Pa.` }; };
const freefall: Gen = r => { const t = r.int(1, 6), d = 4.9 * t * t;
  return { prompt: `A stone is dropped from rest. How far does it fall in ${t} s? (g = 9.8 m/s², ignore air resistance)`, correct: u(d, 'm'), wrong: [u(9.8 * t, 'm'), u(9.8 * t * t, 'm'), u(4.9 * t, 'm')], explanation: `d = ½gt² = 4.9 × ${t}² = ${f2(d)} m.` }; };
const kinematics: Gen = r => { const vi = r.int(0, 10), a = r.int(1, 5), t = r.int(1, 6), d = vi * t + 0.5 * a * t * t;
  return { prompt: `An object starts at ${vi} m/s and accelerates at ${a} m/s² for ${t} s. How far does it travel?`, correct: u(d, 'm'), wrong: [u(vi * t + a * t * t, 'm'), u(vi * t, 'm'), u(0.5 * a * t * t, 'm')], explanation: `d = v_i t + ½at² = ${vi}(${t}) + ½(${a})(${t})² = ${f2(d)} m.` }; };
const series: Gen = r => { const R = [r.int(1, 30), r.int(1, 30), r.int(1, 30)], s = R[0] + R[1] + R[2];
  return { prompt: `Resistors of ${R.join(' Ω, ')} Ω are connected in series. What is the total resistance?`, correct: u(s, 'Ω'), wrong: [u(s / 3, 'Ω'), u(Math.max(...R), 'Ω'), u(s + 10, 'Ω')], explanation: `In series, resistances add: ${R.join(' + ')} = ${s} Ω.` }; };
const parallel: Gen = r => { const [a, b, t] = r.pick([[6, 3, 2], [4, 4, 2], [12, 6, 4], [10, 10, 5], [20, 5, 4], [30, 15, 10], [12, 4, 3], [8, 8, 4]] as const);
  return { prompt: `What is the equivalent resistance of ${a} Ω and ${b} Ω in parallel?`, correct: u(t, 'Ω'), wrong: [u(a + b, 'Ω'), u((a + b) / 2, 'Ω'), u(a * b, 'Ω')], explanation: `1/R = 1/${a} + 1/${b} → R = (${a} × ${b}) ÷ (${a} + ${b}) = ${t} Ω.` }; };

// ---------------- Chemistry ----------------
const MASS: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Cl: 35.5, S: 32, K: 39, Ca: 40 };
const FORMULAS: [string, Record<string, number>][] = [['H₂O', { H: 2, O: 1 }], ['CO₂', { C: 1, O: 2 }], ['NaCl', { Na: 1, Cl: 1 }], ['CH₄', { C: 1, H: 4 }], ['NH₃', { N: 1, H: 3 }],
  ['C₆H₁₂O₆', { C: 6, H: 12, O: 6 }], ['H₂SO₄', { H: 2, S: 1, O: 4 }], ['CaCO₃', { Ca: 1, C: 1, O: 3 }], ['MgO', { Mg: 1, O: 1 }], ['KCl', { K: 1, Cl: 1 }],
  ['O₂', { O: 2 }], ['N₂', { N: 2 }], ['C₂H₆', { C: 2, H: 6 }], ['HCl', { H: 1, Cl: 1 }], ['NaOH', { Na: 1, O: 1, H: 1 }]];
const molarMassOf = (c: Record<string, number>) => Object.entries(c).reduce((s, [e, n]) => s + MASS[e] * n, 0);
const givens = (c: Record<string, number>) => Object.keys(c).map(e => `${e} = ${MASS[e]}`).join(', ');
const molarMass: Gen = r => { const [f, c] = r.pick(FORMULAS), M = molarMassOf(c), noSub = Object.keys(c).reduce((s, e) => s + MASS[e], 0);
  return { prompt: `What is the molar mass of ${f}? (${givens(c)})`, correct: u(M, 'g/mol'), wrong: [u(noSub === M ? M + 16 : noSub, 'g/mol'), u(M + 2, 'g/mol'), u(M * 2, 'g/mol')], explanation: `Add the atomic masses times their subscripts: ${Object.entries(c).map(([e, n]) => `${n}×${MASS[e]}`).join(' + ')} = ${f2(M)} g/mol.` }; };
const moles: Gen = r => { const [f, c] = r.pick(FORMULAS), M = molarMassOf(c), n = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), m = n * M;
  return { prompt: `How many moles are in ${f2(m)} g of ${f}? (molar mass ${f2(M)} g/mol)`, correct: u(n, 'mol'), wrong: [u(m * M, 'mol'), u(M / m, 'mol'), u(n + 1, 'mol')], explanation: `n = mass ÷ molar mass = ${f2(m)} ÷ ${f2(M)} = ${f2(n)} mol.` }; };
const molarity: Gen = r => { const V = r.pick([0.25, 0.5, 1, 2]), M = r.pick([0.1, 0.2, 0.5, 1, 1.5, 2, 3]), n = M * V;
  return { prompt: `${f2(n)} mol of solute is dissolved to make ${f2(V)} L of solution. What is the molarity?`, correct: u(M, 'M'), wrong: [u(n * V, 'M'), u(V / n, 'M'), u(M + 0.5, 'M')], explanation: `M = moles ÷ liters = ${f2(n)} ÷ ${f2(V)} = ${f2(M)} M.` }; };
const dilution: Gen = r => { const M1 = r.pick([2, 3, 4, 6, 12]), V1 = r.pick([10, 20, 25, 50, 100]), k = r.pick([2, 4, 5, 10]), V2 = V1 * k, M2 = M1 / k;
  return { prompt: `You dilute ${V1} mL of ${M1} M acid to ${V2} mL. What is the new concentration?`, correct: u(M2, 'M'), wrong: [u(M1 * k, 'M'), u(M1 - k, 'M') === u(M2, 'M') ? u(M2 + 1, 'M') : u(M1 - k, 'M'), u(M1, 'M')], explanation: `M₁V₁ = M₂V₂ → M₂ = ${M1} × ${V1} ÷ ${V2} = ${f2(M2)} M.` }; };
const pH: Gen = r => { const k = r.int(1, 13), ask = r.int(0, 2);
  if (ask === 0) return { prompt: `A solution has [H⁺] = 1 × 10⁻${sup(k)} M. What is its pH?`, correct: String(k), wrong: [String(14 - k === k ? k + 1 : 14 - k), String(-k), String(k + 2)], explanation: `pH = −log[H⁺] = ${k}.` };
  if (ask === 1) return { prompt: `A solution has pH ${k}. What is its pOH?`, correct: String(14 - k), wrong: [String(k === 7 ? 8 : k), String(14 + k), String(Math.abs(7 - k) === 14 - k ? 15 - k : Math.abs(7 - k))], explanation: `pH + pOH = 14, so pOH = 14 − ${k} = ${14 - k}.` };
  return { prompt: `A solution has pH ${k}. How would you classify it?`, correct: k < 7 ? 'Acidic' : k > 7 ? 'Basic' : 'Neutral', wrong: (['Acidic', 'Basic', 'Neutral', 'Salty'] as const).filter(x => x !== (k < 7 ? 'Acidic' : k > 7 ? 'Basic' : 'Neutral')), explanation: `pH below 7 is acidic, 7 is neutral, above 7 is basic.` }; };
const sup = (n: number) => String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');
const boyle: Gen = r => { const P1 = r.int(1, 4), V1 = r.int(2, 12) * 2, P2 = r.pick([1, 2, 3, 4, 6, 8].filter(p => (P1 * V1) % p === 0 && p !== P1)), V2 = P1 * V1 / P2;
  return { prompt: `A gas at ${P1} atm occupies ${V1} L. At constant temperature the pressure changes to ${P2} atm. What is the new volume?`, correct: u(V2, 'L'), wrong: [u(V1 * P2 / P1, 'L') === u(V2, 'L') ? u(V2 + 2, 'L') : u(V1 * P2 / P1, 'L'), u(V1, 'L') === u(V2, 'L') ? u(V2 + 1, 'L') : u(V1, 'L'), u(P1 + V1 + P2, 'L')], explanation: `Boyle's law: P₁V₁ = P₂V₂ → V₂ = ${P1} × ${V1} ÷ ${P2} = ${f2(V2)} L.` }; };
const charles: Gen = r => { const T1 = r.pick([200, 250, 300, 400]), k = r.pick([1.5, 2, 0.5]), T2 = T1 * k, V1 = r.int(2, 10) * 2, V2 = V1 * k;
  return { prompt: `A gas occupies ${V1} L at ${T1} K. At constant pressure it is changed to ${T2} K. What is its new volume?`, correct: u(V2, 'L'), wrong: [u(V1 / k, 'L'), u(V2 + 2, 'L'), u(V1, 'L')], explanation: `Charles's law: V₁/T₁ = V₂/T₂ → V₂ = ${V1} × ${T2} ÷ ${T1} = ${f2(V2)} L.` }; };
const ELEMENTS: [string, string, number, number][] = [['Carbon', 'C', 6, 12], ['Nitrogen', 'N', 7, 14], ['Oxygen', 'O', 8, 16], ['Fluorine', 'F', 9, 19], ['Sodium', 'Na', 11, 23], ['Magnesium', 'Mg', 12, 24],
  ['Aluminum', 'Al', 13, 27], ['Phosphorus', 'P', 15, 31], ['Sulfur', 'S', 16, 32], ['Argon', 'Ar', 18, 40], ['Potassium', 'K', 19, 39], ['Calcium', 'Ca', 20, 40], ['Iron', 'Fe', 26, 56]];
const atomParts: Gen = r => { const [name, sym, Z, A] = r.pick(ELEMENTS), ask = r.int(0, 1);
  return ask === 0
    ? { prompt: `How many neutrons are in an atom of ${name}-${A} (${sym}, atomic number ${Z})?`, correct: String(A - Z), wrong: [String(A), String(Z), String(A + Z)].filter(x => x !== String(A - Z)).concat(String(A - Z + 1)).slice(0, 3), explanation: `Neutrons = mass number − atomic number = ${A} − ${Z} = ${A - Z}.` }
    : { prompt: `How many electrons does a neutral atom of ${name} (atomic number ${Z}) have?`, correct: String(Z), wrong: [String(A), String(A - Z) === String(Z) ? String(Z + 2) : String(A - Z), String(Z + 1)], explanation: `A neutral atom has as many electrons as protons: ${Z}.` }; };
const stoich: Gen = r => { const rx = r.int(0, 1);
  if (rx === 0) { const n = r.int(1, 8), from = r.pick(['H₂', 'O₂']), out = from === 'H₂' ? n : 2 * n;
    return { prompt: `2H₂ + O₂ → 2H₂O. How many moles of water form from ${n} mol of ${from} (with plenty of the other reactant)?`, correct: u(out, 'mol'), wrong: [u(from === 'H₂' ? 2 * n : n, 'mol'), u(n / 2, 'mol'), u(out + 1, 'mol')], explanation: from === 'H₂' ? `2 mol H₂ make 2 mol H₂O (1 : 1), so ${n} mol.` : `1 mol O₂ makes 2 mol H₂O (1 : 2), so ${out} mol.` }; }
  const n = r.int(1, 6) * 3, from = r.pick(['N₂', 'H₂']), out = from === 'N₂' ? 2 * n : (2 * n) / 3;
  return { prompt: `N₂ + 3H₂ → 2NH₃. How many moles of NH₃ form from ${n} mol of ${from} (with plenty of the other reactant)?`, correct: u(out, 'mol'), wrong: [u(n, 'mol'), u(3 * n, 'mol'), u(from === 'N₂' ? n / 2 : n * 2, 'mol')], explanation: from === 'N₂' ? `1 N₂ : 2 NH₃, so ${n} × 2 = ${out} mol.` : `3 H₂ : 2 NH₃, so ${n} × 2⁄3 = ${f2(out)} mol.` }; };

// ---------------- Calculus ----------------
const co = (c: number) => (c === 1 ? '' : c === -1 ? '−' : String(c).replace('-', '−'));
const pw = (c: number, n: number) => (n === 0 ? `${c}` : n === 1 ? `${co(c)}x` : `${co(c)}x^${n}`);
/** ' + 3' / ' − 3' for the next term of an expression */
const sg = (n: number) => (n === 0 ? '' : n < 0 ? ` − ${-n}` : ` + ${n}`);
const powerRule: Gen = r => { const a = r.int(1, 9), n = r.int(2, 6);
  return { prompt: `What is d/dx (${pw(a, n)})?`, correct: pw(a * n, n - 1), wrong: [pw(a, n - 1), pw(a * n, n), pw(a * (n - 1), n - 1) === pw(a * n, n - 1) ? pw(a * n + 1, n - 1) : pw(a * (n - 1), n - 1)], explanation: `Power rule: bring down ${n}, subtract 1 from the exponent → ${pw(a * n, n - 1)}.` }; };
const derivAt: Gen = r => { const a = r.nz(-4, 5), b = r.int(-6, 6), c = r.int(-9, 9), k = r.int(-3, 4), d = 2 * a * k + b;
  return { prompt: `If f(x) = ${co(a)}x²${sg(b)}x${sg(c)}, what is f′(${k})?`, correct: String(d), wrong: [String(a * k * k + b * k + c) === String(d) ? String(d + 3) : String(a * k * k + b * k + c), String(2 * a * k), String(a * k + b) === String(d) ? String(d - 2) : String(a * k + b)], explanation: `f′(x) = ${co(2 * a)}x${sg(b)}, so f′(${k}) = ${2 * a}(${k})${sg(b)} = ${d}.` }; };
const limitHole: Gen = r => { const a = r.nz(-6, 8);
  return { prompt: `What is lim(x→${a}) (x² − ${a * a}) / (x${sg(-a)})?`, correct: String(2 * a), wrong: [String(a), '0', 'Does not exist'], explanation: `Factor: (x${sg(-a)})(x${sg(a)}) / (x${sg(-a)}) = x${sg(a)} → ${2 * a}.` }; };
const limitInf: Gen = r => { const p = r.int(1, 9), q = r.int(1, 9), b = r.int(1, 9), deg = r.int(0, 2);
  if (deg === 0) return { prompt: `What is lim(x→∞) (${co(p)}x² + ${b}x) / (${co(q)}x² + 1)?`, correct: f2(p / q), wrong: ['0', '∞', f2(b) === f2(p / q) ? f2(p / q + 1) : f2(b)], explanation: `Same degree on top and bottom: ratio of leading coefficients ${p}/${q} = ${f2(p / q)}.` };
  if (deg === 1) return { prompt: `What is lim(x→∞) (${co(p)}x + ${b}) / (${co(q)}x² + 1)?`, correct: '0', wrong: [f2(p / q) === '0' ? '1' : f2(p / q), '∞', f2(b / q) === f2(p / q) || f2(b / q) === '0' ? '−1' : f2(b / q)], explanation: `The bottom has the higher degree, so the fraction goes to 0.` };
  return { prompt: `What is lim(x→∞) (${co(p)}x³ + ${b}) / (${co(q)}x² + 1)?`, correct: '∞', wrong: ['0', f2(p / q), f2(p / q + 1)], explanation: `The top has the higher degree (and a positive leading coefficient), so it grows without bound.` }; };
const integral: Gen = r => { const kind = r.int(0, 2), b = r.int(1, 6);
  if (kind === 0) { const c = r.int(1, 9); return { prompt: `What is ∫₀^${b} ${c} dx?`, correct: String(c * b), wrong: [String(c), String(b), String(c * b * b)], explanation: `∫ ${c} dx = ${c}x; from 0 to ${b} gives ${c * b}.` }; }
  if (kind === 1) { const c = r.int(1, 5) * 2; return { prompt: `What is ∫₀^${b} ${c}x dx?`, correct: String(c * b * b / 2), wrong: [String(c * b), String(c * b * b), String(c / 2)], explanation: `∫ ${c}x dx = ${c / 2}x²; at ${b}: ${c / 2} × ${b * b} = ${c * b * b / 2}.` }; }
  const c = r.int(1, 3) * 3; return { prompt: `What is ∫₀^${b} ${c}x² dx?`, correct: String(c * b ** 3 / 3), wrong: [String(c * b ** 2), String(c * b ** 3), String(2 * c * b)], explanation: `∫ ${c}x² dx = ${c / 3}x³; at ${b}: ${c / 3} × ${b ** 3} = ${c * b ** 3 / 3}.` }; };
const chain: Gen = r => { const a = r.int(2, 5), b = r.int(1, 3), n = r.int(2, 4), v = n * a * b ** (n - 1);
  return { prompt: `If f(x) = (${a}x + ${b})^${n}, what is f′(0)?`, correct: String(v), wrong: [String(n * b ** (n - 1)), String(b ** n), String(a * b ** (n - 1)) === String(v) ? String(v + 1) : String(a * b ** (n - 1))], explanation: `Chain rule: f′(x) = ${n}(${a}x + ${b})^${n - 1} × ${a}; at 0: ${n} × ${b}^${n - 1} × ${a} = ${v}.` }; };
const expDeriv: Gen = r => { const k = r.int(2, 9), c = r.int(1, 5);
  return { prompt: `What is d/dx (${co(c)}e^(${k}x))?`, correct: `${c * k}e^(${k}x)`, wrong: [`${co(c)}e^(${k}x)`, `${c * k}e^(${k - 1}x)`, `${k}e^(${c === 1 ? '' : c}x)` === `${c * k}e^(${k}x)` ? `${c + k}e^(${k}x)` : `${k}e^(${c === 1 ? '' : c}x)`], explanation: `d/dx e^(kx) = ke^(kx), so the answer is ${c} × ${k}e^(${k}x) = ${c * k}e^(${k}x).` }; };
const geoSeries: Gen = r => { const a = r.int(1, 9) * 4, [rs, rv] = r.pick([['1/2', 0.5], ['1/3', 1 / 3], ['1/4', 0.25], ['1/5', 0.2]] as const), s = a / (1 - rv);
  return { prompt: `What is the sum of the infinite geometric series ${a} + ${f2(a * rv)} + ${f2(a * rv * rv)} + … (ratio ${rs})?`, correct: f2(s), wrong: [f2(a / rv), f2(a * (1 + rv)), 'It diverges'], explanation: `S = a ÷ (1 − r) = ${a} ÷ (1 − ${rs}) = ${f2(s)}.` }; };

// ---------------- Precalculus / trig ----------------
const logs: Gen = r => { const b = r.pick([2, 3, 5, 10]), k = r.int(-2, 5), N = b ** k, ask = r.int(0, 1), Ns = k < 0 ? `1/${b ** -k}` : String(N);
  return ask === 0
    ? { prompt: `What is log base ${b} of ${Ns}?`, correct: String(k), wrong: [String(-k) === String(k) ? '1' : String(-k), String(k + 1), k < 0 ? String(b ** -k) : String(N / b)].filter((x, i, a) => a.indexOf(x) === i && x !== String(k)).concat(String(k + 2), String(k - 1)).slice(0, 3), explanation: `${b}^${k} = ${Ns}, so the log is ${k}.` }
    : { prompt: `Solve for x: ${b}^x = ${Ns}`, correct: String(k), wrong: [String(k + 1), String(k - 1), k < 0 ? String(-k) : String(N / b) === String(k) ? String(k + 3) : String(N / b)], explanation: `${Ns} = ${b}^${k}, so x = ${k}.` }; };
const arith: Gen = r => { const a = r.int(-10, 20), d = r.nz(-5, 8), n = r.int(5, 30), v = a + (n - 1) * d;
  return { prompt: `An arithmetic sequence starts ${a}, ${a + d}, ${a + 2 * d}, … What is term ${n}?`, correct: String(v), wrong: [String(a + n * d), String(a * n), String(v - d - d)], explanation: `aₙ = a₁ + (n − 1)d = ${a} + ${n - 1}(${d}) = ${v}.` }; };
const geom: Gen = r => { const a = r.int(1, 6), q = r.pick([2, 3]), n = r.int(3, 7), v = a * q ** (n - 1);
  return { prompt: `A geometric sequence starts ${a}, ${a * q}, ${a * q * q}, … What is term ${n}?`, correct: String(v), wrong: [String(a * q ** n), String(a + (n - 1) * q), String(v / q === a * q ** (n - 1) ? v + q : a * q ** (n - 2))], explanation: `aₙ = a₁ × r^(n − 1) = ${a} × ${q}^${n - 1} = ${v}.` }; };
const TRIG: [string, string][] = [['sin 0°', '0'], ['sin 30°', '1/2'], ['sin 45°', '√2/2'], ['sin 60°', '√3/2'], ['sin 90°', '1'], ['cos 0°', '1'], ['cos 30°', '√3/2'], ['cos 45°', '√2/2'], ['cos 60°', '1/2'], ['cos 90°', '0'], ['tan 0°', '0'], ['tan 30°', '√3/3'], ['tan 45°', '1'], ['tan 60°', '√3']];
const TV = ['0', '1/2', '√2/2', '√3/2', '1', '√3', '√3/3'];
const trigExact: Gen = r => { const [q, a] = r.pick(TRIG); return { prompt: `What is the exact value of ${q}?`, correct: a, wrong: r.shuffle(TV.filter(v => v !== a)).slice(0, 3), explanation: `From the unit circle, ${q} = ${a}.` }; };
const RAD: [number, string][] = [[30, 'π/6'], [45, 'π/4'], [60, 'π/3'], [90, 'π/2'], [120, '2π/3'], [135, '3π/4'], [150, '5π/6'], [180, 'π'], [270, '3π/2'], [360, '2π']];
const radians: Gen = r => { const [d, s] = r.pick(RAD), toRad = r.next() < 0.6;
  return toRad ? { prompt: `Convert ${d}° to radians.`, correct: s, wrong: r.shuffle(RAD.filter(x => x[1] !== s).map(x => x[1])).slice(0, 3), explanation: `Multiply by π/180: ${d} × π/180 = ${s}.` }
    : { prompt: `Convert ${s} radians to degrees.`, correct: `${d}°`, wrong: r.shuffle(RAD.filter(x => x[0] !== d).map(x => `${x[0]}°`)).slice(0, 3), explanation: `Multiply by 180/π: ${s} = ${d}°.` }; };
const compose: Gen = r => { const a = r.nz(-4, 5), b = r.int(-6, 6), c = r.nz(-3, 4), d = r.int(-5, 5), k = r.int(-3, 4), g = c * k + d, v = a * g + b, fk = a * k + b, wrongGF = c * fk + d;
  return { prompt: `f(x) = ${co(a)}x${sg(b)} and g(x) = ${co(c)}x${sg(d)}. What is f(g(${k}))?`, correct: String(v), wrong: [String(wrongGF) === String(v) ? String(v + 2) : String(wrongGF), String(g), String(fk * g) === String(v) ? String(v - 3) : String(fk * g)], explanation: `g(${k}) = ${g}, then f(${g}) = ${a}(${g})${sg(b)} = ${v}.` }; };
const compound: Gen = r => { const P = r.pick([500, 1000, 2000, 5000]), rate = r.pick([5, 10, 20]), t = r.int(1, 3), A = P * (1 + rate / 100) ** t, simple = P * (1 + rate * t / 100);
  const money = (n: number) => `$${n.toFixed(2)}`;
  return { prompt: `$${P} is invested at ${rate}% interest compounded yearly. How much is in the account after ${t} year${t > 1 ? 's' : ''}?`, correct: money(A), wrong: [t === 1 ? money(A + P * 0.01) : money(simple), money(P * rate / 100 * t), money(A + 100)], explanation: `A = P(1 + r)^t = ${P}(1.${String(rate).padStart(2, '0')})^${t} = ${money(A)}.` }; };

// ---------------- Statistics & probability ----------------
const zscore: Gen = r => { const mu = r.int(50, 100), s = r.int(2, 15), k = r.pick([-2, -1.5, -1, 0.5, 1, 1.5, 2, 2.5]), x = mu + k * s;
  return { prompt: `Scores have mean ${mu} and standard deviation ${s}. What is the z-score of ${f2(x)}?`, correct: f2(k), wrong: [f2(-k), f2(x - mu), f2(k * 2)], explanation: `z = (x − μ) ÷ σ = (${f2(x)} − ${mu}) ÷ ${s} = ${f2(k)}.` }; };
const C = (n: number, k: number): number => (k === 0 ? 1 : (C(n - 1, k - 1) * n) / k);
const P = (n: number, k: number) => Array.from({ length: k }, (_, i) => n - i).reduce((a, b) => a * b, 1);
const combos: Gen = r => { const n = r.int(5, 10), k = r.int(2, 4), perm = r.next() < 0.5;
  return perm ? { prompt: `In how many ways can ${k} students be chosen from ${n} for president, vice president${k > 2 ? ', and other distinct roles' : ''} (order matters)?`, correct: String(P(n, k)), wrong: [String(C(n, k)), String(n ** k), String(n * k)], explanation: `Permutations: ${n}P${k} = ${Array.from({ length: k }, (_, i) => n - i).join(' × ')} = ${P(n, k)}.` }
    : { prompt: `How many different groups of ${k} can be chosen from ${n} people (order doesn't matter)?`, correct: String(C(n, k)), wrong: [String(P(n, k)), String(n * k), String(C(n, k) + n)], explanation: `Combinations: ${n}C${k} = ${n}! ÷ (${k}! × ${n - k}!) = ${C(n, k)}.` }; };
const diceSum: Gen = r => { const s = r.int(2, 12), ways = 6 - Math.abs(s - 7);
  return { prompt: `Two fair dice are rolled. What is the probability their sum is ${s}?`, correct: frac(ways, 36), wrong: [frac(1, 11), frac(Math.min(ways + 1, 6), 36) === frac(ways, 36) ? frac(ways + 2, 36) : frac(Math.min(ways + 1, 6), 36), frac(ways, 12)].filter(x => x !== frac(ways, 36)).concat([frac(1, 6), frac(1, 2), frac(1, 36)]).filter((x, i, a) => x !== frac(ways, 36) && a.indexOf(x) === i).slice(0, 3), explanation: `${ways} of the 36 equally likely outcomes give ${s}, so ${frac(ways, 36)}.` }; };
const indep: Gen = r => { const [ea, pa, qa] = r.pick([['getting heads', 1, 2], ['rolling a 6', 1, 6], ['drawing a heart', 1, 4], ['spinning red on a 5-color spinner', 1, 5]] as const);
  const [eb, pb, qb] = r.pick([['rolling an even number', 1, 2], ['drawing an ace', 1, 13], ['getting tails', 1, 2], ['rolling a 1 or 2', 1, 3]] as const);
  const num = pa * pb, den = qa * qb;
  return { prompt: `What is the probability of ${ea} and then, independently, ${eb}?`, correct: frac(num, den), wrong: [frac(pa * qb + pb * qa, den), frac(pa + pb, qa + qb) === frac(num, den) ? frac(1, 2) : frac(pa + pb, qa + qb), frac(num, qa + qb) === frac(num, den) ? frac(1, 3) : frac(num, qa + qb)], explanation: `Independent events multiply: ${frac(pa, qa)} × ${frac(pb, qb)} = ${frac(num, den)}.` }; };
const expected: Gen = r => { const [ps, p] = r.pick([['1/2', 0.5], ['1/4', 0.25], ['1/5', 0.2], ['1/10', 0.1]] as const), W = r.int(2, 20) * 5, L = r.int(1, 10), ev = p * W - (1 - p) * L;
  const m = (n: number) => (n < 0 ? `−$${f2(-n)}` : `$${f2(n)}`);
  return { prompt: `A game pays $${W} with probability ${ps}; otherwise you lose $${L}. What is the expected value per play?`, correct: m(ev), wrong: [m(p * W), m(W - L), m(ev + L)], explanation: `EV = (${ps})(${W}) − (1 − ${ps})(${L}) = ${m(ev)}.` }; };

// ---------------- Discrete math / CS ----------------
const modArith: Gen = r => { const n = r.int(3, 12), a = r.int(15, 200);
  return { prompt: `What is ${a} mod ${n}?`, correct: String(a % n), wrong: [String(Math.floor(a / n)), String((a % n) + 1), String(n - (a % n)) === String(a % n) ? String((a % n) + 2) : String(n - (a % n))], explanation: `${a} = ${n} × ${Math.floor(a / n)} + ${a % n}, so the remainder is ${a % n}.` }; };
const gcdLcm: Gen = r => { const g = r.int(2, 9), x = r.int(2, 9), y = r.int(2, 9), a = g * x, b = g * y, G = gcd(a, b), L = a * b / G, ask = r.next() < 0.5;
  return ask ? { prompt: `What is the greatest common factor of ${a} and ${b}?`, correct: String(G), wrong: [String(L), String(g === G ? G * 2 : g), String(a - b === 0 || Math.abs(a - b) === G ? G + 1 : Math.abs(a - b))], explanation: `The largest number dividing both ${a} and ${b} is ${G}.` }
    : { prompt: `What is the least common multiple of ${a} and ${b}?`, correct: String(L), wrong: [String(a * b === L ? L * 2 : a * b), String(G), String(a + b)], explanation: `LCM = (${a} × ${b}) ÷ GCF(${G}) = ${L}.` }; };
const binDec: Gen = r => { const n = r.int(5, 255), ask = r.int(0, 2), b = n.toString(2);
  if (ask === 0) return { prompt: `What is binary ${b} in decimal?`, correct: String(n), wrong: [String(n + 1), String(n * 2), String(parseInt(b.split('').reverse().join(''), 2)) === String(n) ? String(n - 1) : String(parseInt(b.split('').reverse().join(''), 2))], explanation: `Add the place values of the 1s: ${b.split('').map((d, i) => (d === '1' ? 2 ** (b.length - 1 - i) : 0)).filter(Boolean).join(' + ')} = ${n}.` };
  if (ask === 1) return { prompt: `What is decimal ${n} in binary?`, correct: b, wrong: [(n + 1).toString(2), (n ^ 1).toString(2) === b ? (n + 2).toString(2) : (n ^ 1).toString(2), b.split('').reverse().join('') === b ? (n - 1).toString(2) : b.split('').reverse().join('')], explanation: `${n} = ${b.split('').map((d, i) => (d === '1' ? 2 ** (b.length - 1 - i) : 0)).filter(Boolean).join(' + ')} → ${b}.` };
  const h = n.toString(16).toUpperCase();
  return { prompt: `What is hexadecimal ${h} in decimal?`, correct: String(n), wrong: [String(parseInt(h, 10) || n + 16) === String(n) ? String(n + 16) : String(parseInt(h, 10) || n + 16), String(n + 1), String(n - 16 > 0 ? n - 16 : n + 32)], explanation: `Each hex digit is a power of 16: ${h.length === 2 ? `${parseInt(h[0], 16)} × 16 + ${parseInt(h[1], 16)}` : h} = ${n}.` }; };
const bitsNeeded: Gen = r => { const n = r.int(5, 1000), bits = Math.ceil(Math.log2(n));
  return { prompt: `What is the minimum number of bits needed to give ${n} items each a unique binary code?`, correct: String(bits), wrong: [String(bits - 1), String(bits + 1), String(Math.ceil(n / 8))].filter((x, i, a) => a.indexOf(x) === i && x !== String(bits)).concat(String(bits + 2)).slice(0, 3), explanation: `2^${bits - 1} = ${2 ** (bits - 1)} is too few; 2^${bits} = ${2 ** bits} is enough.` }; };
const EXPRS: [string, (p: boolean, q: boolean) => boolean][] = [['p AND q', (p, q) => p && q], ['p OR q', (p, q) => p || q], ['NOT p', p => !p], ['NOT q', (_, q) => !q], ['p → q', (p, q) => !p || q],
  ['p XOR q', (p, q) => p !== q], ['NOT (p OR q)', (p, q) => !(p || q)], ['p AND NOT q', (p, q) => p && !q], ['NOT p AND q', (p, q) => !p && q], ['p ↔ q', (p, q) => p === q]];
const logic: Gen = r => { const p = r.next() < 0.5, q = r.next() < 0.5, t = EXPRS.filter(e => e[1](p, q)), fl = EXPRS.filter(e => !e[1](p, q)), right = r.pick(t);
  return { prompt: `If p is ${p ? 'true' : 'false'} and q is ${q ? 'true' : 'false'}, which expression is TRUE?`, correct: right[0], wrong: r.shuffle(fl).slice(0, 3).map(e => e[0]), explanation: `With p = ${p ? 'T' : 'F'}, q = ${q ? 'T' : 'F'}: "${right[0]}" evaluates to true; the others are false.` }; };
const GATES: [string, (a: number, b: number) => number][] = [['AND', (a, b) => a & b], ['OR', (a, b) => a | b], ['XOR', (a, b) => a ^ b], ['NAND', (a, b) => 1 - (a & b)], ['NOR', (a, b) => 1 - (a | b)], ['XNOR', (a, b) => 1 - (a ^ b)]];
const gates: Gen = r => { const a = r.int(0, 1), b = r.int(0, 1), on = GATES.filter(g => g[1](a, b)), off = GATES.filter(g => !g[1](a, b)), right = r.pick(on);
  return { prompt: `Inputs A = ${a} and B = ${b}. Which logic gate outputs 1?`, correct: right[0], wrong: r.shuffle(off).map(g => g[0]), explanation: `${right[0]}(${a}, ${b}) = 1. The others output 0 for these inputs.` }; };

// ---------------- Linear algebra ----------------
const det2: Gen = r => { const [a, b, c, d] = [r.int(-5, 9), r.int(-5, 9), r.int(-5, 9), r.int(-5, 9)], v = a * d - b * c;
  return { prompt: `What is the determinant of [[${a}, ${b}], [${c}, ${d}]]?`, correct: String(v), wrong: [String(a * d + b * c), String(b * c - a * d), String(a * b - c * d)], explanation: `det = ad − bc = (${a})(${d}) − (${b})(${c}) = ${v}.` }; };
const dot: Gen = r => { const x = [r.int(-5, 6), r.int(-5, 6), r.int(-5, 6)], y = [r.int(-5, 6), r.int(-5, 6), r.int(-5, 6)], v = x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
  return { prompt: `What is the dot product of ⟨${x.join(', ')}⟩ and ⟨${y.join(', ')}⟩?`, correct: String(v), wrong: [String(x[0] * y[0]), String(x.reduce((a, b) => a + b, 0) * y.reduce((a, b) => a + b, 0)), String(v + 1)], explanation: `${x.map((xi, i) => `(${xi})(${y[i]})`).join(' + ')} = ${v}.` }; };
const magnitude: Gen = r => { const [v, m] = r.pick([[[3, 4], 5], [[5, 12], 13], [[6, 8], 10], [[8, 15], 17], [[2, 3, 6], 7], [[1, 2, 2], 3], [[2, 6, 9], 11]] as [number[], number][]);
  return { prompt: `What is the magnitude of the vector ⟨${v.join(', ')}⟩?`, correct: String(m), wrong: [String(v.reduce((a, b) => a + b, 0)), String(m * m), String(m + 1)], explanation: `√(${v.map(x => `${x}²`).join(' + ')}) = √${m * m} = ${m}.` }; };
const matvec: Gen = r => { const [a, b, c, d, x, y] = [r.int(-4, 6), r.int(-4, 6), r.int(-4, 6), r.int(-4, 6), r.int(-4, 6), r.int(-4, 6)], top = a * x + b * y;
  return { prompt: `What is the first entry of [[${a}, ${b}], [${c}, ${d}]] · ⟨${x}, ${y}⟩?`, correct: String(top), wrong: [String(c * x + d * y) === String(top) ? String(top + 2) : String(c * x + d * y), String(a * x + c * y) === String(top) ? String(top - 1) : String(a * x + c * y), String(a * b + x * y) === String(top) ? String(top + 3) : String(a * b + x * y)], explanation: `Row 1 · vector = (${a})(${x}) + (${b})(${y}) = ${top}.` }; };

// ---------------- Biology ----------------
const punnett: Gen = r => { const G = ['AA', 'Aa', 'aa'], p1 = r.pick(G), p2 = r.pick(G);
  let rec = 0; for (const x of p1) for (const y of p2) if (x === 'a' && y === 'a') rec++;
  const recessive = r.next() < 0.5, pct = (recessive ? rec : 4 - rec) * 25;
  return { prompt: `A is dominant over a. In a cross ${p1} × ${p2}, what percent of offspring are expected to show the ${recessive ? 'recessive' : 'dominant'} trait?`, correct: `${pct}%`, wrong: r.shuffle(['0%', '25%', '50%', '75%', '100%'].filter(v => v !== `${pct}%`)).slice(0, 3), explanation: `The Punnett square gives ${rec} of 4 boxes aa (recessive), so ${pct}% show the ${recessive ? 'recessive' : 'dominant'} trait.` }; };
const hardy: Gen = r => { const q = r.int(1, 9) / 10, p = 1 - q, ask = r.int(0, 1);
  return ask === 0
    ? { prompt: `In a population in Hardy–Weinberg equilibrium, ${f2(q * q * 100)}% show the recessive phenotype. What is the frequency of the recessive allele (q)?`, correct: f2(q), wrong: [f2(q * q), f2(p), f2(q / 2)].filter((x, i, a) => a.indexOf(x) === i && x !== f2(q)).concat(f2(Math.min(q + 0.1, 0.95))).slice(0, 3), explanation: `q² = ${f2(q * q)}, so q = √${f2(q * q)} = ${f2(q)}.` }
    : { prompt: `In Hardy–Weinberg equilibrium with q = ${f2(q)}, what percent of the population is heterozygous?`, correct: `${f2(2 * p * q * 100)}%`, wrong: [`${f2(p * q * 100)}%`, `${f2(q * q * 100)}%`, `${f2(p * p * 100)}%`].filter(x => x !== `${f2(2 * p * q * 100)}%`).concat(`${f2(2 * p * q * 100 + 5)}%`).slice(0, 3), explanation: `2pq = 2 × ${f2(p)} × ${f2(q)} = ${f2(2 * p * q)} → ${f2(2 * p * q * 100)}%.` }; };

// ---------------- Economics ----------------
const elasticity: Gen = r => { const dp = r.pick([5, 10, 20, 25]), e = r.pick([0.5, 0.8, 1.5, 2, 3]), dq = e * dp;
  return { prompt: `When the price rises ${dp}%, quantity demanded falls ${f2(dq)}%. What is the price elasticity of demand (absolute value)?`, correct: f2(e), wrong: [f2(dp / dq), f2(Math.abs(dq - dp)), f2(e + 1)].filter((x, i, a) => a.indexOf(x) === i && x !== f2(e)).concat(f2(e * 2)).slice(0, 3), explanation: `E = %ΔQ ÷ %ΔP = ${f2(dq)} ÷ ${dp} = ${f2(e)}, which is ${e > 1 ? 'elastic' : 'inelastic'}.` }; };
const multiplier: Gen = r => { const mpc = r.pick([0.5, 0.6, 0.75, 0.8, 0.9]), m = 1 / (1 - mpc), spend = r.int(1, 20) * 10, ask = r.next() < 0.5;
  return ask ? { prompt: `If the marginal propensity to consume is ${mpc}, what is the spending multiplier?`, correct: f2(m), wrong: [f2(1 / mpc), f2(mpc), f2(m + 1)], explanation: `Multiplier = 1 ÷ (1 − MPC) = 1 ÷ ${f2(1 - mpc)} = ${f2(m)}.` }
    : { prompt: `With an MPC of ${mpc}, government spending rises by $${spend} billion. What is the maximum change in GDP?`, correct: `$${f2(spend * m)} billion`, wrong: [`$${spend} billion`, `$${f2(spend * mpc)} billion`, `$${f2(spend / mpc)} billion`], explanation: `ΔGDP = multiplier × spending = ${f2(m)} × ${spend} = $${f2(spend * m)} billion.` }; };
const gdp: Gen = r => { const Cn = r.int(10, 30) * 100, I = r.int(2, 8) * 100, G = r.int(3, 10) * 100, X = r.int(1, 6) * 100, M = r.int(1, 6) * 100, v = Cn + I + G + X - M;
  return { prompt: `C = $${Cn}B, I = $${I}B, G = $${G}B, exports = $${X}B, imports = $${M}B. What is GDP?`, correct: `$${v}B`, wrong: [`$${Cn + I + G + X + M}B`, `$${Cn + I + G}B`, `$${v + M}B` === `$${Cn + I + G + X + M}B` ? `$${v - 100}B` : `$${v + M}B`], explanation: `GDP = C + I + G + (X − M) = ${Cn} + ${I} + ${G} + (${X} − ${M}) = $${v}B.` }; };
const unemployment: Gen = r => { const lf = r.int(2, 20) * 100, rate = r.pick([3, 4, 5, 6, 8, 10, 12]), un = lf * rate / 100;
  return { prompt: `A country's labor force is ${lf} thousand people and ${f2(un)} thousand are unemployed. What is the unemployment rate?`, correct: `${rate}%`, wrong: [`${f2(un / (lf + un) * 100)}%`, `${100 - rate}%`, `${rate + 2}%`], explanation: `Rate = unemployed ÷ labor force × 100 = ${f2(un)} ÷ ${lf} × 100 = ${rate}%.` }; };
const inflation: Gen = r => { const c1 = r.pick([100, 120, 150, 200, 250]), pct = r.pick([2, 4, 5, 10]), c2 = c1 * (1 + pct / 100);
  return { prompt: `The CPI rises from ${c1} to ${f2(c2)} in a year. What is the inflation rate?`, correct: `${pct}%`, wrong: [`${f2(c2 - c1)}%` === `${pct}%` ? `${pct + 1}%` : `${f2(c2 - c1)}%`, `${f2((c2 - c1) / c2 * 100)}%`, `${pct * 2}%`], explanation: `(${f2(c2)} − ${c1}) ÷ ${c1} × 100 = ${pct}%.` }; };

// ---------------- Music theory ----------------
const NOTES: [string, number][] = [['C', 0], ['D', 2], ['E', 4], ['F', 5], ['G', 7], ['A', 9], ['B', 11]];
const INTERVALS = ['unison', 'minor 2nd', 'major 2nd', 'minor 3rd', 'major 3rd', 'perfect 4th', 'tritone', 'perfect 5th', 'minor 6th', 'major 6th', 'minor 7th', 'major 7th'];
const interval: Gen = r => { const i = r.int(0, 5), j = r.int(i + 1, 6), [n1, s1] = NOTES[i], [n2, s2] = NOTES[j], semi = s2 - s1, name = INTERVALS[semi];
  return { prompt: `What is the interval from ${n1} up to ${n2}?`, correct: name, wrong: r.shuffle(INTERVALS.filter(x => x !== name && x !== 'unison')).slice(0, 3), explanation: `${n1} to ${n2} spans ${semi} half steps, which is a ${name}.` }; };
const semitones: Gen = r => { const semi = r.int(1, 11), name = INTERVALS[semi];
  return { prompt: `How many half steps are in a ${name}?`, correct: String(semi), wrong: r.shuffle(Array.from({ length: 12 }, (_, i) => String(i)).filter(x => x !== String(semi))).slice(0, 3), explanation: `A ${name} spans ${semi} half steps.` }; };

// ---------------- ACT Science (data reading) ----------------
const actTable: Gen = r => { const a = r.int(10, 40), b = r.int(2, 8), Ts = [10, 20, 30, 40, 50], vals = Ts.map(T => a + b * T / 10), ask = r.int(0, 2);
  const table = `Temperature (°C): ${Ts.join(', ')}\nSolubility (g/100 mL): ${vals.join(', ')}`;
  if (ask === 0) { const k = r.int(0, 4); return { prompt: `${table}\n\nWhat is the solubility at ${Ts[k]}°C?`, correct: `${vals[k]} g`, wrong: r.shuffle(vals.filter((_, i) => i !== k)).slice(0, 3).map(v => `${v} g`), explanation: `Read straight from the table: ${Ts[k]}°C → ${vals[k]} g/100 mL.` }; }
  if (ask === 1) { const v = a + b * 6; return { prompt: `${table}\n\nIf the trend continues, what is the solubility at 60°C?`, correct: `${v} g`, wrong: [`${vals[4]} g`, `${v + b} g`, `${v - 2 * b} g`], explanation: `It rises ${b} g every 10°C, so ${vals[4]} + ${b} = ${v} g at 60°C.` }; }
  return { prompt: `${table}\n\nWhich statement best describes the data?`, correct: 'Solubility increases as temperature increases', wrong: ['Solubility decreases as temperature increases', 'Solubility stays the same at all temperatures', 'Solubility increases, then decreases'], explanation: `Every value is larger than the one before it.` }; };

export const STEM = { speed, accel, newton2, weight, kinetic, potential, momentum, work, power, ohm, elecPower, wave, density, pressure, freefall, kinematics, series, parallel,
  molarMass, moles, molarity, dilution, pH, boyle, charles, atomParts, stoich,
  powerRule, derivAt, limitHole, limitInf, integral, chain, expDeriv, geoSeries,
  logs, arith, geom, trigExact, radians, compose, compound,
  zscore, combos, diceSum, indep, expected,
  modArith, gcdLcm, binDec, bitsNeeded, logic, gates, det2, dot, magnitude, matvec,
  punnett, hardy, elasticity, multiplier, gdp, unemployment, inflation, interval, semitones, actTable };
