import { useState } from 'react';
import { db, uid, type Question } from '../lib/store';
import { LEVELS, SUBJECTS } from '../lib/catalog';

const blank = (): Question => ({ id: uid(), prompt: '', choices: ['', '', '', ''], answer: 0 });

export default function Upload() {
  const [title, setTitle] = useState(''); const [subject, setSubject] = useState(SUBJECTS[0]); const [level, setLevel] = useState<string>('Standard');
  const [qs, setQs] = useState<Question[]>([blank()]); const [msg, setMsg] = useState('');
  const upd = (i: number, q: Partial<Question>) => setQs(qs.map((x, j) => j === i ? { ...x, ...q } : x));

  const publish = () => {
    if (!title.trim() || qs.some(q => !q.prompt.trim())) return setMsg('Add a title and fill every question.');
    db.saveTests([...db.tests(), { id: uid(), title, subject, level, author: db.user(), questions: qs }]);
    setMsg('Published! Find it under Practice Tests.'); setTitle(''); setQs([blank()]);
  };
  const importJson = async (f: File) => {
    try {
      const t = JSON.parse(await f.text());
      db.saveTests([...db.tests(), { ...t, id: uid(), author: t.author ?? db.user() }]); setMsg(`Imported "${t.title}".`);
    } catch { setMsg('Invalid JSON file.'); }
  };

  return (
    <section>
      <h2>Upload a practice test</h2>
      <p className="muted">Import JSON <input type="file" accept=".json" onChange={e => e.target.files?.[0] && importJson(e.target.files[0])} /></p>
      <div className="row">
        <input placeholder="Test title" value={title} onChange={e => setTitle(e.target.value)} />
        <select value={subject} onChange={e => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s}>{s}</option>)}</select>
        <select value={level} onChange={e => setLevel(e.target.value)}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
      </div>
      {qs.map((q, i) => (
        <div key={q.id} className="question">
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
      <div className="row"><button onClick={() => setQs([...qs, blank()])}>+ Question</button><button onClick={publish}>Publish</button></div>
      {msg && <p>{msg}</p>}
    </section>
  );
}
