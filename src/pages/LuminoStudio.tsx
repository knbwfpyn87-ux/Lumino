import { useSearchParams } from 'react-router-dom';
import Lumino, { type LuminoMood, useTypewriter } from '../components/Lumino';

const ALL: LuminoMood[] = ['idle', 'talk', 'think', 'teach', 'correct', 'wrong', 'cheer', 'wave', 'sleep', 'read', 'idea', 'love'];

/** Mr. Lumino's mood gallery (also used to record the demo videos). */
export default function LuminoStudio() {
  const [sp] = useSearchParams(); const one = sp.get('mood') as LuminoMood | null; const text = sp.get('say') ?? '';
  const { shown, char, done } = useTypewriter(text, 26);
  if (one) return (
    <div className="studio one"><Lumino mood={one} talking={!!text && !done} char={text ? char : undefined} size={360} />
      {text && <div className="studio-say">{shown}<span className="caret" /></div>}</div>
  );
  return (
    <section>
      <h1 className="greet">Mr. Lumino</h1>
      <p className="muted">Every mood, built from the asset pack layers.</p>
      <div className="studio-grid">{ALL.map(m => <div key={m} className="panel studio-cell"><Lumino mood={m} talking={m === 'talk'} size={170} /><b>{m}</b></div>)}</div>
    </section>
  );
}
