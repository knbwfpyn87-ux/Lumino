// Live animation of a lab's physics scene (src/lib/physics.ts). Restarts whenever the sliders change.
import { useEffect, useRef, useState } from 'react';
import { SCENES, step, type World } from '../lib/physics';

export default function PhysicsView({ scene, params }: { scene: string; params: Record<string, number> }) {
  const ref = useRef<HTMLCanvasElement>(null); const [run, setRun] = useState(0); const [time, setTime] = useState(0);
  const key = JSON.stringify(params);
  useEffect(() => {
    const cv = ref.current; const make = SCENES[scene]; if (!cv || !make) return;
    const w: World = make(params); const ctx = cv.getContext('2d')!; let raf = 0; const clock = { last: performance.now() };
    // fit the view to where things will go: run a copy ahead for 4 s and track the extent
    const probe = make(params); let x0 = -0.5, x1 = 0.5, y1 = 1;
    for (let i = 0; i < 240; i++) { step(probe, 1 / 60); for (const b of probe.bodies) { x0 = Math.min(x0, b.pos.x - b.r); x1 = Math.max(x1, b.pos.x + b.r); y1 = Math.max(y1, b.pos.y + b.r); } }
    for (const b of w.bodies) { x0 = Math.min(x0, b.pos.x - b.r); x1 = Math.max(x1, b.pos.x + b.r); y1 = Math.max(y1, b.pos.y + b.r); }
    for (const l of w.links) if (!('pos' in l.b)) y1 = Math.max(y1, l.b.y + 0.1);
    const css = getComputedStyle(cv); const fg = css.getPropertyValue('--text') || '#222', acc = css.getPropertyValue('--accent') || '#1a9bf0', mut = css.getPropertyValue('--muted') || '#888';
    const draw = () => {
      const W = cv.width = cv.clientWidth * devicePixelRatio, H = cv.height = cv.clientHeight * devicePixelRatio;
      const pad = 0.08, sx = (x1 - x0) * (1 + 2 * pad), sy = y1 * (1 + 2 * pad), s = Math.min(W / sx, H / sy);
      const X = (x: number) => W / 2 + (x - (x0 + x1) / 2) * s, Y = (y: number) => H - pad * y1 * s - y * s;
      ctx.clearRect(0, 0, W, H); ctx.lineWidth = 2 * devicePixelRatio;
      if (w.ground) { ctx.strokeStyle = mut; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(W, Y(0)); ctx.stroke(); }
      for (const l of w.links) { const p = 'pos' in l.b ? l.b.pos : l.b; ctx.strokeStyle = l.kind === 'spring' ? acc : fg; ctx.setLineDash(l.kind === 'spring' ? [4, 3] : []); ctx.beginPath(); ctx.moveTo(X(p.x), Y(p.y)); ctx.lineTo(X(l.a.pos.x), Y(l.a.pos.y)); ctx.stroke(); }
      ctx.setLineDash([]);
      for (const b of w.bodies) {
        if (b.trail && b.trail.length > 1) { ctx.strokeStyle = mut; ctx.lineWidth = devicePixelRatio; ctx.beginPath(); b.trail.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y)))); ctx.stroke(); ctx.lineWidth = 2 * devicePixelRatio; }
        ctx.fillStyle = b.color ?? acc; ctx.beginPath(); ctx.arc(X(b.pos.x), Y(b.pos.y), Math.max(3, b.r * s), 0, 2 * Math.PI); ctx.fill();
      }
    };
    const loop = (now: number) => { step(w, Math.min(0.05, (now - clock.last) / 1000)); clock.last = now; draw(); setTime(w.t); if (w.t < 20) raf = requestAnimationFrame(loop); };
    draw(); raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scene, key, run]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="physview">
      <canvas ref={ref} aria-label={`Animation: ${scene}`} />
      <div className="row between"><span className="muted small">t = {time.toFixed(2)} s</span><button className="ghost" onClick={() => setRun(r => r + 1)}>↻ Replay</button></div>
    </div>
  );
}
