import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { COURSES, SUBJECTS, LEVEL_FILTERS, groupBySubject, isTestPrep, matchesLevel, subjectOf, type LevelFilter, unitTier, levelState, courseTestId, getCourseProgress, PASS, isLessonDone, unitLessonsDone } from '../lib/courses';
import { getMyClasses, setMyClasses } from '../lib/planner';
import { usePlan } from '../lib/auth';
import { canAccess, PLAN_INFO } from '../lib/plans';

const LEVELS = ['Level 1 · Core', 'Level 2 · Mixed', 'Level 3 · Challenge'];

export function CourseList() {
  const prog = getCourseProgress(); const [q, setQ] = useState(''); const [cat, setCat] = useState<string>('All'); const [lvl, setLvl] = useState<LevelFilter>('all'); const [mine, setMine] = useState(getMyClasses());
  const toggle = (id: string) => { const n = mine.includes(id) ? mine.filter(x => x !== id) : [...mine, id]; setMine(n); setMyClasses(n); };
  const text = (c: typeof COURSES[number]) => (c.name + ' ' + c.units.map(u => u.title).join(' ')).toLowerCase();
  const pool = COURSES.filter(c => (cat === 'Mine' ? mine.includes(c.id) : !isTestPrep(c)) && matchesLevel(c, lvl) && text(c).includes(q.toLowerCase()));
  const groups = cat === 'Mine' ? [{ subject: 'My Classes', courses: pool }] : groupBySubject(pool).filter(g => cat === 'All' || g.subject === cat);
  const count = (s: string) => COURSES.filter(c => subjectOf(c) === s && matchesLevel(c, lvl)).length;
  const card = (c: typeof COURSES[number]) => {
    const total = c.units.length * 3; const done = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(c.id, u, l, prog).passed).length, 0);
    return <div key={c.id} className="card classcard"><Link to={`/courses/${c.id}`} className="classlink"><h3>{c.emoji} {c.name}{c.level !== 'Standard' && <span className="lvlbadge">{c.level}</span>}</h3><p>{c.units.length} units</p>
      <div className="bar"><i style={{ width: `${(done / total) * 100}%` }} /></div><p className="muted small">{done}/{total} levels passed</p></Link>
      <button className={'star' + (mine.includes(c.id) ? ' on' : '')} onClick={() => toggle(c.id)} aria-label={mine.includes(c.id) ? `Remove ${c.name} from My Classes` : `Add ${c.name} to My Classes`}>{mine.includes(c.id) ? '★' : '☆'}</button></div>;
  };
  return (
    <section>
      <h1 className="greet">Classes</h1>
      <p className="muted">{COURSES.filter(c => !isTestPrep(c)).length} classes, grouped by subject. Each unit has lessons and 3 practice levels; score {PASS * 100}% to unlock the next. Tap ☆ to add a class to My Classes.</p>
      <Link to="/prep" className="prepbanner"><span>🎯 Studying for the SAT, PSAT or ACT? Everything is on the SAT & ACT page.</span><span>→</span></Link>
      <div className="row"><input className="classsearch" placeholder="Search classes or topics (e.g. IB Physics, mitosis, derivatives)" value={q} onChange={e => setQ(e.target.value)} /></div>
      <div className="cattabs">{['All', 'Mine', ...SUBJECTS].map(k => <button key={k} className={cat === k ? '' : 'ghost'} onClick={() => setCat(k)}>{k === 'Mine' ? `★ My Classes (${mine.length})` : k}{k !== 'All' && k !== 'Mine' ? <span className="catn">{count(k)}</span> : null}</button>)}</div>
      {cat !== 'Mine' && <div className="lvltabs">{LEVEL_FILTERS.map(f => <button key={f.key} className={lvl === f.key ? '' : 'ghost'} onClick={() => setLvl(f.key)}>{f.label}</button>)}</div>}
      {groups.map(g => <div key={g.subject}>{(groups.length > 1 || cat === 'All') && <h2 className="cathead">{g.subject}</h2>}<div className="grid">{g.courses.map(card)}</div></div>)}
      {!groups.some(g => g.courses.length) && <p className="muted">{cat === 'Mine' ? 'No classes yet. Tap ☆ on any class to add it here.' : `No classes match${q ? ` "${q}"` : ' this filter'}.`}</p>}
    </section>
  );
}

export function CourseView() {
  const { id } = useParams(); const plan = usePlan(); const prog = getCourseProgress();
  const c = COURSES.find(x => x.id === id);
  if (!c) return <p>Class not found. <Link to="/courses">Back</Link></p>;
  return (
    <section className="focus">
      <Link to={isTestPrep(c) ? '/prep' : '/courses'}><button className="ghost">← {isTestPrep(c) ? 'SAT & ACT' : 'Classes'}</button></Link>
      <h2>{c.emoji} {c.name}</h2>
      {(() => { // "Continue learning": the first lesson not finished yet
        for (let ui = 0; ui < c.units.length; ui++) { if (!canAccess(plan, unitTier(c, ui))) break; const li = c.units[ui].lessons.findIndex((_, k) => !isLessonDone(c.id, ui, k));
          if (li >= 0) return <Link to={`/courses/${c.id}/learn/${ui}/${li}`} className="card cta continue"><b>{ui === 0 && li === 0 ? '📖 Start learning' : '📖 Continue learning'}</b><p>Unit {ui + 1}: {c.units[ui].lessons[li].title}</p></Link>; }
        return null; })()}
      {c.units.some(u => u.lessons.length) && <p className="muted small">Each unit teaches first: read the lessons with Mr. Lumino, try the quick checks, then practice with 3 levels that get harder.</p>}
      <div className="units">{c.units.map((u, ui) => {
        const tier = unitTier(c, ui); const open = canAccess(plan, tier);
        return (
          <div key={ui} className={'unit' + (open ? '' : ' dim')}>
            <div className="unithead"><span className="unitnum">{ui + 1}</span><div><b>{u.title}</b><p className="muted small">{u.topics}</p></div>
              {!open && <Link to="/pricing" className="pill">🔒 {PLAN_INFO[tier].name}</Link>}</div>
            {open && u.lessons.length > 0 && <div className="lessonlist">{u.lessons.map((ls, li) => <Link key={li} to={`/courses/${c.id}/learn/${ui}/${li}`} className={'lessonlink' + (isLessonDone(c.id, ui, li) ? ' done' : '')}>
              <span className="lnum">{isLessonDone(c.id, ui, li) ? '✓' : li + 1}</span>{ls.title}{ls.lab && <span className="labbadge" title={ls.lab === 'lab' ? 'Has a virtual lab' : 'Has a real-world demo'}>{ls.lab === 'lab' ? '🧪 Lab' : '📐 Demo'}</span>}</Link>)}
              <span className="muted small">{unitLessonsDone(c, ui)} of {u.lessons.length} lessons done</span></div>}
            {open && <div className="levels">{LEVELS.map((name, li) => {
              const st = levelState(c.id, ui, li, prog);
              const label = st.passed ? `✅ ${Math.round(st.best * 100)}%` : st.attempts ? `Best ${Math.round(st.best * 100)}%` : '';
              return st.unlocked
                ? <Link key={li} to={`/tests/${courseTestId(c.id, ui, li, st.attempts)}`} className={'lvl' + (st.passed ? ' passed' : ' ready')}><b>{name}</b><span>{label || 'Start'}</span></Link>
                : <div key={li} className="lvl locked"><b>{name}</b><span>🔒 Pass the previous level</span></div>;
            })}</div>}
          </div>
        );
      })}</div>
    </section>
  );
}
