// The Desmos graphing calculator on the website: a floating button that opens a calculator panel,
// and "Try it in Desmos" blocks in lessons that open it with example lines.
// With VITE_DESMOS_API_KEY set (a key from Desmos), the official API is used and example lines are typed in for you.
// Without a key, the public Desmos calculator page is embedded and students type the lines themselves.
import { useEffect, useRef, useState } from 'react';
import { DESMOS_URL, toDesmosLatex } from '../lib/desmos';

const KEY = (import.meta.env.VITE_DESMOS_API_KEY as string | undefined) ?? '';
type Calc = { setExpression: (e: { id: string; latex: string }) => void; setBlank: () => void; destroy: () => void };
declare global { interface Window { Desmos?: { GraphingCalculator: (el: HTMLElement, o?: object) => Calc } } }

let loading: Promise<boolean> | null = null;
function loadApi(): Promise<boolean> {
  if (!KEY) return Promise.resolve(false);
  if (window.Desmos) return Promise.resolve(true);
  return (loading ??= new Promise(res => {
    const s = document.createElement('script'); s.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${encodeURIComponent(KEY)}`;
    s.onload = () => res(!!window.Desmos); s.onerror = () => res(false); document.head.appendChild(s);
  }));
}

/** Opens the Desmos panel from anywhere, optionally with lines to graph. */
export function openDesmos(lines: string[] = []) { window.dispatchEvent(new CustomEvent('lumino:desmos', { detail: lines })); }

function Calculator({ lines }: { lines: string[] }) {
  const el = useRef<HTMLDivElement>(null); const calc = useRef<Calc | null>(null); const [api, setApi] = useState<boolean | null>(KEY ? null : false);
  useEffect(() => { loadApi().then(ok => setApi(ok)); }, []);
  useEffect(() => {
    if (!api || !el.current || !window.Desmos) return;
    calc.current = window.Desmos.GraphingCalculator(el.current, { keypad: true, expressionsCollapsed: false });
    return () => { calc.current?.destroy(); calc.current = null; };
  }, [api]);
  useEffect(() => {
    if (!calc.current || !lines.length) return;
    calc.current.setBlank(); lines.forEach((l, i) => calc.current!.setExpression({ id: `l${i}`, latex: toDesmosLatex(l) }));
  }, [lines, api]);
  if (api === null) return <p className="muted">Loading Desmos…</p>;
  if (api) return <div ref={el} className="desmosbox" />;
  return <>
    {lines.length > 0 && <div className="desmostype"><b>Type these lines into Desmos:</b><pre className="code"><code>{lines.join('\n')}</code></pre></div>}
    <iframe className="desmosbox" src={DESMOS_URL} title="Desmos graphing calculator" allow="clipboard-write" />
    <p className="muted small desmosnote">Calculator not showing? <a href={DESMOS_URL} target="_blank" rel="noreferrer">Open Desmos in a new tab ↗</a></p>
  </>;
}

/** The floating Desmos button and panel. Put it on pages for classes that allow Desmos. */
export function DesmosDock() {
  const [open, setOpen] = useState(false); const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const h = (e: Event) => { setLines((e as CustomEvent<string[]>).detail ?? []); setOpen(true); };
    window.addEventListener('lumino:desmos', h); return () => window.removeEventListener('lumino:desmos', h);
  }, []);
  return <>
    {!open && <button className="desmosfab" onClick={() => setOpen(true)} aria-label="Open the Desmos graphing calculator">📈 Desmos</button>}
    {open && <aside className="desmospanel" aria-label="Desmos graphing calculator">
      <div className="row between desmoshead"><b>📈 Desmos calculator</b>
        <span className="row"><a className="muted small" href={DESMOS_URL} target="_blank" rel="noreferrer">Open full screen ↗</a><button className="ghost" onClick={() => setOpen(false)} aria-label="Close Desmos">✕</button></span></div>
      <Calculator lines={lines} />
    </aside>}
  </>;
}

/** A lesson block: example lines with a button that opens them in Desmos. */
export function DesmosBlock({ lines }: { lines: string[] }) {
  return (
    <div className="lb desmosblock"><div className="lbtag">📈 Try it in Desmos</div>
      <pre className="code"><code>{lines.join('\n')}</code></pre>
      <button onClick={() => openDesmos(lines)}>Open in Desmos</button>
    </div>
  );
}
