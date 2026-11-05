// A virtual lab (science) or real-world demo (math) inside a lesson: drag the sliders, watch the results and the graph.
// Same behaviour as the website (src/components/Lab.tsx). The graph is drawn with plain Views, so no extra native modules.
import { useMemo, useState } from 'react';
import { Pressable, View, type LayoutChangeEvent, type GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { labModel, startValues, snap, curve, bounds, measure, fmt, niceTicks, type LabBlock } from '@shared/courses';

type LabSet = LabBlock['sets'][number];

function Slider({ s, value, onChange }: { s: LabSet; value: number; onChange: (v: number) => void }) {
  const t = useTheme(); const [w, setW] = useState(1);
  const frac = (value - s.min) / (s.max - s.min);
  const fromTouch = (e: GestureResponderEvent) => { const x = e.nativeEvent.locationX; const v = snap(s, s.min + (x / w) * (s.max - s.min)); if (v !== value) { Haptics.selectionAsync(); onChange(v); } };
  const nudge = (d: number) => { const v = snap(s, value + d * s.step); if (v !== value) { Haptics.selectionAsync(); onChange(v); } };
  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T size={14} weight="700">{s.label}</T><T size={14} weight="900" color={t.accent}>{fmt(value)}</T></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable onPress={() => nudge(-1)} hitSlop={8} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: t.accentSoft, alignItems: 'center', justifyContent: 'center' }}><T weight="900">−</T></Pressable>
        <View style={{ flex: 1, height: 34, justifyContent: 'center' }} onLayout={(e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width || 1)}
          onStartShouldSetResponder={() => true} onMoveShouldSetResponder={() => true} onResponderTerminationRequest={() => false}
          onResponderGrant={fromTouch} onResponderMove={fromTouch}>
          <View pointerEvents="none" style={{ height: 6, borderRadius: 3, backgroundColor: t.line }}><View style={{ width: `${frac * 100}%`, height: 6, borderRadius: 3, backgroundColor: t.accent }} /></View>
          <View pointerEvents="none" style={{ position: 'absolute', left: frac * w - 12, width: 24, height: 24, borderRadius: 12, backgroundColor: t.card, borderWidth: 3, borderColor: t.accent }} />
        </View>
        <Pressable onPress={() => nudge(1)} hitSlop={8} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: t.accentSoft, alignItems: 'center', justifyContent: 'center' }}><T weight="900">+</T></Pressable>
      </View>
    </View>
  );
}

const GH = 190, PL = 44, PB = 26;
function Graph({ b, pts, dot, trials, showCurve }: { b: LabBlock; pts: [number, number][]; dot: [number, number] | null; trials: [number, number][]; showCurve: boolean }) {
  const t = useTheme(); const [w, setW] = useState(300);
  if (!b.plot || !pts.length) return null;
  const bd = bounds([...pts, ...trials]); const pw = w - PL - 8, ph = GH - PB - 8;
  const X = (x: number) => PL + (x - bd.x0) / (bd.x1 - bd.x0 || 1) * pw; const Y = (y: number) => 8 + ph - (y - bd.y0) / (bd.y1 - bd.y0) * ph;
  const segs = showCurve ? pts.slice(1).map((p, i) => { const [x1, y1] = [X(pts[i][0]), Y(pts[i][1])], [x2, y2] = [X(p[0]), Y(p[1])];
    const len = Math.hypot(x2 - x1, y2 - y1); return { left: (x1 + x2) / 2 - len / 2, top: (y1 + y2) / 2 - 1.5, width: len, rot: Math.atan2(y2 - y1, x2 - x1) }; }) : [];
  const xs = b.sets.find(s => s.name === b.plot!.x)!; const ys = b.outs.find(o => o.name === b.plot!.y)!;
  const Dot = ({ x, y, r, c }: { x: number; y: number; r: number; c: string }) => Number.isFinite(y) ? <View style={{ position: 'absolute', left: X(x) - r, top: Y(y) - r, width: r * 2, height: r * 2, borderRadius: r, backgroundColor: c, borderWidth: 2, borderColor: t.card }} /> : null;
  return (
    <View style={{ gap: 4 }}>
      <T size={12} weight="800" color={t.muted}>{ys.label} vs {xs.label}</T>
      <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: GH, backgroundColor: t.bg, borderRadius: 12, overflow: 'hidden' }}>
        {niceTicks(bd.y0, bd.y1, 4).map(y => { return <View key={y} style={{ position: 'absolute', left: 0, top: Y(y) - 7, flexDirection: 'row', alignItems: 'center' }}>
          <T size={10} color={t.muted} style={{ width: PL - 4, textAlign: 'right' }}>{fmt(y)}</T><View style={{ marginLeft: 4, width: pw, height: 1, backgroundColor: t.line }} /></View>; })}
        {niceTicks(bd.x0, bd.x1, 4).map(x => { return <T key={x} size={10} color={t.muted} style={{ position: 'absolute', top: GH - PB + 6, left: X(x) - 25, width: 50, textAlign: 'center' }}>{fmt(x)}</T>; })}
        {segs.map((s, i) => <View key={i} style={{ position: 'absolute', left: s.left, top: s.top, width: s.width + 1, height: 3, backgroundColor: t.accent, transform: [{ rotate: `${s.rot}rad` }] }} />)}
        {trials.map(([x, y], i) => <Dot key={i} x={x} y={y} r={5} c={t.ok} />)}
        {dot && <Dot x={dot[0]} y={dot[1]} r={7} c={t.accent} />}
      </View>
    </View>
  );
}

export function Lab({ b, onDone }: { b: LabBlock; onDone?: () => void }) {
  const t = useTheme(); const model = useMemo(() => labModel(b), [b]);
  const [vals, setVals] = useState(() => startValues(b)); const [trials, setTrials] = useState<Record<string, number>[]>([]); const [open, setOpen] = useState(false);
  const isLab = b.kind === 'lab'; const v = model.run(vals); const pts = useMemo(() => curve(b, model, vals, 40), [b, model, vals]);
  const unlocked = !isLab || trials.length >= 3;
  const record = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); const r = { ...v }; for (const o of b.outs) r[o.name] = measure(v[o.name], b.noise); setTrials(x => [...x, r].slice(-12)); };
  const cols = [...b.sets.map(s => ({ name: s.name, label: s.label })), ...b.outs.map(o => ({ name: o.name, label: o.label }))];
  return (
    <View style={{ borderWidth: 2, borderColor: t.accent, borderRadius: 18, padding: 14, gap: 12, backgroundColor: t.card }}>
      <T size={11} weight="900" color={t.muted} style={{ letterSpacing: 0.6 }}>{isLab ? '🧪 VIRTUAL LAB' : '📐 REAL-WORLD DEMO'}</T>
      <T size={18} weight="900">{b.title}</T>
      <T>{isLab ? 'Goal: ' : ''}{b.aim}</T>
      {isLab && b.steps.map((s, i) => <T key={i} size={15} color={t.muted}>{i + 1}. {s}</T>)}
      {b.sets.map(s => <Slider key={s.name} s={s} value={vals[s.name]} onChange={x => setVals({ ...vals, [s.name]: x })} />)}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{b.outs.map(o => <View key={o.name} style={{ flexGrow: 1, flexBasis: 130, backgroundColor: t.accentSoft, borderRadius: 12, padding: 10 }}>
        <T size={12} weight="700" color={t.muted}>{o.label}</T><T size={20} weight="900">{fmt(v[o.name])}</T></View>)}</View>
      <Graph b={b} pts={pts} dot={isLab ? null : b.plot ? [vals[b.plot.x], v[b.plot.y]] : null} trials={b.plot ? trials.map(x => [x[b.plot!.x], x[b.plot!.y]]) : []} showCurve={!isLab || open} />
      {isLab && <View style={{ flexDirection: 'row', gap: 8 }}><Button title="⏺ Record trial" onPress={record} style={{ flex: 1 }} />{trials.length > 0 && <Button kind="ghost" title="Clear" onPress={() => setTrials([])} />}</View>}
      {isLab && trials.length > 0 && <View style={{ gap: 4 }}>
        {trials.map((r, i) => <T key={i} size={13} color={t.muted}>Trial {i + 1}: {cols.map(c => `${c.label} ${fmt(r[c.name])}`).join(' · ')}</T>)}
        {b.noise > 0 && <T size={12} color={t.muted}>Measurements include about ±{b.noise}% error, like a real lab.</T>}</View>}
      {open ? <View style={{ backgroundColor: t.accentSoft, borderRadius: 12, padding: 12 }}><T weight="700">{isLab ? '📋 Conclusion: ' : '💡 Takeaway: '}{b.result}</T></View>
        : <Button kind={unlocked ? 'primary' : 'ghost'} disabled={!unlocked} onPress={() => { setOpen(true); onDone?.(); }}
          title={isLab ? (unlocked ? 'See the trend and conclusion' : `Record ${3 - trials.length} more trial${3 - trials.length === 1 ? '' : 's'} to unlock`) : 'Show the takeaway'} />}
    </View>
  );
}
