// INTERNAL ONLY — AI tutor. Not shipped publicly. Model/bot will be attached later via a server endpoint.
import { useState } from 'react';
export default function Tutor() {
  const [log, setLog] = useState<{ who: string; text: string }[]>([]); const [q, setQ] = useState('');
  const ask = () => { if (!q.trim()) return; setLog([...log, { who: 'You', text: q }, { who: 'Tutor', text: '(AI tutor not connected yet)' }]); setQ(''); };
  return (
    <section>
      <h2>AI Tutor <small className="muted">internal</small></h2>
      <div className="chat">{log.map((m, i) => <p key={i}><b>{m.who}:</b> {m.text}</p>)}</div>
      <div className="row"><input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && ask()} placeholder="Ask anything" /><button onClick={ask}>Ask</button></div>
    </section>
  );
}
