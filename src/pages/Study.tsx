import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import UIcon from '../components/UIcon';
import { AI_ENABLED } from '../lib/features';
import { award } from '../lib/progress';

export default function Study() {
  return (
    <section>
      <h1 className="greet">Study</h1>
      <div className="tools big">
        {[['tool-flashcards', 'Flashcards', '/flashcards', 'Spaced-repetition decks', 'blue'], ['tool-notes', 'Notes', '/notes', 'Class notes', 'yellow'],
          ['tool-practice', 'Practice Tests', '/tests', 'SAT, AP & class tests', 'blue'], ['tool-timer', 'Focus Timer', '#timer', '25-minute sessions', 'yellow'],
          ...(AI_ENABLED ? [['tool-ai', 'AI Help', '/assistant', 'Lumino AI tutor', 'purple']] : []), ['icon-classes', 'Classes', '/courses', 'Units that level up', 'blue'],
          ['camera', 'Photo Quiz', '/photo-quiz/new', 'Snap a worksheet, solve as a group', 'yellow'], ['upload', 'Upload a Test', '/upload', 'Share with your group', 'blue']].map(([ic, l, to, d, c]) =>
          to.startsWith('#') ? <a key={l} href={to} onClick={e => { e.preventDefault(); document.getElementById('timer')?.scrollIntoView({ behavior: 'smooth' }); }} className={'tool ' + c}><UIcon name={ic} size={42} ink /><span>{l}</span><small className="muted">{d}</small></a>
          : <Link key={l} to={to} className={'tool ' + c}>{ic.includes('-') ? <UIcon name={ic} size={42} ink /> : <Icon name={ic} size={38} />}<span>{l}</span><small className="muted">{d}</small></Link>)}
      </div>
      <FocusTimer />
    </section>
  );
}

function FocusTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus'); const len = mode === 'focus' ? 25 * 60 : 5 * 60;
  const [left, setLeft] = useState(len); const [running, setRunning] = useState(false); const t = useRef<number | undefined>(undefined);
  useEffect(() => { setLeft(len); }, [len]);
  useEffect(() => {
    if (!running) return;
    t.current = window.setInterval(() => setLeft(s => {
      if (s > 1) return s - 1;
      window.clearInterval(t.current); setRunning(false);
      if (mode === 'focus') { award(25, 'focus session'); setMode('break'); } else setMode('focus');
      return 0;
    }), 1000);
    return () => window.clearInterval(t.current);
  }, [running, mode]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  return (
    <div className="panel timer" id="timer">
      <div className="panelhead"><h3><UIcon name="tool-timer" size={30} ink className="keep" /> Focus Timer</h3><span className="muted small">25 min focus · 5 min break · +25 XP</span></div>
      <div className="seg">{(['focus', 'break'] as const).map(m => <button key={m} className={mode === m ? '' : 'ghost'} onClick={() => { setRunning(false); setMode(m); }}>{m === 'focus' ? 'Focus' : 'Break'}</button>)}</div>
      <div className="clock" aria-live="polite">{mm}:{ss}</div>
      <div className="bar"><i style={{ width: `${(1 - left / len) * 100}%` }} /></div>
      <div className="row center"><button onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button><button className="ghost" onClick={() => { setRunning(false); setLeft(len); }}>Reset</button></div>
    </div>
  );
}
