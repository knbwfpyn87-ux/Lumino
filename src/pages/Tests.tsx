import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LEVELS } from '../lib/catalog';
import { useTests } from '../components/useTests';
import { usePlan } from '../lib/auth';
import { canAccess, tierOf, PLAN_INFO } from '../lib/plans';

export default function Tests() {
  const { tests, loading } = useTests(); const plan = usePlan(); const [hideLocked, setHideLocked] = useState(false);
  const [sp] = useSearchParams(); const [level, setLevel] = useState('All'); const [q, setQ] = useState(sp.get('q') ?? '');
  const shown = tests.filter(t => (!hideLocked || canAccess(plan, tierOf(t))) && (level === 'All' || t.level === level) && (t.subject + ' ' + t.title).toLowerCase().includes(q.toLowerCase()));
  return (
    <section>
      <h2>Practice tests</h2>
      <p className="muted">{tests.length} tests, grouped by subject. For guided prep, see <Link to="/prep">SAT & ACT</Link> or <Link to="/courses">Classes</Link>.</p>
      <div className="row">
        <input placeholder="Search subject or title" value={q} onChange={e => setQ(e.target.value)} />
        <select value={level} onChange={e => setLevel(e.target.value)}><option>All</option>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
        <label className="muted small"><input type="checkbox" checked={hideLocked} onChange={e => setHideLocked(e.target.checked)} /> Hide locked</label>
        <Link to="/upload"><button className="ghost">⬆️ Upload a test</button></Link>
        {loading && <span className="muted">Loading shared tests…</span>}
      </div>
      {(() => { const subjects = [...new Set(shown.map(t => t.subject))].sort((a, b) => (a === 'SAT' ? -1 : b === 'SAT' ? 1 : a.localeCompare(b)));
        return subjects.map(sub => <div key={sub}><h2 className="cathead">{sub === 'SAT' ? '🎯 SAT' : sub}</h2>
          <div className="grid">{shown.filter(t => t.subject === sub).map(t => { const tier = tierOf(t); const open = canAccess(plan, tier);
            return <Link key={t.id} to={open ? `/tests/${t.id}` : '/pricing'} className={'card' + (open ? '' : ' dim')}><h3>{open ? '' : '🔒 '}{t.title}</h3><p>{t.level} · {t.questions.length} questions{open ? '' : ` · ${PLAN_INFO[tier].name}`}</p></Link>; })}</div></div>); })()}
      {!shown.length && !loading && <p className="muted">No tests match.</p>}
    </section>
  );
}
