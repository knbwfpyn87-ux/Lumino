import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { compressImage } from '../lib/store';
import * as api from '../lib/api';
import { useAuth, myName } from '../lib/auth';
import { award } from '../lib/progress';

const NOTE = "There is no answer key because we don't use AI, and this is so that you have someone to work through it with.";

export function NewPhotoQuiz() {
  const [sp] = useSearchParams(); const nav = useNavigate(); const { profile } = useAuth();
  const [groups, setGroups] = useState<api.GroupInfo[]>([]);
  const [groupId, setGroupId] = useState(sp.get('group') ?? '');
  const [title, setTitle] = useState(''); const [pages, setPages] = useState<string[]>([]); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  useEffect(() => { api.listGroups().then(g => { setGroups(g); if (!sp.get('group') && g[0]) setGroupId(g[0].id); }).catch(() => {}); }, [sp]);
  const add = async (files: FileList | null) => {
    if (!files) return; setBusy(true); setErr('');
    try { const out = await Promise.all([...files].filter(f => f.type.startsWith('image/')).map(f => compressImage(f))); setPages(p => [...p, ...out].slice(0, 30)); }
    catch { setErr('One of those photos could not be read.'); }
    setBusy(false);
  };
  const create = async () => {
    if (!title.trim() || !pages.length) return setErr('Add a title and at least one photo.');
    setBusy(true); setErr('');
    try { const id = await api.createPhotoQuiz(title.trim(), groupId || null, pages, myName(profile)); award(15, 'made a group quiz'); nav(`/photo-quiz/${id}`); }
    catch (e) { setErr('Could not create quiz: ' + (e as Error).message); setBusy(false); }
  };
  return (
    <section className="focus">
      <h2>📸 Make a quiz from photos</h2>
      <p className="note">{NOTE}</p>
      <div className="row"><input placeholder="Quiz title (e.g. Ch. 5 worksheet)" value={title} onChange={e => setTitle(e.target.value)} style={{ flex: 1 }} />
        <select value={groupId} onChange={e => setGroupId(e.target.value)}><option value="">Just me</option>{groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}</select></div>
      <label className="drop">
        <input type="file" accept="image/*" multiple onChange={e => add(e.target.files)} hidden />
        <div className="big">📷</div><b>{busy ? 'Working…' : 'Tap to take or upload photos'}</b><p className="muted">Each photo becomes one page of the quiz (up to 30)</p>
      </label>
      <div className="thumbs">{pages.map((p, i) => <div key={i} className="thumb"><img src={p} alt={`Page ${i + 1}`} /><button className="ghost x" onClick={() => setPages(pages.filter((_, j) => j !== i))}>✕</button><span>{i + 1}</span></div>)}</div>
      {err && <p className="wrong">{err}</p>}
      <button disabled={busy} onClick={create}>{busy ? 'Uploading…' : 'Create group quiz'}</button>
    </section>
  );
}

export function PhotoQuizView() {
  const { id = '' } = useParams(); const { profile } = useAuth(); const me = myName(profile);
  const [quiz, setQuiz] = useState<api.PhotoQuizInfo | null | undefined>(undefined);
  const [resps, setResps] = useState<api.Resp[]>([]);
  const [i, setI] = useState(0); const [text, setText] = useState(''); const [zoom, setZoom] = useState(false); const [err, setErr] = useState('');
  const loadResps = useCallback(() => api.listResponses(id).then(setResps), [id]);
  useEffect(() => { api.getPhotoQuiz(id).then(setQuiz).catch(() => setQuiz(null)); loadResps(); return api.subscribeResponses(id, loadResps); }, [id, loadResps]);
  if (quiz === undefined) return <p className="muted">Loading…</p>;
  if (!quiz) return <p>Quiz not found. <Link to="/groups">Back</Link></p>;
  const pageResps = resps.filter(r => r.page === i);
  const answered = (n: number) => resps.some(r => r.page === n && r.username === me);
  const post = async () => {
    const t = text.trim(); if (!t) return; const first = !answered(i); setText('');
    try { await api.postResponse(quiz.id, i, t, me); await loadResps(); if (first) award(5, 'worked a problem'); } catch (e) { setErr((e as Error).message); setText(t); }
  };
  const done = quiz.pages.filter((_, n) => answered(n)).length;
  return (
    <section className="focus">
      <div className="row between"><Link to="/groups"><button className="ghost">← Back</button></Link><span className="muted">Page {i + 1} of {quiz.pages.length}</span></div>
      <h2>{quiz.title}</h2>
      <p className="note">{NOTE}</p>
      <div className="bar"><i style={{ width: `${(done / quiz.pages.length) * 100}%` }} /></div>
      <img className={'page' + (zoom ? ' zoom' : '')} src={quiz.pages[i]} alt={`Page ${i + 1}`} onClick={() => setZoom(!zoom)} />
      <div className="row between">
        <button className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Prev</button>
        <div className="dots">{quiz.pages.map((_, n) => <span key={n} className={(answered(n) ? 'on' : '') + (n === i ? ' cur' : '')} onClick={() => setI(n)} />)}</div>
        <button className="ghost" disabled={i >= quiz.pages.length - 1} onClick={() => setI(i + 1)}>Next →</button>
      </div>
      <h3>Work it out together</h3>
      <div className="chat">{pageResps.length ? pageResps.map(r => <p key={r.id}><b>{r.username}:</b> {r.text}</p>) : <p className="muted">No answers yet. Post yours, then compare with your group.</p>}</div>
      {err && <p className="wrong">{err}</p>}
      <div className="row"><textarea rows={2} maxLength={4000} placeholder="Your answer or how you solved it…" value={text} onChange={e => setText(e.target.value)} /><button onClick={post}>Post</button></div>
    </section>
  );
}
