import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../components/useProgress';
import { levelOf, setGoal, lastWeek } from '../lib/progress';
import { uid } from '../lib/store';
import { useAuth, myName } from '../lib/auth';
import { COURSES, levelState, getCourseProgress } from '../lib/courses';
import { getMyClasses, setMyClasses, getUpcoming, saveUpcoming, type Upcoming } from '../lib/planner';
import { listGroups, listMembers, type GroupInfo } from '../lib/api';
import Icon from '../components/Icon';
import UIcon from '../components/UIcon';
import { UI } from '../lib/ui';
import Brand from '../components/Brand';
import { AI_ENABLED } from '../lib/features';
import DailyPlay from '../components/DailyPlay';


const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
const COLORS = ['#7cc8ff', '#ff9aa2', '#c4b5fd', '#ffd666', '#86efac', '#fdba74', '#93c5fd'];
const FACE = ['avatar-blue', 'avatar-yellow', 'avatar-purple', 'avatar-gray'];

/** Class "grade" = share of unit levels passed, shown as a letter. */
function classGrade(id: string) {
  const c = COURSES.find(x => x.id === id)!; const prog = getCourseProgress();
  const total = c.units.length * 3; const passed = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(id, u, l, prog).passed).length, 0);
  const pct = passed / total; const started = Object.keys(prog).some(k => k.startsWith(id + '~'));
  return { pct, letter: !started ? '—' : pct >= 0.9 ? 'A' : pct >= 0.75 ? 'A−' : pct >= 0.6 ? 'B+' : pct >= 0.45 ? 'B' : pct >= 0.3 ? 'C+' : pct > 0 ? 'C' : 'Started' };
}

export default function Home({ progressOnly = false }: { progressOnly?: boolean }) {
  const p = useProgress(); const L = levelOf(p.xp); const nav = useNavigate();
  const { profile } = useAuth(); const name = myName(profile);
  const [mine, setMine] = useState(getMyClasses()); const [picking, setPicking] = useState(false); const [pq, setPq] = useState('');
  const [up, setUp] = useState(getUpcoming()); const [adding, setAdding] = useState(false); const [ut, setUt] = useState(''); const [ud, setUd] = useState('');
  const [groups, setGroups] = useState<GroupInfo[]>([]); const [friends, setFriends] = useState<string[]>([]); const [counts, setCounts] = useState<Record<string, number>>({});
  const [ask, setAsk] = useState('');
  useEffect(() => { listGroups().then(async g => { setGroups(g); const c: Record<string, number> = {}; const all = new Set<string>();
    for (const x of g.slice(0, 3)) { const m = await listMembers(x.id); c[x.id] = m.length; m.forEach(n => n !== name && all.add(n)); }
    setCounts(c); setFriends([...all]); }).catch(() => {}); }, [name]);
  useEffect(() => { const f = () => { setMine(getMyClasses()); setUp(getUpcoming()); }; window.addEventListener('lumino:planner', f); return () => window.removeEventListener('lumino:planner', f); }, []);

  const week = lastWeek(p); const weekXp = week.reduce((s, d) => s + d.xp, 0); const weekGoal = p.goal * 7; const weekPct = Math.min(100, Math.round(weekXp / weekGoal * 100));
  const todayPct = Math.min(100, Math.round(p.todayXp / p.goal * 100));
  const pending = up.filter(u => !u.done).sort((a, b) => a.due.localeCompare(b.due));

  const addUp = () => { if (!ut.trim() || !ud) return; const n: Upcoming[] = [...up, { id: uid(), title: ut.trim(), due: ud, done: false }]; saveUpcoming(n); setUp(n); setUt(''); setUd(''); setAdding(false); };
  const toggleUp = (id: string) => { const n = up.map(u => u.id === id ? { ...u, done: !u.done } : u); saveUpcoming(n); setUp(n); };

  const progressCard = (
    <div className="panel">
      <div className="panelhead"><h3><Icon name="progress" /> Your Progress</h3><span className="muted small">This week</span></div>
      <div className="row between"><span>Weekly XP</span><b>{weekPct}%</b></div>
      <div className="bar big"><i style={{ width: `${weekPct}%` }} /></div>
      <div className="row between small muted"><span>{weekXp} / {weekGoal} XP</span><span>Lv {L.lvl} · {L.need - L.into} XP to Lv {L.lvl + 1}</span></div>
      <div className="weekbars">{week.map(d => <div key={d.date} title={`${d.xp} XP`}><i style={{ height: `${Math.min(100, d.xp / Math.max(p.goal, 1) * 100)}%` }} /><span>{d.label}</span></div>)}</div>
      <div className="row between small"><span>Daily goal: {p.todayXp}/{p.goal} XP ({todayPct}%)</span>
        <select className="mini" value={p.goal} onChange={e => setGoal(+e.target.value)} aria-label="Daily goal">{[50, 100, 200, 300].map(g => <option key={g} value={g}>{g} XP</option>)}</select></div>
    </div>
  );
  const streakCard = (
    <div className="panel streak">
      <div><h3><Icon name="flame" /> Study Streak</h3><p className="muted small">{p.streak ? 'Keep it going!' : 'Study today to start one'}</p>
        <div className="checks">{week.map(d => <span key={d.date} className={d.studied ? 'on' : ''} title={d.date}>{d.studied ? <Icon name="check" size={14} /> : null}</span>)}</div></div>
      <div className="streaknum"><b>{p.streak}</b><span>day{p.streak === 1 ? '' : 's'}</span></div>
    </div>
  );
  if (progressOnly) return (
    <section><h1 className="greet">Progress</h1><div className="dash2">{progressCard}{streakCard}</div>
      {p.results.length > 0 && <div className="panel"><h3>Recent scores</h3><div className="list">{p.results.slice(0, 15).map((r, i) => <div key={i} className="item"><span>{r.title}</span><b className={r.score / r.total >= .8 ? 'right' : ''}>{r.score}/{r.total}</b></div>)}</div></div>}
    </section>
  );

  return (
    <section className="dash">
      <div className="greetrow">
        <img className="spark" src={UI['sparkle-greeting']} alt="" aria-hidden="true" />
        <div><h1 className="greet">{greet()}, {name}!</h1><p className="muted sub">Ready to study, learn, and grow together?</p></div>
      </div>
      <div className="dashgrid">
        <div className="dashmain">
          <Link to={mine[0] ? `/courses/${mine[0]}` : '/courses'} className="hero" aria-label="Study now">
            <Brand name="mascot-hero" className="mascot" />
            <div><h2>Study Smarter Together.</h2><p>{AI_ENABLED ? 'AI-powered learning, built for you and your friends.' : 'Classes, practice and study rooms, built for you and your friends.'}</p></div>
            <img className="herowave" src={UI['wave-hero']} alt="" aria-hidden="true" />
          </Link>

          <DailyPlay />

          <div className="dash2">
            <div className="panel">
              <div className="panelhead"><h3><UIcon name="icon-classes" size={30} ink /> My Classes</h3><button className="link" onClick={() => setPicking(!picking)}>{picking ? 'Done' : mine.length ? <>View All <Icon name="arrow" size={14} /></> : 'Add classes'}</button></div>
              {picking ? <><input className="pickq" placeholder="Search classes…" value={pq} onChange={e => setPq(e.target.value)} /><div className="pickgrid">{COURSES.filter(c => c.name.toLowerCase().includes(pq.toLowerCase())).map(c => <label key={c.id} className={'pick' + (mine.includes(c.id) ? ' on' : '')}><input type="checkbox" checked={mine.includes(c.id)} onChange={() => { const n = mine.includes(c.id) ? mine.filter(x => x !== c.id) : [...mine, c.id]; setMine(n); setMyClasses(n); }} />{c.emoji} {c.name}</label>)}</div></>
                : mine.length ? <div className="classlist">{mine.slice(0, 4).map((id, i) => { const c = COURSES.find(x => x.id === id); if (!c) return null; const g = classGrade(id);
                    return <Link key={id} to={`/courses/${id}`} className="classrow"><span className="swatch" style={{ background: COLORS[i % COLORS.length] }} /><span className="cname">{c.name}</span><span className="grade">{g.letter}</span></Link>; })}</div>
                : <p className="muted small">Pick the classes you're taking to see them here.</p>}
            </div>

            <div className="panel">
              <div className="panelhead"><h3><UIcon name="icon-calendar" size={30} ink /> Upcoming Assignments</h3><button className="link" onClick={() => setAdding(!adding)}>{adding ? 'Cancel' : <>Add <Icon name="plus" size={14} /></>}</button></div>
              {adding && <div className="row"><input placeholder="e.g. History essay" value={ut} onChange={e => setUt(e.target.value)} style={{ flex: 2 }} /><input type="date" value={ud} onChange={e => setUd(e.target.value)} style={{ flex: 1 }} /><button onClick={addUp}>Add</button></div>}
              {pending.length ? <div className="uplist">{pending.slice(0, 3).map(u => { const days = Math.ceil((new Date(u.due + 'T23:59').getTime() - Date.now()) / 864e5);
                  return <label key={u.id} className="uprow"><input type="checkbox" checked={u.done} onChange={() => toggleUp(u.id)} /><span>{u.title}</span><span className={'when' + (days <= 1 ? ' soon' : '')}>{days < 0 ? 'Overdue' : days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : new Date(u.due + 'T12:00').toLocaleDateString(undefined, { weekday: 'short' })}</span></label>; })}</div>
                : !adding && <p className="muted small">Nothing due. Add an assignment or test to stay on track.</p>}
            </div>
          </div>

          <div className="panel">
            <div className="panelhead"><h3><UIcon name="icon-book" size={30} ink /> Study Tools</h3></div>
            <div className="tools">
              {[['tool-flashcards', 'Flashcards', '/flashcards', 'blue'], ['tool-notes', 'Notes', '/notes', 'yellow'], ['tool-practice', 'Practice', '/tests', 'blue'], ['tool-timer', 'Focus Timer', '/study#timer', 'yellow']].filter(Boolean).concat(AI_ENABLED ? [['tool-ai', 'AI Help', '/assistant', 'purple']] : []).map(([ic, l, to, c]) =>
                <Link key={l} to={to} className={'tool ' + c}><UIcon name={ic} size={46} ink /><span>{l}</span></Link>)}
            </div>
          </div>
        </div>

        <div className="dashside">
          <div className="panel">
            <div className="panelhead"><h3><UIcon name="icon-friends" size={34} ink /> Study With Friends</h3></div>
            <div className="faces">{(friends.length ? friends : []).slice(0, 4).map((f, i) => <img key={f} className="face img" src={UI[FACE[i % FACE.length]]} alt={f} title={f} />)}<Link to="/friends" className="face add" aria-label="Add friends"><Icon name="plus" size={20} /></Link></div>
            <Link to={groups[0] ? `/groups?open=${groups[0].id}` : '/groups'} className="roomlink"><UIcon name="icon-video-room" size={28} ink /> <span>Start Study Room</span><Icon name="arrow" size={18} /></Link>
          </div>
          {AI_ENABLED && <div className="panel">
            <div className="panelhead"><h3><UIcon name="icon-ai-yellow" size={32} ink className="keep" /> AI Tutor</h3></div>
            <form className="askbox" onSubmit={e => { e.preventDefault(); nav(`/assistant${ask.trim() ? `?q=${encodeURIComponent(ask.trim())}` : ''}`); }}>
              <input placeholder="Ask a question or get help..." value={ask} onChange={e => setAsk(e.target.value)} /><button className="sendimg" aria-label="Ask"><UIcon name="btn-send" size={44} /></button>
            </form>
          </div>}
          <div className="panel">
            <div className="panelhead"><h3><UIcon name="icon-progress" size={32} ink /> Your Progress</h3><Link to="/progress" className="link small">This Week <Icon name="chevron" size={14} /></Link></div>
            <div className="progrow"><div className="bar big"><i style={{ width: `${weekPct}%` }} /></div><b>{weekPct}%</b></div>
            <p className="muted small">🔥 {p.streak}-day streak · {weekXp}/{weekGoal} XP this week · Level {L.lvl}</p>
          </div>
          <div className="panel">
            <div className="panelhead"><h3><UIcon name="icon-video" size={30} ink /> Active Study Rooms</h3><Link to="/groups" className="link small">View All <Icon name="arrow" size={14} /></Link></div>
            {groups.length ? <div className="rooms">{groups.slice(0, 3).map(g => <Link key={g.id} to={`/groups?open=${g.id}`} className="room"><UIcon name="icon-room" size={26} ink /><b>{g.name}</b><span className="muted small">{counts[g.id] ?? '·'} members</span><UIcon name="btn-play" size={42} /></Link>)}</div>
              : <p className="muted small">No study rooms yet. <Link to="/groups">Start one</Link></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
