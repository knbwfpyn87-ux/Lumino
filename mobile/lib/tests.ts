// Resolves any test id the app can open: course levels, built-in tests, and quick "sprints".
import { buildCourseTest, COURSES, unitTier, levelState, getCourseProgress, courseTestId } from '@shared/courses';
import { GENERATED_TESTS, Rng, build } from '@shared/generated';
import { SAT_TESTS } from '@shared/sat';
import { BUILTIN_TESTS } from '@shared/catalog';
import { tierOf, canAccess, type Plan } from '@shared/plans';
import type { Test } from '@shared/store';

export const ALL_TESTS: Test[] = [...BUILTIN_TESTS, ...SAT_TESTS, ...GENERATED_TESTS];

/** A 5-question sprint drawn from the unlocked levels of your classes. */
export function sprintTest(seed: number, classIds: string[], plan: Plan): Test {
  const r = new Rng(seed); const prog = getCourseProgress();
  const pool = (classIds.length ? classIds : ['sat-math', 'alg1']).flatMap(id => { const c = COURSES.find(x => x.id === id); if (!c) return [];
    return c.units.flatMap((u, ui) => canAccess(plan, unitTier(c, ui)) ? u.levels.flatMap((g, li) => levelState(id, ui, li, prog).unlocked ? g : []) : []); });
  const gens = pool.length ? pool : COURSES[5].units[0].levels[0];
  return { id: `sprint~${seed}`, title: '60-second sprint', subject: 'Mixed', level: 'Standard', author: 'Lumino', questions: Array.from({ length: 5 }, (_, i) => build(r.pick(gens), r, `sprint-${seed}-${i}`)) };
}
export function resolveTest(id: string, classIds: string[], plan: Plan): Test | null {
  if (id.startsWith('sprint~')) return sprintTest(Number(id.split('~')[1]), classIds, plan);
  return buildCourseTest(id) ?? ALL_TESTS.find(t => t.id === id) ?? null;
}
/** The next level to play in a class: first unlocked level that isn't passed yet. */
export function nextLevel(courseId: string, plan: Plan) {
  const c = COURSES.find(x => x.id === courseId); if (!c) return null; const prog = getCourseProgress();
  for (let u = 0; u < c.units.length; u++) for (let l = 0; l < 3; l++) {
    const s = levelState(courseId, u, l, prog);
    if (s.unlocked && !s.passed) return { course: c, u, l, locked: !canAccess(plan, unitTier(c, u)), id: courseTestId(courseId, u, l, s.attempts) };
  }
  return null;
}
export { COURSES, unitTier, levelState, getCourseProgress, courseTestId, tierOf, canAccess };
