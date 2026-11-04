import { useEffect, useRef, useState } from 'react';
// Global toasts + confetti celebration, driven by window events from lib/progress.
export default function Feedback() {
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const [banner, setBanner] = useState<string | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const onToast = (e: Event) => { const id = Date.now() + Math.random(); setToasts(t => [...t, { id, text: (e as CustomEvent).detail.text }]); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2200); };
    const onCele = (e: Event) => { setBanner((e as CustomEvent).detail.text); confetti(canvas.current!); setTimeout(() => setBanner(null), 2600); };
    window.addEventListener('lumino:toast', onToast); window.addEventListener('lumino:celebrate', onCele);
    return () => { window.removeEventListener('lumino:toast', onToast); window.removeEventListener('lumino:celebrate', onCele); };
  }, []);
  return (<>
    <canvas ref={canvas} className="confetti" />
    {banner && <div className="banner">{banner}</div>}
    <div className="toasts">{toasts.map(t => <div key={t.id} className="toast">{t.text}</div>)}</div>
  </>);
}
export function confetti(c: HTMLCanvasElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = c.getContext('2d')!; c.width = innerWidth; c.height = innerHeight;
  const colors = ['#FFD233', '#38B6FF', '#1E90D6', '#FF7AB6', '#12A671'];
  const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 4, r: Math.random() * 6 + 4, c: colors[Math.floor(Math.random() * 5)], a: Math.random() * 6 }));
  let f = 0; const tick = () => { ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .4; p.a += .2; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); });
    if (++f < 150) requestAnimationFrame(tick); else ctx.clearRect(0, 0, c.width, c.height); };
  tick();
}
