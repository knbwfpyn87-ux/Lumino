// "My Classes" and "Upcoming" (assignments/tests you add yourself). Saved on this device.
const read = <T,>(k: string, f: T): T => { try { return JSON.parse(localStorage.getItem('lumino:' + k) ?? '') as T; } catch { return f; } };
const write = (k: string, v: unknown) => { try { localStorage.setItem('lumino:' + k, JSON.stringify(v)); } catch { /* ignore */ } window.dispatchEvent(new Event('lumino:planner')); };

export const getMyClasses = (): string[] => read('myClasses', [] as string[]);
export const setMyClasses = (ids: string[]) => write('myClasses', ids);

export type Upcoming = { id: string; title: string; classId?: string; due: string; done: boolean };
export const getUpcoming = (): Upcoming[] => read('upcoming', [] as Upcoming[]);
export const saveUpcoming = (u: Upcoming[]) => write('upcoming', u);
