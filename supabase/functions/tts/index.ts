// Mr. Lumino's voice (ElevenLabs). Returns a cached clip for a line, generating it the first time.
// Secrets: ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID. Optional: ELEVENLABS_MODEL (default VOICE_MODEL),
// LUMINO_VOICE_VERSION (default matches src/lib/voicekey.ts), VOICE_DAILY_FREE / VOICE_DAILY_PLUS / VOICE_DAILY_PRO (new characters per day).
import { cors, json, admin, getUser } from '../_shared/common.ts';
import { voiceKey, CLOUD_MAX, VOICE_VERSION, VOICE_SETTINGS, VOICE_MODEL, type WordTimes } from '../_shared/voicekey.ts';

const env = (k: string, d = '') => Deno.env.get(k) ?? d;
const LIMITS: Record<string, number> = { free: +env('VOICE_DAILY_FREE', '1500'), plus: +env('VOICE_DAILY_PLUS', '6000'), pro: +env('VOICE_DAILY_PRO', '20000') };

type Alignment = { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
/** Keep only word starts: small to store and all the app needs to reveal words in time. */
function wordTimes(a: Alignment): WordTimes {
  const w: [number, number][] = []; const c = a.characters;
  for (let i = 0; i < c.length; i++) if (c[i] !== ' ' && (i === 0 || c[i - 1] === ' ')) w.push([i, Math.round(a.character_start_times_seconds[i] * 1000) / 1000]);
  return { w, d: Math.round((a.character_end_times_seconds.at(-1) ?? 0) * 1000) / 1000 };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const { text } = await req.json().catch(() => ({})) as { text?: string };
  const spoken = typeof text === 'string' ? text.replace(/\s+/g, ' ').trim() : '';
  if (!spoken || spoken.length > CLOUD_MAX) return json({ error: 'Bad request' }, 400);

  const db = admin(); const version = env('LUMINO_VOICE_VERSION', VOICE_VERSION); const key = voiceKey(spoken, version);
  const pub = (f: string) => db.storage.from('voice').getPublicUrl(f).data.publicUrl;
  const cached = await db.storage.from('voice').download(`${key}.json`);
  if (cached.data) return json({ url: pub(`${key}.mp3`), times: JSON.parse(await cached.data.text()) });

  // New line: signed-in users only, within their daily allowance.
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const { data: profile } = await db.from('profiles').select('plan, banned').eq('id', user.id).single();
  if (!profile || profile.banned) return json({ error: 'Account restricted' }, 403);
  const { data: allowed } = await db.rpc('use_voice_chars', { uid: user.id, n: spoken.length, daily_limit: LIMITS[profile.plan] ?? LIMITS.free });
  if (!allowed) return json({ error: 'limit' }, 429);

  const voice = env('ELEVENLABS_VOICE_ID'); const apiKey = env('ELEVENLABS_API_KEY');
  if (!voice || !apiKey) return json({ error: 'Voice not set up' }, 503);
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: spoken, model_id: env('ELEVENLABS_MODEL', VOICE_MODEL), voice_settings: VOICE_SETTINGS }),
  });
  if (!r.ok) { console.error('elevenlabs', r.status, await r.text()); await db.rpc('use_voice_chars', { uid: user.id, n: -spoken.length, daily_limit: 1e9 }); return json({ error: 'Voice unavailable' }, 502); }
  const out = await r.json() as { audio_base64: string; alignment: Alignment };
  const times = wordTimes(out.alignment);
  const mp3 = Uint8Array.from(atob(out.audio_base64), c => c.charCodeAt(0));
  // Upload audio first, then the timing file: the timing file is what marks a line as cached.
  await db.storage.from('voice').upload(`${key}.mp3`, mp3, { contentType: 'audio/mpeg', cacheControl: '31536000', upsert: true });
  await db.storage.from('voice').upload(`${key}.json`, JSON.stringify(times), { contentType: 'application/json', cacheControl: '31536000', upsert: true });
  return json({ url: pub(`${key}.mp3`), times });
});
