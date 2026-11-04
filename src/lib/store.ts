// Local persistence layer. Swap for a real backend (Supabase/Firebase) later.
export type Card = { id: string; front: string; back: string; due?: number; interval?: number; ease?: number };
export type Deck = { id: string; name: string; subject: string; cards: Card[] };
export type Question = { id: string; prompt: string; choices: string[]; answer: number; explanation?: string };
export type Test = { id: string; title: string; subject: string; level: string; author: string; questions: Question[] };
export type Message = { id: string; user: string; text: string; at: number };
export type Group = { id: string; name: string; members: string[]; messages: Message[]; testIds: string[] };

export const uid = () => Math.random().toString(36).slice(2, 10);

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem('lumino:' + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save<T>(key: string, v: T) { try { localStorage.setItem('lumino:' + key, JSON.stringify(v)); } catch { /* ignore */ } }

export const db = {
  decks: () => load<Deck[]>('decks', []),
  saveDecks: (d: Deck[]) => save('decks', d),
  tests: () => load<Test[]>('tests', []),
  saveTests: (t: Test[]) => save('tests', t),
  groups: () => load<Group[]>('groups', []),
  saveGroups: (g: Group[]) => save('groups', g),
  user: () => load<string>('user', 'Student'),
  setUser: (u: string) => save('user', u),
};

// Spaced repetition (SM-2 lite). grade: 0=again 1=good 2=easy
export function review(c: Card, grade: 0 | 1 | 2): Card {
  const ease = Math.max(1.3, (c.ease ?? 2.5) + [-0.2, 0, 0.15][grade]);
  const interval = grade === 0 ? 0 : Math.max(1, Math.round((c.interval || 0.5) * ease * (grade === 2 ? 1.3 : 1)));
  return { ...c, ease, interval, due: Date.now() + (grade === 0 ? 60e3 : interval * 864e5) };
}
export const isDue = (c: Card) => !c.due || c.due <= Date.now();
