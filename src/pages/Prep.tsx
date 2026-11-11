// SAT & ACT: every test-prep class, practice test and test-day lesson in one place.
import { Link } from 'react-router-dom';
import { COURSES, levelState, getCourseProgress, isLessonDone, PREP_GROUPS, SAT_TOOLKIT, findLesson, type Course } from '../lib/courses';
import { useTests } from '../components/useTests';
import { usePlan } from '../lib/auth';
import { canAccess, tierOf } from '../lib/plans';

/** The next lesson you haven't finished, or null when they're all done. */
function nextLesson(c: Course): [number, number] | null {
  for (let u = 0; u < c.units.length; u++) for (let l = 0; l < (c.units[u].lessons ?? []).length; l++) if (!isLessonDone(c.id, u, l)) return [u, l];
  return null;
}

function PrepCard({ c }: { c: Course }) {
  const prog = getCourseProgress(); const total = c.units.length * 3;
  const passed = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(c.id, u, l, prog).passed).length, 0);
  const next = nextLesson(c);
  return (
    <div className="card prepcard">
      <Link to={`/courses/${c.id}`} className="classlink"><h3>{c.emoji} {c.name}</h3><p className="muted small">{c.units.length} units · {c.units.reduce((n, u) => n + (u.lessons?.length ?? 0), 0)} lessons</p>
        <div className="bar"><i style={{ width: `${(passed / total) * 100}%` }} /></div><p className="muted small">{passed}/{total} levels passed</p></Link>
      <div className="row">{next ? <Link to={`/courses/${c.id}/learn/${next[0]}/${next[1]}`}><button>{next[0] === 0 && next[1] === 0 ? 'Start' : 'Continue'}</button></Link> : <span className="muted small">All lessons done ✓</span>}
        <Link to={`/courses/${c.id}`}><button className="ghost">Units & practice</button></Link></div>
    </div>
  );
}

export default function Prep() {
  const { tests } = useTests(); const plan = usePlan();
  return (
    <section className="prep">
      <h1 className="greet">SAT & ACT</h1>
      <p className="muted">Everything for test day in one place: lessons, practice tests, the graphing calculator and test-day strategy.</p>

      {PREP_GROUPS.map(g => {
        const courses = g.ids.map(id => COURSES.find(c => c.id === id)).filter(Boolean) as Course[];
        const ptests = g.testPrefix ? tests.filter(t => t.id.startsWith(g.testPrefix!)) : [];
        return (
          <div key={g.exam} className="prepgroup">
            <h2 className="cathead">{g.exam}</h2><p className="muted small">{g.blurb}</p>
            <div className="grid">{courses.map(c => <PrepCard key={c.id} c={c} />)}</div>
            {g.exam === 'SAT' && <>
              <h3 className="prepsub">🧰 Test-day toolkit</h3>
              <div className="toolkit">
                <Link to="/calculator" className="kit">📈 Graphing calculator</Link>
                {SAT_TOOLKIT.map(([cid, title, label]) => { const c = COURSES.find(x => x.id === cid); const at = findLesson(c, title); if (!at) return null;
                  return <Link key={label} to={`/courses/${cid}/learn/${at[0]}/${at[1]}`} className={'kit' + (isLessonDone(cid, at[0], at[1]) ? ' done' : '')}>{isLessonDone(cid, at[0], at[1]) ? '✓ ' : ''}{label}</Link>; })}
              </div>
            </>}
            {ptests.length > 0 && <>
              <h3 className="prepsub">📝 {g.exam} practice tests</h3>
              <div className="grid">{ptests.map(t => { const open = canAccess(plan, tierOf(t)); return <Link key={t.id} to={open ? `/tests/${t.id}` : '/pricing'} className={'card' + (open ? '' : ' dim')}>
                <h3>{open ? '' : '🔒 '}{t.title.replace(/^SAT /, '')}</h3><p className="muted small">{t.questions.length} questions</p></Link>; })}</div>
            </>}
          </div>
        );
      })}
    </section>
  );
}
