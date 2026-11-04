// Local persistence layer. Swap for a real backend (Supabase/Firebase) later.
export type Card = { id: string; front: string; back: string };
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
