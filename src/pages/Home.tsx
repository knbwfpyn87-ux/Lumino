import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <section>
      <h1>Study together. Shine brighter.</h1>
      <p className="muted">Flashcards, practice tests for standard, honors and AP courses, group chat and calls.</p>
      <div className="grid">
        <Link className="card" to="/flashcards"><h3>Flashcards</h3><p>Build decks and drill them.</p></Link>
        <Link className="card" to="/tests"><h3>Practice Tests</h3><p>Standard, Honors, AP, SAT/ACT.</p></Link>
        <Link className="card" to="/upload"><h3>Upload a Test</h3><p>Teachers and students share tests.</p></Link>
        <Link className="card" to="/groups"><h3>Study Groups</h3><p>Chat, call, and take tests together.</p></Link>
      </div>
    </section>
  );
}
