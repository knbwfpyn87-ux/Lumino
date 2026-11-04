import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, uid, type Group } from '../lib/store';
import { BUILTIN_TESTS } from '../lib/catalog';

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>(db.groups());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [name, setName] = useState(''); const [text, setText] = useState(''); const [user, setUser] = useState(db.user());
  const [inCall, setInCall] = useState(false);
  const tests = [...BUILTIN_TESTS, ...db.tests()];
  const persist = (g: Group[]) => { setGroups(g); db.saveGroups(g); };
  const active = groups.find(g => g.id === activeId);
  const patch = (p: Partial<Group>) => active && persist(groups.map(g => g.id === active.id ? { ...g, ...p } : g));

  if (active) return (
    <section>
      <button onClick={() => { setActiveId(null); setInCall(false); }}>← Groups</button>
      <h2>{active.name}</h2>
      <div className="row">
        <button onClick={() => setInCall(!inCall)}>{inCall ? 'Leave call' : '📞 Start call'}</button>
        {inCall && <span className="muted">Call UI placeholder — WebRTC/LiveKit provider to be attached.</span>}
      </div>
      <h3>Group tests</h3>
      <div className="row">
        <select onChange={e => e.target.value && patch({ testIds: [...new Set([...active.testIds, e.target.value])] })} value="">
          <option value="">Assign a test…</option>{tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>
      <ul>{active.testIds.map(id => { const t = tests.find(x => x.id === id); return t && <li key={id}><Link to={`/tests/${id}`}>{t.title}</Link></li>; })}</ul>
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
