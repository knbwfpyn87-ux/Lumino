import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as api from '../lib/api';
import { useAuth, myName } from '../lib/auth';
import { getProgress } from '../lib/progress';
import { useTests } from '../components/useTests';
import { db } from '../lib/store';
import { isCloud } from '../lib/supabase';
import Call from '../components/Call';

export default function Groups() {
  const { profile } = useAuth(); const name = myName(profile);
  const [sp] = useSearchParams(); const [groups, setGroups] = useState<api.GroupInfo[]>([]); const [activeId, setActiveId] = useState<string | null>(sp.get('open'));
  const [newName, setNewName] = useState(''); const [code, setCode] = useState(''); const [err, setErr] = useState('');
  const load = useCallback(() => api.listGroups().then(setGroups).catch(e => setErr(e.message)), []);
  useEffect(() => { load(); }, [load]);
  const active = groups.find(g => g.id === activeId);
  if (active) return <GroupRoom group={active} me={name} myId={profile?.id ?? 'local'} onBack={() => setActiveId(null)} onLeft={() => { setActiveId(null); load(); }} />;

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

function GroupRoom({ group, me, myId, onBack, onLeft }: { group: api.GroupInfo; me: string; myId: string; onBack: () => void; onLeft: () => void }) {
  const { tests } = useTests();
  const [members, setMembers] = useState<string[]>([]); const [msgs, setMsgs] = useState<api.Msg[]>([]);
  const [testIds, setTestIds] = useState<string[]>([]); const [quizzes, setQuizzes] = useState<api.PhotoQuizInfo[]>([]);
  const [boards, setBoards] = useState<Record<string, api.ResultRow[]>>({});
  const [text, setText] = useState(''); const [inCall, setInCall] = useState(false); const [copied, setCopied] = useState(false); const [err, setErr] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);
  const [blocked, setBlocked] = useState<string[]>([]); const [ttl, setTtl] = useState(7);
  const [reporting, setReporting] = useState<api.Msg | null>(null); const [menu, setMenu] = useState<string | null>(null);
  useEffect(() => { api.listBlocked().then(setBlocked).catch(() => {}); api.getMessageTtl(group.id).then(setTtl).catch(() => {}); }, [group.id]);
  const isOwner = group.owner === myId;

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
      {inCall ? <Call groupId={group.id} onLeave={() => setInCall(false)} />
        : <div className="row"><button onClick={() => setInCall(true)}>📞 Join call</button><span className="muted small">🔒 Encrypted, never recorded</span></div>}
      {err && <p className="wrong">{err}</p>}
      <h3>📸 Photo quizzes</h3>
      <div className="row"><Link to={`/photo-quiz/new?group=${group.id}`}><button>+ Quiz from photos</button></Link></div>
      <div className="grid">{quizzes.map(q => <Link key={q.id} to={`/photo-quiz/${q.id}`} className="card">{q.pages[0] && <img className="cover" src={q.pages[0]} alt="" />}<h3>{q.title}</h3><p>by {q.author}</p></Link>)}</div>
      <h3>Group tests</h3>
      <div className="row"><select onChange={e => assign(e.target.value)} value=""><option value="">Assign a test…</option>{tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
      <div className="list">{testIds.map(id => { const t = tests.find(x => x.id === id); if (!t) return null; const best = boards[id] ?? [];
        return <div key={id} className="item col"><div className="row between"><b>{t.title}</b><Link to={`/tests/${id}?group=${group.id}`}><button>Take it</button></Link></div>
          {best.length ? <ol className="board">{best.map((r, n) => <li key={r.username}>{['🥇', '🥈', '🥉'][n] ?? ''} {r.username} — {r.score}/{r.total}</li>)}</ol> : <small className="muted">No scores yet. Be first!</small>}</div>; })}</div>
      <div className="row between"><h3>Chat</h3>
        <span className="muted small">🕒 Messages delete after {isOwner && isCloud
          ? <select className="mini" value={ttl} onChange={async e => { const d = +e.target.value as 1 | 7 | 30; try { await api.setMessageTtl(group.id, d); setTtl(d); } catch (er) { setErr((er as Error).message); } }}><option value={1}>1 day</option><option value={7}>7 days</option><option value={30}>30 days</option></select>
          : `${ttl} day${ttl === 1 ? '' : 's'}`}</span></div>
      <div className="chat">{msgs.length ? msgs.filter(m => !blocked.includes(m.user_id)).map(m => (
        <div key={m.id} className={'msg' + (m.user_id === myId || m.username === me ? ' mine' : '')}>
          <p><b>{m.username}:</b> {m.text}</p>
          {m.user_id !== myId && m.username !== me && <button className="ghost dots3" aria-label="Message options" onClick={() => setMenu(menu === m.id ? null : m.id)}>⋯</button>}
          {menu === m.id && <div className="msgmenu">
            <button className="ghost" onClick={() => { setReporting(m); setMenu(null); }}>🚩 Report</button>
            <button className="ghost" onClick={async () => { if (!confirm(`Block ${m.username}? You won't see their messages.`)) return; await api.blockUser(m.user_id); setBlocked(b => [...b, m.user_id]); setMenu(null); }}>🚫 Block {m.username}</button>
          </div>}
        </div>)) : <p className="muted">Say hi 👋</p>}<div ref={chatEnd} /></div>
      {blocked.length > 0 && <p className="muted small">{blocked.length} blocked · <a onClick={async () => { for (const b of blocked) await api.unblockUser(b); setBlocked([]); }}>Unblock all</a></p>}
      {reporting && <ReportDialog msg={reporting} groupId={group.id} onClose={() => setReporting(null)} />}
      <div className="row"><input style={{ flex: 1 }} placeholder="Message" value={text} maxLength={2000} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} /><button onClick={send}>Send</button></div>
    </section>
  );
}

const REASONS: [api.Reason, string][] = [['harassment', 'Harassment'], ['bullying', 'Bullying'], ['inappropriate', 'Inappropriate content'], ['safety', 'I feel unsafe'], ['cheating', 'Cheating'], ['spam', 'Spam'], ['other', 'Other']];
function ReportDialog({ msg, groupId, onClose }: { msg: api.Msg; groupId: string; onClose: () => void }) {
  const [reason, setReason] = useState<api.Reason>('harassment'); const [details, setDetails] = useState(''); const [sent, setSent] = useState(false); const [err, setErr] = useState('');
  const send = async () => { try { await api.reportMessage(msg, groupId, reason, details.trim()); setSent(true); } catch (e) { setErr((e as Error).message); } };
  return (
    <div className="modal" onClick={onClose}><div className="modalcard" onClick={e => e.stopPropagation()}>
      {sent ? <><h3>Thanks for reporting</h3><p className="muted">A moderator will review it. A copy is saved even after the chat auto-deletes. If you're in danger, tell a trusted adult or call 911.</p><button onClick={onClose}>Done</button></> : <>
        <h3>Report message</h3>
        <p className="quote">"{msg.text}" — {msg.username}</p>
        <div className="reasons">{REASONS.map(([v, l]) => <label key={v}><input type="radio" name="reason" checked={reason === v} onChange={() => setReason(v)} /> {l}</label>)}</div>
        <textarea rows={2} maxLength={1000} placeholder="Anything else? (optional)" value={details} onChange={e => setDetails(e.target.value)} />
        {err && <p className="wrong">{err}</p>}
        <div className="row"><button className="ghost" onClick={onClose}>Cancel</button><button className="bad" onClick={send}>Send report</button></div>
      </>}
    </div></div>
  );
}
