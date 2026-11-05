import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useTests } from '../components/useTests';
import { buildCourseTest, recordCourseResult, parseCourseTestId, courseTestId } from '../lib/courses';
import { canAccess, tierOf } from '../lib/plans';
import { usePlan } from '../lib/auth';
import Locked from '../components/Locked';
import { useMemo } from 'react';
import { saveResult } from '../lib/api';
import { useAuth, myName } from '../lib/auth';
import { award, recordResult } from '../lib/progress';
import { confetti } from '../components/Feedback';
import Lumino from '../components/Lumino';
import LuminoSays from '../components/LuminoSays';
import { teachLine, verdict as verdictFor } from '../lib/lines';
import { prefetchLine } from '../lib/voice';

const TEACH_KEY = 'lumino:teacherMode';
const getTeach = () => { try { return localStorage.getItem(TEACH_KEY) !== 'off'; } catch { return true; } };

export default function TakeTest() {
  const { id } = useParams(); const [sp] = useSearchParams(); const groupId = sp.get('group') ?? undefined;
  const { tests, loading } = useTests(); const { profile } = useAuth();
  const course = useMemo(() => (id ? buildCourseTest(id) : null), [id]); const plan = usePlan();
  const test = course ?? tests.find(t => t.id === id);
  const [i, setI] = useState(0); const [ans, setAns] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false); const [secs, setSecs] = useState(0);
  const [teach, setTeach] = useState(getTeach); const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  useEffect(() => { if (done) return; const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, [done]);
  if (test && !canAccess(plan, tierOf(test))) return <section><Locked tier={tierOf(test)} what={test.title} /></section>;
  if (!test) return loading ? <p className="muted">Loading…</p> : <p>Test not found. <Link to="/tests">Back</Link></p>;
  const qs = test.questions; const q = qs[i];
  const score = qs.filter(x => ans[x.id] === x.answer).length;
  const fmt = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

  const submit = () => {
    setDone(true);
    recordResult({ testId: test.id, title: test.title, score, total: qs.length, at: Date.now(), user: myName(profile), groupId });
    if (course) recordCourseResult(test.id, score / qs.length);
    saveResult({ testId: test.id, title: test.title, score, total: qs.length, groupId }).catch(() => {});
    award(10 + score * 5, `${score}/${qs.length} on ${test.title}`);
    if (score / qs.length >= 0.8) setTimeout(() => confetti(document.querySelector('.confetti') as HTMLCanvasElement), 100);
  };
  const reset = () => { setDone(false); setAns({}); setI(0); setSecs(0); setRevealed({}); };
  const pct = score / qs.length;
  const verdict = verdictFor(score, qs.length);

  if (done) return (
    <section className="focus">
      <div className="done teacherdone"><LuminoSays text={verdict.line} mood={verdict.mood} after={verdict.mood} size={170} />
        <h2>{score} / {qs.length}</h2><p className="muted">{Math.round(pct * 100)}% · {fmt}</p></div>
      {qs.map((x, n) => <div key={x.id} className="question"><p><b>{n + 1}.</b> {x.prompt}</p>{x.code && <pre className="code"><code>{x.code}</code></pre>}
        {x.choices.map((c, ci) => <div key={ci} className={'choice ' + (ci === x.answer ? 'right' : ans[x.id] === ci ? 'wrong' : '')}>{c}</div>)}
        {x.explanation && <p className="muted">{x.explanation}</p>}</div>)}
      <div className="row">{course ? (() => { const p = parseCourseTestId(test.id)!; return <>
        <Link to={`/tests/${courseTestId(p.courseId, p.u, p.l, p.attempt + 1)}`} onClick={reset}><button>New questions</button></Link>
        <Link to={`/courses/${p.courseId}`}><button className="ghost">{score / qs.length >= 0.7 ? 'Next level →' : 'Back to class'}</button></Link></>; })()
        : <><button onClick={reset}>Retry</button><Link to={groupId ? '/groups' : '/tests'}><button className="ghost">Back</button></Link></>}</div>
    </section>
  );
  return (
    <section className="focus">
      <div className="row between"><Link to={course ? `/courses/${parseCourseTestId(test.id)!.courseId}` : '/tests'}><button className="ghost">✕ Quit</button></Link><span className="muted">⏱ {fmt}</span></div>
      <div className="bar"><i style={{ width: `${(Object.keys(ans).length / qs.length) * 100}%` }} /></div>
      <div className="row between"><p className="muted" style={{ margin: 0 }}>{test.title} · Question {i + 1} of {qs.length}</p>
        <label className="teachtoggle small"><input type="checkbox" checked={teach} onChange={e => { setTeach(e.target.checked); try { localStorage.setItem(TEACH_KEY, e.target.checked ? 'on' : 'off'); } catch { /* ignore */ } }} /> <Lumino mood="idle" size={26} /> Learn with Mr. Lumino</label></div>
      <h2>{q.prompt}</h2>
      {q.code && <pre className="code"><code>{q.code}</code></pre>}
      <div className="choices">{q.choices.map((c, ci) => { const shown = teach && revealed[q.id];
        return <button key={ci} disabled={shown} className={'choice' + (ans[q.id] === ci ? ' picked' : '') + (shown ? (ci === q.answer ? ' isright' : ans[q.id] === ci ? ' iswrong' : ' faded') : '')}
          onClick={() => { setAns({ ...ans, [q.id]: ci }); if (teach) setRevealed({ ...revealed, [q.id]: true }); else if (i < qs.length - 1) setTimeout(() => setI(i + 1), 250); }}>{String.fromCharCode(65 + ci)}. {c}</button>; })}</div>
      {teach && (() => { const ok = ans[q.id] === q.answer; const r = revealed[q.id];
        const line = teachLine(i, q, !!r, ok);
        if (!r) { prefetchLine(teachLine(i, q, true, true)); prefetchLine(teachLine(i, q, true, false)); }
        return <div className="teacherbox"><LuminoSays key={q.id + (r ? 'r' : '')} text={line} size={130} mood={!r ? 'teach' : ok ? 'correct' : 'wrong'} after={!r ? 'teach' : ok ? 'correct' : 'teach'} /></div>; })()}
      <div className="row between">
        <button className="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Prev</button>
        <div className="dots">{qs.map((x, n) => <span key={x.id} className={(ans[x.id] !== undefined ? 'on' : '') + (n === i ? ' cur' : '')} onClick={() => setI(n)} />)}</div>
        {i < qs.length - 1 ? <button className="ghost" onClick={() => setI(i + 1)}>Next →</button> : <button disabled={Object.keys(ans).length < qs.length} onClick={submit}>Submit</button>}
      </div>
    </section>
  );
}
