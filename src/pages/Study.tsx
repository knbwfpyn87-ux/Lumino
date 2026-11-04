import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { award } from '../lib/progress';

export default function Study() {
  return (
    <section>
      <h1 className="greet">Study</h1>
      <div className="tools big">
        {[['cards', 'Flashcards', '/flashcards', 'Spaced-repetition decks'], ['practice', 'Practice Tests', '/tests', 'SAT, AP & class tests'], ['classes', 'Classes', '/courses', 'Units that level up'],
          ['camera', 'Photo Quiz', '/photo-quiz/new', 'Snap a worksheet, solve it together'], ['upload', 'Upload a Test', '/upload', 'Share with your group']].map(([ic, l, to, d]) =>
          <Link key={l} to={to} className="tool"><Icon name={ic} size={28} /><span>{l}</span><small className="muted">{d}</small></Link>)}
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
      <div className="panelhead"><h3><Icon name="timer" /> Focus Timer</h3><span className="muted small">25 min focus · 5 min break · +25 XP</span></div>
      <div className="seg">{(['focus', 'break'] as const).map(m => <button key={m} className={mode === m ? '' : 'ghost'} onClick={() => { setRunning(false); setMode(m); }}>{m === 'focus' ? 'Focus' : 'Break'}</button>)}</div>
      <div className="clock" aria-live="polite">{mm}:{ss}</div>
      <div className="bar"><i style={{ width: `${(1 - left / len) * 100}%` }} /></div>
      <div className="row center"><button onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button><button className="ghost" onClick={() => { setRunning(false); setLeft(len); }}>Reset</button></div>
    </div>
  );
}
