import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import Upload from './pages/Upload';
import Groups from './pages/Groups';
import Tutor from './pages/Tutor';
import Feedback from './components/Feedback';
import { useProgress } from './components/useProgress';
import { levelOf } from './lib/progress';

// AI tutor is internal only — enable with VITE_ENABLE_TUTOR=true. Not for public release.
const TUTOR = import.meta.env.VITE_ENABLE_TUTOR === 'true';

export default function App() {
  const [theme, setTheme] = useState<string>(() => { try { return localStorage.getItem('lumino:theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch { return 'light'; } });
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('lumino:theme', theme); } catch { /* ignore */ } }, [theme]);
  const p = useProgress();
  return (
    <div className="app">
      <Feedback />
      <nav>
        <span className="logo"><img src="/logo.svg" alt="" />Lumino</span>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/flashcards">Flashcards</NavLink>
        <NavLink to="/tests">Practice Tests</NavLink>
        <NavLink to="/upload">Upload Test</NavLink>
        <NavLink to="/groups">Study Groups</NavLink>
        {TUTOR && <NavLink to="/tutor">AI Tutor</NavLink>}
        <span className="chip">🔥 {p.streak}</span><span className="chip">⚡ Lv {levelOf(p.xp).lvl}</span>
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
          {TUTOR && <Route path="/tutor" element={<Tutor />} />}
        </Routes>
      </main>
    </div>
  );
}
