import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../lib/store';
import { BUILTIN_TESTS } from '../lib/catalog';

export default function TakeTest() {
  const { id } = useParams();
  const test = [...BUILTIN_TESTS, ...db.tests()].find(t => t.id === id);
  const [ans, setAns] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  if (!test) return <p>Test not found. <Link to="/tests">Back</Link></p>;
  const score = test.questions.filter(q => ans[q.id] === q.answer).length;
  return (
    <section>
      <h2>{test.title}</h2>
      <p className="muted">{test.subject} · {test.level}</p>
      {test.questions.map((q, n) => (
        <div key={q.id} className="question">
          <p><b>{n + 1}.</b> {q.prompt}</p>
          {q.choices.map((c, ci) => (
            <label key={ci} className={done ? (ci === q.answer ? 'right' : ans[q.id] === ci ? 'wrong' : '') : ''}>
              <input type="radio" name={q.id} disabled={done} checked={ans[q.id] === ci} onChange={() => setAns({ ...ans, [q.id]: ci })} /> {c}
            </label>
          ))}
          {done && q.explanation && <p className="muted">{q.explanation}</p>}
        </div>
      ))}
      {done ? <h3>Score: {score} / {test.questions.length}</h3> : <button onClick={() => setDone(true)}>Submit</button>}
    </section>
  );
}
