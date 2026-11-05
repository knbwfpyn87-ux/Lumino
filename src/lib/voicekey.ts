// Shared by the website, the iPhone app, the tts edge function (copy in supabase/functions/_shared/voicekey.ts) and scripts/voice/eleven.mjs.
// A spoken line's audio file is named by a hash of the exact words + the voice version, so every line is generated once and reused by everyone.

/** Bump when Mr. Lumino's ElevenLabs voice or settings change, so old audio isn't reused. Keep in sync with LUMINO_VOICE_VERSION on the server. */
export const VOICE_VERSION = 'eleven-1';
/** ElevenLabs settings for Mr. Lumino: clean and steady enough for a consistent character, a little style for cuteness. */
export const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 1.0 };
export const VOICE_MODEL = 'eleven_multilingual_v2';
/** Lines longer than this use the device voice (keeps cost down for long AI-tutor replies). */
export const CLOUD_MAX = 600;

/** Clean text for speaking: no emoji, markdown, or code symbols read aloud. */
export function speakable(text: string) {
  return text.replace(/```[\s\S]*?```/g, ' (see the code) ').replace(/[*_`#>]+/g, '').replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\bMr\.\s/g, 'Mister ').replace(/−/g, ' minus ').replace(/÷/g, ' divided by ').replace(/×/g, ' times ').replace(/\s+/g, ' ').trim();
}

// cyrb128-style 128-bit string hash (fast, deterministic, same result in every JS runtime incl. Hermes and Deno).
function hash128(str: string) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067); h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213); h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067); h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213); h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  h1 ^= h2 ^ h3 ^ h4; h2 ^= h1; h3 ^= h1; h4 ^= h1;
  return [h1, h2, h3, h4].map(h => (h >>> 0).toString(16).padStart(8, '0')).join('');
}

/** File name (without extension) for a line that has already been through speakable(). */
export const voiceKey = (spoken: string, version = VOICE_VERSION) => hash128(`${version}|${spoken}`);

/** Word timings saved next to each clip: w = [charIndex, startSeconds][], d = duration in seconds. */
export type WordTimes = { w: [number, number][]; d: number };
