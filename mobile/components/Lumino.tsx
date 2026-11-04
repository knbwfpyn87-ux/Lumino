import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Text, View, AccessibilityInfo } from 'react-native';
import rig from '@/assets/lumino/rig.json';
import { LUM_SRC } from '@/lib/lumino-assets';
import { useTheme } from '@/lib/theme';

// Mr. Lumino for iPhone: same layers and moods as the website.
type R = typeof rig; type Face = keyof R['faces']; type Hand = keyof R['hands']; type Fx = keyof R['fx']; type Pose = keyof R['poses']; type Slot = keyof R['slots'];
export type LuminoMood = 'idle' | 'talk' | 'think' | 'teach' | 'correct' | 'wrong' | 'cheer' | 'wave' | 'sleep' | 'read' | 'idea' | 'love';
type Motion = 'bob' | 'jump' | 'shake' | 'tilt' | 'breathe';
const MOODS: Record<LuminoMood, { face?: Face; pose?: Pose; hand?: [Hand, Slot]; fx?: Fx[]; motion: Motion; rays?: boolean }> = {
  idle: { face: 'smile', motion: 'bob', rays: true }, talk: { face: 'smile', motion: 'bob', rays: true, fx: ['bubble'] },
  think: { pose: 'thinking', motion: 'tilt' }, teach: { face: 'smile', motion: 'bob', rays: true, hand: ['point', 'right'] },
  correct: { face: 'starry', motion: 'jump', rays: true, hand: ['thumbs', 'right'], fx: ['sparkles'] },
  wrong: { face: 'worried', motion: 'shake', hand: ['magnifier', 'right'] },
  cheer: { face: 'xd', motion: 'jump', rays: true, hand: ['peace', 'right'], fx: ['burst', 'burst-small'] },
  wave: { face: 'laugh', motion: 'bob', rays: true, hand: ['wave', 'right'] }, sleep: { face: 'sleepy', motion: 'breathe', fx: ['zzz'] },
  read: { pose: 'reading', motion: 'bob' }, idea: { pose: 'idea', motion: 'jump', fx: ['burst-small'] }, love: { face: 'love', motion: 'bob', rays: true, fx: ['sparkles'] },
};
const mouthFor = (ch?: string): Face => { if (!ch || !/[a-z]/i.test(ch)) return 'smile'; const c = ch.toLowerCase(); return 'a'.includes(c) ? 'laugh' : 'ouwq'.includes(c) ? 'surprised' : 'eiy'.includes(c) ? 'laugh' : 'smile'; };

export default function Lumino({ mood = 'idle', talking = false, char, size = 160 }: { mood?: LuminoMood; talking?: boolean; char?: string; size?: number }) {
  const t = useTheme(); const dark = t.bg === '#0f111a'; const look = MOODS[mood];
  const anim = useRef(new Animated.Value(0)).current; const hand = useRef(new Animated.Value(0)).current;
  const [blink, setBlink] = useState(false); const [babble, setBabble] = useState<Face | null>(null); const [still, setStill] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {}); }, []);
  useEffect(() => {
    if (still) return; anim.setValue(0); hand.setValue(0);
    const loop = (d: number) => Animated.loop(Animated.timing(anim, { toValue: 1, duration: d, easing: Easing.inOut(Easing.sin), useNativeDriver: true }));
    const a = look.motion === 'shake' ? Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }) : loop(look.motion === 'jump' ? 1100 : look.motion === 'breathe' ? 3200 : talking ? 900 : 2600);
    const h = Animated.loop(Animated.timing(hand, { toValue: 1, duration: mood === 'wave' ? 550 : 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }));
    a.start(); h.start(); return () => { a.stop(); h.stop(); };
  }, [mood, talking, still, look.motion, anim, hand]);
  useEffect(() => { if (talking || look.pose || still) return; let to: ReturnType<typeof setTimeout>; const go = () => { to = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 150); go(); }, 2400 + Math.random() * 2500); }; go(); return () => clearTimeout(to); }, [talking, look.pose, still]);
  useEffect(() => { if (!talking || char !== undefined) { setBabble(null); return; } const seq: Face[] = ['laugh', 'smile', 'surprised', 'laugh', 'smile']; let i = 0; const id = setInterval(() => { i = (i + 1) % seq.length; setBabble(seq[i]); }, 130); return () => clearInterval(id); }, [talking, char]);

  const face: Face | undefined = look.pose ? undefined : blink ? 'happy' : talking ? (char !== undefined ? mouthFor(char) : babble ?? 'smile') : look.face;
  const u = size / 100; const tri = anim.interpolate({ inputRange: [0, .5, 1], outputRange: [0, 1, 0] });
  const bodyT = look.motion === 'jump' ? [{ translateY: tri.interpolate({ inputRange: [0, 1], outputRange: [0, -12 * u] }) }]
    : look.motion === 'shake' ? [{ rotate: anim.interpolate({ inputRange: [0, .2, .4, .6, .8, 1], outputRange: ['0deg', '-4deg', '4deg', '-2deg', '1deg', '0deg'] }) }]
    : look.motion === 'tilt' ? [{ rotate: tri.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] }) }]
    : look.motion === 'breathe' ? [{ scaleX: tri.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] }) }]
    : [{ translateY: tri.interpolate({ inputRange: [0, 1], outputRange: [0, -3 * u] }) }];
  const img = (src: keyof typeof LUM_SRC, x: number, y: number, w: number, h: number, extra?: object) => <Image source={LUM_SRC[src]} style={[{ position: 'absolute', left: x * u, top: y * u, width: w * u, height: h * u }, extra]} resizeMode="contain" />;
  const L = rig.layers;
  return (
    <View style={{ width: size, height: size }} accessibilityRole="image" accessibilityLabel={`Mr. Lumino (${mood})`}>
      <Animated.View style={{ position: 'absolute', inset: 0, width: size, height: size, transform: bodyT }}>
        {look.pose ? (() => { const p = rig.poses[look.pose]; return img(p.src as never, (100 - p.w) / 2, 100 - p.h - 2, p.w, p.h); })() : <>
          {look.rays && img('rig-rays', L.rays.x, L.rays.y, L.rays.w, L.rays.h, { opacity: .9 })}
          {img((dark ? 'rig-body-dark' : 'rig-body'), L.body.x, L.body.y, L.body.w, L.body.h)}
          {face && (() => { const f = rig.faces[face]; return img(f.src as never, f.cx - f.w / 2, f.cy - f.h / 2, f.w, f.h); })()}
          {img('rig-cap', L.cap.x, L.cap.y, L.cap.w, L.cap.h)}
        </>}
      </Animated.View>
      {look.hand && (() => { const [h, slot] = look.hand; const hd = rig.hands[h]; const s = rig.slots[slot]; const w = hd.w * s.s, hh = hd.h * s.s;
        const rot = hand.interpolate({ inputRange: [0, .5, 1], outputRange: mood === 'wave' ? ['-14deg', '18deg', '-14deg'] : ['-6deg', '8deg', '-6deg'] });
        return <Animated.Image source={LUM_SRC[hd.src as never]} resizeMode="contain" style={{ position: 'absolute', left: (s.cx - w / 2) * u, top: (s.cy - hh / 2) * u, width: w * u, height: hh * u, transform: [{ rotate: still ? '0deg' : rot }] }} />; })()}
      {look.fx?.map(k => { const f = rig.fx[k]; return <Animated.Image key={k} source={LUM_SRC[f.src as never]} resizeMode="contain" style={{ position: 'absolute', left: (f.cx - f.w / 2) * u, top: (f.cy - f.h / 2) * u, width: f.w * u, height: f.h * u, opacity: still ? 1 : tri.interpolate({ inputRange: [0, 1], outputRange: [.55, 1] }) }} />; })}
    </View>
  );
}

/** Lumino + speech bubble that types out `text` with lip-sync. */
export function LuminoSays({ text, mood = 'talk', after = 'idle', size = 120 }: { text: string; mood?: LuminoMood; after?: LuminoMood; size?: number }) {
  const t = useTheme(); const [n, setN] = useState(0);
  useEffect(() => { setN(0); }, [text]);
  useEffect(() => { if (n >= text.length) return; const ch = text[n]; const id = setTimeout(() => setN(x => x + 1), /[.!?]/.test(ch) ? 260 : /[,;:]/.test(ch) ? 140 : 25); return () => clearTimeout(id); }, [n, text]);
  const talking = n < text.length;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Lumino mood={talking ? mood : after} talking={talking} char={talking ? text[n - 1] : undefined} size={size} />
      {!!text && <View style={{ flex: 1, backgroundColor: t.card, borderRadius: 18, padding: 12, borderWidth: 1, borderColor: t.line }} accessible accessibilityLabel={text}>
        <Text style={{ color: t.text, fontSize: 15, lineHeight: 21 }}>{text.slice(0, n)}</Text></View>}
    </View>
  );
}
