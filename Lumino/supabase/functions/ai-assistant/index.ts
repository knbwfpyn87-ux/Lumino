// AI study assistants (Plus: 1 assistant, 30 msgs/day; Pro: 4 assistants, 150 msgs/day).
// Secret: ANTHROPIC_API_KEY
import Anthropic from 'npm:@anthropic-ai/sdk';
import { cors, json, admin, getUser, PLANS, type PaidPlan } from '../_shared/common.ts';

const client = new Anthropic();

const BASE = `You are a study assistant inside Lumino, an app for high school and college students.
Teach, don't just answer: guide the student step by step, ask what they've tried, and check understanding.
If the question looks like a graded assignment or a live test, help them learn the method with a similar example instead of handing over the final answer.
Keep replies short and friendly, use simple formatting, and write math plainly (e.g. x^2, sqrt(x)).
Never ask for personal information. If a student mentions self-harm, abuse, or being in danger, respond with care and tell them to reach a trusted adult, call or text 988 (US Suicide & Crisis Lifeline), or call 911 in an emergency.`;

const ASSISTANTS: Record<string, string> = {
  'study-buddy': `${BASE}\nYou are Study Buddy: a general tutor for any high school or college subject.`,
  'sat-coach': `${BASE}\nYou are SAT Coach: you explain SAT Math and Reading & Writing strategies, time management, and walk through SAT-style practice questions. Write original practice questions; never reproduce official College Board questions.`,
  'essay-coach': `${BASE}\nYou are Essay Coach: you help students brainstorm, outline, and revise essays (including college application essays). Give feedback and suggestions; never write the essay for them.`,
  'science-lab': `${BASE}\nYou are Science Lab: you explain biology, chemistry, and physics concepts with intuitive examples, and help with lab reports and AP science free-response practice.`,
};

type Turn = { role: 'user' | 'assistant'; content: string };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const db = admin();
  const { data: profile } = await db.from('profiles').select('plan, banned').eq('id', user.id).single();
  if (!profile || profile.banned) return json({ error: 'Account restricted' }, 403);
  if (profile.plan === 'free') return json({ error: 'upgrade', message: 'AI assistants come with Plus or Pro.' }, 402);
  const plan = PLANS[profile.plan as PaidPlan];

  const { assistant, messages } = await req.json().catch(() => ({})) as { assistant?: string; messages?: Turn[] };
  if (!assistant || !(assistant in ASSISTANTS)) return json({ error: 'Unknown assistant' }, 400);
  if (!(plan.assistants as readonly string[]).includes(assistant)) return json({ error: 'upgrade', message: 'This assistant comes with Pro.' }, 402);
  if (!Array.isArray(messages) || !messages.length || messages.at(-1)?.role !== 'user') return json({ error: 'Bad request' }, 400);

  // Keep the last 20 turns, cap each to 4,000 chars, and make sure it starts with a user turn.
  let history = messages.slice(-20).filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
  while (history.length && history[0].role !== 'user') history = history.slice(1);
  if (!history.length) return json({ error: 'Bad request' }, 400);

  const { data: allowed } = await db.rpc('use_ai_message', { uid: user.id, daily_limit: plan.aiDaily });
  if (!allowed) return json({ error: 'limit', message: `You've used today's ${plan.aiDaily} AI messages. They reset tomorrow.` }, 429);

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 2000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low' },
      cache_control: { type: 'ephemeral' },
      system: ASSISTANTS[assistant],
      messages: history,
    } as Anthropic.Beta.MessageCreateParamsNonStreaming);

    if (response.stop_reason === 'refusal') return json({ reply: "I can't help with that one. Try asking about a school topic!" });
    const reply = response.content.filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text').map(b => b.text).join('\n').trim();
    return json({ reply: reply || "Sorry, I didn't catch that. Can you rephrase?" });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json({ error: 'busy', message: 'The assistant is busy. Try again in a moment.' }, 503);
    if (e instanceof Anthropic.APIError) return json({ error: 'ai', message: `Assistant error (${e.status}).` }, 502);
    return json({ error: 'ai', message: 'Assistant unavailable.' }, 502);
  }
});
