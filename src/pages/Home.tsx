import { Link } from 'react-router-dom';
import { useProgress } from '../components/useProgress';
import { levelOf, setGoal } from '../lib/progress';
import { db, isDue } from '../lib/store';
import { useAuth, myName } from '../lib/auth';

export default function Home() {
  const p = useProgress(); const L = levelOf(p.xp);
  const due = db.decks().reduce((n, d) => n + d.cards.filter(isDue).length, 0);
  const pct = Math.min(100, Math.round((p.todayXp / p.goal) * 100));
  const { profile } = useAuth(); const name = myName(profile);
  return (
    <section>
      <h1>Hey {name} 👋</h1>
      <p className="muted">High school to college: AP, SAT, and university courses, studied together.<br />{pct >= 100 ? 'Goal done for today. Anything extra is bonus XP.' : `${p.goal - p.todayXp} XP to hit today's goal.`}</p>
      <div className="stats">
        <div className="stat"><div className="ring" style={{ ['--p' as string]: pct }}><span>{pct}%</span></div><div><b>Daily goal</b><p className="muted">{p.todayXp}/{p.goal} XP
          <select value={p.goal} onChange={e => setGoal(+e.target.value)} className="mini">{[50, 100, 200, 300].map(g => <option key={g} value={g}>{g}</option>)}</select></p></div></div>
        <div className="stat"><div className="big">🔥 {p.streak}</div><div><b>Day streak</b><p className="muted">{p.streak ? 'Keep it alive!' : 'Start one today'}</p></div></div>
        <div className="stat wide"><div className="big">Lv {L.lvl}</div><div style={{ flex: 1 }}><b>{p.xp} XP total</b><div className="bar"><i style={{ width: `${(L.into / L.need) * 100}%` }} /></div><p className="muted">{L.need - L.into} XP to Lv {L.lvl + 1}</p></div></div>
      </div>
      <h2>Up next</h2>
      <div className="grid">
        <Link className="card cta" to="/flashcards"><h3>🃏 Review cards</h3><p>{due ? `${due} cards due` : 'All caught up'}</p></Link>
        <Link className="card" to="/tests"><h3>📝 Practice test</h3><p>High school, AP, SAT, college</p></Link>
        <Link className="card" to="/groups"><h3>👥 Study groups</h3><p>Chat, call, compete</p></Link>
        <Link className="card" to="/photo-quiz/new"><h3>📸 Quiz from photos</h3><p>Snap your worksheet, solve it together</p></Link>
      </div>
      {p.results.length > 0 && <><h2>Recent</h2>
        <div className="list">{p.results.slice(0, 5).map((r, i) => <div key={i} className="item"><span>{r.title}</span><span className={r.score / r.total >= .8 ? 'right' : ''}>{r.score}/{r.total}</span></div>)}</div></>}
    </section>
  );
}
