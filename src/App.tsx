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
import Icon from './components/Icon';
import TopBar from './components/TopBar';
import Study from './pages/Study';
import { NewPhotoQuiz, PhotoQuizView } from './pages/PhotoQuiz';
import Moderation from './pages/Moderation';
import Feedback from './components/Feedback';
import { useAuth } from './lib/auth';
import { isCloud } from './lib/supabase';
import { SignIn, Onboarding } from './pages/Auth';

import { LOGO } from './lib/logo';

const NAV = [
  { to: '/', label: 'Home', icon: 'home' }, { to: '/courses', label: 'Classes', icon: 'classes' }, { to: '/study', label: 'Study', icon: 'study' },
  { to: '/groups', label: 'Friends', icon: 'friends' }, { to: '/assistant', label: 'AI Tutor', icon: 'ai' }, { to: '/progress', label: 'Progress', icon: 'progress' },
];

export default function App() {
  const [theme, setTheme] = useState<string>(() => { try { return localStorage.getItem('lumino:theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch { return 'light'; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('lumino:theme', theme); } catch { /* ignore */ } }, [theme]);
  const { session, profile, loading } = useAuth();
  if (isCloud) {
    if (loading) return <div className="auth"><img src={LOGO} alt="" className="authlogo" /></div>;
    if (!session) return ['#/terms', '#/privacy'].includes(window.location.hash) ? <main>{window.location.hash === '#/terms' ? <Terms /> : <Privacy />}</main> : <SignIn logo={LOGO} />;
    if (!profile) return <Onboarding logo={LOGO} />;
  }
  return (
    <div className="shell">
      <Feedback />
      <aside className="side">
        <NavLink to="/" className="brand" end><img src={LOGO} alt="" /><span><b>LUM</b>ino</span></NavLink>
        <nav className="sidenav">
          {NAV.map(n => <NavLink key={n.to} to={n.to} end={n.to === '/'}><Icon name={n.icon} /><span>{n.label}</span></NavLink>)}
        </nav>
        <div className="sidefoot">
          <button className="iconbtn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <NavLink to="/account" className="iconbtn" aria-label="Settings"><Icon name="settings" /></NavLink>
        </div>
      </aside>
      <div className="content">
        <TopBar logo={LOGO} />
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
          <Route path="/study" element={<Study />} />
          <Route path="/progress" element={<Home progressOnly />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}
