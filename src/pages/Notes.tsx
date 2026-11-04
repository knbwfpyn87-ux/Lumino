import { useState } from 'react';
import { uid } from '../lib/store';
import { COURSES } from '../lib/courses';
import { award } from '../lib/progress';

type Note = { id: string; title: string; classId: string; body: string; updated: number };
const load = (): Note[] => { try { return JSON.parse(localStorage.getItem('lumino:notes') ?? '[]'); } catch { return []; } };
const save = (n: Note[]) => { try { localStorage.setItem('lumino:notes', JSON.stringify(n)); } catch { /* ignore */ } };

// Simple class notes, saved on this device.
export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(load()); const [id, setId] = useState<string | null>(notes[0]?.id ?? null); const [filter, setFilter] = useState('');
  const cur = notes.find(n => n.id === id);
  const upd = (patch: Partial<Note>) => { const n = notes.map(x => x.id === id ? { ...x, ...patch, updated: Date.now() } : x); setNotes(n); save(n); };
  const add = () => { const n: Note = { id: uid(), title: 'Untitled note', classId: '', body: '', updated: Date.now() }; const all = [n, ...notes]; setNotes(all); save(all); setId(n.id); if (notes.length === 0) award(5, 'first note'); };
  const shown = notes.filter(n => !filter || n.classId === filter).sort((a, b) => b.updated - a.updated);
  return (
    <section>
      <h1 className="greet">Notes</h1>
      <div className="notes">
        <div className="panel notelist">
          <div className="row"><button onClick={add}>+ New note</button>
            <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by class"><option value="">All classes</option>{COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          {shown.map(n => <button key={n.id} className={'noteitem' + (n.id === id ? ' on' : '')} onClick={() => setId(n.id)}><b>{n.title || 'Untitled'}</b><small className="muted">{COURSES.find(c => c.id === n.classId)?.name ?? 'No class'} · {new Date(n.updated).toLocaleDateString()}</small></button>)}
          {!shown.length && <p className="muted small">No notes yet.</p>}
        </div>
        <div className="panel noteedit">
          {cur ? <>
            <div className="row"><input className="notetitle" value={cur.title} onChange={e => upd({ title: e.target.value })} aria-label="Note title" />
              <select value={cur.classId} onChange={e => upd({ classId: e.target.value })} aria-label="Class"><option value="">No class</option>{COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
              <button className="ghost" onClick={() => { if (!confirm('Delete this note?')) return; const n = notes.filter(x => x.id !== id); setNotes(n); save(n); setId(n[0]?.id ?? null); }}>Delete</button></div>
            <textarea className="notebody" value={cur.body} onChange={e => upd({ body: e.target.value })} placeholder="Start typing…" />
            <p className="muted small">Saved on this device automatically.</p>
          </> : <p className="muted">Create a note to get started.</p>}
        </div>
      </div>
    </section>
  );
}
