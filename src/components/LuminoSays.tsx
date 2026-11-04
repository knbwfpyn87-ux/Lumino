import { useEffect } from 'react';
import Lumino, { type LuminoMood, useTypewriter } from './Lumino';

/** Mr. Lumino with a speech bubble that types out `text` while his mouth follows the letters. */
export default function LuminoSays({ text, mood = 'talk', after = 'idle', size = 160, onDone, side = 'left', className = '' }:
  { text: string; mood?: LuminoMood; after?: LuminoMood; size?: number; onDone?: () => void; side?: 'left' | 'top'; className?: string }) {
  const { shown, char, done } = useTypewriter(text, 40);
  useEffect(() => { if (done && text) onDone?.(); }, [done, text, onDone]);
  const talking = !!text && !done;
  return (
    <div className={`lsays ${side} ${className}`}>
      <Lumino mood={talking ? (mood === 'talk' ? 'talk' : mood) : after} talking={talking} char={char} size={size} />
      {text && <div className="lsays-bubble" aria-live="polite"><span className="sr-only">{text}</span><span aria-hidden="true">{shown}{talking && <span className="caret" />}</span></div>}
    </div>
  );
}
