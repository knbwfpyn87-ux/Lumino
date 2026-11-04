import { useState } from 'react';
import { db, uid, type Deck } from '../lib/store';
import { SUBJECTS } from '../lib/catalog';

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>(db.decks());
  const [active, setActive] = useState<Deck | null>(null);
  const [name, setName] = useState(''); const [subject, setSubject] = useState(SUBJECTS[0]);
  const [front, setFront] = useState(''); const [back, setBack] = useState('');
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false);

  const persist = (d: Deck[]) => { setDecks(d); db.saveDecks(d); };
  const addDeck = () => { if (!name.trim()) return; persist([...decks, { id: uid(), name, subject, cards: [] }]); setName(''); };
  const addCard = () => {
    if (!active || !front.trim()) return;
    const upd = { ...active, cards: [...active.cards, { id: uid(), front, back }] };
    persist(decks.map(d => d.id === upd.id ? upd : d)); setActive(upd); setFront(''); setBack('');
  };

  if (active) {
    const c = active.cards[i];
    return (
      <section>
        <button onClick={() => { setActive(null); setI(0); }}>← Decks</button>
        <h2>{active.name} <small className="muted">{active.subject}</small></h2>
        {c ? (
          <>
            <div className="flash" onClick={() => setFlip(!flip)}>{flip ? c.back : c.front}</div>
            <div className="row">
              <button disabled={i === 0} onClick={() => { setI(i - 1); setFlip(false); }}>Prev</button>
              <span>{i + 1} / {active.cards.length}</span>
              <button disabled={i >= active.cards.length - 1} onClick={() => { setI(i + 1); setFlip(false); }}>Next</button>
            </div>
          </>
        ) : <p className="muted">No cards yet.</p>}
        <h3>Add card</h3>
        <div className="row">
          <input placeholder="Front" value={front} onChange={e => setFront(e.target.value)} />
          <input placeholder="Back" value={back} onChange={e => setBack(e.target.value)} />
          <button onClick={addCard}>Add</button>
        </div>
      </section>
    );
  }
  return (
    <section>
      <h2>Flashcard decks</h2>
      <div className="row">
        <input placeholder="Deck name" value={name} onChange={e => setName(e.target.value)} />
        <select value={subject} onChange={e => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s}>{s}</option>)}</select>
        <button onClick={addDeck}>Create</button>
      </div>
      <div className="grid">
        {decks.map(d => <div key={d.id} className="card" onClick={() => setActive(d)}><h3>{d.name}</h3><p>{d.subject} · {d.cards.length} cards</p></div>)}
      </div>
    </section>
  );
}
