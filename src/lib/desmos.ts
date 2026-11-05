// Which classes get the Desmos graphing calculator, and turning typed lines into Desmos input.
// Shared by the website and the iPhone app.

/** Math classes, plus test-prep and other classes with a math section that allows Desmos. */
const EXTRA = new Set(['sat-math', 'psat', 'act-math', 'ib-math-aa', 'ib-math-ai', 'college-calc1', 'college-calc2', 'college-stats']);
export function courseUsesDesmos(c: { id: string; category: string } | undefined) {
  return !!c && (c.category === 'Math' || EXTRA.has(c.id));
}
/** For practice tests that aren't part of a class (built-in and SAT tests). */
export function testUsesDesmos(t: { title: string; subject: string }) {
  return /math|algebra|geometry|calculus|calc|statistic|stats|trig|precalc|sat math/i.test(`${t.subject} ${t.title}`) && !/reading|writing/i.test(t.title);
}

export const DESMOS_URL = 'https://www.desmos.com/calculator';

/** Converts what a student would type ("y = sqrt(x + 5)", "median([1, 2])") into the LaTeX the Desmos API expects. */
export function toDesmosLatex(line: string): string {
  let s = line.trim();
  // sqrt(...) → \sqrt{...} (handles nested parentheses)
  for (let i = s.indexOf('sqrt('); i >= 0; i = s.indexOf('sqrt(')) {
    let depth = 0, j = i + 4;
    for (; j < s.length; j++) { if (s[j] === '(') depth++; else if (s[j] === ')' && --depth === 0) break; }
    s = `${s.slice(0, i)}\\sqrt{${s.slice(i + 5, j)}}${s.slice(j + 1)}`;
  }
  s = s.replace(/\b(mean|median|stdev|stdevp|total|length|min|max)\(/g, '\\operatorname{$1}(');
  s = s.replace(/\bpi\b/g, '\\pi').replace(/\*/g, '\\cdot ');
  s = s.replace(/\^(\([^()]*\)|\w+)/g, (_, e: string) => `^{${e.startsWith('(') ? e.slice(1, -1) : e}}`);
  return s;
}
