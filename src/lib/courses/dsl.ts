// Lumino course format: classes are written as plain text (src/lib/courses/content/*.ts) so lessons are quick to write and review.
// scripts/build-courses.ts parses them into practice data (loads instantly) and lesson text (loads when you open a lesson).
//
//   @course alg1 | Algebra I | Standard | ➗ | Math            (optional 6th field: subject)
//   @unit Linear Equations | one-line summary
//   @lesson Solving two-step equations
//   say: What Mr. Lumino says out loud when the lesson opens.
//   key: The big idea, shown in a highlighted box.
//   ## A subheading
//   Each plain line is a paragraph.
//   - bullet points
//   ex: A worked example problem
//   > each step on its own line
//   = the answer
//   tip: a helpful trick          oops: a common mistake
//   code:                         (then lines starting with "| " are the code)
//   term: word = definition       (key vocabulary; also becomes practice questions)
//   q: Quick-check question? | *right answer | wrong | wrong | wrong
//   why: explanation shown after answering          qcode: then "| " lines = code for the question
//   gen: linear, slope            (calculated practice generators, see registry.ts)
//   lab: / demo:                  an interactive virtual lab or real-world demo (see lab.ts for its lines)

import { lintLab, type LabBlock } from './lab';
export type { LabBlock };

export type Block =
  | { t: 'p'; text: string } | { t: 'h'; text: string } | { t: 'list'; items: string[] } | { t: 'key'; text: string }
  | { t: 'ex'; problem: string; steps: string[]; answer: string } | { t: 'tip'; text: string } | { t: 'oops'; text: string } | { t: 'code'; text: string } | LabBlock;
export type Check = { q: string; choices: string[]; answer: number; why: string; code?: string };
export type LessonSrc = { title: string; say: string; blocks: Block[]; terms: [string, string][]; checks: Check[]; gens: string[] };
export type UnitSrc = { title: string; summary: string; lessons: LessonSrc[] };
export type CourseMeta = { id: string; name: string; level: string; emoji: string; category: string; subject: string };
export type CourseSrc = CourseMeta & { units: UnitSrc[] };

export class CourseSyntaxError extends Error {}
const TAGS = new Set(['say', 'key', 'tip', 'oops', 'ex', 'code', 'term', 'q', 'why', 'qcode', 'gen', 'lab', 'demo', 'aim', 'set', 'out', 'plot', 'step', 'noise', 'result', 'sim']);

export function parseCourse(text: string, file = 'course'): CourseSrc {
  const lines = text.replace(/\r/g, '').split('\n');
  let course: CourseSrc | null = null; let unit: UnitSrc | null = null; let lesson: LessonSrc | null = null;
  let para: string[] = []; let codeTarget: { text: string } | Check | null = null;
  const fail = (n: number, msg: string): never => { throw new CourseSyntaxError(`${file}:${n + 1}: ${msg}`); };
  const flush = () => { if (para.length && lesson) lesson.blocks.push({ t: 'p', text: para.join(' ') }); para = []; };
  const needLesson = (n: number) => lesson ?? fail(n, 'text outside a @lesson');

  lines.forEach((raw, n) => {
    const line = raw.trim();
    if (raw.startsWith('| ') || raw === '|') { // code line
      if (!codeTarget) fail(n, '"| " code line without code: or qcode:');
      const c = raw.slice(2); if ('q' in codeTarget!) codeTarget.code = codeTarget.code == null ? c : `${codeTarget.code}\n${c}`; else codeTarget!.text = codeTarget!.text ? `${codeTarget!.text}\n${c}` : c;
      return;
    }
    codeTarget = null;
    if (!line) { flush(); return; }
    if (line.startsWith('//')) return; // comment
    const word = /^([a-z]+):/.exec(line)?.[1] ?? '';
    const tag = line.startsWith('@') ? line.split(/\s/)[0] : TAGS.has(word) ? word : '';
    const rest = (s: string) => line.slice(s.length).replace(/^:?\s*/, '');
    if (tag === '@course') {
      const [id, name, level, emoji, category, subject] = rest('@course').split(' | ').map(s => s.trim());
      if (!id || !name || !level || !emoji || !category) fail(n, '@course needs id | name | level | emoji | category');
      course = { id, name, level, emoji, category, subject: subject || name, units: [] }; return;
    }
    if (!course) fail(n, 'file must start with @course');
    if (tag === '@unit') { flush(); const [title, summary = ''] = rest('@unit').split(' | '); unit = { title: title.trim(), summary: summary.trim(), lessons: [] }; course!.units.push(unit); lesson = null; return; }
    if (tag === '@lesson') { flush(); if (!unit) fail(n, '@lesson before any @unit'); lesson = { title: rest('@lesson'), say: '', blocks: [], terms: [], checks: [], gens: [] }; unit!.lessons.push(lesson); return; }
    const L = needLesson(n);
    if (line.startsWith('## ')) { flush(); L.blocks.push({ t: 'h', text: line.slice(3) }); return; }
    if (line.startsWith('- ')) { flush(); const last = L.blocks.at(-1); if (last?.t === 'list') last.items.push(line.slice(2)); else L.blocks.push({ t: 'list', items: [line.slice(2)] }); return; }
    if (line.startsWith('> ')) { const ex = L.blocks.at(-1); if (ex?.t !== 'ex') fail(n, '"> step" must follow ex:'); (ex as Extract<Block, { t: 'ex' }>).steps.push(line.slice(2)); return; }
    if (line.startsWith('= ')) { const ex = L.blocks.at(-1); if (ex?.t !== 'ex') fail(n, '"= answer" must follow ex:'); (ex as Extract<Block, { t: 'ex' }>).answer = line.slice(2); return; }
    switch (tag) {
      case 'say': L.say = rest('say'); return;
      case 'key': flush(); L.blocks.push({ t: 'key', text: rest('key') }); return;
      case 'tip': flush(); L.blocks.push({ t: 'tip', text: rest('tip') }); return;
      case 'oops': flush(); L.blocks.push({ t: 'oops', text: rest('oops') }); return;
      case 'ex': flush(); L.blocks.push({ t: 'ex', problem: rest('ex'), steps: [], answer: '' }); return;
      case 'code': { flush(); const b = { t: 'code' as const, text: '' }; L.blocks.push(b); codeTarget = b; return; }
      case 'term': { const s = rest('term'); const i = s.indexOf(' = '); if (i < 1) fail(n, 'term: needs "word = definition"'); L.terms.push([s.slice(0, i).trim(), s.slice(i + 3).trim()]); return; }
      case 'q': {
        const parts = rest('q').split(' | ').map(s => s.trim()); const q = parts.shift()!; const right = parts.findIndex(p => p.startsWith('*'));
        if (parts.length !== 4) fail(n, `q: needs exactly 4 choices (got ${parts.length})`);
        if (right < 0 || parts.filter(p => p.startsWith('*')).length !== 1) fail(n, 'q: mark exactly one choice with *');
        const choices = parts.map(p => p.replace(/^\*/, '').trim()); if (new Set(choices).size !== 4) fail(n, 'q: choices must all be different');
        L.checks.push({ q, choices, answer: right, why: '' }); return;
      }
      case 'why': { const c = L.checks.at(-1); if (!c) fail(n, 'why: must follow q:'); c!.why = rest('why'); return; }
      case 'qcode': { const c = L.checks.at(-1); if (!c) fail(n, 'qcode: must follow q:'); codeTarget = c!; return; }
      case 'lab': case 'demo': flush(); L.blocks.push({ t: 'lab', kind: tag as 'lab' | 'demo', title: rest(tag), aim: '', sets: [], outs: [], steps: [], noise: 0, result: '' }); return;
      case 'aim': case 'set': case 'out': case 'plot': case 'step': case 'noise': case 'result': case 'sim': {
        const lab = L.blocks.at(-1); if (lab?.t !== 'lab') fail(n, `${tag}: must follow lab: or demo:`);
        const b = lab as LabBlock; const s = rest(tag);
        if (tag === 'aim') b.aim = s; else if (tag === 'step') b.steps.push(s); else if (tag === 'result') b.result = s;
        else if (tag === 'noise') b.noise = Number(s);
        else if (tag === 'sim') {
          const [scene, pairs = ''] = s.split('|').map(z => z.trim());
          b.sim = { scene, map: Object.fromEntries(pairs.split(',').map(z => z.split('=').map(y => y.trim())).filter(([k, v]) => k && v)) };
        }
        else if (tag === 'plot') { const [x, y] = s.split(',').map(z => z.trim()); b.plot = { x, y }; }
        else if (tag === 'set') {
          const m = /^(\w+)\s*=\s*(-?[\d.e]+)\s*\|\s*(.+?)\s*\|\s*(-?[\d.e]+)\s+to\s+(-?[\d.e]+)\s+by\s+([\d.e]+)$/.exec(s);
          if (!m) fail(n, 'set: needs "name = start | label | min to max by step"');
          b.sets.push({ name: m![1], start: +m![2], label: m![3], min: +m![4], max: +m![5], step: +m![6] });
        } else {
          const m = /^(\w+)\s*=\s*(.+?)\s*\|\s*(.+)$/.exec(s); if (!m) fail(n, 'out: needs "name = formula | label"');
          b.outs.push({ name: m![1], expr: m![2], label: m![3] });
        }
        return;
      }
      case 'gen': L.gens.push(...rest('gen').split(',').map(s => s.trim()).filter(Boolean)); return;
    }
    flush(); para.push(line); flush();
  });
  flush();
  if (!course) throw new CourseSyntaxError(`${file}: empty`);
  return course;
}

/** Problems a reviewer should fix (the build fails on these). */
export function lintCourse(c: CourseSrc, knownGens: Set<string>): string[] {
  const out: string[] = []; const where = (u: number, l?: number) => `${c.id} unit ${u + 1}${l == null ? '' : ` lesson ${l + 1}`}`;
  if (c.units.length < 2) out.push(`${c.id}: needs at least 2 units`);
  c.units.forEach((u, ui) => {
    if (u.lessons.length < 2) out.push(`${where(ui)}: needs at least 2 lessons`);
    if (!u.summary) out.push(`${where(ui)}: missing summary`);
    u.lessons.forEach((l, li) => {
      if (!l.say) out.push(`${where(ui, li)}: missing say:`);
      l.blocks.forEach(b => { if (b.t === 'lab') out.push(...lintLab(b).map(e => `${where(ui, li)}: ${e}`)); });
      const words = l.blocks.filter(b => b.t !== 'lab').map(b => b.t === 'list' ? b.items.join(' ') : b.t === 'ex' ? [b.problem, ...b.steps, b.answer].join(' ') : b.text).join(' ').split(/\s+/).length;
      if (l.blocks.length < 2 || words < 70) out.push(`${where(ui, li)}: teaching is too short (${words} words)`);
      if (l.checks.length < 2) out.push(`${where(ui, li)}: needs at least 2 q: checks`);
      l.checks.forEach((q, qi) => { if (!q.why) out.push(`${where(ui, li)} q${qi + 1}: missing why:`); });
      l.blocks.forEach(b => { if (b.t === 'ex' && (!b.steps.length || !b.answer)) out.push(`${where(ui, li)}: worked example needs > steps and = answer`); });
      l.gens.forEach(g => { if (!knownGens.has(g)) out.push(`${where(ui, li)}: unknown gen "${g}"`); });
    });
  });
  return out;
}
