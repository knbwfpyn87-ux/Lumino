// "Walk me through it": step-by-step help for the current question, one step at a time.
import { useState } from 'react';
import { walkthrough, type HelpQ } from '../lib/walkthrough';
import { speak, voiceOn } from '../lib/voice';

export default function HelpWalk({ q, desmos }: { q: HelpQ; desmos?: boolean }) {
  const steps = walkthrough(q, { desmos }); const [n, setN] = useState(0);
  const next = () => { const k = n + 1; setN(k); const s = steps[k - 1]; if (s && voiceOn()) speak(`${s.title}. ${s.text}`); };
  if (n === 0) return <button className="ghost helpbtn" onClick={next}>🆘 Walk me through it</button>;
  const last = steps[Math.min(n, steps.length) - 1]; const nextStep = steps[n];
  return (
    <div className="helpwalk" aria-live="polite">
      <div className="lbtag">🆘 Walkthrough · step {Math.min(n, steps.length)} of {steps.length}</div>
      <ol className="helpsteps">{steps.slice(0, n).map((s, i) => <li key={i} className={s.final ? 'final' : ''}><b>{s.title}:</b> {s.text}</li>)}</ol>
      {nextStep && <button className={nextStep.final ? 'ghost' : ''} onClick={next}>{nextStep.final ? 'Show the answer' : nextStep.title === 'Narrow it down' ? 'Rule out two choices' : 'Next step'}</button>}
      {!nextStep && last?.final && <p className="muted small">Now pick the answer and make sure you see why it works.</p>}
    </div>
  );
}
