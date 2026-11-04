// Premium+ only: turns photos or a PDF of a worksheet/test into a Lumino practice test.
// Secret: ANTHROPIC_API_KEY. Counts as 5 AI messages against the daily limit.
import Anthropic from 'npm:@anthropic-ai/sdk';
import { zodOutputFormat } from 'npm:@anthropic-ai/sdk/helpers/zod';
import { z } from 'npm:zod@3.23.8';
import { cors, json, admin, getUser, PLANS } from '../_shared/common.ts';

const client = new Anthropic();

const TestSchema = z.object({
  title: z.string(),
  subject: z.string(),
  questions: z.array(z.object({
    prompt: z.string(),
    choices: z.array(z.string()),
    answer: z.number().int(),
    explanation: z.string(),
    answer_confidence: z.enum(['from_key', 'solved', 'unsure']),
  })),
});

const INSTRUCTIONS = `Convert the attached worksheet or test into multiple-choice practice questions.
- Keep each question's meaning. If a question is not multiple choice, write 4 choices yourself with exactly one correct answer and 3 plausible wrong ones.
- Every question must have exactly 4 distinct choices. "answer" is the 0-based index of the correct choice.
- If the document includes an answer key, use it and set answer_confidence to "from_key". Otherwise solve the problem carefully, double-check it, and set "solved". If you can't be sure, set "unsure".
- Write a one or two sentence explanation for each answer.
- Skip anything unreadable. Never invent content that isn't on the page. Return at most 50 questions.`;

type Upload = { media_type: string; data: string };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const db = admin();
  const { data: profile } = await db.from('profiles').select('plan, banned').eq('id', user.id).single();
  if (!profile || profile.banned) return json({ error: 'Account restricted' }, 403);
  if (profile.plan !== 'pro') return json({ error: 'upgrade', message: 'AI uploads come with Premium+.' }, 402);

  const { files } = await req.json().catch(() => ({})) as { files?: Upload[] };
  if (!Array.isArray(files) || !files.length || files.length > 10) return json({ error: 'Send 1–10 images or one PDF.' }, 400);
  const blocks: Anthropic.ContentBlockParam[] = [];
  for (const f of files) {
    if (f.media_type === 'application/pdf') blocks.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: f.data } });
    else if (['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.media_type)) blocks.push({ type: 'image', source: { type: 'base64', media_type: f.media_type as 'image/jpeg', data: f.data } });
    else return json({ error: 'Only images or PDFs.' }, 400);
  }
  blocks.push({ type: 'text', text: INSTRUCTIONS });

  // An import costs 5 messages of the daily allowance.
  for (let i = 0; i < 5; i++) {
    const { data: ok } = await db.rpc('use_ai_message', { uid: user.id, daily_limit: PLANS.pro.aiDaily });
    if (!ok) return json({ error: 'limit', message: "You've used today's AI allowance. Try again tomorrow." }, 429);
  }

  try {
    const response = await client.messages.parse({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      output_config: { effort: 'medium', format: zodOutputFormat(TestSchema) },
      messages: [{ role: 'user', content: blocks }],
    });
    if (response.stop_reason === 'refusal') return json({ error: 'ai', message: "Couldn't process that file." }, 422);
    const out = response.parsed_output;
    if (!out) return json({ error: 'ai', message: "Couldn't read questions from that file. Try a clearer photo." }, 422);
    // Validate before handing back: 4 distinct choices, answer in range.
    const questions = out.questions
      .filter(q => q.choices.length === 4 && new Set(q.choices).size === 4 && q.answer >= 0 && q.answer < 4 && q.prompt.trim())
      .slice(0, 50);
    if (!questions.length) return json({ error: 'ai', message: 'No usable questions found.' }, 422);
    return json({ title: out.title, subject: out.subject, questions });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json({ error: 'busy', message: 'AI is busy. Try again shortly.' }, 503);
    if (e instanceof Anthropic.APIError) return json({ error: 'ai', message: `AI error (${e.status}).` }, 502);
    return json({ error: 'ai', message: 'AI import failed.' }, 502);
  }
});
