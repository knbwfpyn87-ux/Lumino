// Live animation of a lab's physics scene (shared engine: src/lib/physics.ts), drawn with plain Views.
// Restarts whenever the sliders change. Same behaviour as the website's src/components/PhysicsView.tsx.
import { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { SCENES, step, type World } from '@shared/physics';

const H = 200;

export function PhysicsView({ scene, params }: { scene: string; params: Record<string, number> }) {
  const t = useTheme(); const [w, setW] = useState(300); const [, setFrame] = useState(0); const [run, setRun] = useState(0);
  const key = JSON.stringify(params); const worldRef = useRef<World | null>(null);

  // view box: run a copy ahead 4 s and track how far things go
  const box = useMemo(() => {
    const make = SCENES[scene]; if (!make) return null; const probe = make(params); let x0 = -0.5, x1 = 0.5, y1 = 1;
    const grow = (wd: World) => { for (const b of wd.bodies) { x0 = Math.min(x0, b.pos.x - b.r); x1 = Math.max(x1, b.pos.x + b.r); y1 = Math.max(y1, b.pos.y + b.r); }
      for (const l of wd.links) if (!('pos' in l.b)) y1 = Math.max(y1, l.b.y + 0.1); };
    grow(probe); for (let i = 0; i < 240; i++) { step(probe, 1 / 60); grow(probe); }
    return { x0, x1, y1 };
  }, [scene, key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const make = SCENES[scene]; if (!make) return;
    const wd = make(params); worldRef.current = wd; let raf = 0; const clock = { last: Date.now() };
    const loop = () => { const now = Date.now(); step(wd, Math.min(0.05, (now - clock.last) / 1000)); clock.last = now; setFrame(f => f + 1); if (wd.t < 20) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scene, key, run]); // eslint-disable-line react-hooks/exhaustive-deps

  const wd = worldRef.current; if (!wd || !box) return null;
  const pad = 0.08, s = Math.min(w / ((box.x1 - box.x0) * (1 + 2 * pad)), H / (box.y1 * (1 + 2 * pad)));
  const X = (x: number) => w / 2 + (x - (box.x0 + box.x1) / 2) * s, Y = (y: number) => H - pad * box.y1 * s - y * s;
  const line = (ax: number, ay: number, bx: number, by: number, color: string, k: string, dashed = false) => {
    const len = Math.hypot(bx - ax, by - ay);
    return <View key={k} style={{ position: 'absolute', left: (ax + bx) / 2 - len / 2, top: (ay + by) / 2 - 1, width: len, height: 2, backgroundColor: dashed ? 'transparent' : color,
      borderTopWidth: dashed ? 2 : 0, borderStyle: 'dashed', borderColor: color, transform: [{ rotate: `${Math.atan2(by - ay, bx - ax)}rad` }] }} />;
  };
  return (
    <View style={{ gap: 6 }}>
      <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: H, backgroundColor: t.bg, borderRadius: 12, overflow: 'hidden' }}>
        {wd.ground && <View style={{ position: 'absolute', left: 0, right: 0, top: Y(0), height: 2, backgroundColor: t.muted }} />}
        {wd.links.map((l, i) => { const p = 'pos' in l.b ? l.b.pos : l.b; return line(X(p.x), Y(p.y), X(l.a.pos.x), Y(l.a.pos.y), l.kind === 'spring' ? t.accent : t.text, 'l' + i, l.kind === 'spring'); })}
        {wd.bodies.flatMap((b, bi) => (b.trail ?? []).filter((_, i) => i % 3 === 0).map((p, i) =>
          <View key={`t${bi}-${i}`} style={{ position: 'absolute', left: X(p.x) - 1.5, top: Y(p.y) - 1.5, width: 3, height: 3, borderRadius: 1.5, backgroundColor: t.muted }} />))}
        {wd.bodies.map((b, i) => { const r = Math.max(4, b.r * s);
          return <View key={'b' + i} style={{ position: 'absolute', left: X(b.pos.x) - r, top: Y(b.pos.y) - r, width: r * 2, height: r * 2, borderRadius: r, backgroundColor: b.color ?? t.accent }} />; })}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T size={13} color={t.muted}>t = {wd.t.toFixed(2)} s</T>
        <Button kind="ghost" title="↻ Replay" onPress={() => setRun(r => r + 1)} />
      </View>
    </View>
  );
}
