import type { Gen } from '../generated';
export type Unit = { title: string; topics: string; levels: Gen[][] };
export type Category = 'Math' | 'Science' | 'Computer Science' | 'English' | 'History & Social Studies' | 'World Languages' | 'Arts' | 'Test Prep' | 'IB' | 'College';
export type Course = { id: string; name: string; subject: string; level: string; emoji: string; category: Category; units: Unit[] };
export const CATEGORIES: Category[] = ['Math', 'Science', 'Computer Science', 'English', 'History & Social Studies', 'World Languages', 'Arts', 'Test Prep', 'IB', 'College'];

/** Level 1 = this unit's skills, Level 2 = + the previous unit, Level 3 = everything so far. */
export function ladder(units: { title: string; topics: string; gens: Gen[] }[]): Unit[] {
  return units.map((u, i) => ({ title: u.title, topics: u.topics, levels: [
    u.gens,
    [...u.gens, ...u.gens, ...(units[i - 1]?.gens ?? u.gens)],
    [...u.gens, ...units.slice(0, i + 1).flatMap(x => x.gens)],
  ] }));
}
type U = [title: string, topics: string, gens: Gen[]];
export const course = (id: string, name: string, level: string, emoji: string, category: Category, units: U[], subject = name): Course =>
  ({ id, name, subject, level, emoji, category, units: ladder(units.map(([title, topics, gens]) => ({ title, topics, gens }))) });
