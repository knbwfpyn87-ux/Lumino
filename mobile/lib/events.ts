type Fn = (detail?: unknown) => void;
const subs = new Map<string, Set<Fn>>();
export const on = (name: string, fn: Fn) => { if (!subs.has(name)) subs.set(name, new Set()); subs.get(name)!.add(fn); return () => { subs.get(name)!.delete(fn); }; };
export const emit = (name: string, detail?: unknown) => subs.get(name)?.forEach(f => f(detail));
