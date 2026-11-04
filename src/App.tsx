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
import UIcon from './components/UIcon';
import Brand from './components/Brand';
import { UI } from './lib/ui';
import TopBar from './components/TopBar';
import Study from './pages/Study';
import Notes from './pages/Notes';
import Friends from './pages/Friends';
import { NewPhotoQuiz, PhotoQuizView } from './pages/PhotoQuiz';
import Moderation from './pages/Moderation';
import Feedback from './components/Feedback';
import { useAuth } from './lib/auth';
import { isCloud } from './lib/supabase';
import { SignIn, Onboarding } from './pages/Auth';

import { LOGO } from './lib/logo';

const NAV = [
  { to: '/', label: 'Home', icon: 'nav-home' }, { to: '/courses', label: 'Classes', icon: 'nav-classes' }, { to: '/study', label: 'Study', icon: 'nav-study' },
  { to: '/friends', label: 'Friends', icon: 'nav-friends' }, { to: '/groups', label: 'Groups', icon: 'nav-groups' }, { to: '/assistant', label: 'AI Tutor', icon: 'nav-ai' },
];

export default function App() {
  const [theme, setTheme] = useState<string>(() => { try { return localStorage.getItem('lumino:theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch { return 'light'; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('lumino:theme', theme); } catch { /* ignore */ } }, [theme]);
  const { session, profile, loading } = useAuth();
  if (isCloud) {
    if (loading) return <div className="auth"><Brand name="logo-mascot" className="authlogo" /></div>;
    if (!session) return ['#/terms', '#/privacy'].includes(window.location.hash) ? <main>{window.location.hash === '#/terms' ? <Terms /> : <Privacy />}</main> : <SignIn logo={LOGO} />;
    if (!profile) return <Onboarding logo={LOGO} />;
  }
  return (
    <div className="shell">
      <Feedback />
      <aside className="side">
        <NavLink to="/" className="brandfull" end aria-label="Lumino home"><Brand name="logo-full" alt="Lumino" /></NavLink>
        <nav className="sidenav">
          {NAV.map(n => <NavLink key={n.to} to={n.to} end={n.to === '/'}><UIcon name={n.icon} size={28} ink className={n.icon === 'nav-home' ? 'navhome' : ''} /><span>{n.label}</span></NavLink>)}
        </nav>
        <div className="sidefoot">
          <NavLink to="/progress" className="iconbtn plain" aria-label="Notifications and progress"><UIcon name="nav-bell" size={30} dot /></NavLink>
          <button className="iconbtn plain" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <NavLink to="/account" className="iconbtn plain" aria-label="Settings"><UIcon name="nav-settings" size={30} /></NavLink>
        </div>
        <img className="sidewave" src={UI['wave-sidebar']} alt="" aria-hidden="true" />
      </aside>
      <div className="content">
        <img className="topwave" src={UI['wave-topright']} alt="" aria-hidden="true" />
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
          <Route path="/notes" element={<Notes />} />
          <Route path="/friends" element={<Friends />} />
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
