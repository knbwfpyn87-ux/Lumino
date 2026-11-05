import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ASSISTANTS, canAccess, PLAN_INFO } from '../lib/plans';
import { usePlan } from '../lib/auth';
import { askAssistant, aiUsedToday } from '../lib/api';
import { isCloud } from '../lib/supabase';
import Locked from '../components/Locked';
import Lumino from '../components/Lumino';
import LuminoSays from '../components/LuminoSays';

type Turn = { role: 'user' | 'assistant'; content: string };

export default function Assistant() {
  const plan = usePlan();
  const [active, setActive] = useState<string | null>(new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('q') ? 'study-buddy' : null);
  const [chats, setChats] = useState<Record<string, Turn[]>>({});
  const [sp] = useSearchParams(); const [text, setText] = useState(sp.get('q') ?? ''); const [busy, setBusy] = useState(false); const [err, setErr] = useState(''); const [used, setUsed] = useState(0);
  const end = useRef<HTMLDivElement>(null);
  const limit = plan === 'pro' ? 150 : plan === 'plus' ? 30 : 0;
  useEffect(() => { aiUsedToday().then(setUsed).catch(() => {}); }, []);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [chats, busy]);

  if (plan === 'free') return <section><div className="row center"><Lumino mood="sleep" size={180} /></div><Locked tier="plus" what="Mr. Lumino, your AI tutor," /></section>;
  const a = ASSISTANTS.find(x => x.id === active);

  if (!a) return (
    <section>
      <div className="tutorhead"><LuminoSays text="Hi! I'm Mr. Lumino. Pick a tutor and ask me anything. I'll walk you through it step by step." mood="wave" after="wave" size={150} />
        <div><h2>Lumino AI Tutor</h2><p className="muted">{used}/{limit} messages used today</p></div></div>
      <div className="grid">{ASSISTANTS.map(x => { const open = canAccess(plan, x.tier); return (
        <div key={x.id} className={'card' + (open ? '' : ' dim')} onClick={() => open ? setActive(x.id) : (window.location.hash = '#/pricing')}>
          <h3>{x.emoji} {x.name}</h3><p>{x.blurb}</p>{!open && <span className="pill">🔒 {PLAN_INFO[x.tier].name}</span>}
        </div>); })}</div>
    </section>
  );

  const turns = chats[a.id] ?? [];
  const last = turns[turns.length - 1];
  // Lumino's mood follows the reply: excited for praise, curious for questions, teaching otherwise
  const lastMood = !last || last.role !== 'assistant' ? 'wave' : /great|nice|awesome|correct|well done|exactly/i.test(last.content) ? 'cheer' : /\?\s*$/.test(last.content) ? 'think' : 'talk';
  const send = async () => {
    const q = text.trim(); if (!q || busy) return;
    const next: Turn[] = [...turns, { role: 'user', content: q }];
    setChats(c => ({ ...c, [a.id]: next })); setText(''); setBusy(true); setErr('');
    try {
      const reply = isCloud ? await askAssistant(a.id, next) : '(Demo mode: the assistant answers once Lumino is live.)';
      setChats(c => ({ ...c, [a.id]: [...next, { role: 'assistant', content: reply }] })); setUsed(u => u + 1);
    } catch (e) { setErr((e as Error).message); setChats(c => ({ ...c, [a.id]: turns })); setText(q); }
    setBusy(false);
  };
  return (
    <section className="focus">
      <div className="row between"><button className="ghost" onClick={() => setActive(null)}>← Assistants</button><span className="muted small">{used}/{limit} today</span></div>
      <div className="tutorstage">
        {busy ? <div className="lsays left"><Lumino mood="think" size={170} /><div className="lsays-bubble muted">Hmm, let me think…</div></div>
          : <LuminoSays key={turns.length} size={170} mood={lastMood} after={lastMood === 'talk' ? 'idle' : lastMood}
              text={last?.role === 'assistant' ? last.content : turns.length ? '' : `Hi, I'm Mr. Lumino, your ${a.name}. ${a.blurb}. What are we learning today?`} />}
      </div>
      <p className="note">AI can make mistakes. Double-check important answers, and use it to learn, not to copy.</p>
      <div className="chat tall">
        {!turns.length && <p className="muted">Ask anything. {a.blurb}.</p>}
        {turns.slice(0, last?.role === 'assistant' ? -1 : undefined).map((t, i) => <div key={i} className={'bubble ' + t.role}>{t.content}</div>)}
        <div ref={end} />
      </div>
      {err && <p className="wrong">{err}</p>}
      <div className="row"><textarea rows={2} maxLength={4000} placeholder="Type your question…" value={text} onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} /><button disabled={busy} onClick={send}>Send</button></div>
    </section>
  );
}
