// Mr. Lumino's voice on iPhone: Apple's built-in speech (free, offline, licensed for apps).
import * as Speech from 'expo-speech';
import { emit, on } from './events';
const KEY = 'lumino:voice';
export const voiceOn = () => { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } };
export const setVoiceOn = (v: boolean) => { try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch { /* ignore */ } if (!v) Speech.stop(); emit('voice'); };
export const onVoiceChange = (f: () => void) => on('voice', f);
let voiceId: string | undefined; let looked = false;
async function pick() {
  if (looked) return voiceId; looked = true;
  const all = (await Speech.getAvailableVoicesAsync().catch(() => [])).filter(v => v.language?.startsWith('en'));
  const pref = [/Samantha/i, /Ava/i, /Allison/i, /Nicky/i, /Zoe/i, /Susan/i];
  for (const re of pref) { const v = all.find(x => re.test(x.name) && x.quality === Speech.VoiceQuality.Enhanced) ?? all.find(x => re.test(x.name)); if (v) return (voiceId = v.identifier); }
  return (voiceId = all.find(v => v.language === 'en-US')?.identifier);
}
export const speakable = (t: string) => t.replace(/[*_`#>]+/g, '').replace(/\p{Extended_Pictographic}/gu, '').replace(/\bMr\.\s/g, 'Mister ').replace(/−/g, ' minus ').replace(/÷/g, ' divided by ').replace(/\s+/g, ' ').trim();
export async function speak(text: string, h: { onStart?: () => void; onWord?: (i: number) => void; onEnd?: () => void }) {
  if (!voiceOn() || !text.trim()) return false;
  Speech.stop(); const voice = await pick();
  Speech.speak(speakable(text), { voice, language: 'en-US', pitch: 1.1, rate: 0.98, onStart: h.onStart, onDone: h.onEnd, onStopped: h.onEnd, onError: h.onEnd,
    onBoundary: (e: { charIndex: number }) => h.onWord?.(e.charIndex) } as Speech.SpeechOptions);
  return true;
}
export const stopSpeaking = () => Speech.stop();
