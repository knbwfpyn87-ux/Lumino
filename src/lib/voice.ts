// Mr. Lumino's voice.
// 1) ElevenLabs clips (pre-made lines bundled with the site, or cached in Supabase storage / made by the tts function).
// 2) Fallback: the device's built-in speech (free, offline), so he always talks even without the cloud voice.
import { supabase } from './supabase';
import { speakable, voiceKey, CLOUD_MAX, type WordTimes } from './voicekey';
export { speakable };

const KEY = 'lumino:voice';
type Listener = () => void; const subs = new Set<Listener>();
const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
const hasAudio = typeof window !== 'undefined' && typeof Audio !== 'undefined';
export const voiceSupported = hasSpeech || hasAudio;
export function voiceOn(): boolean { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } }
export function setVoiceOn(on: boolean) { try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch { /* ignore */ } if (!on) stopSpeaking(); subs.forEach(f => f()); }
export function onVoiceChange(f: Listener) { subs.add(f); return () => { subs.delete(f); }; }

// ---------- ElevenLabs clips ----------
/** Turned on with the VITE_CLOUD_VOICE=on build variable once the tts function and ElevenLabs key are set up. */
const CLOUD = import.meta.env.VITE_CLOUD_VOICE === 'on' && !!supabase;
const STORE = `${import.meta.env.VITE_SUPABASE_URL ?? ''}/storage/v1/object/public/voice/`;
type Clip = { url: string; times: WordTimes };
const clips = new Map<string, Promise<Clip | null>>();
let bundled: Promise<Record<string, WordTimes>> | null = null;
/** Pre-made lines that ship with the site (public/voice, written by scripts/voice/eleven.mjs prebake). */
const bundledLines = (): Promise<Record<string, WordTimes>> => (bundled ??= fetch('./voice/manifest.json').then(r => (r.ok ? r.json() : {})).catch(() => ({})));

async function lookup(spoken: string, generate = true): Promise<Clip | null> {
  const key = voiceKey(spoken);
  const pre = (await bundledLines())[key]; if (pre) return { url: `./voice/${key}.mp3`, times: pre };
  if (!CLOUD) return null;
  const hit = await fetch(`${STORE}${key}.json`).then(r => (r.ok ? r.json() as Promise<WordTimes> : null)).catch(() => null);
  if (hit) return { url: `${STORE}${key}.mp3`, times: hit };
  if (!generate) return null;
  const { data } = await supabase!.functions.invoke('tts', { body: { text: spoken } }).catch(() => ({ data: null }));
  return data?.url ? { url: data.url, times: data.times } : null;
}
function findClip(spoken: string) {
  let p = clips.get(spoken);
  if (!p) { p = lookup(spoken); clips.set(spoken, p); p.then(c => { if (!c) clips.delete(spoken); }); }
  return p;
}
/** Warm up a line that's probably coming next (e.g. the explanation for the current question) if it's already recorded. Never generates new audio. */
const warmed = new Set<string>();
export function prefetchLine(text: string) {
  const s = speakable(text); if (!hasAudio || !voiceOn() || !s || s.length > CLOUD_MAX || warmed.has(s)) return; warmed.add(s);
  lookup(s, false).then(c => { if (c) { clips.set(s, Promise.resolve(c)); fetch(c.url).catch(() => {}); } });
}

// One shared <audio>: iPhones only let a page play sound on an element first started by a tap.
let player: HTMLAudioElement | null = null;
function audio() {
  if (!player) { player = new Audio(); player.preload = 'auto'; (player as HTMLAudioElement & { playsInline?: boolean }).playsInline = true; }
  return player;
}
function silentWav() { // 0.05 s of silence, built in code
  const n = 400, b = new DataView(new ArrayBuffer(44 + n)); const s = (o: number, t: string) => [...t].forEach((c, i) => b.setUint8(o + i, c.charCodeAt(0)));
  s(0, 'RIFF'); b.setUint32(4, 36 + n, true); s(8, 'WAVEfmt '); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 1, true);
  b.setUint32(24, 8000, true); b.setUint32(28, 8000, true); b.setUint16(32, 1, true); b.setUint16(34, 8, true); s(36, 'data'); b.setUint32(40, n, true);
  for (let i = 0; i < n; i++) b.setUint8(44 + i, 128);
  return URL.createObjectURL(new Blob([b.buffer], { type: 'audio/wav' }));
}
if (hasAudio) {
  const unlock = () => { const a = audio(); if (!a.src) { a.src = silentWav(); a.play().catch(() => {}); } window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); };
  window.addEventListener('pointerdown', unlock); window.addEventListener('keydown', unlock);
}

type Hooks = { onWord?: (i: number) => void; onEnd?: () => void; onStart?: () => void };
let raf = 0;
function playClip(id: number, clip: Clip, h: Hooks) {
  const a = audio(); a.src = clip.url; a.currentTime = 0;
  let next = 0; let started = false;
  const tick = () => {
    if (id !== current) return;
    const t = a.currentTime; while (next < clip.times.w.length && clip.times.w[next][1] <= t + 0.03) h.onWord?.(clip.times.w[next++][0]);
    raf = requestAnimationFrame(tick);
  };
  a.onplaying = () => { if (id !== current || started) return; started = true; h.onStart?.(); tick(); };
  a.onended = () => { if (id === current) { cancelAnimationFrame(raf); h.onEnd?.(); } };
  return a.play();
}

// ---------- Device voice (fallback) ----------
// Most natural-sounding voices first (neural / premium). Speaking near natural pitch keeps it warm.
const PREFERRED = [/Natural/i, /\(Premium\)/i, /\(Enhanced\)/i, /Google US English/i, /Samantha/i, /Ava/i, /Allison/i, /Jenny/i, /Aria/i, /Karen/i, /Google UK English Female/i];
let chosen: SpeechSynthesisVoice | null = null;
function pickVoice(): SpeechSynthesisVoice | null {
  if (!hasSpeech) return null; if (chosen) return chosen;
  const all = speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang)); if (!all.length) return null;
  for (const re of PREFERRED) { const v = all.find(x => re.test(x.name)); if (v) return (chosen = v); }
  return (chosen = all.find(v => /en-US/i.test(v.lang)) ?? all[0]);
}
if (hasSpeech) speechSynthesis.addEventListener?.('voiceschanged', () => { chosen = null; });
function device(id: number, spoken: string, h: Hooks) {
  if (!hasSpeech) return;
  const u = new SpeechSynthesisUtterance(spoken); const v = pickVoice(); if (v) u.voice = v;
  u.lang = v?.lang ?? 'en-US'; u.rate = 1.0; u.pitch = 1.1;
  u.onstart = () => id === current && h.onStart?.();
  u.onboundary = e => { if (id === current && e.name !== 'sentence') h.onWord?.(e.charIndex); };
  u.onend = u.onerror = () => { if (id === current) h.onEnd?.(); };
  speechSynthesis.speak(u);
}

let current = 0;
/**
 * Speaks `text`. onWord(charIndex into speakable(text)) fires as each word starts, onEnd when finished.
 * Returns false if speech isn't available or is muted (callers fall back to silent typing).
 */
export function speak(text: string, h: Hooks = {}): boolean {
  const spoken = speakable(text);
  if (!voiceSupported || !voiceOn() || !spoken) return false;
  stopSpeaking(); const id = current;
  if (hasAudio && spoken.length <= CLOUD_MAX) {
    findClip(spoken).then(clip => {
      if (id !== current) return;
      if (!clip) return device(id, spoken, h);
      playClip(id, clip, h).catch(() => { if (id === current) device(id, spoken, h); });
    });
    return true;
  }
  if (!hasSpeech) return false;
  device(id, spoken, h); return true;
}
export function stopSpeaking() {
  current++; cancelAnimationFrame(raf);
  if (player) { player.onplaying = player.onended = null; player.pause(); }
  if (hasSpeech) speechSynthesis.cancel();
}
