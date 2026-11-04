import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { db } from '../lib/store';
import { BUILTIN_TESTS } from '../lib/catalog';
import { award, recordResult } from '../lib/progress';
import { confetti } from '../components/Feedback';

export default function TakeTest() {
  const { id } = useParams(); const [sp] = useSearchParams(); const groupId = sp.get('group') ?? undefined;
  const test = [...BUILTIN_TESTS, ...db.tests()].find(t => t.id === id);
  const [i, setI] = useState(0); const [ans, setAns] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false); const [secs, setSecs] = useState(0);
  useEffect(() => { if (done) return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [done]);
  if (!test) return <p>Test not found. <Link to="/tests">Back</Link></p>;
  const qs = test.questions; const q = qs[i];
  const score = qs.filter(x => ans[x.id] === x.answer).length;
  const fmt = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

  const submit = () => {
    setDone(true);
    recordResult({ testId: test.id, title: test.title, score, total: qs.length, at: Date.now(), user: db.user(), groupId });
    award(10 + score * 5, `${score}/${qs.length} on ${test.title}`);
    if (score / qs.length >= 0.8) setTimeout(() => confetti(document.querySelector('.confetti') as HTMLCanvasElement), 100);
  };

  if (done) return (
    <section className="focus">
      <div className="done"><div className="big">{score === qs.length ? '🏆' : score / qs.length >= .8 ? '🎉' : score / qs.length >= .5 ? '👍' : '💪'}</div>
        <h2>{score} / {qs.length}</h2><p className="muted">{Math.round(score / qs.length * 100)}% · {fmt}</p></div>
      {qs.map((x, n) => <div key={x.id} className="question"><p><b>{n + 1}.</b> {x.prompt}</p>
        {x.choices.map((c, ci) => <div key={ci} className={'choice ' + (ci === x.answer ? 'right' : ans[x.id] === ci ? 'wrong' : '')}>{c}</div>)}
        {x.explanation && <p className="muted">{x.explanation}</p>}</div>)}
      <div className="row"><button onClick={() => { setDone(false); setAns({}); setI(0); setSecs(0); }}>Retry</button><Link to={groupId ? '/groups' : '/tests'}><button className="ghost">Back</button></Link></div>
    </section>
  );
  return (
    <section className="focus">
      <div className="row between"><Link to="/tests"><button className="ghost">✕ Quit</button></Link><span className="muted">⏱ {fmt}</span></div>
      <div className="bar"><i style={{ width: `${(Object.keys(ans).length / qs.length) * 100}%` }} /></div>
      <p className="muted">{test.title} · Question {i + 1} of {qs.length}</p>
      <h2>{q.prompt}</h2>
      <div className="choices">{q.choices.map((c, ci) => <button key={ci} className={'choice' + (ans[q.id] === ci ? ' picked' : '')}
        onClick={() => { setAns({ ...ans, [q.id]: ci }); if (i < qs.length - 1) setTimeout(() => setI(i + 1), 250); }}>{String.fromCharCode(65 + ci)}. {c}</button>)}</div>
      <div className="row between">
        <button className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Prev</button>
        <div className="dots">{qs.map((x, n) => <span key={x.id} className={(ans[x.id] !== undefined ? 'on' : '') + (n === i ? ' cur' : '')} onClick={() => setI(n)} />)}</div>
        {i < qs.length - 1 ? <button className="ghost" onClick={() => setI(i + 1)}>Next →</button> : <button disabled={Object.keys(ans).length < qs.length} onClick={submit}>Submit</button>}
      </div>
    </section>
  );
}
