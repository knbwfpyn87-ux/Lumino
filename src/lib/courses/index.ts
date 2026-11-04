// Class-based courses: each class has units; each unit has 3 levels that get harder.
// Pass a level (70%+) to unlock the next one; finish a unit's Level 1 to open the next unit.
import { G, Rng, build, type Gen } from '../generated';
import { CSA_UNITS } from './csa';
import type { Test } from '../store';
import type { Tier } from '../plans';

export type Unit = { title: string; topics: string; levels: Gen[][] };
export type Course = { id: string; name: string; subject: string; level: string; emoji: string; units: Unit[] };

// For math/English classes: L1 = the unit's skill, L2 = + previous unit, L3 = cumulative mix.
function ladder(units: { title: string; topics: string; gens: Gen[] }[]): Unit[] {
  return units.map((u, i) => ({ title: u.title, topics: u.topics, levels: [
    u.gens,
    [...u.gens, ...u.gens, ...(units[i - 1]?.gens ?? u.gens)],
    [...u.gens, ...units.slice(0, i + 1).flatMap(x => x.gens)],
  ] }));
}

export const COURSES: Course[] = [
  { id: 'ap-csa', name: 'AP Computer Science A', subject: 'AP Computer Science A', level: 'AP', emoji: '💻', units: CSA_UNITS },
  { id: 'alg1', name: 'Algebra I', subject: 'Algebra I', level: 'Standard', emoji: '➗', units: ladder([
    { title: 'Linear Equations', topics: 'solving one-variable equations', gens: [G.linear] },
    { title: 'Inequalities', topics: 'solving and flipping signs', gens: [G.inequality] },
    { title: 'Slope & Lines', topics: 'slope from two points', gens: [G.slope] },
    { title: 'Ratios & Percents', topics: 'proportions, percent of a number', gens: [G.proportion, G.percentOf] },
    { title: 'Systems of Equations', topics: 'solving two equations', gens: [G.system2] },
    { title: 'Exponents', topics: 'exponent rules', gens: [G.exponent] },
  ]) },
  { id: 'geo', name: 'Geometry', subject: 'Geometry', level: 'Standard', emoji: '📐', units: ladder([
    { title: 'Angles', topics: 'triangle angle sum', gens: [G.angles] },
    { title: 'Area', topics: 'rectangles, triangles, circles', gens: [G.area] },
    { title: 'Right Triangles', topics: 'Pythagorean theorem', gens: [G.pyth] },
  ]) },
  { id: 'alg2', name: 'Algebra II', subject: 'Algebra II', level: 'Honors', emoji: '📈', units: ladder([
    { title: 'Functions', topics: 'evaluating f(x)', gens: [G.funcEval] },
    { title: 'Exponent Rules', topics: 'products and powers', gens: [G.exponent] },
    { title: 'Quadratics', topics: 'sum and product of roots', gens: [G.quadRoots] },
    { title: 'Systems', topics: 'linear systems', gens: [G.system2] },
  ]) },
  { id: 'ap-stats', name: 'AP Statistics', subject: 'AP Statistics', level: 'AP', emoji: '📊', units: ladder([
    { title: 'Center', topics: 'mean and median', gens: [G.median, G.meanFind] },
    { title: 'Percents & Change', topics: 'percent change', gens: [G.percentChange, G.percentOf] },
    { title: 'Rates', topics: 'rates and proportions', gens: [G.drt, G.proportion] },
  ]) },
  { id: 'sat-math', name: 'SAT Math', subject: 'SAT', level: 'Standard', emoji: '🎯', units: ladder([
    { title: 'Algebra', topics: 'linear equations, inequalities, systems', gens: [G.linear, G.inequality, G.system2] },
    { title: 'Advanced Math', topics: 'functions, quadratics, exponents', gens: [G.funcEval, G.quadRoots, G.exponent] },
    { title: 'Problem Solving & Data', topics: 'percents, ratios, statistics', gens: [G.percentOf, G.percentChange, G.median, G.proportion] },
    { title: 'Geometry & Trig', topics: 'area, angles, right triangles', gens: [G.area, G.angles, G.pyth] },
  ]) },
  { id: 'sat-rw', name: 'SAT Reading & Writing', subject: 'SAT', level: 'Standard', emoji: '📖', units: ladder([
    { title: 'Words in Context', topics: 'vocabulary', gens: [G.vocab] },
    { title: 'Standard English', topics: 'subject-verb agreement', gens: [G.sva] },
    { title: 'Transitions', topics: 'logical connectors', gens: [G.transition] },
  ]) },
];

/** Plan needed for a unit: Basic gets the first 2 units, Premium ~70% of units, Premium+ everything. */
export function unitTier(course: Course, unitIdx: number): Tier {
  if (unitIdx < 2) return 'free';
  return unitIdx < Math.ceil(course.units.length * 0.7) ? 'plus' : 'pro';
}

export const courseTestId = (courseId: string, u: number, l: number, attempt: number) => `course~${courseId}~${u}~${l}~${attempt}`;
export function parseCourseTestId(id: string) {
  const [tag, courseId, u, l, attempt] = id.split('~');
  if (tag !== 'course') return null;
  return { courseId, u: Number(u), l: Number(l), attempt: Number(attempt) };
}
/** Builds a 10-question test for a unit level. A new attempt number gives fresh questions. */
export function buildCourseTest(id: string): (Test & { tier: Tier }) | null {
  const p = parseCourseTestId(id); if (!p) return null;
  const course = COURSES.find(c => c.id === p.courseId); const unit = course?.units[p.u]; const gens = unit?.levels[p.l];
  if (!course || !unit || !gens) return null;
  const r = new Rng(hash(id));
  const questions = Array.from({ length: 10 }, (_, i) => build(gens[i % gens.length], r, `${id}-${i}`));
  return { id, tier: unitTier(course, p.u), title: `${course.name} · Unit ${p.u + 1}: ${unit.title} · Level ${p.l + 1}`, subject: course.subject, level: course.level, author: 'Lumino', questions: r.shuffle(questions) };
}
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

// ---------- Progress (best score per unit level; saved on this device) ----------
const KEY = 'lumino:courses';
type Progress = Record<string, { best: number; attempts: number }>; // key: course~u~l
export function getCourseProgress(): Progress { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; } }
export function recordCourseResult(id: string, pct: number) {
  const p = parseCourseTestId(id); if (!p) return;
  const all = getCourseProgress(); const k = `${p.courseId}~${p.u}~${p.l}`; const cur = all[k] ?? { best: 0, attempts: 0 };
  all[k] = { best: Math.max(cur.best, pct), attempts: cur.attempts + 1 };
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* ignore */ }
}
export const PASS = 0.7;
export function levelState(courseId: string, u: number, l: number, prog = getCourseProgress()) {
  const best = prog[`${courseId}~${u}~${l}`]?.best ?? 0;
  const passed = (uu: number, ll: number) => (prog[`${courseId}~${uu}~${ll}`]?.best ?? 0) >= PASS;
  const unlocked = l > 0 ? passed(u, l - 1) : u === 0 || passed(u - 1, 0);
  return { best, passed: best >= PASS, unlocked, attempts: prog[`${courseId}~${u}~${l}`]?.attempts ?? 0 };
}
