// Lumino's graphing calculator on iPhone (same engine as the website: src/lib/grapher.ts).
// Drag the graph to move it, use + and − to zoom. Zeros, maximums, minimums and intersections are listed under the graph.
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View, type GestureResponderEvent } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { analyze, pointsOfInterest, fmtNum, gridStep } from '@shared/grapher';
import { DESMOS_URL } from '@shared/desmos';

const COLORS = ['#2d70b3', '#c74440', '#388c46', '#6042a6', '#fa7e19', '#000000'];
const H = 300;

export default function CalculatorScreen() {
  const t = useTheme(); const { lines: init } = useLocalSearchParams<{ lines?: string }>();
  const [lines, setLines] = useState<string[]>(() => { try { const l = init ? (JSON.parse(String(init)) as string[]) : []; return [...l, '']; } catch { return ['']; } });
  const [sliders, setSliders] = useState<Record<string, number>>({}); const [degrees, setDegrees] = useState(false);
  const [view, setView] = useState({ cx: 0, cy: 0, ppu: 15 }); const [W, setW] = useState(340);
  const drag = useRef<{ x: number; y: number; v: typeof view } | null>(null);

  const res = useMemo(() => analyze(lines, sliders, { degrees }), [lines, sliders, degrees]);
  const { cx, cy, ppu } = view; const x0 = cx - W / 2 / ppu, x1 = cx + W / 2 / ppu, y0 = cy - H / 2 / ppu, y1 = cy + H / 2 / ppu;
  const X = (x: number) => (x - x0) * ppu, Y = (y: number) => H - (y - y0) * ppu;
  const curves = res.items.flatMap((it, i) => (it.kind === 'curve' ? [{ c: it.curve, color: COLORS[i % COLORS.length] }] : []));
  const pois = pointsOfInterest(curves.map(c => c.c), x0, x1, y0, y1);
  const st = gridStep(x1 - x0, W / 60);

  const segs: { left: number; top: number; width: number; rot: number; color: string }[] = [];
  for (const { c, color } of curves) for (const f of c.fs) {
    let prev: [number, number] | null = null;
    for (let px = 0; px <= W; px += 4) { const py = Y(f(x0 + px / ppu));
      if (!Number.isFinite(py) || Math.abs(py) > H * 4) { prev = null; continue; }
      if (prev && Math.abs(py - prev[1]) < H * 2) { const [ax, ay] = prev; const len = Math.hypot(px - ax, py - ay);
        segs.push({ left: (ax + px) / 2 - len / 2, top: (ay + py) / 2 - 1.25, width: len + 0.5, rot: Math.atan2(py - ay, px - ax), color }); }
      prev = [px, py]; }
  }
  const touch = (e: GestureResponderEvent) => ({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
  const zoom = (k: number) => setView(v => ({ ...v, ppu: Math.min(1e4, Math.max(0.05, v.ppu * k)) }));
  const edit = (i: number, v: string) => setLines(ls => { const n = [...ls]; n[i] = v; if (i === n.length - 1 && v) n.push(''); return n; });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
      <View onLayout={e => setW(e.nativeEvent.layout.width)} style={{ height: H, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: t.line }}
        onStartShouldSetResponder={() => true} onMoveShouldSetResponder={() => true} onResponderTerminationRequest={() => false}
        onResponderGrant={e => { drag.current = { ...touch(e), v: view }; }}
        onResponderMove={e => { const d = drag.current; if (!d) return; const p = touch(e); setView({ ...d.v, cx: d.v.cx - (p.x - d.x) / d.v.ppu, cy: d.v.cy + (p.y - d.y) / d.v.ppu }); }}
        onResponderRelease={() => { drag.current = null; }}>
        <View pointerEvents="none" style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: Math.floor((x1 - Math.ceil(x0 / st) * st) / st) + 1 }, (_, i) => Math.ceil(x0 / st) * st + i * st).map(x =>
            <View key={'gx' + x} style={{ position: 'absolute', left: X(x), top: 0, bottom: 0, width: Math.abs(x) < st / 2 ? 1.5 : 1, backgroundColor: Math.abs(x) < st / 2 ? '#374151' : '#e5e7eb' }} />)}
          {Array.from({ length: Math.floor((y1 - Math.ceil(y0 / st) * st) / st) + 1 }, (_, i) => Math.ceil(y0 / st) * st + i * st).map(y =>
            <View key={'gy' + y} style={{ position: 'absolute', top: Y(y), left: 0, right: 0, height: Math.abs(y) < st / 2 ? 1.5 : 1, backgroundColor: Math.abs(y) < st / 2 ? '#374151' : '#e5e7eb' }} />)}
          {Array.from({ length: Math.floor((x1 - Math.ceil(x0 / st) * st) / st) + 1 }, (_, i) => Math.ceil(x0 / st) * st + i * st).filter(x => Math.abs(x) > st / 2).map(x =>
            <T key={'lx' + x} size={9} color="#6b7280" style={{ position: 'absolute', left: X(x) + 2, top: Math.min(H - 12, Math.max(0, Y(0) + 1)) }}>{fmtNum(+x.toPrecision(10))}</T>)}
          {segs.map((s, i) => <View key={i} style={{ position: 'absolute', left: s.left, top: s.top, width: s.width, height: 2.5, backgroundColor: s.color, transform: [{ rotate: `${s.rot}rad` }] }} />)}
          {res.items.map((it, i) => it.kind === 'vline' ? it.xs.map(x => <View key={`v${i}${x}`} style={{ position: 'absolute', left: X(x) - 1, top: 0, bottom: 0, width: 2, backgroundColor: COLORS[i % COLORS.length] }} />)
            : it.kind === 'point' ? <View key={`p${i}`} style={{ position: 'absolute', left: X(it.x) - 5, top: Y(it.y) - 5, width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS[i % COLORS.length] }} /> : null)}
          {pois.map((p, i) => <View key={'poi' + i} style={{ position: 'absolute', left: X(p.x) - 4, top: Y(p.y) - 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ca3af' }} />)}
        </View>
        <View style={{ position: 'absolute', right: 6, top: 6, gap: 4 }}>
          {[['+', () => zoom(1.4)], ['−', () => zoom(1 / 1.4)], ['⌂', () => setView({ cx: 0, cy: 0, ppu: 15 })]].map(([l, f]) =>
            <Pressable key={l as string} onPress={f as () => void} style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' }}><T weight="900" color="#111827">{l as string}</T></Pressable>)}
        </View>
      </View>
      {pois.length > 0 && <T size={13} color={t.muted}>Points: {pois.slice(0, 8).map(p => `${p.label} (${fmtNum(p.x)}, ${fmtNum(p.y)})`).join(' · ')}</T>}

      {lines.map((l, i) => { const it = res.items[i];
        const out = !it ? '' : it.kind === 'value' ? `= ${fmtNum(it.value)}` : it.kind === 'vline' ? it.note : it.kind === 'error' ? it.message : it.kind === 'def' ? it.note : '';
        return <View key={i} style={{ gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: it && (it.kind === 'curve' || it.kind === 'vline' || it.kind === 'point') ? COLORS[i % COLORS.length] : 'transparent' }} />
            <TextInput value={l} onChangeText={v => edit(i, v)} placeholder={i === 0 ? 'Type an equation, like y = 2x + 1' : ''} placeholderTextColor={t.muted}
              autoCapitalize="none" autoCorrect={false} style={{ flex: 1, fontFamily: 'SpaceMono', fontSize: 15, color: t.text, backgroundColor: t.card, borderRadius: 10, borderWidth: 1, borderColor: t.line, paddingHorizontal: 10, paddingVertical: 8 }} />
            {lines.length > 1 && <Pressable onPress={() => setLines(lines.filter((_, k) => k !== i))} hitSlop={8}><T color={t.muted}>✕</T></Pressable>}
          </View>
          {!!out && <T size={13} color={it?.kind === 'error' ? t.bad : t.muted} style={{ textAlign: it?.kind === 'error' ? 'left' : 'right' }}>{out}</T>}
        </View>; })}

      {res.sliders.map(n => { const v = sliders[n] ?? 1;
        return <View key={n} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <T weight="800">{n} = {fmtNum(v)}</T>
          {[-1, -0.1, 0.1, 1].map(d => <Pressable key={d} onPress={() => setSliders({ ...sliders, [n]: +(v + d).toFixed(4) })} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: t.accentSoft }}><T weight="700">{d > 0 ? `+${d}` : `−${-d}`}</T></Pressable>)}
        </View>; })}

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button kind="ghost" title={degrees ? 'Mode: degrees' : 'Mode: radians'} onPress={() => setDegrees(!degrees)} style={{ flex: 1 }} />
        <Button kind="ghost" title="Clear" onPress={() => { setLines(['']); setSliders({}); }} />
      </View>
      <Button kind="ghost" title="Open Desmos (the SAT calculator) ↗" onPress={() => WebBrowser.openBrowserAsync(DESMOS_URL)} />
    </ScrollView>
  );
}
