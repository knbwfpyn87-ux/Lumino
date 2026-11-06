// Fun + effective: game mechanics wrapped around what learning research says works.
//  • Review deck (spaced retrieval practice): every question you miss comes back 1, 3, 7, 16 and 35 days later
//    until you've answered it right at every step (a Leitner system).
//  • Daily Boss: today's due review questions become a boss fight. Right answers hit the boss; a wrong answer
//    costs a heart and shows the explanation (feedback is what makes retrieval practice motivating).
//  • Daily quests: pick 3 of 5 (choice supports motivation). Quests reward real study actions, not just opening the app.
// Shared by the website and the iPhone app. Stored in localStorage; rewards go through onReward().

export type ReviewQ = { id: string; prompt: string; choices: string[]; answer: number; explanation?: string; code?: string };
type Card = { q: ReviewQ; source: string; box: number; due: string };
type Deck = { cards: Record<string, Card>; mastered: number };

const DECK = 'lumino:review', BOSS = 'lumino:boss', QUESTS = 'lumino:quests';
const INTERVALS = [1, 3, 7, 16, 35]; // days until the next review for each box
export const dayStr = (offset = 0) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);
const load = <T,>(k: string, d: T): T => { try { return { ...d, ...JSON.parse(localStorage.getItem(k) ?? '{}') }; } catch { return d; } };
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

type Reward = (xp: number, reason: string, big?: string) => void;
let reward: Reward = () => {};
/** The website and app plug in their XP/toast functions here. */
export function onReward(fn: Reward) { reward = fn; }

// ---------- review deck ----------
export function getDeck(): Deck { return load<Deck>(DECK, { cards: {}, mastered: 0 }); }
const keyOf = (q: ReviewQ) => q.prompt.trim().toLowerCase().slice(0, 160); // same question from any test counts once

/** Call after every answered question. Misses join the deck; right answers on deck cards move them up a box. */
export function recordAnswer(q: ReviewQ, correct: boolean, source: string) {
  const d = getDeck(); const k = keyOf(q); const c = d.cards[k];
  if (!correct) d.cards[k] = { q, source, box: 0, due: dayStr(INTERVALS[0]) };
  else if (c && c.due <= dayStr()) {
    if (c.box + 1 >= INTERVALS.length) { delete d.cards[k]; d.mastered++; }
    else d.cards[k] = { ...c, box: c.box + 1, due: dayStr(INTERVALS[c.box + 1]) };
  }
  save(DECK, d);
  questEvent('answer', correct);
}
export function dueCards(): Card[] {
  const t = dayStr(); return Object.values(getDeck().cards).filter(c => c.due <= t).sort((a, b) => a.box - b.box || a.due.localeCompare(b.due));
}
export function deckStats() { const d = getDeck(); const all = Object.values(d.cards); return { total: all.length, due: dueCards().length, mastered: d.mastered }; }

// ---------- daily boss ----------
const BOSSES = [
  { name: 'Procrastinosaurus', emoji: '🦖' }, { name: 'The Forgetful Kraken', emoji: '🦑' }, { name: 'Cram Goblin', emoji: '👺' },
  { name: 'Distraction Dragon', emoji: '🐉' }, { name: 'Glitchbot 3000', emoji: '🤖' }, { name: 'The Blank Stare', emoji: '👻' }, { name: 'Count Confusion', emoji: '🧛' },
];
export function todaysBoss() {
  const b = BOSSES[new Date().getDay()]; const state = load<{ date: string; defeated: boolean }>(BOSS, { date: '', defeated: false });
  const due = dueCards(); const qs = due.slice(0, 10).map(c => c.q);
  return { ...b, questions: qs, hp: qs.length, hearts: 3, defeated: state.date === dayStr() && state.defeated, ready: qs.length >= 3 };
}
export function bossDefeated(hp: number) {
  save(BOSS, { date: dayStr(), defeated: true });
  reward(20 + hp * 3, 'Boss defeated!', 'Boss defeated! 🏆'); questEvent('boss');
}

// ---------- daily quests ----------
type QuestId = 'lesson' | 'lab' | 'answer15' | 'combo5' | 'boss' | 'correct10';
const QUEST_INFO: Record<QuestId, { title: string; goal: number; icon: string }> = {
  lesson: { title: 'Finish a lesson', goal: 1, icon: '📖' },
  lab: { title: 'Complete a lab or demo', goal: 1, icon: '🧪' },
  answer15: { title: 'Answer 15 questions', goal: 15, icon: '✍️' },
  correct10: { title: 'Get 10 answers right', goal: 10, icon: '✅' },
  combo5: { title: 'Get 5 right in a row', goal: 5, icon: '🔥' },
  boss: { title: "Defeat today's boss", goal: 1, icon: '⚔️' },
};
type QState = { date: string; offered: QuestId[]; picked: QuestId[]; counts: Partial<Record<QuestId, number>>; run: number; done: QuestId[]; chest: boolean };
function quests(): QState {
  const q = load<QState>(QUESTS, { date: '', offered: [], picked: [], counts: {}, run: 0, done: [], chest: false });
  if (q.date === dayStr()) return q;
  const all = Object.keys(QUEST_INFO) as QuestId[]; const seed = Number(dayStr().replace(/-/g, ''));
  const offered = [...all].sort((a, b) => ((seed * (a.length + 7)) % 13) - ((seed * (b.length + 7)) % 13)).slice(0, 5);
  const fresh: QState = { date: dayStr(), offered, picked: [], counts: {}, run: 0, done: [], chest: false }; save(QUESTS, fresh); return fresh;
}
export function getQuests() {
  const q = quests();
  return { offered: q.offered.map(id => ({ id, ...QUEST_INFO[id], progress: Math.min(q.counts[id] ?? 0, QUEST_INFO[id].goal), done: q.done.includes(id), picked: q.picked.includes(id) })),
    picking: q.picked.length < 3, chest: q.chest };
}
/** Toggle a quest while choosing (up to 3). */
export function pickQuest(id: QuestId) {
  const q = quests(); if (q.picked.length >= 3 && !q.picked.includes(id)) return;
  q.picked = q.picked.includes(id) ? q.picked.filter(x => x !== id) : [...q.picked, id]; save(QUESTS, q); check(q);
}
function bump(q: QState, id: QuestId, by = 1, set?: number) { q.counts[id] = set ?? (q.counts[id] ?? 0) + by; }
export function questEvent(kind: 'answer' | 'lesson' | 'lab' | 'boss', correct?: boolean) {
  const q = quests();
  if (kind === 'answer') { bump(q, 'answer15'); if (correct) { bump(q, 'correct10'); q.run++; } else q.run = 0; bump(q, 'combo5', 0, Math.max(q.counts.combo5 ?? 0, q.run)); }
  else bump(q, kind);
  save(QUESTS, q); check(q);
}
function check(q: QState) {
  for (const id of q.picked) if (!q.done.includes(id) && (q.counts[id] ?? 0) >= QUEST_INFO[id].goal) { q.done.push(id); reward(15, `Quest: ${QUEST_INFO[id].title}`); }
  if (!q.chest && q.picked.length === 3 && q.picked.every(id => q.done.includes(id))) { q.chest = true; reward(40, 'Quest chest', 'All quests done! 🎁 +40 XP'); }
  save(QUESTS, q);
}
