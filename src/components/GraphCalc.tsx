// Lumino's graphing calculator (website). Type expressions on the left; the graph updates live.
// Drag to move, scroll or use + and − to zoom. Gray dots are zeros, maximums, minimums, intercepts and
// intersections: click one to see its exact coordinates.
import { useEffect, useMemo, useRef, useState } from 'react';
import { analyze, pointsOfInterest, fmtNum, gridStep, type Curve, type Poi } from '../lib/grapher';

const COLORS = ['#2d70b3', '#c74440', '#388c46', '#6042a6', '#fa7e19', '#000000'];
type View = { cx: number; cy: number; ppu: number }; // center and pixels per unit

export default function GraphCalc({ lines: initial = [], compact = false }: { lines?: string[]; compact?: boolean }) {
  const [lines, setLines] = useState<string[]>(initial.length ? [...initial, ''] : ['']);
  const [sliders, setSliders] = useState<Record<string, number>>({});
  const [degrees, setDegrees] = useState(false);
  const [view, setView] = useState<View>({ cx: 0, cy: 0, ppu: 20 });
  const [sel, setSel] = useState<Poi | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null); const size = useRef({ w: 400, h: 300 });
  const drag = useRef<{ x: number; y: number; v: View } | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => { if (initial.length) setLines([...initial, '']); }, [initial.join('\n')]); // eslint-disable-line react-hooks/exhaustive-deps

  const res = useMemo(() => analyze(lines, sliders, { degrees }), [lines, sliders, degrees]);
  const curves: { c: Curve; color: string }[] = res.items.flatMap((it, i) => (it.kind === 'curve' ? [{ c: it.curve, color: COLORS[i % COLORS.length] }] : []));

  useEffect(() => {
    const cv = canvas.current; if (!cv) return; const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth, H = cv.clientHeight; size.current = { w: W, h: H }; cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    const { cx, cy, ppu } = view; const x0 = cx - W / 2 / ppu, x1 = cx + W / 2 / ppu, y0 = cy - H / 2 / ppu, y1 = cy + H / 2 / ppu;
    const X = (x: number) => (x - x0) * ppu, Y = (y: number) => H - (y - y0) * ppu;
    // grid and axes
    const st = gridStep(x1 - x0, W / 70); g.lineWidth = 1; g.font = '11px system-ui'; g.fillStyle = '#6b7280';
    for (let x = Math.ceil(x0 / st) * st; x <= x1; x += st) { g.strokeStyle = Math.abs(x) < st / 2 ? '#374151' : '#e5e7eb'; g.beginPath(); g.moveTo(X(x), 0); g.lineTo(X(x), H); g.stroke();
      if (Math.abs(x) > st / 2) g.fillText(fmtNum(+x.toPrecision(10)), X(x) + 2, Math.min(H - 4, Math.max(12, Y(0) + 12))); }
    for (let y = Math.ceil(y0 / st) * st; y <= y1; y += st) { g.strokeStyle = Math.abs(y) < st / 2 ? '#374151' : '#e5e7eb'; g.beginPath(); g.moveTo(0, Y(y)); g.lineTo(W, Y(y)); g.stroke();
      if (Math.abs(y) > st / 2) g.fillText(fmtNum(+y.toPrecision(10)), Math.min(W - 30, Math.max(2, X(0) + 3)), Y(y) - 2); }
    // curves
    for (const { c, color } of curves) for (const f of c.fs) {
      const pts: [number, number][] = []; for (let px = 0; px <= W; px += 1) { const x = x0 + px / ppu; pts.push([px, Y(f(x))]); }
      if (c.shade) { g.fillStyle = color + '33'; g.beginPath(); g.moveTo(0, c.shade === 'above' ? 0 : H);
        for (const [px, py] of pts) g.lineTo(px, Number.isFinite(py) ? Math.max(-5, Math.min(H + 5, py)) : c.shade === 'above' ? 0 : H); g.lineTo(W, c.shade === 'above' ? 0 : H); g.fill(); }
      g.strokeStyle = color; g.lineWidth = 2.5; g.setLineDash(c.dashed ? [7, 5] : []); g.beginPath(); let pen = false;
      for (let i = 0; i < pts.length; i++) { const [px, py] = pts[i];
        if (!Number.isFinite(py) || (pen && Math.abs(py - pts[i - 1][1]) > H * 3)) { pen = false; continue; }
        if (pen) g.lineTo(px, py); else { g.moveTo(px, py); pen = true; } }
      g.stroke(); g.setLineDash([]);
    }
    res.items.forEach((it, i) => {
      const color = COLORS[i % COLORS.length];
      if (it.kind === 'vline') { g.strokeStyle = color; g.lineWidth = 2; g.setLineDash([6, 4]); for (const x of it.xs) { g.beginPath(); g.moveTo(X(x), 0); g.lineTo(X(x), H); g.stroke(); } g.setLineDash([]); }
      if (it.kind === 'point') { g.fillStyle = color; g.beginPath(); g.arc(X(it.x), Y(it.y), 5, 0, 7); g.fill(); }
    });
    // points of interest
    const pois = pointsOfInterest(curves.map(c => c.c), x0, x1, y0, y1);
    g.fillStyle = '#9ca3af'; for (const p of pois) { g.beginPath(); g.arc(X(p.x), Y(p.y), 4, 0, 7); g.fill(); }
    if (sel) { const sx = X(sel.x), sy = Y(sel.y); g.fillStyle = '#111827'; g.beginPath(); g.arc(sx, sy, 5, 0, 7); g.fill();
      const label = `(${fmtNum(sel.x)}, ${fmtNum(sel.y)}) ${sel.label}`; g.font = '600 12px system-ui'; const tw = g.measureText(label).width;
      const bx = Math.min(W - tw - 12, sx + 8), by = Math.max(4, sy - 26); g.fillStyle = '#ffffffee'; g.fillRect(bx, by, tw + 10, 20); g.strokeStyle = '#d1d5db'; g.strokeRect(bx, by, tw + 10, 20); g.fillStyle = '#111827'; g.fillText(label, bx + 5, by + 14); }
    (cv as HTMLCanvasElement & { pois?: Poi[] }).pois = pois;
  });

  const zoom = (k: number, at?: { x: number; y: number }) => setView(v => {
    const { w, h } = size.current; const ax = at ? v.cx + (at.x - w / 2) / v.ppu : v.cx, ay = at ? v.cy - (at.y - h / 2) / v.ppu : v.cy;
    const ppu = Math.min(1e5, Math.max(0.01, v.ppu * k)); return { ppu, cx: ax - (ax - v.cx) * v.ppu / ppu, cy: ay - (ay - v.cy) * v.ppu / ppu };
  });
  const pointer = (e: React.PointerEvent) => { const r = (e.target as HTMLElement).getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current; drag.current = null; if (!d) return; const p = pointer(e);
    if (Math.hypot(p.x - d.x, p.y - d.y) > 4) return; // it was a drag
    const pois = (canvas.current as HTMLCanvasElement & { pois?: Poi[] }).pois ?? []; const { w, h } = size.current;
    const hit = pois.find(q => Math.hypot((q.x - view.cx) * view.ppu + w / 2 - p.x, h / 2 - (q.y - view.cy) * view.ppu - p.y) < 12); setSel(hit ?? null);
  };
  const edit = (i: number, v: string) => setLines(ls => { const n = [...ls]; n[i] = v; if (i === n.length - 1 && v) n.push(''); return n; });

  return (
    <div className={'graphcalc' + (compact ? ' compact' : '')}>
      <div className="gcgraph">
        <canvas ref={canvas} onWheel={e => { zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, pointer(e as unknown as React.PointerEvent)); }}
          onPointerDown={e => { (e.target as HTMLElement).setPointerCapture(e.pointerId); drag.current = { ...pointer(e), v: view }; }}
          onPointerMove={e => { const d = drag.current; if (!d) return; const p = pointer(e); setView({ ...d.v, cx: d.v.cx - (p.x - d.x) / d.v.ppu, cy: d.v.cy + (p.y - d.y) / d.v.ppu }); }}
          onPointerUp={onUp} aria-label="Graph" />
        <div className="gczoom"><button className="ghost" onClick={() => zoom(1.4)} aria-label="Zoom in">+</button><button className="ghost" onClick={() => zoom(1 / 1.4)} aria-label="Zoom out">−</button>
          <button className="ghost" onClick={() => { setView({ cx: 0, cy: 0, ppu: 20 }); setSel(null); }} aria-label="Reset view">⌂</button></div>
      </div>
      <div className="gcside">
        <div className="gcexprs">
          {lines.map((l, i) => { const it = res.items[i];
            const out = !it ? '' : it.kind === 'value' ? `= ${fmtNum(it.value)}` : it.kind === 'vline' ? it.note : it.kind === 'error' ? it.message : it.kind === 'def' ? it.note : '';
            return <div key={i} className="gcrow">
              <span className="gcdot" style={{ background: it && (it.kind === 'curve' || it.kind === 'vline' || it.kind === 'point') ? COLORS[i % COLORS.length] : 'transparent' }} />
              <div className="gcin"><input ref={el => { inputs.current[i] = el; }} value={l} placeholder={i === 0 ? 'Type an equation, like y = 2x + 1' : ''} spellCheck={false} autoCapitalize="off"
                onChange={e => edit(i, e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (i === lines.length - 1) setLines([...lines, '']); setTimeout(() => inputs.current[i + 1]?.focus()); } }} />
                {out && <span className={'gcout' + (it?.kind === 'error' ? ' err' : '')}>{out}</span>}</div>
              {lines.length > 1 && <button className="ghost gcx" aria-label="Delete line" onClick={() => setLines(lines.filter((_, k) => k !== i))}>✕</button>}
            </div>; })}
        </div>
        {res.sliders.length > 0 && <div className="gcsliders">{res.sliders.map(n => <label key={n}><b>{n} = {fmtNum(sliders[n] ?? 1)}</b>
          <input type="range" min={-10} max={10} step={0.1} value={sliders[n] ?? 1} onChange={e => setSliders({ ...sliders, [n]: Number(e.target.value) })} /></label>)}</div>}
        <div className="row gcopts"><label className="small"><input type="checkbox" checked={degrees} onChange={e => setDegrees(e.target.checked)} /> Degrees</label>
          <button className="ghost small" onClick={() => { setLines(['']); setSliders({}); setSel(null); }}>Clear all</button></div>
      </div>
    </div>
  );
}
