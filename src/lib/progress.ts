// XP, levels, streaks, daily goal and result history. Local for now.
export type Result = { testId: string; title: string; score: number; total: number; at: number; user: string; groupId?: string };
type P = { xp: number; streak: number; lastDay: string; todayXp: number; goal: number; results: Result[] };

const KEY = 'lumino:progress';
const today = () => new Date().toISOString().slice(0, 10);
const yesterday = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);

export function getProgress(): P {
  let p: P = { xp: 0, streak: 0, lastDay: '', todayXp: 0, goal: 100, results: [] };
  try { p = { ...p, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { /* ignore */ }
  if (p.lastDay !== today()) { p.todayXp = 0; if (p.lastDay !== yesterday()) p.streak = p.lastDay ? 0 : p.streak; }
  return p;
}
import { syncProgress } from './api';
function put(p: P) { syncProgress(p.xp, p.streak, p.lastDay).catch(() => {}); try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ } window.dispatchEvent(new Event('lumino:progress')); }

export const levelOf = (xp: number) => { let lvl = 1, need = 100, rest = xp; while (rest >= need) { rest -= need; lvl++; need = Math.round(need * 1.25); } return { lvl, into: rest, need }; };

export function award(amount: number, reason: string) {
  const p = getProgress(); const before = levelOf(p.xp).lvl;
  if (p.lastDay !== today()) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = today(); }
  const goalWasMet = p.todayXp >= p.goal;
  p.xp += amount; p.todayXp += amount; put(p);
  const leveled = levelOf(p.xp).lvl > before;
  window.dispatchEvent(new CustomEvent('lumino:toast', { detail: { text: `+${amount} XP · ${reason}` } }));
  if (leveled) window.dispatchEvent(new CustomEvent('lumino:celebrate', { detail: { text: `Level ${levelOf(p.xp).lvl}!` } }));
  else if (!goalWasMet && p.todayXp >= p.goal) window.dispatchEvent(new CustomEvent('lumino:celebrate', { detail: { text: 'Daily goal crushed! 🔥' } }));
}
export function recordResult(r: Result) { const p = getProgress(); p.results = [r, ...p.results].slice(0, 200); put(p); }
export function setGoal(goal: number) { const p = getProgress(); p.goal = goal; put(p); }
