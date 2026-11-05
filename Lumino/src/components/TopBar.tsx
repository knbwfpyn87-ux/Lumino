import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UIcon from './UIcon';
import { useAuth, myName } from '../lib/auth';
import { useProgress } from './useProgress';
import { db, isDue } from '../lib/store';
import { getUpcoming } from '../lib/planner';
import { PLAN_INFO } from '../lib/plans';
import Brand from './Brand';

export default function TopBar({ logo: _logo }: { logo: string }) {
  const { profile } = useAuth(); const name = myName(profile); const p = useProgress(); const nav = useNavigate();
  const [q, setQ] = useState(''); const [searching, setSearching] = useState(false); const [open, setOpen] = useState(false); const ref = useRef<HTMLDivElement>(null);
  // Close the notifications panel when the page changes (it used to stay open across pages on phones)
  const loc = useLocation(); useEffect(() => { setOpen(false); setSearching(false); }, [loc.pathname]);
  useEffect(() => { const f = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener('pointerdown', f); return () => document.removeEventListener('pointerdown', f); }, []);
  const due = db.decks().reduce((n, d) => n + d.cards.filter(isDue).length, 0);
  const soon = getUpcoming().filter(u => !u.done && new Date(u.due).getTime() - Date.now() < 3 * 864e5);
  const notes = [
    ...(due ? [{ t: `${due} flashcards are due`, to: '/flashcards' }] : []),
    ...soon.map(u => ({ t: `${u.title} is due ${new Date(u.due + 'T12:00').toLocaleDateString(undefined, { weekday: 'short' })}`, to: '/' })),
    ...(p.todayXp < p.goal ? [{ t: `${p.goal - p.todayXp} XP to hit today's goal`, to: '/study' }] : []),
  ];
  return (
    <header className="top">
      <Link to="/" className="brandfull mobileonly"><Brand name="logo-full" alt="Lumino" /></Link>
      <div className="topspacer" />
      {searching
        ? <form className="search" onSubmit={e => { e.preventDefault(); if (q.trim()) { nav(`/tests?q=${encodeURIComponent(q.trim())}`); setSearching(false); } }}>
            <UIcon name="top-search" size={18} /><input autoFocus placeholder="Search classes, tests, topics…" value={q} onChange={e => setQ(e.target.value)} onBlur={() => !q && setSearching(false)} aria-label="Search" />
          </form>
        : <button className="roundbtn" aria-label="Search" onClick={() => setSearching(true)}><UIcon name="top-search" size={20} /></button>}
      <div className="bellwrap" ref={ref}>
        <button className="roundbtn" aria-label="Notifications" onClick={() => setOpen(!open)}><UIcon name="top-bell" size={30} dot={notes.length > 0} /></button>
        {open && <div className="dropdown">{notes.length ? notes.map((n, i) => <Link key={i} to={n.to} onClick={() => setOpen(false)}>{n.t}</Link>) : <p className="muted small">You're all caught up ✨</p>}</div>}
      </div>
      <Link to="/account" className="bigavatar img" title={`${name} · ${profile ? PLAN_INFO[profile.plan].name : ''}`} aria-label="Account"><UIcon name="top-avatar" size={66} /></Link>
    </header>
  );
}
