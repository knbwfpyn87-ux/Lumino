// Full-page graphing calculator.
import GraphCalc from '../components/GraphCalc';
import { DESMOS_URL } from '../lib/desmos';

export default function Calculator() {
  return (
    <section className="calcpage">
      <div className="row between"><h2 style={{ margin: 0 }}>📈 Graphing calculator</h2><a className="muted small" href={DESMOS_URL} target="_blank" rel="noreferrer">Open Desmos ↗</a></div>
      <p className="muted small">Graph equations, see zeros, maximums and intersections, solve equations, and do quick math. Try y = x^2 − 4x + 3, 3x + 2y = 12 or mean([4, 7, 9]).</p>
      <GraphCalc />
    </section>
  );
}
