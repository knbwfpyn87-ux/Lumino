import { useMemo, useState } from 'react';
import { db, uid, review, isDue, type Deck, type Card } from '../lib/store';
import { SUBJECTS } from '../lib/catalog';
import { award } from '../lib/progress';

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>(db.decks());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [studying, setStudying] = useState(false);
  const [name, setName] = useState(''); const [subject, setSubject] = useState(SUBJECTS[0]);
  const [front, setFront] = useState(''); const [back, setBack] = useState(''); const [bulk, setBulk] = useState('');
  const [flip, setFlip] = useState(false); const [combo, setCombo] = useState(0); const [done, setDone] = useState(0);
  const active = decks.find(d => d.id === activeId) ?? null;
  const persist = (d: Deck[]) => { setDecks(d); db.saveDecks(d); };
  const setDeck = (upd: Deck) => persist(decks.map(d => d.id === upd.id ? upd : d));
  const queue = useMemo(() => active?.cards.filter(isDue) ?? [], [active]);

  const addDeck = () => { if (!name.trim()) return; const d = { id: uid(), name, subject, cards: [] }; persist([...decks, d]); setName(''); setActiveId(d.id); };
  const addCards = () => {
    if (!active) return;
    const fromBulk: Card[] = bulk.split('\n').map(l => l.split(/\t| - |:/)).filter(x => x.length >= 2 && x[0].trim()).map(([f, ...b]) => ({ id: uid(), front: f.trim(), back: b.join(':').trim() }));
    const single: Card[] = front.trim() ? [{ id: uid(), front, back }] : [];
    if (!fromBulk.length && !single.length) return;
    setDeck({ ...active, cards: [...active.cards, ...single, ...fromBulk] }); setFront(''); setBack(''); setBulk('');
  };
  const grade = (g: 0 | 1 | 2) => {
    if (!active) return; const c = queue[0];
    setDeck({ ...active, cards: active.cards.map(x => x.id === c.id ? review(x, g) : x) });
    setFlip(false); setDone(done + 1);
    if (g > 0) { const n = combo + 1; setCombo(n); award(n % 5 === 0 ? 10 : 2, n % 5 === 0 ? `${n} in a row!` : 'card'); } else setCombo(0);
  };

  if (active && studying) {
    const c = queue[0];
    const total = done + queue.length;
    return (
      <section className="focus">
        <div className="row between"><button className="ghost" onClick={() => { setStudying(false); setDone(0); setCombo(0); }}>✕ Exit</button>{combo >= 2 && <span className="combo">🔥 {combo} combo</span>}</div>
        <div className="bar"><i style={{ width: `${total ? (done / total) * 100 : 100}%` }} /></div>
        {c ? (<>
          <div className={'flash' + (flip ? ' flipped' : '')} onClick={() => setFlip(!flip)}>{flip ? c.back : c.front}<small className="muted hint">{flip ? '' : 'tap to flip'}</small></div>
          {flip ? <div className="row center grades">
            <button className="bad" onClick={() => grade(0)}>Again</button><button onClick={() => grade(1)}>Good</button><button className="ok" onClick={() => grade(2)}>Easy</button>
          </div> : <div className="row center"><button onClick={() => setFlip(true)}>Show answer</button></div>}
        </>) : <div className="done"><div className="big">🎉</div><h2>Session complete</h2><p className="muted">{done} cards reviewed</p><button onClick={() => { setStudying(false); setDone(0); }}>Back to deck</button></div>}
      </section>
    );
  }

  if (active) return (
    <section>
      <button className="ghost" onClick={() => setActiveId(null)}>← Decks</button>
      <h2>{active.name} <small className="muted">{active.subject}</small></h2>
      <div className="row"><button disabled={!queue.length} onClick={() => { setStudying(true); setDone(0); }}>▶ Study {queue.length} due</button>
        <button className="ghost" onClick={() => setDeck({ ...active, cards: active.cards.map(c => ({ ...c, due: 0 })) })}>Reset schedule</button>
        <button className="ghost" onClick={() => { if (confirm('Delete deck?')) { persist(decks.filter(d => d.id !== active.id)); setActiveId(null); } }}>Delete deck</button></div>
      <h3>Add cards</h3>
      <div className="row"><input placeholder="Front" value={front} onChange={e => setFront(e.target.value)} /><input placeholder="Back" value={back} onChange={e => setBack(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCards()} /><button onClick={addCards}>Add</button></div>
      <textarea placeholder={'Or paste many, one per line:\nmitochondria - powerhouse of the cell'} value={bulk} onChange={e => setBulk(e.target.value)} rows={3} />
      <div className="list">{active.cards.map(c => <div key={c.id} className="item"><span><b>{c.front}</b> — {c.back}</span>
        <span><small className="muted">{isDue(c) ? 'due' : `in ${Math.ceil((c.due! - Date.now()) / 864e5)}d`}</small> <button className="ghost x" onClick={() => setDeck({ ...active, cards: active.cards.filter(x => x.id !== c.id) })}>✕</button></span></div>)}</div>
    </section>
  );

  return (
    <section>
      <h2>Flashcard decks</h2>
      <div className="row">
        <input placeholder="Deck name" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addDeck()} />
        <select value={subject} onChange={e => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s}>{s}</option>)}</select>
        <button onClick={addDeck}>Create</button>
      </div>
      <div className="grid">{decks.map(d => { const due = d.cards.filter(isDue).length; return <div key={d.id} className="card" onClick={() => setActiveId(d.id)}><h3>{d.name}</h3><p>{d.subject} · {d.cards.length} cards</p>{due > 0 && <span className="pill">{due} due</span>}</div>; })}</div>
    </section>
  );
}
