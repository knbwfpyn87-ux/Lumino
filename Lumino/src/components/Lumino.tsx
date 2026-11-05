import { useEffect, useRef, useState } from 'react';
import art from '../assets/art.json';
const rig = art.rig;

// Mr. Lumino, built from the cut asset-pack layers (scripts/cut-mascot.py + build-rig.py).
const SRC = art.lumino as Record<string, string>;
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

export default function Lumino({ mood = 'idle', talking = false, char, size = 220, dark, className = '', label }:
  { mood?: LuminoMood; talking?: boolean; char?: string; size?: number; dark?: boolean; className?: string; label?: string }) {
  const look = MOODS[mood];
  const [blink, setBlink] = useState(false);
  const [mouth, setMouth] = useState<Face | null>(null);
  const charRef = useRef<string | undefined>(char); charRef.current = char;
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Blink every few seconds when not talking
  useEffect(() => {
    if (talking || look.pose || mood === 'sleep' || reduce) return;
    let t: number; const loop = () => { t = window.setTimeout(() => { setBlink(true); window.setTimeout(() => setBlink(false), 140); loop(); }, 2400 + Math.random() * 2600); };
    loop(); return () => window.clearTimeout(t);
  }, [talking, look.pose, mood, reduce]);

  // Lip-sync on a syllable rhythm (not per letter): the mouth opens and closes about 6–7 times a second,
  // picks a round or wide shape from the upcoming vowel, and rests closed on pauses (spaces and punctuation).
  useEffect(() => {
    if (!talking || look.pose) { setMouth(null); return; }
    let open = false, t: number;
    const step = () => {
      const c = (charRef.current ?? '').toLowerCase();
      const pause = /[.!?,;:]/.test(c);
      if (pause || open) { setMouth('talk-closed'); open = false; }
      else { setMouth(/[ouw]/.test(c) ? 'talk-oh' : 'talk-open'); open = true; }
      t = window.setTimeout(step, pause ? 220 : open ? 110 + Math.random() * 50 : 70 + Math.random() * 40);
    };
    step(); return () => window.clearTimeout(t);
  }, [talking, look.pose]);

  const face: Face | undefined = look.pose ? undefined : blink ? 'happy' : (mouth ?? look.face);
  const L = rig.layers; const pct = (n: number) => `${n}%`;
  const layer = (src: string, x: number, y: number, w: number, h: number, cls = '', key?: string) =>
    <img key={key ?? src} src={SRC[src]} alt="" draggable={false} className={'lum-l ' + cls} style={{ left: pct(x), top: pct(y), width: pct(w), height: pct(h) }} />;
  // Every face this mood can show is mounted up front (already decoded) and cross-faded, so shapes never "pop".
  const faces = [...new Set([look.face ?? 'smile', 'smile', 'happy', 'talk-closed', 'talk-open', 'talk-oh'])] as Face[];
  const extra = look.body && look.body !== 'lum-bob' ? look.body.replace('lum-bob-fast', 'lum-sway') : '';

  return (
    <div className={`lumino ${reduce ? 'still' : ''} ${className}`} style={{ width: size, height: size }} role="img" aria-label={label ?? `Mr. Lumino (${mood})`}>
      {/* The bob never restarts between moods; mood-specific motion runs on an inner layer */}
      <div className={'lum-body ' + (reduce ? '' : 'lum-bob')}><div className={'lum-move ' + (reduce ? '' : extra)} key={'move-' + mood}>
        <div className={'lum-set' + (look.pose ? ' off' : '')}>
          {layer(L.rays.src, L.rays.x, L.rays.y, L.rays.w, L.rays.h, 'lum-rays' + (look.rays ? '' : ' off'))}
          {dark === undefined ? <>
            {layer(L.body.src, L.body.x, L.body.y, L.body.w, L.body.h, 'light-only', 'body-l')}
            {layer(L['body-dark'].src, L['body-dark'].x, L['body-dark'].y, L['body-dark'].w, L['body-dark'].h, 'dark-only', 'body-d')}
          </> : layer(dark ? L['body-dark'].src : L.body.src, L.body.x, L.body.y, L.body.w, L.body.h)}
          {faces.map(fn => { const f = rig.faces[fn]; return layer(f.src, f.cx - f.w / 2, f.cy - f.h / 2, f.w, f.h, 'lum-face' + (fn === face ? '' : ' off'), 'face-' + fn); })}
        </div>
        {(Object.keys(rig.poses) as Pose[]).map(pk => { const p = rig.poses[pk]; return layer(p.src, (100 - p.w) / 2, 100 - p.h - 2, p.w, p.h, 'lum-pose' + (look.pose === pk ? '' : ' off'), 'pose-' + pk); })}
      </div></div>
      {look.hand && (() => { const [h, slot, anim] = look.hand; const hd = rig.hands[h]; const s = rig.slots[slot]; const w = hd.w * s.s, hh = hd.h * s.s;
        return <span key={'hand-' + h} className={'lum-handwrap ' + (reduce ? '' : 'lum-in')} style={{ left: pct(s.cx - w / 2), top: pct(s.cy - hh / 2), width: pct(w), height: pct(hh) }}>
          <img src={SRC[hd.src]} alt="" draggable={false} className={'lum-hand ' + (reduce ? '' : anim)} /></span>; })()}
      {look.fx?.map(([k, anim]) => { const f = rig.fx[k]; return <span key={'fx-' + k + mood} className={'lum-fxwrap ' + (reduce ? '' : 'lum-in')} style={{ left: pct(f.cx - f.w / 2), top: pct(f.cy - f.h / 2), width: pct(f.w), height: pct(f.h) }}>
        <img src={SRC[f.src]} alt="" draggable={false} className={'lum-fx ' + (reduce ? '' : anim)} /></span>; })}
    </div>
  );
}

/** Reveals text letter by letter and reports the current letter (for lip-sync). */
export function useTypewriter(text: string, cps = 38, even = false) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); }, [text]);
  useEffect(() => {
    if (n >= text.length) return;
    const ch = text[n]; const pause = even ? 1000 / cps : /[.!?]/.test(ch) ? 260 : /[,;:]/.test(ch) ? 140 : 1000 / cps;
    const id = window.setTimeout(() => setN(x => x + 1), pause); return () => window.clearTimeout(id);
  }, [n, text, cps, even]);
  return { shown: text.slice(0, n), char: text[n - 1], done: n >= text.length };
}
