// Every GUI element cut from the Lumino GUI board, packed into one file by scripts/pack-art.py.
import art from '../assets/art.json';
export const UI: Record<string, string> = art.ui as Record<string, string>;
type Meta = { kind: 'icon' | 'art'; ink?: string; size: [number, number]; dot?: { cx: number; cy: number; d: number; color: string } };
export const META = art.uiMeta as unknown as Record<string, Meta>;
