import { Image, View, type ImageStyle } from 'react-native';
import { UI_SRC } from '@/lib/ui-assets';
import manifest from '@/assets/ui/manifest.json';
import { useTheme } from '@/lib/theme';

type Meta = { kind: 'icon' | 'art'; ink?: string; size: [number, number]; dot?: { cx: number; cy: number; d: number; color: string } };
const META = manifest as unknown as Record<string, Meta>;
export type UIName = keyof typeof UI_SRC;

/**
 * A GUI element cut from the Lumino board. One-color icons are tinted: `ink` keeps the board color
 * (switching to yellow in dark mode unless `keep`), otherwise they follow the text color. Art keeps its colors.
 */
export default function UIcon({ name: requested, size = 24, ink = false, keep = false, color, dot = false, style }:
  { name: UIName; size?: number; ink?: boolean; keep?: boolean; color?: string; dot?: boolean; style?: ImageStyle }) {
  const t = useTheme(); const dark = t.bg === '#0f111a';
  // Brand art has a dark-mode version (no white, softer outline): use it automatically
  const name = (dark && (requested + '-dark') in UI_SRC ? requested + '-dark' : requested) as UIName;
  const m = META[name]; const [w, h] = m.size; const width = Math.round(size * w / h);
  const tint = m.kind === 'icon' ? (color ?? (ink ? (dark && !keep ? t.yellow : m.ink) : t.text)) : undefined;
  const img = <Image source={UI_SRC[name]} style={[{ width, height: size }, tint ? { tintColor: tint } : null, style]} resizeMode="contain" accessibilityIgnoresInvertColors />;
  if (!dot || !m.dot) return img;
  const d = (m.dot.d / 100) * width;
  return (
    <View style={{ width, height: size }}>
      {img}
      <View style={{ position: 'absolute', left: (m.dot.cx / 100) * width - d / 2, top: (m.dot.cy / 100) * size - d / 2, width: d, height: d, borderRadius: d / 2, backgroundColor: m.dot.color }} />
    </View>
  );
}
