// Everything Mr. Lumino says that isn't a question explanation or an AI reply.
// Kept in one place so scripts/voice/eleven.mjs can pre-record these lines with the ElevenLabs voice and ship them with the app.
import { ASSISTANTS } from './plans';

export const PRAISE = ["That's right!", 'Nice work!', 'Exactly!', 'You got it!', 'Perfect!'];
export const TUTOR_HELLO = "Hi! I'm Mr. Lumino. Pick a tutor and ask me anything. I'll walk you through it step by step.";
export const MOBILE_TUTOR_HELLO = "Hi, I'm Mr. Lumino! Ask me anything and I'll walk you through it step by step.";
export const assistantHello = (a: { name: string; blurb: string }) => `Hi, I'm Mr. Lumino, your ${a.name}. ${a.blurb}. What are we learning today?`;

/** What he says while you work through a question in "Learn with Mr. Lumino" mode. */
export function teachLine(i: number, q: { answer: number; choices: string[]; explanation?: string }, revealed: boolean, ok: boolean) {
  if (!revealed) return i === 0 ? "Let's do this together! Pick the answer you think is right and I'll explain it." : `Question ${i + 1}. Take your time.`;
  return ok ? `${PRAISE[i % PRAISE.length]} ${q.explanation ?? ''}`.trim()
    : `Not quite. The answer is ${String.fromCharCode(65 + q.answer)}, "${q.choices[q.answer]}". ${q.explanation ?? ''}`.trim();
}

/** His reaction when you finish a test. */
export function verdict(score: number, total: number) {
  const pct = score / total; const miss = total - score;
  return pct === 1 ? { mood: 'cheer' as const, line: `A perfect ${score} out of ${total}! I'm so proud of you!` }
    : pct >= .8 ? { mood: 'love' as const, line: `${score} out of ${total}! Great job. Let's look at the one${miss > 1 ? 's' : ''} you missed so you nail ${miss > 1 ? 'them' : 'it'} next time.` }
    : pct >= .5 ? { mood: 'teach' as const, line: `${score} out of ${total}. Good effort! Scroll down and I'll show you where things went wrong.` }
    : { mood: 'wrong' as const, line: `${score} out of ${total}. That's okay, this is how we learn! Read my notes below, then try a fresh set.` };
}

/** Lines worth pre-recording: greetings, "Question N", praise openers and every test result for common test lengths. */
export function fixedLines(testLengths = [5, 8, 10, 12, 15, 20, 25]) {
  const out = new Set<string>([TUTOR_HELLO, MOBILE_TUTOR_HELLO, teachLine(0, { answer: 0, choices: [''] }, false, false), "You got it!"]);
  ASSISTANTS.forEach(a => out.add(assistantHello(a)));
  for (let i = 1; i < 30; i++) out.add(teachLine(i, { answer: 0, choices: [''] }, false, false));
  PRAISE.forEach(p => out.add(p));
  for (const n of testLengths) for (let s = 0; s <= n; s++) out.add(verdict(s, n).line);
  return [...out];
}
