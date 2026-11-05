// Mr. Lumino's ElevenLabs voice: find / design a voice, audition it, and pre-record his fixed lines.
// Needs ELEVENLABS_API_KEY in the environment.  Run with:  npx tsx scripts/voice/eleven.ts <command>
//
//   find                     Search the Voice Library for cute character voices; saves their previews to videos/voice-samples/eleven/library/
//   design                   Voice Design: invents brand-new "Mr. Lumino" voices from a description (3 previews per style)
//   save <generated_id>      Keep a designed voice in your ElevenLabs account as "Mr. Lumino"; prints its voice ID
//   add <owner_id> <voice_id> Add a Voice Library voice to your account; prints its voice ID
//   audition <voice_id>...   Speak the same sample lines with each voice (our clean settings)
//   say <voice_id> "<text>"  Speak one line to videos/voice-samples/eleven/say.mp3
//   prebake                  Pre-record every fixed line (src/lib/lines.ts) with ELEVENLABS_VOICE_ID into public/voice/ (ships with the site).
//                            If SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set, also uploads them to the "voice" bucket for the iPhone app.
import { mkdirSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { speakable, voiceKey, VOICE_SETTINGS, VOICE_MODEL, VOICE_VERSION, type WordTimes, type VoiceBundle } from '../../src/lib/voicekey';
import { fixedLines } from '../../src/lib/lines';

const API = 'https://api.elevenlabs.io';
const KEY = process.env.ELEVENLABS_API_KEY;
const OUT = 'videos/voice-samples/eleven';
if (!KEY) { console.error('Set ELEVENLABS_API_KEY first.'); process.exit(1); }

async function call(path: string, init: RequestInit = {}) {
  const r = await fetch(API + path, { ...init, headers: { 'xi-api-key': KEY!, 'Content-Type': 'application/json', ...(init.headers ?? {}) } });
  if (!r.ok) throw new Error(`${init.method ?? 'GET'} ${path} -> ${r.status} ${await r.text()}`);
  return r;
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

/** What Mr. Lumino sounds like: cute and friendly, but clean and easy to understand. */
const DESIGNS = {
  bright: 'A cute, cheerful voice for a friendly cartoon lightbulb tutor named Mr. Lumino. Youthful adult, bright and bubbly, soft and warm, '
    + 'slightly high-pitched but never squeaky, smiling while talking, gentle and encouraging. Clear American accent, perfect diction. Clean studio-quality recording with no background noise.',
  boyish: 'A cute, playful, boyish voice for a friendly animated mascot named Mr. Lumino. Youthful adult man with a light, sweet, upbeat tone, '
    + 'energetic but calm, warm and kind like a favorite teacher in a kids animated show. Clear American accent, crisp pronunciation. Clean studio-quality recording, no background noise.',
};
const SAMPLE = "Hi! I'm Mister Lumino. Let's do this together! Pick the answer you think is right, and I'll explain it. "
  + "That's right! Nice work. Photosynthesis turns sunlight, water and carbon dioxide into sugar and oxygen. A perfect ten out of ten! I'm so proud of you!";
const AUDITION = [
  "Hi! I'm Mister Lumino. Pick the answer you think is right, and I'll explain it.",
  "Not quite. The answer is B, mitochondria. They make the energy your cells run on.",
  "A perfect ten out of ten! I'm so proud of you!",
];

async function tts(voice: string, text: string, model = process.env.ELEVENLABS_MODEL ?? VOICE_MODEL) {
  const r = await call(`/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, { method: 'POST', body: JSON.stringify({ text, model_id: model, voice_settings: VOICE_SETTINGS }) });
  const j = await r.json() as { audio_base64: string; alignment: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] } };
  const a = j.alignment; const w: [number, number][] = [];
  for (let i = 0; i < a.characters.length; i++) if (a.characters[i] !== ' ' && (i === 0 || a.characters[i - 1] === ' ')) w.push([i, Math.round(a.character_start_times_seconds[i] * 1000) / 1000]);
  return { mp3: Buffer.from(j.audio_base64, 'base64'), times: { w, d: Math.round((a.character_end_times_seconds.at(-1) ?? 0) * 1000) / 1000 } as WordTimes };
}

const [cmd, ...args] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });

if (cmd === 'find') {
  const dir = join(OUT, 'library'); mkdirSync(dir, { recursive: true });
  const seen = new Set<string>();
  for (const q of ['cute', 'cute cartoon', 'animated character', 'bubbly', 'sweet cheerful', 'playful mascot']) {
    const r = await call(`/v1/shared-voices?page_size=15&language=en&sort=trending&search=${encodeURIComponent(q)}`);
    const { voices } = await r.json() as { voices: { public_owner_id: string; voice_id: string; name: string; description?: string; preview_url?: string; gender?: string; age?: string; accent?: string; use_case?: string; cloned_by_count?: number }[] };
    for (const v of voices) {
      if (seen.has(v.voice_id)) continue; seen.add(v.voice_id);
      console.log(`${v.name} | ${v.gender}/${v.age}/${v.accent} | ${v.use_case} | used ${v.cloned_by_count ?? 0}x\n   add: ${v.public_owner_id} ${v.voice_id}\n   ${(v.description ?? '').slice(0, 140)}`);
      if (v.preview_url) { const a = await fetch(v.preview_url); if (a.ok) writeFileSync(join(dir, `${slug(v.name)}-${v.voice_id.slice(0, 6)}.mp3`), Buffer.from(await a.arrayBuffer())); }
    }
  }
} else if (cmd === 'design') {
  const dir = join(OUT, 'designed'); mkdirSync(dir, { recursive: true });
  for (const [style, voice_description] of Object.entries(DESIGNS)) {
    const body = { voice_description, text: SAMPLE, model_id: 'eleven_multilingual_ttv_v2', guidance_scale: 5, loudness: 0.5 };
    let r: Response;
    try { r = await call('/v1/text-to-voice/design', { method: 'POST', body: JSON.stringify(body) }); }
    catch { r = await call('/v1/text-to-voice/create-previews', { method: 'POST', body: JSON.stringify({ voice_description, text: SAMPLE }) }); }
    const { previews } = await r.json() as { previews: { audio_base_64: string; generated_voice_id: string }[] };
    previews.forEach((p, i) => { const f = join(dir, `${style}-${i + 1}.mp3`); writeFileSync(f, Buffer.from(p.audio_base_64, 'base64')); console.log(`${f}  generated_id=${p.generated_voice_id}`); });
  }
} else if (cmd === 'save') {
  const r = await call('/v1/text-to-voice', { method: 'POST', body: JSON.stringify({ voice_name: 'Mr. Lumino', voice_description: DESIGNS.bright, generated_voice_id: args[0] }) });
  console.log('voice_id =', (await r.json() as { voice_id: string }).voice_id);
} else if (cmd === 'add') {
  const r = await call(`/v1/voices/add/${args[0]}/${args[1]}`, { method: 'POST', body: JSON.stringify({ new_name: 'Mr. Lumino' }) });
  console.log('voice_id =', (await r.json() as { voice_id: string }).voice_id);
} else if (cmd === 'audition') {
  for (const v of args) {
    const parts = await Promise.all(AUDITION.map(t => tts(v, t)));
    const f = join(OUT, `audition-${v.slice(0, 8)}.mp3`); writeFileSync(f, Buffer.concat(parts.map(p => p.mp3))); console.log(f);
  }
} else if (cmd === 'say') {
  const { mp3 } = await tts(args[0], speakable(args[1])); writeFileSync(join(OUT, 'say.mp3'), mp3); console.log(join(OUT, 'say.mp3'));
} else if (cmd === 'prebake') {
  const voice = process.env.ELEVENLABS_VOICE_ID; if (!voice) { console.error('Set ELEVENLABS_VOICE_ID (Mr. Lumino\'s voice ID) first.'); process.exit(1); }
  const dir = 'public/voice'; mkdirSync(dir, { recursive: true });
  const mf = join(dir, 'manifest.json'); let bundle: VoiceBundle = existsSync(mf) ? JSON.parse(readFileSync(mf, 'utf8')) : { version: VOICE_VERSION, lines: {} };
  // Replacing the temporary voice: start a fresh set (old temp files are removed below).
  if (bundle.version !== VOICE_VERSION) { for (const k of Object.keys(bundle.lines)) rmSync(join(dir, `${k}.mp3`), { force: true }); bundle = { version: VOICE_VERSION, voice: 'elevenlabs', lines: {} }; }
  const manifest = bundle.lines;
  const sb = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY } : null;
  const upload = (name: string, data: Buffer | string, type: string) => sb && fetch(`${sb.url}/storage/v1/object/voice/${name}`, { method: 'POST', headers: { Authorization: `Bearer ${sb.key}`, 'Content-Type': type, 'x-upsert': 'true', 'cache-control': 'max-age=31536000' }, body: data });
  const lines = fixedLines(); let made = 0, chars = 0;
  for (const line of lines) {
    const s = speakable(line); const k = voiceKey(s); if (manifest[k]) continue;
    const { mp3, times } = await tts(voice, s);
    writeFileSync(join(dir, `${k}.mp3`), mp3); manifest[k] = times; made++; chars += s.length;
    await upload(`${k}.mp3`, mp3, 'audio/mpeg'); await upload(`${k}.json`, JSON.stringify(times), 'application/json');
    writeFileSync(mf, JSON.stringify(bundle)); process.stdout.write(`\r${made} new lines (${chars} characters)`);
  }
  console.log(`\nDone: ${Object.keys(manifest).length} of ${lines.length} lines recorded in ${dir}.`);
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 13).join('\n'));
}
