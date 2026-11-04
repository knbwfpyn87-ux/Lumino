import { useEffect, useState } from 'react';
import Lumino, { type LuminoMood } from '../components/Lumino';
import LuminoSays from '../components/LuminoSays';
import { LOGO_FULL } from '../lib/logo';

// Scripted scenes for Mr. Lumino demo videos (#/lumino-scene?s=ai|teacher|moods).
type Step = { mood: LuminoMood; after?: LuminoMood; say?: string; hold: number; user?: string; pick?: number; caption?: string };
const Q = { prompt: 'If 3x + 7 = 22, what is x?', choices: ['3', '5', '7', '15'], answer: 1 };
const SCENES: Record<string, { title: string; steps: Step[] }> = {
  ai: { title: 'Mr. Lumino · AI Tutor', steps: [
    { mood: 'wave', after: 'wave', say: "Hi! I'm Mr. Lumino, your AI tutor. What are we learning today?", hold: 1200 },
    { mood: 'idle', user: 'How do I find the slope of a line?', hold: 1400 },
    { mood: 'think', say: 'Hmm, let me think…', hold: 1300 },
    { mood: 'talk', after: 'teach', say: 'Slope is rise over run. Pick two points, then divide the change in y by the change in x.', hold: 1200 },
    { mood: 'idea', say: 'For (1, 2) and (3, 8): (8 − 2) ÷ (3 − 1) = 6 ÷ 2 = 3.', hold: 1300 },
    { mood: 'talk', after: 'cheer', say: "So the slope is 3. Want to try one yourself? You've got this!", hold: 1800 },
  ] },
  teacher: { title: 'Mr. Lumino · Teacher', steps: [
    { mood: 'teach', after: 'teach', say: "Let's do this one together. Pick the answer you think is right.", hold: 1400 },
    { mood: 'teach', pick: 2, hold: 700 },
    { mood: 'wrong', after: 'teach', say: 'Not quite! First take 7 away from both sides: 3x = 15.', hold: 1200 },
    { mood: 'teach', after: 'teach', say: 'Now divide both sides by 3. What do you get?', hold: 1200 },
    { mood: 'teach', pick: 1, hold: 600 },
    { mood: 'correct', after: 'cheer', say: "That's right, x = 5! Great job fixing it!", hold: 2200 },
  ] },
  moods: { title: 'Mr. Lumino · Moods', steps: (['wave', 'idle', 'talk', 'think', 'teach', 'idea', 'read', 'correct', 'wrong', 'cheer', 'love', 'sleep'] as LuminoMood[])
    .map(m => ({ mood: m, after: m, hold: 1500, caption: m[0].toUpperCase() + m.slice(1) })) },
};

export default function LuminoScene() {
  const s = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('s') ?? 'ai';
  const scene = SCENES[s] ?? SCENES.ai; const [k, setK] = useState(-1); const [typed, setTyped] = useState(false);
  const [chat, setChat] = useState<string[]>([]); const [picked, setPicked] = useState<number | null>(null);
  const step = scene.steps[Math.max(k, 0)];
  useEffect(() => { const t = setTimeout(() => setK(0), 700); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (k < 0 || k >= scene.steps.length) return; setTyped(!step.say);
    if (step.user) setChat(c => [...c, step.user!]); if (step.pick !== undefined) setPicked(step.pick);
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (k < 0 || !typed || k >= scene.steps.length) return; const t = setTimeout(() => setK(k + 1), step.hold); return () => clearTimeout(t); }, [typed, k]); // eslint-disable-line react-hooks/exhaustive-deps
  const end = k >= scene.steps.length; const last = scene.steps[scene.steps.length - 1];
  const cur = end ? { ...last, say: undefined, mood: last.after ?? last.mood } : step;
  return (
    <div className="scene" data-scene={s} data-done={end ? '1' : '0'}>
      <img src={LOGO_FULL} alt="" className="scene-logo" />
      <div className="scene-title">{scene.title}</div>
      {s === 'teacher' && <div className="scene-q"><b>{Q.prompt}</b>
        <div className="scene-choices">{Q.choices.map((c, i) => <div key={i} className={'scene-choice ' + (picked === i ? (i === Q.answer ? 'ok' : 'bad') : '')}>{String.fromCharCode(65 + i)}. {c}</div>)}</div></div>}
      {s === 'ai' && chat.map((c, i) => <div key={i} className="scene-user">{c}</div>)}
      <div className="scene-stage">
        {cur.say ? <LuminoSays key={k} text={cur.say} mood={cur.mood} after={cur.after ?? 'idle'} size={s === 'teacher' ? 280 : 340} onDone={() => setTyped(true)} />
          : <div className="lsays left"><Lumino key={'m' + k} mood={cur.mood} size={s === 'moods' ? 380 : s === 'teacher' ? 280 : 340} />{cur.caption && <div className="scene-caption">{cur.caption}</div>}</div>}
      </div>
    </div>
  );
}
