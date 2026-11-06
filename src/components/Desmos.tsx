// The graphing calculator on the website: a floating button that opens Lumino's calculator in a panel,
// and "Try it" blocks in lessons that open it with example lines already typed in.
// A link to the real Desmos calculator stays available (it's what the SAT uses).
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GraphCalc from './GraphCalc';
import { DESMOS_URL } from '../lib/desmos';

/** Opens the calculator panel from anywhere, optionally with lines to graph. */
export function openDesmos(lines: string[] = []) { window.dispatchEvent(new CustomEvent('lumino:desmos', { detail: lines })); }

/** The floating calculator button and panel. Put it on pages for classes that use a graphing calculator. */
export function DesmosDock() {
  const [open, setOpen] = useState(false); const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const h = (e: Event) => { setLines((e as CustomEvent<string[]>).detail ?? []); setOpen(true); };
    window.addEventListener('lumino:desmos', h); return () => window.removeEventListener('lumino:desmos', h);
  }, []);
  return <>
    {!open && <button className="desmosfab" onClick={() => setOpen(true)} aria-label="Open the graphing calculator">📈 Calculator</button>}
    {open && <aside className="desmospanel" aria-label="Graphing calculator">
      <div className="row between desmoshead"><b>📈 Graphing calculator</b>
        <span className="row"><Link className="muted small" to="/calculator">Full screen</Link><a className="muted small" href={DESMOS_URL} target="_blank" rel="noreferrer">Desmos ↗</a>
          <button className="ghost" onClick={() => setOpen(false)} aria-label="Close calculator">✕</button></span></div>
      <GraphCalc lines={lines} compact />
    </aside>}
  </>;
}

/** A lesson block: example lines with a button that graphs them. */
export function DesmosBlock({ lines }: { lines: string[] }) {
  return (
    <div className="lb desmosblock"><div className="lbtag">📈 Try it in the graphing calculator</div>
      <pre className="code"><code>{lines.join('\n')}</code></pre>
      <button onClick={() => openDesmos(lines)}>Graph it</button>
      <p className="muted small">Type the same lines into Desmos on test day.</p>
    </div>
  );
}
