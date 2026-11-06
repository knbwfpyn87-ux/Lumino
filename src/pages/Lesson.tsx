import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { COURSES, unitTier, loadLessonText, markLessonDone, isLessonDone, courseTestId, levelState, getCourseProgress, type Block, type LessonText } from '../lib/courses';
import { canAccess } from '../lib/plans';
import { usePlan } from '../lib/auth';
import Locked from '../components/Locked';
import LuminoSays from '../components/LuminoSays';
import { speak, stopSpeaking, voiceOn } from '../lib/voice';
import { award } from '../lib/progress';
import { confetti } from '../components/Feedback';
import Lab from '../components/Lab';
import HelpWalk from '../components/HelpWalk';
import { recordAnswer } from '../lib/play';
import { DesmosDock, DesmosBlock } from '../components/Desmos';
import { courseUsesDesmos } from '../lib/desmos';
import { isLabDone, markLabDone } from '../lib/courses';

/** What "Read to me" says for each block (null = skip). */
function spokenBlock(b: Block): string | null {
  switch (b.t) {
    case 'p': case 'h': return b.text;
    case 'key': return `Big idea: ${b.text}`;
    case 'tip': return `Tip: ${b.text}`;
    case 'oops': return `Watch out: ${b.text}`;
    case 'list': return b.items.join('. ');
    case 'ex': return `Example: ${b.problem}. ${b.steps.join('. ')}. Answer: ${b.answer}.`;
    case 'lab': return `${b.kind === 'lab' ? 'Virtual lab' : 'Try it'}: ${b.title}. ${b.aim} ${b.steps.join(' ')}`;
    default: return null;
  }
}

function Example({ b }: { b: Extract<Block, { t: 'ex' }> }) {
  const [shown, setShown] = useState(0); const done = shown >= b.steps.length;
  return (
    <div className="lb ex"><div className="lbtag">✏️ Worked example</div><p className="exq">{b.problem}</p>
      <ol className="steps">{b.steps.slice(0, shown).map((s, i) => <li key={i}>{s}</li>)}</ol>
      {done ? <p className="exans">✅ {b.answer}</p>
        : <div className="row"><button onClick={() => setShown(shown + 1)}>{shown ? 'Next step' : 'Show the first step'}</button>{shown === 0 && <button className="ghost" onClick={() => setShown(b.steps.length)}>Show it all</button>}</div>}
    </div>
  );
}

function BlockView({ b, active, onLab }: { b: Block; active: boolean; onLab: (title: string) => void }) {
  const cls = active ? ' reading' : '';
  switch (b.t) {
    case 'h': return <h3 className={'lh' + cls}>{b.text}</h3>;
    case 'p': return <p className={'lp' + cls}>{b.text}</p>;
    case 'list': return <ul className={'ll' + cls}>{b.items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
    case 'key': return <div className={'lb key' + cls}><div className="lbtag">💡 Big idea</div>{b.text}</div>;
    case 'tip': return <div className={'lb tip' + cls}><div className="lbtag">✨ Tip</div>{b.text}</div>;
    case 'oops': return <div className={'lb oops' + cls}><div className="lbtag">⚠️ Watch out</div>{b.text}</div>;
    case 'code': return <pre className={'code' + cls}><code>{b.text}</code></pre>;
    case 'ex': return <div className={cls}><Example b={b} /></div>;
    case 'lab': return <div className={cls}><Lab b={b} onDone={() => onLab(b.title)} /></div>;
    case 'desmos': return <div className={cls}><DesmosBlock lines={b.lines} /></div>;
  }
}

export default function Lesson() {
  const { id = '', u: us = '0', l: ls = '0' } = useParams(); const u = Number(us), l = Number(ls);
  const plan = usePlan(); const c = COURSES.find(x => x.id === id); const unit = c?.units[u]; const lesson = unit?.lessons[l];
  const [text, setText] = useState<LessonText | null | undefined>(undefined);
  const [reading, setReading] = useState(-1); const readRun = useRef(0);
  const [qi, setQi] = useState(0); const [picks, setPicks] = useState<Record<number, number>>({});
  useEffect(() => { setText(undefined); setQi(0); setPicks({}); setReading(-1); window.scrollTo(0, 0); loadLessonText(id).then(t => setText(t?.[u]?.[l] ?? null)); }, [id, u, l]);
  useEffect(() => () => { readRun.current++; stopSpeaking(); }, [id, u, l]);

  if (!c || !unit || !lesson) return <p>Lesson not found. <Link to="/courses">Back</Link></p>;
  const tier = unitTier(c, u);
  if (!canAccess(plan, tier)) return <section><Locked tier={tier} what={`${c.name} · Unit ${u + 1}`} /></section>;
  const checks = lesson.checks; const answered = Object.keys(picks).length; const allDone = answered === checks.length;
  const right = checks.filter((q, i) => picks[i] === q.answer).length;
  const nextLesson = l + 1 < unit.lessons.length ? { u, l: l + 1 } : u + 1 < c.units.length && c.units[u + 1].lessons.length ? { u: u + 1, l: 0 } : null;
  const practice = levelState(c.id, u, 0, getCourseProgress());

  const readAloud = () => {
    if (reading >= 0) { readRun.current++; stopSpeaking(); setReading(-1); return; }
    if (!text) return; const run = ++readRun.current; const blocks = text.blocks;
    const go = (i: number) => {
      if (run !== readRun.current) return;
      while (i < blocks.length && !spokenBlock(blocks[i])) i++;
      if (i >= blocks.length) { setReading(-1); return; }
      setReading(i); document.querySelectorAll('.lessonbody > *')[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (!speak(spokenBlock(blocks[i])!, { onEnd: () => go(i + 1) })) setReading(-1);
    };
    go(0);
  };
  const pick = (ci: number) => {
    if (picks[qi] != null) return; const n = { ...picks, [qi]: ci }; setPicks(n);
    recordAnswer({ id: `${c.id}~${u}~${l}~${qi}`, prompt: checks[qi].q, choices: checks[qi].choices, answer: checks[qi].answer, explanation: checks[qi].why, code: checks[qi].code }, ci === checks[qi].answer, `${c.name}: ${lesson.title}`);
    if (Object.keys(n).length === checks.length) {
      const score = checks.filter((q, i) => n[i] === q.answer).length;
      if (!isLessonDone(c.id, u, l)) award(15 + score * 5, `Lesson: ${lesson.title}`);
      markLessonDone(c.id, u, l);
      if (score === checks.length) setTimeout(() => confetti(document.querySelector('.confetti') as HTMLCanvasElement), 100);
    }
  };
  const labDone = (title: string) => { if (!isLabDone(c.id, u, l, title)) { markLabDone(c.id, u, l, title); award(10, `${title}`); } };
  const q = checks[qi]; const picked = picks[qi];

  return (
    <section className="focus lesson">
      {courseUsesDesmos(c) && <DesmosDock />}
      <div className="row between"><Link to={`/courses/${c.id}`}><button className="ghost">← {c.name}</button></Link>
        <span className="muted small">Unit {u + 1} · Lesson {l + 1} of {unit.lessons.length}</span></div>
      <div className="lessondots">{unit.lessons.map((_, i) => <Link key={i} to={`/courses/${c.id}/learn/${u}/${i}`} className={'ldot' + (i === l ? ' on' : isLessonDone(c.id, u, i) ? ' done' : '')} aria-label={`Lesson ${i + 1}`} />)}</div>
      <p className="muted small unitname">{unit.title}</p>
      <h2>{lesson.title}</h2>
      {text === undefined ? <p className="muted">Loading the lesson…</p> : text === null ? <p className="muted">This lesson couldn't load. Check your connection and try again.</p> : <>
        <LuminoSays key={`${id}-${u}-${l}`} text={text.say} mood="teach" after="idle" size={130} />
        {voiceOn() && <button className="ghost readbtn" onClick={readAloud}>{reading >= 0 ? '⏹ Stop reading' : '🔊 Read this lesson to me'}</button>}
        <div className="lessonbody">{text.blocks.map((b, i) => <BlockView key={i} b={b} active={i === reading} onLab={labDone} />)}</div>
        {lesson.terms.length > 0 && <div className="terms"><h3>🔑 Key terms</h3><dl>{lesson.terms.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl></div>}

        <div className="quickcheck"><canvas className="confetti" />
          <h3>✅ Quick check <span className="muted small">{qi + 1} of {checks.length}</span></h3>
          {!allDone || picked != null ? <>
            <p className="qq">{q.q}</p>{q.code && <pre className="code"><code>{q.code}</code></pre>}
            <div className="choices">{q.choices.map((ch, ci) => <button key={ci} disabled={picked != null}
              className={'choice' + (picked == null ? '' : ci === q.answer ? ' isright' : ci === picked ? ' iswrong' : ' faded')} onClick={() => pick(ci)}>{String.fromCharCode(65 + ci)}. {ch}</button>)}</div>
            {picked == null && <HelpWalk key={`${id}-${u}-${l}-${qi}`} q={{ id: `${id}~${u}~${l}~${qi}`, prompt: q.q, choices: q.choices, answer: q.answer, explanation: q.why }} desmos={courseUsesDesmos(c)} />}
            {picked != null && <div className="teacherbox"><LuminoSays key={`why-${qi}`} size={96} mood={picked === q.answer ? 'correct' : 'wrong'} after={picked === q.answer ? 'correct' : 'teach'}
              text={picked === q.answer ? `Yes! ${q.why}` : `Not quite. It's ${String.fromCharCode(65 + q.answer)}. ${q.why}`} /></div>}
            {picked != null && qi < checks.length - 1 && <button onClick={() => setQi(qi + 1)}>Next question →</button>}
          </> : null}
          {allDone && qi === checks.length - 1 && <div className="lessondone">
            <p><b>{right} of {checks.length} right.</b> {right === checks.length ? 'You nailed this lesson!' : 'Nice work! Re-read the part you missed, then keep going.'}</p>
            <div className="row">{nextLesson ? <Link to={`/courses/${c.id}/learn/${nextLesson.u}/${nextLesson.l}`}><button>Next lesson →</button></Link> : null}
              <Link to={`/tests/${courseTestId(c.id, u, 0, practice.attempts)}`}><button className={nextLesson ? 'ghost' : ''}>Practice Unit {u + 1}</button></Link></div>
          </div>}
        </div>
      </>}
    </section>
  );
}
