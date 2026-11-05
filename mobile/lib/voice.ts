// Mr. Lumino's voice on iPhone.
// 1) Pre-recorded lines published with the website, or ElevenLabs clips cached in Supabase storage (made once by the tts edge function, then reused by everyone).
// 2) Fallback: Apple's built-in speech (free, offline), so he always talks.
import * as Speech from 'expo-speech';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { speakable, voiceKey, CLOUD_MAX, VOICE_VERSION, type WordTimes, type VoiceBundle } from '@shared/voicekey';
import { supabase } from './supabase';
import { emit, on } from './events';
export { speakable };

const KEY = 'lumino:voice';
export const voiceOn = () => { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } };
export const setVoiceOn = (v: boolean) => { try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch { /* ignore */ } if (!v) stopSpeaking(); emit('voice'); };
export const onVoiceChange = (f: () => void) => on('voice', f);

// ---------- ElevenLabs clips ----------
/** Set EXPO_PUBLIC_CLOUD_VOICE=on in mobile/.env once the tts function and ElevenLabs key are set up. */
const CLOUD = process.env.EXPO_PUBLIC_CLOUD_VOICE === 'on' && !!supabase;
const STORE = `${process.env.EXPO_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/voice/`;
type Clip = { url: string; times: WordTimes };
const clips = new Map<string, Promise<Clip | null>>();
/** Pre-recorded lines published with the website (public/voice). Override with EXPO_PUBLIC_VOICE_URL if the site moves. */
const BUNDLE = process.env.EXPO_PUBLIC_VOICE_URL ?? `${(process.env.EXPO_PUBLIC_SITE_URL ?? '').replace(/\/$/, '')}/site/voice/`;
let bundled: Promise<VoiceBundle | null> | null = null;
const bundledLines = (): Promise<VoiceBundle | null> => (bundled ??= fetch(`${BUNDLE}manifest.json`).then(r => (r.ok ? r.json() : null)).catch(() => null));
async function lookup(spoken: string): Promise<Clip | null> {
  const b = await bundledLines();
  if (b && (b.version === VOICE_VERSION || !CLOUD)) { const k = voiceKey(spoken, b.version); if (b.lines[k]) return { url: `${BUNDLE}${k}.mp3`, times: b.lines[k] }; }
  if (!CLOUD) return null;
  const key = voiceKey(spoken);
  const hit = await fetch(`${STORE}${key}.json`).then(r => (r.ok ? r.json() as Promise<WordTimes> : null)).catch(() => null);
  if (hit) return { url: `${STORE}${key}.mp3`, times: hit };
  const { data } = await supabase!.functions.invoke('tts', { body: { text: spoken } }).catch(() => ({ data: null }));
  return data?.url ? { url: data.url, times: data.times } : null;
}
function findClip(spoken: string) {
  let p = clips.get(spoken);
  if (!p) { p = lookup(spoken); clips.set(spoken, p); p.then(c => { if (!c) clips.delete(spoken); }); }
  return p;
}

let player: AudioPlayer | null = null; let modeSet = false;
function stopClip() { if (player) { player.remove(); player = null; } }
async function playClip(id: number, clip: Clip, h: Hooks) {
  // Play through the speaker even when the ring/silent switch is on silent, like a video would.
  if (!modeSet) { modeSet = true; await setAudioModeAsync({ playsInSilentMode: true }).catch(() => {}); }
  if (id !== current) return;
  stopClip(); const p = createAudioPlayer({ uri: clip.url }, { updateInterval: 50 }); player = p;
  let next = 0; let started = false; let finished = false;
  p.addListener('playbackStatusUpdate', s => {
    if (id !== current || finished) return;
    if (s.playing && !started) { started = true; h.onStart?.(); }
    while (next < clip.times.w.length && clip.times.w[next][1] <= s.currentTime + 0.03) h.onWord?.(clip.times.w[next++][0]);
    if (s.didJustFinish) { finished = true; h.onEnd?.(); }
  });
  p.play();
}

// ---------- Device voice (fallback) ----------
let voiceId: string | undefined; let looked = false;
async function pick() {
  if (looked) return voiceId; looked = true;
  const all = (await Speech.getAvailableVoicesAsync().catch(() => [])).filter(v => v.language?.startsWith('en'));
  const pref = [/Samantha/i, /Ava/i, /Allison/i, /Nicky/i, /Zoe/i, /Susan/i];
  for (const re of pref) { const v = all.find(x => re.test(x.name) && x.quality === Speech.VoiceQuality.Enhanced) ?? all.find(x => re.test(x.name)); if (v) return (voiceId = v.identifier); }
  return (voiceId = all.find(v => v.language === 'en-US')?.identifier);
}
async function device(id: number, spoken: string, h: Hooks) {
  const voice = await pick(); if (id !== current) return;
  const live = (f?: () => void) => () => { if (id === current) f?.(); };
  Speech.speak(spoken, { voice, language: 'en-US', pitch: 1.1, rate: 0.98, onStart: live(h.onStart), onDone: live(h.onEnd), onStopped: live(h.onEnd), onError: live(h.onEnd),
    onBoundary: (e: { charIndex: number }) => { if (id === current) h.onWord?.(e.charIndex); } } as Speech.SpeechOptions);
}

type Hooks = { onStart?: () => void; onWord?: (i: number) => void; onEnd?: () => void };
let current = 0;
/** Speaks `text`; onWord gets a character index into speakable(text). Returns false when muted. */
export async function speak(text: string, h: Hooks) {
  const spoken = speakable(text);
  if (!voiceOn() || !spoken) return false;
  stopSpeaking(); const id = current;
  const clip = spoken.length <= CLOUD_MAX ? await findClip(spoken) : null;
  if (id !== current) return true;
  if (clip) { try { await playClip(id, clip, h); return true; } catch { /* fall through to device voice */ } }
  await device(id, spoken, h); return true;
}
export const stopSpeaking = () => { current++; stopClip(); Speech.stop(); };
