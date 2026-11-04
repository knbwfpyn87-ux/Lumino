import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/store';
import { BUILTIN_TESTS, LEVELS } from '../lib/catalog';

export default function Tests() {
  const all = [...BUILTIN_TESTS, ...db.tests()];
  const [level, setLevel] = useState('All'); const [q, setQ] = useState('');
  const shown = all.filter(t => (level === 'All' || t.level === level) && (t.subject + t.title).toLowerCase().includes(q.toLowerCase()));
  return (
    <section>
      <h2>Practice tests</h2>
      <div className="row">
        <input placeholder="Search subject or title" value={q} onChange={e => setQ(e.target.value)} />
        <select value={level} onChange={e => setLevel(e.target.value)}><option>All</option>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
      </div>
      <div className="grid">
        {shown.map(t => <Link key={t.id} to={`/tests/${t.id}`} className="card"><h3>{t.title}</h3><p>{t.subject} · {t.level} · {t.questions.length} Qs</p><p className="muted">by {t.author}</p></Link>)}
      </div>
    </section>
  );
}
