// "My Classes" and "Upcoming" (assignments/tests you add yourself). Saved on this device.
const read = <T,>(k: string, f: T): T => { try { return JSON.parse(localStorage.getItem('lumino:' + k) ?? '') as T; } catch { return f; } };
const write = (k: string, v: unknown) => { try { localStorage.setItem('lumino:' + k, JSON.stringify(v)); } catch { /* ignore */ } window.dispatchEvent(new Event('lumino:planner')); };

export const getMyClasses = (): string[] => read('myClasses', [] as string[]);
export const setMyClasses = (ids: string[]) => write('myClasses', ids);

export type Upcoming = { id: string; title: string; classId?: string; due: string; done: boolean; source?: 'classroom'; course?: string; link?: string | null };
export const getUpcoming = (): Upcoming[] => read('upcoming', [] as Upcoming[]);
export const saveUpcoming = (u: Upcoming[]) => write('upcoming', u);

/** Merges Classroom assignments into the planner: adds new ones, updates titles and dates, marks turned-in work done,
 *  and drops future Classroom items that were removed. Your own assignments are never touched. */
export type RemoteAssignment = { id: string; title: string; course: string; due: string; link: string | null; done: boolean };
export function mergeAssignments(list: Upcoming[], remote: RemoteAssignment[], today: string): Upcoming[] {
  const byId = new Map(remote.map(r => [r.id, r]));
  const kept = list.filter(u => u.source !== 'classroom' || byId.has(u.id) || u.done || u.due < today);
  const out = kept.map(u => { const r = byId.get(u.id); return r ? { ...u, title: r.title, due: r.due, course: r.course, link: r.link, done: r.done || u.done } : u; });
  for (const r of remote) if (!out.some(u => u.id === r.id)) out.push({ id: r.id, title: r.title, due: r.due, done: r.done, source: 'classroom', course: r.course, link: r.link });
  return out;
}
