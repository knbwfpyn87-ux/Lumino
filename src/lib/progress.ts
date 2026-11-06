// XP, levels, streaks, daily goal and result history. Local for now.
export type Result = { testId: string; title: string; score: number; total: number; at: number; user: string; groupId?: string };
type P = { xp: number; streak: number; lastDay: string; todayXp: number; goal: number; results: Result[]; days: string[]; week: Record<string, number>; freezes?: number };

const KEY = 'lumino:progress';
const today = () => new Date().toISOString().slice(0, 10);
const yesterday = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
const twoDaysAgo = () => new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
/** A streak freeze covers one missed day (earned every 7 days of streak, up to 2). */
const frozen = (p: P) => p.lastDay === twoDaysAgo() && (p.freezes ?? 0) > 0;

export function getProgress(): P {
  let p: P = { xp: 0, streak: 0, lastDay: '', todayXp: 0, goal: 100, results: [], days: [], week: {} };
  try { p = { ...p, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { /* ignore */ }
  if (p.lastDay !== today()) { p.todayXp = 0; if (p.lastDay !== yesterday() && !frozen(p)) p.streak = p.lastDay ? 0 : p.streak; }
  return p;
}
import { syncProgress } from './api';
import { onReward } from './play';
onReward((xp, reason, big) => { award(xp, reason); if (big) window.dispatchEvent(new CustomEvent('lumino:celebrate', { detail: { text: big } })); });
function put(p: P) { syncProgress(p.xp, p.streak, p.lastDay).catch(() => {}); try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } window.dispatchEvent(new Event('lumino:progress')); }

export const levelOf = (xp: number) => { let lvl = 1, need = 100, rest = xp; while (rest >= need) { rest -= need; lvl++; need = Math.round(need * 1.25); } return { lvl, into: rest, need }; };

export function award(amount: number, reason: string) {
  const p = getProgress(); const before = levelOf(p.xp).lvl;
  let used = false, earned = false;
  if (p.lastDay !== today()) {
    if (frozen(p)) { p.freezes = (p.freezes ?? 0) - 1; used = true; }
    p.streak = p.lastDay === yesterday() || used ? p.streak + 1 : 1; p.lastDay = today();
    if (p.streak % 7 === 0 && (p.freezes ?? 0) < 2) { p.freezes = (p.freezes ?? 0) + 1; earned = true; }
  }
  const goalWasMet = p.todayXp >= p.goal;
  const d = today(); if (!p.days.includes(d)) p.days = [...p.days, d].slice(-60);
  p.week = { ...p.week, [d]: (p.week[d] ?? 0) + amount };
  p.xp += amount; p.todayXp += amount; put(p);
  const leveled = levelOf(p.xp).lvl > before;
  window.dispatchEvent(new CustomEvent('lumino:toast', { detail: { text: `+${amount} XP · ${reason}` } }));
  if (used) window.dispatchEvent(new CustomEvent('lumino:toast', { detail: { text: '🧊 A streak freeze saved your streak!' } }));
  if (earned) window.dispatchEvent(new CustomEvent('lumino:toast', { detail: { text: `🧊 ${p.streak}-day streak! You earned a streak freeze.` } }));
  if (leveled) window.dispatchEvent(new CustomEvent('lumino:celebrate', { detail: { text: `Level ${levelOf(p.xp).lvl}!` } }));
  else if (!goalWasMet && p.todayXp >= p.goal) window.dispatchEvent(new CustomEvent('lumino:celebrate', { detail: { text: 'Daily goal crushed! 🔥' } }));
}
export function recordResult(r: Result) { const p = getProgress(); p.results = [r, ...p.results].slice(0, 200); put(p); }
export function setGoal(goal: number) { const p = getProgress(); p.goal = goal; put(p); }

/** The last 7 calendar days, oldest first, with whether you studied and XP earned. */
export function lastWeek(p: P) {
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(Date.now() - (6 - i) * 864e5).toISOString().slice(0, 10);
    return { date: d, label: new Date(d + 'T12:00').toLocaleDateString(undefined, { weekday: 'narrow' }), studied: p.days.includes(d), xp: p.week[d] ?? 0 }; });
}
