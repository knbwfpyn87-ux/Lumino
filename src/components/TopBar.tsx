import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth, myName } from '../lib/auth';
import { useProgress } from './useProgress';
import { levelOf } from '../lib/progress';
import { db, isDue } from '../lib/store';
import { getUpcoming } from '../lib/planner';
import { PLAN_INFO } from '../lib/plans';

export default function TopBar({ logo }: { logo: string }) {
  const { profile } = useAuth(); const name = myName(profile); const p = useProgress(); const nav = useNavigate();
  const [q, setQ] = useState(''); const [open, setOpen] = useState(false); const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener('click', f); return () => document.removeEventListener('click', f); }, []);
  const due = db.decks().reduce((n, d) => n + d.cards.filter(isDue).length, 0);
  const soon = getUpcoming().filter(u => !u.done && new Date(u.due).getTime() - Date.now() < 3 * 864e5);
  const notes = [
    ...(due ? [{ t: `${due} flashcards are due`, to: '/flashcards' }] : []),
    ...soon.map(u => ({ t: `${u.title} is due ${new Date(u.due + 'T12:00').toLocaleDateString(undefined, { weekday: 'short' })}`, to: '/' })),
    ...(p.todayXp < p.goal ? [{ t: `${p.goal - p.todayXp} XP to hit today's goal`, to: '/study' }] : []),
  ];
  return (
    <header className="top">
      <Link to="/" className="brand mobileonly"><img src={logo} alt="" /><span><b>LUM</b>ino</span></Link>
      <form className="search" onSubmit={e => { e.preventDefault(); if (q.trim()) nav(`/tests?q=${encodeURIComponent(q.trim())}`); }}>
        <Icon name="search" size={18} /><input placeholder="Search classes, tests, topics…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search" />
      </form>
      <span className="chip">🔥 {p.streak}</span><span className="chip">⚡ Lv {levelOf(p.xp).lvl}</span>
      <div className="bellwrap" ref={ref}>
        <button className="iconbtn" aria-label="Notifications" onClick={() => setOpen(!open)}><Icon name="bell" />{notes.length > 0 && <i className="dot" />}</button>
        {open && <div className="dropdown">{notes.length ? notes.map((n, i) => <Link key={i} to={n.to} onClick={() => setOpen(false)}>{n.t}</Link>) : <p className="muted small">You're all caught up ✨</p>}</div>}
      </div>
      <Link to="/account" className="avatar sm" title={`${name} · ${profile ? PLAN_INFO[profile.plan].name : ''}`}>{name.slice(0, 1).toUpperCase()}</Link>
    </header>
  );
}
