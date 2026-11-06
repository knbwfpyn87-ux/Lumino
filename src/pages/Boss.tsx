// Daily boss battle: today's spaced-review questions. Right answers hit the boss; wrong answers cost a heart
// and show the explanation. Missed questions stay in your review deck either way.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { todaysBoss, recordAnswer, bossDefeated } from '../lib/play';

export default function Boss() {
  const [boss] = useState(todaysBoss); const [qs] = useState(() => [...boss.questions].sort(() => Math.random() - 0.5));
  const [i, setI] = useState(0); const [hp, setHp] = useState(qs.length); const [hearts, setHearts] = useState(3);
  const [picked, setPicked] = useState<number | null>(null); const [hit, setHit] = useState(0); const [over, setOver] = useState<'won' | 'lost' | null>(null);
  if (boss.defeated) return <section className="focus bosspage"><div className="bossbig">🏆</div><h2>You already beat today's boss!</h2><p className="muted">A new one appears tomorrow.</p><Link to="/"><button>Home</button></Link></section>;
  if (!qs.length) return <section className="focus bosspage"><div className="bossbig">😴</div><h2>No boss today</h2><p className="muted">Questions you miss in lessons and practice come back here for review.</p><Link to="/"><button>Home</button></Link></section>;
  const q = qs[i];
  const choose = (ci: number) => {
    if (picked !== null || over) return; setPicked(ci); const ok = ci === q.answer; recordAnswer(q, ok, 'Daily boss');
    if (ok) { setHit(h => h + 1); const left = hp - 1; setHp(left); if (left === 0) { setOver('won'); bossDefeated(qs.length); } }
    else { const h = hearts - 1; setHearts(h); if (h === 0) setOver('lost'); }
  };
  const next = () => { setPicked(null); setI((i + 1) % qs.length); };
  return (
    <section className="focus bosspage">
      <div className="row between"><Link to="/"><button className="ghost">✕ Leave</button></Link><span className="hearts" aria-label={`${hearts} hearts left`}>{'❤️'.repeat(hearts)}{'🖤'.repeat(3 - hearts)}</span></div>
      <div className="bossstage">
        <div key={hit} className={'bossbig' + (hit ? ' ouch' : '')} aria-hidden="true">{over === 'won' ? '💥' : boss.emoji}</div>
        <b>{boss.name}</b>
        <div className="bosshp" aria-label={`Boss health ${hp} of ${qs.length}`}><i style={{ width: `${(hp / qs.length) * 100}%` }} /></div>
      </div>
      {over === 'won' ? <div className="bossend"><h2>Victory! 🏆</h2><p>You defeated {boss.name}. Every question you got right moves further out in your review schedule, so it sticks.</p><Link to="/"><button>Collect and go home</button></Link></div>
        : over === 'lost' ? <div className="bossend"><h2>The boss got away!</h2><p className="muted">No problem: the questions you missed stay in your review deck, and the explanations are what help them stick.</p>
          <button onClick={() => { setHearts(3); setHp(qs.length); setI(0); setPicked(null); setOver(null); setHit(0); }}>Try again</button> <Link to="/"><button className="ghost">Home</button></Link></div>
        : <>
          <p className="muted small">Review question · from a past mistake</p>
          <h2>{q.prompt}</h2>{q.code && <pre className="code"><code>{q.code}</code></pre>}
          <div className="choices">{q.choices.map((c, ci) => <button key={ci} disabled={picked !== null} onClick={() => choose(ci)}
            className={'choice' + (picked === null ? '' : ci === q.answer ? ' isright' : ci === picked ? ' iswrong' : ' faded')}>{String.fromCharCode(65 + ci)}. {c}</button>)}</div>
          {picked !== null && <div className="teacherbox">{picked === q.answer ? <p><b>Hit! ⚔️</b> {q.explanation}</p> : <p><b>Ouch, you lost a heart.</b> The answer is {String.fromCharCode(65 + q.answer)}. {q.explanation}</p>}
            <button onClick={next}>Next →</button></div>}
        </>}
    </section>
  );
}
