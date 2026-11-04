import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { COURSES, CATEGORIES, unitTier, levelState, courseTestId, getCourseProgress, PASS } from '../lib/courses';
import { getMyClasses, setMyClasses } from '../lib/planner';
import { usePlan } from '../lib/auth';
import { canAccess, PLAN_INFO } from '../lib/plans';

const LEVELS = ['Level 1 · Core', 'Level 2 · Mixed', 'Level 3 · Challenge'];

export function CourseList() {
  const prog = getCourseProgress(); const [q, setQ] = useState(''); const [cat, setCat] = useState<string>('All'); const [mine, setMine] = useState(getMyClasses());
  const toggle = (id: string) => { const n = mine.includes(id) ? mine.filter(x => x !== id) : [...mine, id]; setMine(n); setMyClasses(n); };
  const shown = COURSES.filter(c => (cat === 'All' || (cat === 'Mine' ? mine.includes(c.id) : c.category === cat)) && (c.name + ' ' + c.units.map(u => u.title).join(' ')).toLowerCase().includes(q.toLowerCase()));
  return (
    <section>
      <h1 className="greet">Classes</h1>
      <p className="muted">{COURSES.length} classes · {COURSES.reduce((n, c) => n + c.units.length, 0)} units. Each unit has 3 levels that get harder. Score {PASS * 100}% to unlock the next one. Tap ☆ to add a class to My Classes.</p>
      <div className="row"><input className="classsearch" placeholder="Search classes or topics (e.g. IB Physics, mitosis, derivatives)" value={q} onChange={e => setQ(e.target.value)} /></div>
      <div className="cattabs">{['All', 'Mine', ...CATEGORIES].map(k => <button key={k} className={cat === k ? '' : 'ghost'} onClick={() => setCat(k)}>{k === 'Mine' ? `★ My Classes (${mine.length})` : k}{k !== 'All' && k !== 'Mine' ? <span className="catn">{COURSES.filter(c => c.category === k).length}</span> : null}</button>)}</div>
      {(cat === 'All' && !q ? CATEGORIES : [null]).map(group => { const list = group ? shown.filter(c => c.category === group) : shown; if (!list.length) return null;
        return <div key={group ?? 'list'}>{group && <h2 className="cathead">{group}</h2>}
          <div className="grid">{list.map(c => {
            const total = c.units.length * 3; const done = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(c.id, u, l, prog).passed).length, 0);
            return <div key={c.id} className="card classcard"><Link to={`/courses/${c.id}`} className="classlink"><h3>{c.emoji} {c.name}</h3><p>{c.units.length} units · {c.level}</p>
              <div className="bar"><i style={{ width: `${(done / total) * 100}%` }} /></div><p className="muted small">{done}/{total} levels passed</p></Link>
              <button className={'star' + (mine.includes(c.id) ? ' on' : '')} onClick={() => toggle(c.id)} aria-label={mine.includes(c.id) ? `Remove ${c.name} from My Classes` : `Add ${c.name} to My Classes`}>{mine.includes(c.id) ? '★' : '☆'}</button></div>;
          })}</div></div>; })}
      {!shown.length && <p className="muted">No classes match "{q}".</p>}
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
