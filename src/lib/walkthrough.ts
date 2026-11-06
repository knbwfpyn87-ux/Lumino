// Step-by-step help for any question: what it asks, a strategy, the solution one step at a time,
// two wrong choices ruled out, and finally the answer. Built from the question and its explanation,
// so it works offline for every question. Shared by the website and the iPhone app.

export type HelpQ = { id: string; prompt: string; choices: string[]; answer: number; explanation?: string };
export type HelpStep = { title: string; text: string; final?: boolean };

const letter = (i: number) => String.fromCharCode(65 + i);
const hash = (s: string) => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };

function kind(q: HelpQ): 'vocab' | 'calc' | 'concept' {
  if (/which term matches|what does .+ mean|is called|is defined as|definition/i.test(q.prompt)) return 'vocab';
  const numericChoices = q.choices.filter(c => /^[\s−\-+$]*[\d.,/]+/.test(c)).length >= 3;
  if (numericChoices || /calculate|solve|find|what is the value|how many|how much|evaluate|convert/i.test(q.prompt)) return 'calc';
  return 'concept';
}

/** The part of the prompt that is the actual question (the last sentence, usually). */
function theAsk(prompt: string) {
  const parts = prompt.split(/(?<=[.?!])\s+(?=[A-Z])/); return parts[parts.length - 1].trim();
}

/** Splits an explanation into small steps: sentences, then arrows (→) or chains of "=". */
function splitSteps(expl: string): string[] {
  const sentences = expl.split(/(?<=[.;!?])\s+(?=[A-Z(√∛½∫\d−-])/).map(s => s.trim()).filter(Boolean);
  const out: string[] = [];
  for (const s of sentences) {
    if (s.includes('→')) { const p = s.split('→').map(x => x.trim()).filter(Boolean); p.forEach((x, i) => out.push(i ? `→ ${x}` : x)); continue; }
    const eq = s.split(/\s=\s/);
    // only a pure formula chain like "KE = ½mv² = ½ × 11 × 5² = 137.5 J" (no words in between)
    if (eq.length >= 3 && !/[,;]|\bso\b|\bthen\b/i.test(s) && eq.every(x => x.length <= 30)) { out.push(`${eq[0]} = ${eq[1]}`); for (const x of eq.slice(2)) out.push(`= ${x}`); continue; }
    out.push(s);
  }
  return out;
}

export function walkthrough(q: HelpQ, opts: { desmos?: boolean } = {}): HelpStep[] {
  const k = kind(q); const steps: HelpStep[] = [];
  const numbers = [...new Set(q.prompt.match(/−?\d+(?:[.,]\d+)?(?:\/\d+)?/g) ?? [])].slice(0, 6);
  steps.push({ title: 'The question', text: `Focus on the question itself: "${theAsk(q.prompt)}"${k === 'calc' && numbers.length ? ` The numbers you're given: ${numbers.join(', ')}.` : ''}` });

  const strategy = k === 'vocab'
    ? 'This is a vocabulary question. Think of the definition in your own words first, then find the choice that matches it exactly. Watch for terms that sound similar.'
    : k === 'calc'
      ? `This needs a calculation. Pick the rule or formula that connects what you're given to what you want, then substitute the numbers carefully.${opts.desmos && /[=<>]/.test(q.prompt) && /\bx\b/.test(q.prompt) ? ' Tip: you can graph each side in Desmos and find where they meet.' : ''}`
      : 'This is a concept question. Ask yourself which big idea from the lesson it\'s testing, and what that idea predicts here.';
  steps.push({ title: 'Plan', text: strategy });

  const parts = q.explanation ? splitSteps(q.explanation) : [];
  // show all but the last part as steps; the last part usually states the answer, so it comes at the end
  parts.slice(0, Math.max(0, parts.length - 1)).forEach((p, i) => steps.push({ title: `Step ${i + 1}`, text: p }));

  const wrong = q.choices.map((_, i) => i).filter(i => i !== q.answer);
  if (wrong.length >= 2) {
    const h = hash(q.id + q.prompt); const a = wrong[h % wrong.length]; const b = wrong.filter(i => i !== a)[(h >>> 3) % (wrong.length - 1)];
    const [x, y] = [a, b].sort((m, n) => m - n);
    steps.push({ title: 'Narrow it down', text: `It's not ${letter(x)} (${q.choices[x]}) or ${letter(y)} (${q.choices[y]}). Which of the remaining choices fits your work?` });
  }
  steps.push({ title: 'Answer', text: `${letter(q.answer)}. ${q.choices[q.answer]}${q.explanation ? ` — ${q.explanation}` : ''}`, final: true });
  return steps;
}
