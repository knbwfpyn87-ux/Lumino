import { useState } from 'react';
import { uid, type Question } from '../lib/store';
import { uploadTest, aiImportTest } from '../lib/api';
import { usePlan } from '../lib/auth';
import { Link } from 'react-router-dom';
import { isCloud } from '../lib/supabase';
import { AI_ENABLED } from '../lib/features';
import { useAuth, myName } from '../lib/auth';
import { award } from '../lib/progress';
import { LEVELS, SUBJECTS } from '../lib/catalog';

const blank = (): Question => ({ id: uid(), prompt: '', choices: ['', '', '', ''], answer: 0 });

export default function Upload() {
  const [title, setTitle] = useState(''); const [subject, setSubject] = useState(SUBJECTS[0]); const [level, setLevel] = useState<string>('Standard');
  const [qs, setQs] = useState<Question[]>([blank()]); const [msg, setMsg] = useState('');
  const { profile } = useAuth(); const name = myName(profile);
  const plan = usePlan(); const [aiBusy, setAiBusy] = useState(false); const [review, setReview] = useState<Set<string>>(new Set());
  const aiImport = async (files: FileList | null) => {
    if (!files?.length) return; setAiBusy(true); setMsg('');
    try {
      const t = await aiImportTest([...files].slice(0, 10));
      const items = t.questions.map(q => ({ q: { id: uid(), prompt: q.prompt, choices: q.choices, answer: q.answer, explanation: q.explanation } as Question, unsure: q.answer_confidence !== 'from_key' }));
      setQs(items.map(x => x.q)); setReview(new Set(items.filter(x => x.unsure).map(x => x.q.id)));
      if (!title) setTitle(t.title);
      setMsg(`AI found ${items.length} questions. Check every answer before publishing — ${items.filter(x => x.unsure).length} weren't from an answer key and are marked for review.`);
    } catch (e) { setMsg((e as Error).message); }
    setAiBusy(false);
  };
  const upd = (i: number, q: Partial<Question>) => setQs(qs.map((x, j) => j === i ? { ...x, ...q } : x));

  const publish = async () => {
    if (review.size) return setMsg(`Confirm the ${review.size} answer(s) marked ⚠️ first.`);
    if (!title.trim() || qs.some(q => !q.prompt.trim() || q.choices.some(c => !c.trim()))) return setMsg('Add a title and fill every question and choice.');
    try { await uploadTest({ title, subject, level, questions: qs }, name); award(20, 'shared a test'); setMsg('Published! Find it under Practice Tests.'); setTitle(''); setQs([blank()]); }
    catch (e) { setMsg('Could not publish: ' + (e as Error).message); }
  };
  const importJson = async (f: File) => {
    try {
      const t = JSON.parse(await f.text());
      if (!t.title || !Array.isArray(t.questions)) throw new Error('Missing title or questions');
      await uploadTest({ title: t.title, subject: t.subject ?? subject, level: t.level ?? level, questions: t.questions.map((q: Question) => ({ ...q, id: q.id ?? uid() })) }, name); setMsg(`Imported "${t.title}".`);
    } catch (e) { setMsg('Could not import: ' + (e as Error).message); }
  };

  return (
    <section>
      <h2>Upload a practice test</h2>
      {AI_ENABLED && <div className="aiupload">
        <div><b>✨ AI upload</b> <span className="pill">Premium+</span><p className="muted small">Snap a worksheet or upload a PDF and AI turns it into a quiz. You review every answer before it's published.</p></div>
        {plan === 'pro' && isCloud
          ? <label className="drop small"><input type="file" accept="image/*,application/pdf" multiple hidden onChange={e => aiImport(e.target.files)} />{aiBusy ? 'Reading your file…' : '📄 Choose photos or a PDF'}</label>
          : <Link to="/pricing"><button className="ghost">{plan === 'pro' ? 'Available in the live version' : 'Unlock with Premium+'}</button></Link>}
      </div>}
      <p className="muted">Import JSON <input type="file" accept=".json" onChange={e => e.target.files?.[0] && importJson(e.target.files[0])} /></p>
      <div className="row">
        <input placeholder="Test title" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={subject} onChange={e => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s}>{s}</option>)}</select>
        <select value={level} onChange={e => setLevel(e.target.value)}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
      </div>
      {qs.map((q, i) => (
        <div key={q.id} className={'question' + (review.has(q.id) ? ' review' : '')}>
          {review.has(q.id) && <div className="row between"><span className="small">⚠️ AI solved this one. Check the marked answer.</span><button className="ghost x" onClick={() => setReview(r => { const n = new Set(r); n.delete(q.id); return n; })}>Answer is correct ✓</button></div>}
          <input placeholder={`Question ${i + 1}`} value={q.prompt} onChange={e => upd(i, { prompt: e.target.value })} />
          {q.choices.map((c, ci) => (
            <div key={ci} className="row">
              <input type="radio" name={'a' + q.id} checked={q.answer === ci} onChange={() => upd(i, { answer: ci })} title="Correct answer" />
              <input placeholder={`Choice ${ci + 1}`} value={c} onChange={e => upd(i, { choices: q.choices.map((x, k) => k === ci ? e.target.value : x) })} />
            </div>
          ))}
          <input placeholder="Explanation (optional)" value={q.explanation ?? ''} onChange={e => upd(i, { explanation: e.target.value })} />
        </div>
      ))}
      <div className="row"><button className="ghost" onClick={() => setQs([...qs, blank()])}>+ Question</button>{qs.length > 1 && <button className="ghost" onClick={() => setQs(qs.slice(0, -1))}>− Remove last</button>}<button onClick={publish}>Publish</button></div>
      {msg && <p>{msg}</p>}
    </section>
  );
}
