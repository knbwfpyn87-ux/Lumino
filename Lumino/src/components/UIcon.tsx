import type { CSSProperties } from 'react';
import { UI, META } from '../lib/ui';

/**
 * A cut GUI element. One-color icons render as a CSS mask so they follow the text color
 * (navy in light mode, white in dark mode); pass `ink` to keep the board's own color.
 * Multi-color art renders as an image. `dot` re-draws a bell's notification dot at its exact board position.
 */
export default function UIcon({ name, size = 24, ink = false, dot = false, className = '', style, alt = '' }:
  { name: string; size?: number; ink?: boolean; dot?: boolean; className?: string; style?: CSSProperties; alt?: string }) {
  const m = META[name]; const src = UI[name];
  if (!m || !src) return null;
  const [w, h] = m.size; const height = size; const width = Math.round(size * w / h);
  if (m.kind === 'art') return <img src={src} alt={alt} width={width} height={height} className={'uicon ' + className} style={style} draggable={false} />;
  const glyph = <span className={'uicon mask ' + (ink ? 'ink ' : '') + (dot ? '' : className)} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}
    style={{ width, height, WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, ['--ink' as string]: m.ink, ...(dot ? {} : style) }} />;
  if (!dot || !m.dot) return glyph;
  return (
    <span className={'uicon withdot ' + className} style={{ width, height, ...style }}>
      {glyph}<i className="uidot" style={{ left: `${m.dot.cx}%`, top: `${m.dot.cy}%`, width: `${m.dot.d}%`, height: `${m.dot.d * w / h}%`, background: m.dot.color }} />
    </span>
  );
}
