import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { db, photoDb, uid, compressImage, type PhotoQuiz } from '../lib/store';
import { award } from '../lib/progress';

const NOTE = "There is no answer key because we don't use AI, and this is so that you have someone to work through it with.";

export function NewPhotoQuiz() {
  const [sp] = useSearchParams(); const nav = useNavigate();
  const groups = db.groups();
  const [groupId, setGroupId] = useState(sp.get('group') ?? groups[0]?.id ?? '');
  const [title, setTitle] = useState(''); const [pages, setPages] = useState<string[]>([]); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const add = async (files: FileList | null) => {
    if (!files) return; setBusy(true); setErr('');
    try { const out = await Promise.all([...files].filter(f => f.type.startsWith('image/')).map(f => compressImage(f))); setPages(p => [...p, ...out]); }
    catch { setErr('One of those photos could not be read.'); }
    setBusy(false);
  };
  const create = () => {
    if (!title.trim() || !pages.length) return setErr('Add a title and at least one photo.');
    const q: PhotoQuiz = { id: uid(), title, author: db.user(), groupId: groupId || undefined, pages, responses: {}, at: Date.now() };
    try { photoDb.save([...photoDb.all(), q]); } catch { return setErr('Too many photos for this device. Try fewer.'); }
    award(15, 'made a group quiz'); nav(`/photo-quiz/${q.id}`);
  };
  return (
    <section className="focus">
      <h2>📸 Make a quiz from photos</h2>
      <p className="note">{NOTE}</p>
      <div className="row"><input placeholder="Quiz title (e.g. Ch. 5 worksheet)" value={title} onChange={e => setTitle(e.target.value)} style={{ flex: 1 }} />
        <select value={groupId} onChange={e => setGroupId(e.target.value)}><option value="">Just me</option>{groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}</select></div>
      <label className="drop">
        <input type="file" accept="image/*" multiple capture="environment" onChange={e => add(e.target.files)} hidden />
        <div className="big">📷</div><b>{busy ? 'Adding…' : 'Tap to take or upload photos'}</b><p className="muted">Each photo becomes one page of the quiz</p>
      </label>
      <div className="thumbs">{pages.map((p, i) => <div key={i} className="thumb"><img src={p} alt={`Page ${i + 1}`} /><button className="ghost x" onClick={() => setPages(pages.filter((_, j) => j !== i))}>✕</button><span>{i + 1}</span></div>)}</div>
      {err && <p className="wrong">{err}</p>}
      <button disabled={busy} onClick={create}>Create group quiz</button>
    </section>
  );
}

export function PhotoQuizView() {
  const { id } = useParams();
  const [all, setAll] = useState(photoDb.all()); const quiz = all.find(q => q.id === id);
  const [i, setI] = useState(0); const [text, setText] = useState(''); const [zoom, setZoom] = useState(false);
  if (!quiz) return <p>Quiz not found. <Link to="/groups">Back</Link></p>;
  const resp = quiz.responses[i] ?? [];
  const post = () => {
    if (!text.trim()) return;
    const upd = { ...quiz, responses: { ...quiz.responses, [i]: [...resp, { id: uid(), user: db.user(), text, at: Date.now() }] } };
    const next = all.map(q => q.id === quiz.id ? upd : q); setAll(next); photoDb.save(next); setText('');
    if (!resp.some(r => r.user === db.user())) award(5, 'worked a problem');
  };
  const pagesDone = quiz.pages.filter((_, n) => (quiz.responses[n] ?? []).some(r => r.user === db.user())).length;
  return (
    <section className="focus">
      <div className="row between"><Link to="/groups"><button className="ghost">← Back</button></Link><span className="muted">Page {i + 1} of {quiz.pages.length}</span></div>
      <h2>{quiz.title}</h2>
      <p className="note">{NOTE}</p>
      <div className="bar"><i style={{ width: `${(pagesDone / quiz.pages.length) * 100}%` }} /></div>
      <img className={'page' + (zoom ? ' zoom' : '')} src={quiz.pages[i]} alt={`Page ${i + 1}`} onClick={() => setZoom(!zoom)} />
      <div className="row between">
        <button className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Prev</button>
        <div className="dots">{quiz.pages.map((_, n) => <span key={n} className={((quiz.responses[n] ?? []).some(r => r.user === db.user()) ? 'on' : '') + (n === i ? ' cur' : '')} onClick={() => setI(n)} />)}</div>
        <button className="ghost" disabled={i >= quiz.pages.length - 1} onClick={() => setI(i + 1)}>Next →</button>
      </div>
      <h3>Work it out together</h3>
      <div className="chat">{resp.length ? resp.map(r => <p key={r.id}><b>{r.user}:</b> {r.text}</p>) : <p className="muted">No answers yet. Post yours, then compare with your group.</p>}</div>
      <div className="row"><textarea rows={2} placeholder="Your answer or how you solved it…" value={text} onChange={e => setText(e.target.value)} /><button onClick={post}>Post</button></div>
    </section>
  );
}
