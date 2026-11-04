import { useEffect, useRef, useState } from 'react';
import rig from '../assets/lumino/rig.json';

// Mr. Lumino, built from the cut asset-pack layers (scripts/cut-mascot.py + build-rig.py).
const files = import.meta.glob('../assets/lumino/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const SRC: Record<string, string> = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split('/').pop()!.replace('.png', ''), v]));
type R = typeof rig;
type Face = keyof R['faces']; type Hand = keyof R['hands']; type Fx = keyof R['fx']; type Pose = keyof R['poses']; type Slot = keyof R['slots'];

export type LuminoMood = 'idle' | 'talk' | 'think' | 'teach' | 'correct' | 'wrong' | 'cheer' | 'wave' | 'sleep' | 'read' | 'idea' | 'love';
type Look = { face?: Face; pose?: Pose; hand?: [Hand, Slot, string]; fx?: [Fx, string][]; body?: string; rays?: boolean };

// What each mood looks like and how it moves
const MOODS: Record<LuminoMood, Look> = {
  idle:    { face: 'smile', body: 'lum-bob', rays: true },
  talk:    { face: 'smile', body: 'lum-bob-fast', rays: true, fx: [['bubble', 'lum-pop']] },
  think:   { pose: 'thinking', body: 'lum-tilt' },
  teach:   { face: 'smile', body: 'lum-bob', rays: true, hand: ['point', 'right', 'lum-wag'] },
  correct: { face: 'starry', body: 'lum-jump', rays: true, hand: ['thumbs', 'right', 'lum-pop'], fx: [['sparkles', 'lum-twinkle']] },
  wrong:   { face: 'worried', body: 'lum-shake', hand: ['magnifier', 'right', 'lum-wag'] },
  cheer:   { face: 'xd', body: 'lum-jump', rays: true, hand: ['peace', 'right', 'lum-pop-wag'], fx: [['burst', 'lum-flash'], ['burst-small', 'lum-flash-late']] },
  wave:    { face: 'laugh', body: 'lum-bob', rays: true, hand: ['wave', 'right', 'lum-wave'] },
  sleep:   { face: 'sleepy', body: 'lum-breathe', fx: [['zzz', 'lum-float']] },
  read:    { pose: 'reading', body: 'lum-bob' },
  idea:    { pose: 'idea', body: 'lum-jump-once', fx: [['burst-small', 'lum-flash']] },
  love:    { face: 'love', body: 'lum-bob', rays: true, fx: [['sparkles', 'lum-twinkle']] },
};

/** Mouth shape for the letter being spoken (simple lip-sync). */
function mouthFor(ch: string | undefined, fallback: Face): Face {
  if (!ch || !/[a-z]/i.test(ch)) return fallback;
  const c = ch.toLowerCase();
  if ('a'.includes(c)) return 'laugh';
  if ('ouwq'.includes(c)) return 'surprised';
  if ('eiy'.includes(c)) return 'xd' === fallback ? 'xd' : 'laugh';
  return 'smile';
}

export default function Lumino({ mood = 'idle', talking = false, char, size = 220, dark, className = '', label }:
  { mood?: LuminoMood; talking?: boolean; char?: string; size?: number; dark?: boolean; className?: string; label?: string }) {
  const look = MOODS[mood];
  const [blink, setBlink] = useState(false);
  const [mouth, setMouth] = useState<Face | null>(null);
  const tick = useRef(0);
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Blink every few seconds when not talking
  useEffect(() => {
    if (talking || look.pose || mood === 'sleep' || reduce) return;
    let t: number; const loop = () => { t = window.setTimeout(() => { setBlink(true); window.setTimeout(() => setBlink(false), 150); loop(); }, 2400 + Math.random() * 2600); };
    loop(); return () => window.clearTimeout(t);
  }, [talking, look.pose, mood, reduce]);

  // Lip-sync: follow the spoken letter if given, otherwise babble
  useEffect(() => {
    if (!talking || look.pose) { setMouth(null); return; }
    if (char !== undefined) { setMouth(mouthFor(char, look.face ?? 'smile')); return; }
    const seq: Face[] = ['laugh', 'smile', 'surprised', 'laugh', 'smile', 'laugh'];
    const id = window.setInterval(() => { tick.current = (tick.current + 1 + Math.floor(Math.random() * 2)) % seq.length; setMouth(seq[tick.current]); }, 130);
    return () => window.clearInterval(id);
  }, [talking, char, look.pose, look.face]);

  const face: Face | undefined = look.pose ? undefined : blink ? 'happy' : (mouth ?? look.face);
  const L = rig.layers; const pct = (n: number) => `${n}%`;
  const layer = (src: string, x: number, y: number, w: number, h: number, cls = '', key?: string) =>
    <img key={key ?? src} src={SRC[src]} alt="" draggable={false} className={'lum-l ' + cls} style={{ left: pct(x), top: pct(y), width: pct(w), height: pct(h) }} />;

  return (
    <div className={`lumino ${reduce ? 'still' : ''} ${className}`} style={{ width: size, height: size }} role="img" aria-label={label ?? `Mr. Lumino (${mood})`}>
      <div className={'lum-body ' + (reduce ? '' : look.body ?? '')}>
        {look.pose ? (() => { const p = rig.poses[look.pose]; return layer(p.src, (100 - p.w) / 2, 100 - p.h - 2, p.w, p.h, 'lum-pose', 'pose-' + look.pose); })() : <>
          {look.rays && layer(L.rays.src, L.rays.x, L.rays.y, L.rays.w, L.rays.h, 'lum-rays')}
          {dark === undefined ? <>
            {layer(L.body.src, L.body.x, L.body.y, L.body.w, L.body.h, 'light-only', 'body-l')}
            {layer(L['body-dark'].src, L['body-dark'].x, L['body-dark'].y, L['body-dark'].w, L['body-dark'].h, 'dark-only', 'body-d')}
          </> : layer(dark ? L['body-dark'].src : L.body.src, L.body.x, L.body.y, L.body.w, L.body.h)}
          {face && (() => { const f = rig.faces[face]; return layer(f.src, f.cx - f.w / 2, f.cy - f.h / 2, f.w, f.h, 'lum-face', 'face'); })()}
        </>}
      </div>
      {look.hand && (() => { const [h, slot, anim] = look.hand; const hd = rig.hands[h]; const s = rig.slots[slot]; const w = hd.w * s.s, hh = hd.h * s.s;
        return <img key={'hand-' + h} src={SRC[hd.src]} alt="" draggable={false} className={'lum-l lum-hand ' + (reduce ? '' : anim)} style={{ left: pct(s.cx - w / 2), top: pct(s.cy - hh / 2), width: pct(w), height: pct(hh) }} />; })()}
      {look.fx?.map(([k, anim]) => { const f = rig.fx[k]; return <img key={'fx-' + k + mood} src={SRC[f.src]} alt="" draggable={false} className={'lum-l lum-fx ' + (reduce ? '' : anim)} style={{ left: pct(f.cx - f.w / 2), top: pct(f.cy - f.h / 2), width: pct(f.w), height: pct(f.h) }} />; })}
    </div>
  );
}

/** Reveals text letter by letter and reports the current letter (for lip-sync). */
export function useTypewriter(text: string, cps = 38) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); }, [text]);
  useEffect(() => {
    if (n >= text.length) return;
    const ch = text[n]; const pause = /[.!?]/.test(ch) ? 260 : /[,;:]/.test(ch) ? 140 : 1000 / cps;
    const id = window.setTimeout(() => setN(x => x + 1), pause); return () => window.clearTimeout(id);
  }, [n, text, cps]);
  return { shown: text.slice(0, n), char: text[n - 1], done: n >= text.length };
}
