import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, uid, photoDb, type Group } from '../lib/store';
import { SAT_TESTS } from '../lib/sat';
import { BUILTIN_TESTS } from '../lib/catalog';
import { getProgress } from '../lib/progress';

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>(db.groups());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [name, setName] = useState(''); const [text, setText] = useState(''); const [user, setUser] = useState(db.user());
  const [inCall, setInCall] = useState(false);
  const tests = [...BUILTIN_TESTS, ...SAT_TESTS, ...db.tests()];
  const persist = (g: Group[]) => { setGroups(g); db.saveGroups(g); };
  const active = groups.find(g => g.id === activeId);
  const patch = (p: Partial<Group>) => active && persist(groups.map(g => g.id === active.id ? { ...g, ...p } : g));

  if (active) return (
    <section>
      <button onClick={() => { setActiveId(null); setInCall(false); }}>← Groups</button>
      <h2>{active.name}</h2>
      <p className="muted">Invite code: <b>{active.id.toUpperCase()}</b></p>
      <div className="row">
        <button onClick={() => setInCall(!inCall)}>{inCall ? 'Leave call' : '📞 Start call'}</button>
        {inCall && <span className="muted">Call UI placeholder — WebRTC/LiveKit provider to be attached.</span>}
      </div>
      <h3>📸 Photo quizzes</h3>
      <div className="row"><Link to={`/photo-quiz/new?group=${active.id}`}><button>+ Quiz from photos</button></Link></div>
      <div className="grid">{photoDb.all().filter(q => q.groupId === active.id).map(q => <Link key={q.id} to={`/photo-quiz/${q.id}`} className="card"><img className="cover" src={q.pages[0]} alt="" /><h3>{q.title}</h3><p>{q.pages.length} pages · by {q.author}</p></Link>)}</div>
      <h3>Group tests</h3>
      <div className="row">
        <select onChange={e => e.target.value && patch({ testIds: [...new Set([...active.testIds, e.target.value])] })} value="">
          <option value="">Assign a test…</option>{tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>
      <div className="list">{active.testIds.map(id => { const t = tests.find(x => x.id === id); if (!t) return null;
        const best = Object.values(getProgress().results.filter(r => r.testId === id && r.groupId === active.id).reduce((m, r) => { if (!m[r.user] || m[r.user].score < r.score) m[r.user] = r; return m; }, {} as Record<string, { user: string; score: number; total: number }>)).sort((a, b) => b.score - a.score);
        return <div key={id} className="item col"><div className="row between"><b>{t.title}</b><Link to={`/tests/${id}?group=${active.id}`}><button>Take it</button></Link></div>
          {best.length ? <ol className="board">{best.map((r, n) => <li key={r.user}>{['🥇', '🥈', '🥉'][n] ?? ''} {r.user} — {r.score}/{r.total}</li>)}</ol> : <small className="muted">No scores yet. Be first!</small>}</div>; })}</div>
      <h3>Chat</h3>
      <div className="chat">{active.messages.map(m => <p key={m.id}><b>{m.user}:</b> {m.text}</p>)}</div>
      <div className="row">
        <input placeholder="Message" value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && text.trim()) { patch({ messages: [...active.messages, { id: uid(), user, text, at: Date.now() }] }); setText(''); } }} />
      </div>
    </section>
  );
  return (
    <section>
      <h2>Study groups</h2>
      <div className="row">Your name: <input value={user} onChange={e => { setUser(e.target.value); db.setUser(e.target.value); }} /></div>
      <div className="row">
        <input placeholder="New group name" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => { if (name.trim()) { persist([...groups, { id: uid(), name, members: [user], messages: [], testIds: [] }]); setName(''); } }}>Create</button>
      </div>
      <div className="grid">{groups.map(g => <div key={g.id} className="card" onClick={() => setActiveId(g.id)}><h3>{g.name}</h3><p>{g.members.length} members · {g.testIds.length} tests</p></div>)}</div>
    </section>
  );
}
