// Home-page "Today" card: the daily boss (spaced review) and daily quests you choose.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { todaysBoss, getQuests, pickQuest, deckStats } from '../lib/play';
import { getProgress } from '../lib/progress';

export default function DailyPlay() {
  const [, setTick] = useState(0);
  useEffect(() => { const h = () => setTick(t => t + 1); window.addEventListener('lumino:progress', h); return () => window.removeEventListener('lumino:progress', h); }, []);
  const boss = todaysBoss(); const q = getQuests(); const deck = deckStats(); const freezes = getProgress().freezes ?? 0;
  const chosen = q.offered.filter(x => x.picked);
  return (
    <div className="panel dailyplay">
      <div className="panelhead"><h3>🎮 Today</h3><span className="muted small" title="A freeze protects your streak if you miss one day. Earn one every 7 days.">🧊 {freezes} streak freeze{freezes === 1 ? '' : 's'}</span></div>
      <div className="dp2">
        <div className={'bosscard' + (boss.defeated ? ' won' : '')}>
          <div className="bossemoji" aria-hidden="true">{boss.defeated ? '🏆' : boss.emoji}</div>
          <div>
            <b>{boss.defeated ? `${boss.name} defeated!` : `Boss: ${boss.name}`}</b>
            <p className="muted small">{boss.defeated ? 'Come back tomorrow for a new boss.' : boss.ready ? `${boss.hp} review questions you missed before. Beat them to win.` :
              deck.total ? `Your next review questions unlock in a day or two (${deck.total} in your review deck).` : 'Questions you miss come back here for review, spaced out so they stick.'}</p>
            {boss.ready && !boss.defeated && <Link to="/boss"><button>⚔️ Fight</button></Link>}
          </div>
        </div>
        <div className="quests">
          {q.picking ? <>
            <b>Choose 3 quests for today</b>
            {q.offered.map(x => <button key={x.id} className={'questpick' + (x.picked ? ' on' : '')} onClick={() => { pickQuest(x.id); setTick(t => t + 1); }}>{x.icon} {x.title}{x.picked ? ' ✓' : ''}</button>)}
          </> : <>
            <b>Daily quests {q.chest ? '· 🎁 chest opened' : '· finish all 3 for a 🎁 chest'}</b>
            {chosen.map(x => <div key={x.id} className={'quest' + (x.done ? ' done' : '')}>
              <span>{x.icon} {x.title}</span><span className="qbar"><i style={{ width: `${(x.progress / x.goal) * 100}%` }} /></span><span className="muted small">{x.done ? '✓' : `${x.progress}/${x.goal}`}</span></div>)}
          </>}
        </div>
      </div>
    </div>
  );
}
