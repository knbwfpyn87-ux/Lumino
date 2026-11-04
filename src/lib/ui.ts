// Every GUI element cut from the Lumino GUI board (scripts/cut-gui.py -> src/assets/ui).
import manifest from '../assets/ui/manifest.json';
const files = import.meta.glob('../assets/ui/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export const UI: Record<string, string> = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split('/').pop()!.replace('.png', ''), v]));
type Meta = { kind: 'icon' | 'art'; ink?: string; size: [number, number]; dot?: { cx: number; cy: number; d: number; color: string } };
export const META = manifest as unknown as Record<string, Meta>;
