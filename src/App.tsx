import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Tests from './pages/Tests';
import TakeTest from './pages/TakeTest';
import Upload from './pages/Upload';
import Groups from './pages/Groups';
import Tutor from './pages/Tutor';

// AI tutor is internal only — enable with VITE_ENABLE_TUTOR=true. Not for public release.
const TUTOR = import.meta.env.VITE_ENABLE_TUTOR === 'true';

export default function App() {
  return (
    <div className="app">
      <nav>
        <span className="logo">✦ Lumino</span>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/flashcards">Flashcards</NavLink>
        <NavLink to="/tests">Practice Tests</NavLink>
        <NavLink to="/upload">Upload Test</NavLink>
        <NavLink to="/groups">Study Groups</NavLink>
        {TUTOR && <NavLink to="/tutor">AI Tutor</NavLink>}
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
