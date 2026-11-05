// Mr. Lumino's voice: the device's built-in speech (free, licensed for apps, works offline on most devices).
const KEY = 'lumino:voice';
type Listener = () => void; const subs = new Set<Listener>();
export const voiceSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
export function voiceOn(): boolean { try { return localStorage.getItem(KEY) !== 'off'; } catch { return true; } }
export function setVoiceOn(on: boolean) { try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch { /* ignore */ } if (!on) stopSpeaking(); subs.forEach(f => f()); }
export function onVoiceChange(f: Listener) { subs.add(f); return () => { subs.delete(f); }; }

// Prefer warm, natural-sounding English voices that ship with common devices.
// Brighter, lighter voices first: they sound cuter when pitched up. Deeper voices are a last resort.
const PREFERRED = [/Samantha/i, /Ava/i, /Allison/i, /Nicky/i, /Google US English/i, /Ana.*Natural/i, /Jenny.*Natural/i, /Aria.*Natural/i, /Zira/i, /Karen/i, /Natural/i, /Google UK English Female/i];
let chosen: SpeechSynthesisVoice | null = null;
function pickVoice(): SpeechSynthesisVoice | null {
  if (!voiceSupported) return null; if (chosen) return chosen;
  const all = speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang)); if (!all.length) return null;
  for (const re of PREFERRED) { const v = all.find(x => re.test(x.name)); if (v) return (chosen = v); }
  return (chosen = all.find(v => /en-US/i.test(v.lang)) ?? all[0]);
}
if (voiceSupported) speechSynthesis.addEventListener?.('voiceschanged', () => { chosen = null; });

/** Clean text for speaking: no emoji, markdown, or code symbols read aloud. */
export function speakable(text: string) {
  return text.replace(/```[\s\S]*?```/g, ' (see the code) ').replace(/[*_`#>]+/g, '').replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\bMr\.\s/g, 'Mister ').replace(/−/g, ' minus ').replace(/÷/g, ' divided by ').replace(/×/g, ' times ').replace(/\s+/g, ' ').trim();
}

let current = 0;
/**
 * Speaks `text`. onWord(charIndex) fires as each word starts (where the browser supports it), onEnd when finished.
 * Returns false if speech isn't available or is muted (callers fall back to silent typing).
 */
export function speak(text: string, { onWord, onEnd, onStart }: { onWord?: (i: number) => void; onEnd?: () => void; onStart?: () => void } = {}): boolean {
  if (!voiceSupported || !voiceOn() || !text.trim()) return false;
  const id = ++current; speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(speakable(text)); const v = pickVoice(); if (v) u.voice = v;
  u.lang = v?.lang ?? 'en-US'; u.rate = 1.05; u.pitch = 1.45; // small, bright and bubbly: he's a lightbulb
  u.onstart = () => id === current && onStart?.();
  u.onboundary = e => { if (id === current && e.name !== 'sentence') onWord?.(e.charIndex); };
  u.onend = u.onerror = () => { if (id === current) onEnd?.(); };
  speechSynthesis.speak(u); return true;
}
export function stopSpeaking() { if (voiceSupported) { current++; speechSynthesis.cancel(); } }
