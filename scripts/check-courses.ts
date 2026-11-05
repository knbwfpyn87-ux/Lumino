// Builds 30 attempts of every unit level in every course and checks each question.
import { COURSES, buildCourseTest, courseTestId } from '../src/lib/courses/index.ts';
let n = 0, errors = 0;
for (const c of COURSES) c.units.forEach((u, ui) => u.levels.forEach((_, li) => {
  for (let a = 0; a < 30; a++) {
    const t = buildCourseTest(courseTestId(c.id, ui, li, a));
    if (!t) { errors++; console.error('no test', c.id, ui, li); continue; }
    for (const q of t.questions) { n++;
      const bad = (m: string) => { errors++; if (errors < 20) console.error(`✗ ${q.id}: ${m} | ${q.choices.join(' | ')}`); };
      if (q.choices.length !== 4) bad('choices'); if (new Set(q.choices).size !== 4) bad('dupes');
      if (q.answer < 0 || q.answer > 3) bad('answer'); if (q.choices.some(x => !x || /NaN|Infinity/.test(x) || /[^\sA-Za-z]undefined|undefined[^\sA-Za-z]|= undefined/.test(x)) /* leftovers from a code template; the plain word is fine */) bad('text');
    }
  }
}));
console.log(`${COURSES.length} courses · ${COURSES.reduce((s, c) => s + c.units.length, 0)} units · ${n} questions checked`);
console.log(errors ? `${errors} problems` : '✓ all good'); process.exit(errors ? 1 : 0);
