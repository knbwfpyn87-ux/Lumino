import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import Upload from './pages/Upload';
import Groups from './pages/Groups';
import Assistant from './pages/Assistant';
import Pricing from './pages/Pricing';
import Account from './pages/Account';
import { Terms, Privacy } from './pages/Legal';
import { CourseList, CourseView } from './pages/Courses';
import { PLAN_INFO } from './lib/plans';
import { NewPhotoQuiz, PhotoQuizView } from './pages/PhotoQuiz';
import Moderation from './pages/Moderation';
import Feedback from './components/Feedback';
import { useProgress } from './components/useProgress';
import { levelOf } from './lib/progress';
import { useAuth } from './lib/auth';
import { isCloud } from './lib/supabase';
import { SignIn, Onboarding } from './pages/Auth';

const LOGO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+CiAgPHBhdGggZD0iTTMyIDE0Yy0xMCAwLTE3IDcuNS0xNyAxNi41IDAgNiAzIDEwIDYuNSAxMyAxLjYgMS40IDIuNSAzLjIgMi41IDUuMlY1MWgxNnYtMi4zYzAtMiAuOS0zLjggMi41LTUuMkM0NiA0MC41IDQ5IDM2LjUgNDkgMzAuNSA0OSAyMS41IDQyIDE0IDMyIDE0eiIgZmlsbD0iI0ZGRDIzMyIgc3Ryb2tlPSIjRTBBODAwIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cmVjdCB4PSIyNCIgeT0iNTEiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiByeD0iMS41IiBmaWxsPSIjMzhCNkZGIi8+CiAgPHJlY3QgeD0iMjUuNSIgeT0iNTUuNSIgd2lkdGg9IjEzIiBoZWlnaHQ9IjMuNSIgcng9IjEuNSIgZmlsbD0iIzFFOTBENiIvPgogIDxjaXJjbGUgY3g9IjI2LjUiIGN5PSIzMSIgcj0iMi4yIiBmaWxsPSIjMUMxRjJFIi8+PGNpcmNsZSBjeD0iMzcuNSIgY3k9IjMxIiByPSIyLjIiIGZpbGw9IiMxQzFGMkUiLz4KICA8cGF0aCBkPSJNMjUgMzdjMy41IDQgMTAuNSA0IDE0IDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFDMUYyRSIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0zMiAzIDEyIDExbDIwIDggMjAtOHoiIGZpbGw9IiMzOEI2RkYiIHN0cm9rZT0iIzFFNzhDOCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICA8cGF0aCBkPSJNMjEgMTQuNXY1YzMgMyAxOSAzIDIyIDB2LTVMMzIgMTl6IiBmaWxsPSIjMUU5MEQ2Ii8+CiAgPHBhdGggZD0iTTQ4IDEyLjV2OSIgc3Ryb2tlPSIjRkZEMjMzIiBzdHJva2Utd2lkdGg9IjEuOCIvPjxjaXJjbGUgY3g9IjQ4IiBjeT0iMjIuNSIgcj0iMiIgZmlsbD0iI0ZGRDIzMyIvPgo8L3N2Zz4K';

export default function App() {
  const [theme, setTheme] = useState<string>(() => { try { return localStorage.getItem('lumino:theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch { return 'light'; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('lumino:theme', theme); } catch { /* ignore */ } }, [theme]);
  const p = useProgress();
  const { session, profile, loading } = useAuth();
  if (isCloud) {
    if (loading) return <div className="auth"><img src={LOGO} alt="" className="authlogo" /></div>;
    if (!session) return ['#/terms', '#/privacy'].includes(window.location.hash) ? <main>{window.location.hash === '#/terms' ? <Terms /> : <Privacy />}</main> : <SignIn logo={LOGO} />;
    if (!profile) return <Onboarding logo={LOGO} />;
  }
  return (
    <div className="app">
      <Feedback />
      <nav>
        <span className="logo"><img src={LOGO} alt="" />Lumino</span>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/courses">Classes</NavLink>
        <NavLink to="/tests">Practice</NavLink>
        <NavLink to="/flashcards">Flashcards</NavLink>
        <NavLink to="/groups">Groups</NavLink>
        <NavLink to="/assistant">AI ✨</NavLink>
        <span className="chip">🔥 {p.streak}</span><span className="chip">⚡ Lv {levelOf(p.xp).lvl}</span>
        {profile && <NavLink to="/account" className="userchip planchip" title="Account">{profile.role === 'teacher' ? '🍎' : '🎒'} {isCloud ? profile.username : 'Account'} · {PLAN_INFO[profile.plan].name}</NavLink>}
        <button className="theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode">{theme === 'dark' ? '☀️' : '🌙'}</button>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/tests/:id" element={<TakeTest />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/photo-quiz/new" element={<NewPhotoQuiz />} />
          <Route path="/photo-quiz/:id" element={<PhotoQuizView />} />
          <Route path="/moderation" element={<Moderation />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </div>
  );
}
