import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../lib/api';
import { useAuth, myName } from '../lib/auth';
import { getProgress } from '../lib/progress';
import { useTests } from '../components/useTests';
import { db } from '../lib/store';
import { isCloud } from '../lib/supabase';

export default function Groups() {
  const { profile } = useAuth(); const name = myName(profile);
  const [groups, setGroups] = useState<api.GroupInfo[]>([]); const [activeId, setActiveId] = useState<string | null>(null);
  const [newName, setNewName] = useState(''); const [code, setCode] = useState(''); const [err, setErr] = useState('');
  const load = useCallback(() => api.listGroups().then(setGroups).catch(e => setErr(e.message)), []);
  useEffect(() => { load(); }, [load]);
  const active = groups.find(g => g.id === activeId);
  if (active) return <GroupRoom group={active} me={name} onBack={() => setActiveId(null)} onLeft={() => { setActiveId(null); load(); }} />;

  const create = async () => { if (!newName.trim()) return; setErr(''); try { const g = await api.createGroup(newName.trim()); setNewName(''); await load(); setActiveId(g.id); } catch (e) { setErr((e as Error).message); } };
  const join = async () => { if (!code.trim()) return; setErr(''); try { const id = await api.joinGroup(code); setCode(''); await load(); setActiveId(id); } catch (e) { setErr((e as Error).message); } };
  return (
    <section>
      <h2>Study groups</h2>
      {!isCloud && <div className="row">Your name: <input defaultValue={name} onBlur={e => db.setUser(e.target.value)} /></div>}
      <div className="row"><input placeholder="New group name" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && create()} /><button onClick={create}>Create</button></div>
      <div className="row"><input placeholder="Invite code" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && join()} /><button className="ghost" onClick={join}>Join</button></div>
      {err && <p className="wrong">{err}</p>}
      <div className="grid">{groups.map(g => <div key={g.id} className="card" onClick={() => setActiveId(g.id)}><h3>{g.name}</h3><p>Code {g.invite_code}</p></div>)}</div>
      {!groups.length && <p className="muted">No groups yet. Create one or join with a friend's code.</p>}
    </section>
  );
}

function GroupRoom({ group, me, onBack, onLeft }: { group: api.GroupInfo; me: string; onBack: () => void; onLeft: () => void }) {
  const { tests } = useTests();
  const [members, setMembers] = useState<string[]>([]); const [msgs, setMsgs] = useState<api.Msg[]>([]);
  const [testIds, setTestIds] = useState<string[]>([]); const [quizzes, setQuizzes] = useState<api.PhotoQuizInfo[]>([]);
  const [boards, setBoards] = useState<Record<string, api.ResultRow[]>>({});
  const [text, setText] = useState(''); const [inCall, setInCall] = useState(false); const [copied, setCopied] = useState(false); const [err, setErr] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);

  const loadMsgs = useCallback(() => api.listMessages(group.id).then(setMsgs), [group.id]);
  useEffect(() => {
    api.listMembers(group.id).then(setMembers); loadMsgs(); api.listPhotoQuizzes(group.id).then(setQuizzes).catch(() => {});
    api.listGroupTests(group.id).then(async ids => { setTestIds(ids); const local = getProgress().results;
      const entries = await Promise.all(ids.map(async id => [id, await api.groupLeaderboard(group.id, id, local)] as const)); setBoards(Object.fromEntries(entries)); });
    return api.subscribeMessages(group.id, loadMsgs);
  }, [group.id, loadMsgs]);
  useEffect(() => { chatEnd.current?.scrollIntoView({ block: 'nearest' }); }, [msgs]);

  const send = async () => { const t = text.trim(); if (!t) return; setText(''); try { await api.sendMessage(group.id, t, me); loadMsgs(); } catch (e) { setErr((e as Error).message); setText(t); } };
  const assign = async (id: string) => { if (!id) return; try { await api.assignTest(group.id, id); setTestIds(x => [...new Set([...x, id])]); } catch (e) { setErr((e as Error).message); } };
  const copy = () => { navigator.clipboard?.writeText(group.invite_code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };

  return (
    <section>
      <div className="row between"><button className="ghost" onClick={onBack}>← Groups</button>
        <button className="ghost" onClick={async () => { if (confirm('Leave this group?')) { await api.leaveGroup(group.id); onLeft(); } }}>Leave group</button></div>
      <h2>{group.name}</h2>
      <p className="muted">Invite code: <b>{group.invite_code}</b> <button className="ghost x" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button> · {members.length} member{members.length === 1 ? '' : 's'}: {members.join(', ')}</p>
      <div className="row">
        <button onClick={() => setInCall(!inCall)}>{inCall ? 'Leave call' : '📞 Start call'}</button>
        {inCall && <span className="muted">Calls are coming soon (video provider not connected yet).</span>}
      </div>
      {err && <p className="wrong">{err}</p>}
      <h3>📸 Photo quizzes</h3>
      <div className="row"><Link to={`/photo-quiz/new?group=${group.id}`}><button>+ Quiz from photos</button></Link></div>
      <div className="grid">{quizzes.map(q => <Link key={q.id} to={`/photo-quiz/${q.id}`} className="card">{q.pages[0] && <img className="cover" src={q.pages[0]} alt="" />}<h3>{q.title}</h3><p>by {q.author}</p></Link>)}</div>
      <h3>Group tests</h3>
      <div className="row"><select onChange={e => assign(e.target.value)} value=""><option value="">Assign a test…</option>{tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
      <div className="list">{testIds.map(id => { const t = tests.find(x => x.id === id); if (!t) return null; const best = boards[id] ?? [];
        return <div key={id} className="item col"><div className="row between"><b>{t.title}</b><Link to={`/tests/${id}?group=${group.id}`}><button>Take it</button></Link></div>
          {best.length ? <ol className="board">{best.map((r, n) => <li key={r.username}>{['🥇', '🥈', '🥉'][n] ?? ''} {r.username} — {r.score}/{r.total}</li>)}</ol> : <small className="muted">No scores yet. Be first!</small>}</div>; })}</div>
      <h3>Chat</h3>
      <div className="chat">{msgs.length ? msgs.map(m => <p key={m.id} className={m.username === me ? 'mine' : ''}><b>{m.username}:</b> {m.text}</p>) : <p className="muted">Say hi 👋</p>}<div ref={chatEnd} /></div>
      <div className="row"><input style={{ flex: 1 }} placeholder="Message" value={text} maxLength={2000} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} /><button onClick={send}>Send</button></div>
    </section>
  );
}
