// XP, levels, streak and 7-day history (same rules as the website).
import './polyfill';
import { useEffect, useState } from 'react';
import { emit, on } from './events';
import { supabase } from './supabase';
import { onReward } from '@shared/play';
onReward((xp, reason, big) => { award(xp, reason); if (big) emit('celebrate', big); });

export type P = { xp: number; streak: number; lastDay: string; todayXp: number; goal: number; days: string[]; week: Record<string, number>; freezes?: number };
const KEY = 'lumino:progress';
const day = (offset = 0) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
/** A streak freeze covers one missed day (earned every 7 days of streak, up to 2). */
const frozen = (p: P) => p.lastDay === day(2) && (p.freezes ?? 0) > 0;

export function getProgress(): P {
  let p: P = { xp: 0, streak: 0, lastDay: '', todayXp: 0, goal: 100, days: [], week: {} };
  try { p = { ...p, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { /* ignore */ }
  if (p.lastDay !== day()) { p.todayXp = 0; if (p.lastDay && p.lastDay !== day(1) && !frozen(p)) p.streak = 0; }
  return p;
}
function put(p: P) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  emit('progress');
  supabase?.auth.getUser().then(({ data }) => { if (data.user) supabase!.from('profiles').update({ xp: p.xp, streak: p.streak, last_day: p.lastDay || null }).eq('id', data.user.id); });
}
export const levelOf = (xp: number) => { let lvl = 1, need = 100, rest = xp; while (rest >= need) { rest -= need; lvl++; need = Math.round(need * 1.25); } return { lvl, into: rest, need }; };
export function award(amount: number, reason: string) {
  const p = getProgress(); const before = levelOf(p.xp).lvl; const goalMet = p.todayXp >= p.goal;
  let used = false, earned = false;
  if (p.lastDay !== day()) {
    if (frozen(p)) { p.freezes = (p.freezes ?? 0) - 1; used = true; }
    p.streak = p.lastDay === day(1) || used ? p.streak + 1 : 1; p.lastDay = day();
    if (p.streak % 7 === 0 && (p.freezes ?? 0) < 2) { p.freezes = (p.freezes ?? 0) + 1; earned = true; }
  }
  if (!p.days.includes(day())) p.days = [...p.days, day()].slice(-60);
  p.week = { ...p.week, [day()]: (p.week[day()] ?? 0) + amount };
  p.xp += amount; p.todayXp += amount; put(p);
  emit('toast', `+${amount} XP · ${reason}`);
  if (used) emit('toast', '🧊 A streak freeze saved your streak!');
  if (earned) emit('toast', `🧊 ${p.streak}-day streak! You earned a streak freeze.`);
  if (levelOf(p.xp).lvl > before) emit('celebrate', `Level ${levelOf(p.xp).lvl}!`);
  else if (!goalMet && p.todayXp >= p.goal) emit('celebrate', 'Daily goal crushed! 🔥');
}
export function setGoal(goal: number) { const p = getProgress(); p.goal = goal; put(p); }
export function lastWeek(p: P) {
  return Array.from({ length: 7 }, (_, i) => { const d = day(6 - i); return { date: d, label: new Date(d + 'T12:00').toLocaleDateString('en-US', { weekday: 'narrow' }), studied: p.days.includes(d), xp: p.week[d] ?? 0 }; });
}
export function useProgress() { const [p, setP] = useState(getProgress); useEffect(() => on('progress', () => setP(getProgress())), []); return p; }

// My classes (shared key with the website's planner)
export const getMyClasses = (): string[] => { try { return JSON.parse(localStorage.getItem('lumino:myClasses') ?? '[]'); } catch { return []; } };
export const setMyClasses = (ids: string[]) => { try { localStorage.setItem('lumino:myClasses', JSON.stringify(ids)); } catch { /* ignore */ } emit('planner'); };
