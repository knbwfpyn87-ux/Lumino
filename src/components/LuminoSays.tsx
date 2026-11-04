import { useEffect, useRef, useState } from 'react';
import Lumino, { type LuminoMood, useTypewriter } from './Lumino';
import { speak, stopSpeaking, speakable, voiceOn, setVoiceOn, onVoiceChange, voiceSupported } from '../lib/voice';

/** Mr. Lumino with a speech bubble. He reads `text` aloud (device voice) while the words appear and his mouth moves. */
export default function LuminoSays({ text, mood = 'talk', after = 'idle', size = 160, onDone, side = 'left', className = '', silent = false, durationMs }:
  { text: string; mood?: LuminoMood; after?: LuminoMood; size?: number; onDone?: () => void; side?: 'left' | 'top'; className?: string; silent?: boolean; durationMs?: number }) {
  const [on, setOn] = useState(voiceOn()); useEffect(() => onVoiceChange(() => setOn(voiceOn())), []);
  const [spoken, setSpoken] = useState<null | { upto: number; done: boolean }>(null);
  const fellBack = useRef(false);
  // Silent typing (no voice, muted, or the browser gives no word timing)
  const cps = durationMs ? Math.max(8, text.length / (durationMs / 1000)) : 40;
  const tw = useTypewriter(spoken ? '' : text, cps, !!durationMs);

  useEffect(() => {
    setSpoken(null); fellBack.current = false;
    if (silent || !on || !text) return;
    let gotWord = false; const plain = speakable(text);
    const ok = speak(text, {
      onStart: () => setSpoken({ upto: 0, done: false }),
      // map the spoken position back onto the displayed text (they differ only by removed symbols)
      onWord: i => { gotWord = true; const frac = (i + 1) / Math.max(plain.length, 1); const end = text.indexOf(' ', Math.ceil(frac * text.length)); setSpoken({ upto: end < 0 ? text.length : end, done: false }); },
      onEnd: () => setSpoken({ upto: text.length, done: true }),
    });
    // Some browsers speak without word events: reveal at an even pace instead
    const t = window.setTimeout(() => { if (ok && !gotWord) fellBack.current = true; }, 900);
    return () => { window.clearTimeout(t); stopSpeaking(); };
  }, [text, on, silent]);

  const usingVoice = !!spoken;
  const shown = usingVoice ? text.slice(0, spoken!.upto) : tw.shown;
  const done = usingVoice ? spoken!.done : tw.done;
  const talking = !!text && !done;
  useEffect(() => { if (done && text) onDone?.(); }, [done, text, onDone]);
  // While speaking with no word timing, show the full text so reading isn't held back
  const display = usingVoice && fellBack.current ? text : shown;

  return (
    <div className={`lsays ${side} ${className}`}>
      <Lumino mood={talking ? mood : after} talking={talking} char={usingVoice ? undefined : tw.char} size={size} />
      {text && <div className="lsays-bubble" aria-live="polite"><span className="sr-only">{text}</span><span aria-hidden="true">{display}{talking && <span className="caret" />}</span>
        {voiceSupported && !silent && <button className="voicebtn" onClick={() => setVoiceOn(!on)} aria-label={on ? 'Mute Mr. Lumino' : 'Let Mr. Lumino speak'} title={on ? 'Mute' : 'Turn voice on'}>{on ? '🔊' : '🔇'}</button>}</div>}
    </div>
  );
}
