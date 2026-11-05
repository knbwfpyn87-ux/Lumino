// A virtual lab (science) or real-world demo (math) inside a lesson: move the sliders, watch the results and the graph.
// Labs: record trials into a data table (with a little measurement error), then the trend line and conclusion unlock.
// Demos: the curve is always shown with a dot at your current choice.
import { useMemo, useState } from 'react';
import { labModel, startValues, snap, curve, bounds, measure, fmt, niceTicks, type LabBlock } from '../lib/courses';

const W = 600, H = 280, PL = 52, PR = 14, PT = 14, PB = 40;

function Graph({ b, pts, dot, trials, showCurve }: { b: LabBlock; pts: [number, number][]; dot: [number, number] | null; trials: [number, number][]; showCurve: boolean }) {
  if (!b.plot || !pts.length) return null;
  const all = [...pts, ...trials]; const bd = bounds(all);
  const X = (x: number) => PL + (x - bd.x0) / (bd.x1 - bd.x0 || 1) * (W - PL - PR);
  const Y = (y: number) => H - PB - (y - bd.y0) / (bd.y1 - bd.y0) * (H - PT - PB);
  const xs = b.sets.find(s => s.name === b.plot!.x)!; const ys = b.outs.find(o => o.name === b.plot!.y)!;
  return (
    <svg className="labgraph" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Graph of ${ys.label} against ${xs.label}`}>
      {niceTicks(bd.y0, bd.y1).map((y, i) => <g key={'y' + i}><line x1={PL} x2={W - PR} y1={Y(y)} y2={Y(y)} className="gridline" /><text x={PL - 6} y={Y(y) + 4} textAnchor="end" className="tick">{fmt(y)}</text></g>)}
      {niceTicks(bd.x0, bd.x1, 6).map((x, i) => <text key={'x' + i} x={X(x)} y={H - PB + 16} textAnchor="middle" className="tick">{fmt(x)}</text>)}
      <line x1={PL} x2={PL} y1={PT} y2={H - PB} className="axis" /><line x1={PL} x2={W - PR} y1={H - PB} y2={H - PB} className="axis" />
      <text x={(PL + W - PR) / 2} y={H - 4} textAnchor="middle" className="axlabel">{xs.label}</text>
      <text x={12} y={(PT + H - PB) / 2} textAnchor="middle" className="axlabel" transform={`rotate(-90 12 ${(PT + H - PB) / 2})`}>{ys.label}</text>
      {showCurve && <polyline className="curve" points={pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} />}
      {trials.map(([x, y], i) => <circle key={i} cx={X(x)} cy={Y(y)} r={5} className="trial" />)}
      {dot && Number.isFinite(dot[1]) && <circle cx={X(dot[0])} cy={Y(dot[1])} r={7} className="now" />}
    </svg>
  );
}

export default function Lab({ b, onDone }: { b: LabBlock; onDone?: () => void }) {
  const model = useMemo(() => labModel(b), [b]);
  const [vals, setVals] = useState(() => startValues(b));
  const [trials, setTrials] = useState<Record<string, number>[]>([]);
  const [open, setOpen] = useState(false);
  const isLab = b.kind === 'lab'; const v = model.run(vals);
  const pts = useMemo(() => curve(b, model, vals), [b, model, vals]);
  const unlocked = isLab ? trials.length >= 3 : true;
  const reveal = () => { setOpen(true); onDone?.(); };
  const record = () => {
    const r = { ...v }; for (const o of b.outs) r[o.name] = measure(v[o.name], b.noise);
    setTrials(t => [...t, r].slice(-12));
  };
  const plotTrials: [number, number][] = b.plot ? trials.map(t => [t[b.plot!.x], t[b.plot!.y]]) : [];

  return (
    <div className={'lb lab ' + b.kind}>
      <div className="lbtag">{isLab ? '🧪 Virtual lab' : '📐 Real-world demo'}</div>
      <h4 className="labtitle">{b.title}</h4>
      <p className="labaim"><b>{isLab ? 'Goal: ' : ''}</b>{b.aim}</p>
      {isLab && b.steps.length > 0 && <ol className="labsteps">{b.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>}
      <div className="labgrid">
        <div className="labcontrols">
          {b.sets.map(s => (
            <label key={s.name} className="labslider"><span>{s.label}<b>{fmt(vals[s.name])}</b></span>
              <input type="range" min={s.min} max={s.max} step={s.step} value={vals[s.name]} onChange={e => setVals({ ...vals, [s.name]: snap(s, Number(e.target.value)) })} /></label>
          ))}
          <div className="labouts">{b.outs.map(o => <div key={o.name} className="labout"><span>{o.label}</span><b>{fmt(v[o.name])}</b></div>)}</div>
          {isLab && <div className="row"><button onClick={record}>⏺ Record trial</button>{trials.length > 0 && <button className="ghost" onClick={() => setTrials([])}>Clear</button>}</div>}
        </div>
        <Graph b={b} pts={pts} dot={isLab ? null : b.plot ? [vals[b.plot.x], v[b.plot.y]] : null} trials={plotTrials} showCurve={!isLab || open} />
      </div>
      {isLab && trials.length > 0 && <div className="labtable"><table>
        <thead><tr><th>Trial</th>{b.sets.map(s => <th key={s.name}>{s.label}</th>)}{b.outs.map(o => <th key={o.name}>{o.label}</th>)}</tr></thead>
        <tbody>{trials.map((t, i) => <tr key={i}><td>{i + 1}</td>{b.sets.map(s => <td key={s.name}>{fmt(t[s.name])}</td>)}{b.outs.map(o => <td key={o.name}>{fmt(t[o.name])}</td>)}</tr>)}</tbody>
      </table>{b.noise > 0 && <p className="muted small">Measurements include about ±{b.noise}% error, like a real lab.</p>}</div>}
      {open ? <div className="labresult"><b>{isLab ? '📋 Conclusion: ' : '💡 Takeaway: '}</b>{b.result}</div>
        : <button className={unlocked ? '' : 'ghost'} disabled={!unlocked} onClick={reveal}>
          {isLab ? (unlocked ? 'See the trend and conclusion' : `Record ${3 - trials.length} more trial${3 - trials.length === 1 ? '' : 's'} to unlock the conclusion`) : 'Show the takeaway'}</button>}
    </div>
  );
}
