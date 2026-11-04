import { Link, useParams } from 'react-router-dom';
import { COURSES, unitTier, levelState, courseTestId, getCourseProgress, PASS } from '../lib/courses';
import { usePlan } from '../lib/auth';
import { canAccess, PLAN_INFO } from '../lib/plans';

const LEVELS = ['Level 1 · Core', 'Level 2 · Mixed', 'Level 3 · Challenge'];

export function CourseList() {
  const prog = getCourseProgress();
  return (
    <section>
      <h2>Classes</h2>
      <p className="muted">Pick your class. Each unit has 3 levels that get harder. Score {PASS * 100}% to unlock the next one.</p>
      <div className="grid">{COURSES.map(c => {
        const total = c.units.length * 3; const done = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(c.id, u, l, prog).passed).length, 0);
        return <Link key={c.id} to={`/courses/${c.id}`} className="card"><h3>{c.emoji} {c.name}</h3><p>{c.units.length} units · {c.level}</p>
          <div className="bar"><i style={{ width: `${(done / total) * 100}%` }} /></div><p className="muted small">{done}/{total} levels passed</p></Link>;
      })}</div>
    </section>
  );
}

export function CourseView() {
  const { id } = useParams(); const plan = usePlan(); const prog = getCourseProgress();
  const c = COURSES.find(x => x.id === id);
  if (!c) return <p>Class not found. <Link to="/courses">Back</Link></p>;
  return (
    <section className="focus">
      <Link to="/courses"><button className="ghost">← Classes</button></Link>
      <h2>{c.emoji} {c.name}</h2>
      {c.id === 'ap-csa' && <p className="muted small">Units follow the AP CSA course structure used by CodeHS. All code questions are Java.</p>}
      <div className="units">{c.units.map((u, ui) => {
        const tier = unitTier(c, ui); const open = canAccess(plan, tier);
        return (
          <div key={ui} className={'unit' + (open ? '' : ' dim')}>
            <div className="unithead"><span className="unitnum">{ui + 1}</span><div><b>{u.title}</b><p className="muted small">{u.topics}</p></div>
              {!open && <Link to="/pricing" className="pill">🔒 {PLAN_INFO[tier].name}</Link>}</div>
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
