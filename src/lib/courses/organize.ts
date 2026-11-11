// How classes are grouped everywhere (website and iPhone): by subject, then by level.
// IB and college classes sit with their subject (IB Biology next to Biology); test prep has its own home.
import type { Course } from './ladder';

export const SUBJECTS = ['Math', 'Science', 'English', 'History & Social Studies', 'World Languages', 'Computer Science', 'Arts'] as const;
export type Subject = typeof SUBJECTS[number];
export const LEVEL_ORDER = ['Standard', 'Honors', 'AP', 'IB', 'College'] as const;
export const LEVEL_FILTERS = [{ key: 'all', label: 'All levels' }, { key: 'core', label: 'Standard & Honors' }, { key: 'AP', label: 'AP' }, { key: 'IB', label: 'IB' }, { key: 'College', label: 'College' }] as const;
export type LevelFilter = typeof LEVEL_FILTERS[number]['key'];

/** IB and college classes, by subject. */
const BY_ID: Record<string, Subject> = {
  'ib-math-aa': 'Math', 'ib-math-ai': 'Math', 'college-calc1': 'Math', 'college-calc2': 'Math', 'college-stats': 'Math',
  'ib-physics': 'Science', 'ib-chem': 'Science', 'ib-bio': 'Science', 'ib-ess': 'Science', 'gen-chem': 'Science', 'univ-physics': 'Science', 'college-bio': 'Science',
  'ib-english': 'English', 'comp-1': 'English',
  'ib-history': 'History & Social Studies', 'ib-econ': 'History & Social Studies', 'ib-business': 'History & Social Studies', 'ib-psych': 'History & Social Studies',
  'intro-psych-college': 'History & Social Studies', 'micro-macro': 'History & Social Studies',
  'ib-spanish': 'World Languages', 'ib-french': 'World Languages', 'ib-cs': 'Computer Science',
};
export const isTestPrep = (c: Pick<Course, 'category'>) => c.category === 'Test Prep';
export function subjectOf(c: Pick<Course, 'id' | 'category'>): Subject | 'Test Prep' {
  if (c.category === 'Test Prep') return 'Test Prep';
  return (SUBJECTS as readonly string[]).includes(c.category) ? c.category as Subject : BY_ID[c.id] ?? 'Math';
}
/** The usual course sequence within a level (classes not listed keep the catalog order, after these). */
const SEQUENCE = ['prealg', 'alg1', 'geo', 'stats', 'alg2', 'trig', 'precalc', 'calc', 'ap-precalc', 'ap-calc-ab', 'ap-calc-bc', 'ap-stats', 'ib-math-aa', 'ib-math-ai',
  'college-calc1', 'college-calc2', 'college-stats', 'discrete', 'linalg',
  'earth', 'bio', 'chem', 'phys', 'env', 'ap-bio', 'ap-chem', 'apes', 'ap-phys1', 'ap-phys2', 'ap-physc', 'ib-bio', 'ib-chem', 'ib-physics', 'ib-ess', 'college-bio', 'gen-chem', 'univ-physics',
  'world-history', 'us-history', 'civics', 'econ', 'psych', 'business', 'ap-world', 'apush', 'ap-euro', 'ap-gov', 'ap-hug', 'ap-psych', 'ap-macro', 'ap-micro', 'ib-history', 'ib-econ', 'ib-business', 'ib-psych',
  'spanish1', 'spanish2', 'ap-spanish', 'ib-spanish', 'french1', 'french2', 'ib-french', 'intro-cs', 'engineering', 'digital-electronics', 'ap-csp', 'ap-csa', 'ib-cs', 'data-structures'];
const seqRank = (id: string) => { const i = SEQUENCE.indexOf(id); return i < 0 ? 999 : i; };
const levelRank = (l: string) => { const i = (LEVEL_ORDER as readonly string[]).indexOf(l); return i < 0 ? 0 : i; };
export function matchesLevel(c: Pick<Course, 'level'>, f: LevelFilter) { return f === 'all' || (f === 'core' ? levelRank(c.level) <= 1 : c.level === f); }

/** Classes (not test prep) grouped by subject, each sorted Standard → Honors → AP → IB → College (in the usual course sequence within a level). */
export function groupBySubject<T extends Pick<Course, 'id' | 'category' | 'level' | 'name'>>(courses: T[]) {
  return SUBJECTS.map(subject => ({ subject, courses: courses.filter(c => subjectOf(c) === subject).sort((a, b) => levelRank(a.level) - levelRank(b.level) || seqRank(a.id) - seqRank(b.id)) }))
    .filter(g => g.courses.length);
}

/** Test prep, grouped by exam. */
export const PREP_GROUPS = [
  { exam: 'SAT', blurb: 'The Digital SAT: Reading and Writing, then Math. 400–1600.', ids: ['sat-math', 'sat-rw'], testPrefix: 'sat-' },
  { exam: 'PSAT/NMSQT', blurb: 'Practice for the SAT and the gateway to National Merit Scholarships.', ids: ['psat'], testPrefix: null },
  { exam: 'ACT', blurb: 'English, Math, Reading and Science (optional). 1–36.', ids: ['act-english', 'act-math', 'act-science'], testPrefix: null },
] as const;

/** Lessons worth jumping straight to before test day: [course, lesson title starts with, label]. */
export const SAT_TOOLKIT: [string, string, string][] = [
  ['sat-math', 'Desmos basics', 'Desmos basics'], ['sat-math', 'Solving equations and systems with Desmos', 'Solve with Desmos'],
  ['sat-math', 'Quadratics, functions and sliders', 'Quadratics & sliders'], ['sat-math', 'Statistics, tables and regression', 'Stats in Desmos'],
  ['sat-math', 'Desmos strategy', 'When to use Desmos'], ['sat-math', 'Student-produced responses', 'Typing in your answers'],
  ['sat-math', 'The reference sheet and test day', 'Reference sheet & test day'], ['sat-rw', 'Bluebook tools and test day', 'Bluebook tools'],
  ['sat-math', 'Pacing and test strategies', 'Pacing & strategy'], ['sat-rw', 'Process of elimination', 'Process of elimination'],
];
/** Finds [unit, lesson] for a lesson title in a course. */
export function findLesson(c: Course | undefined, titleStart: string): [number, number] | null {
  if (!c) return null;
  for (let u = 0; u < c.units.length; u++) { const l = (c.units[u].lessons ?? []).findIndex(x => x.title.startsWith(titleStart)); if (l >= 0) return [u, l]; }
  return null;
}
