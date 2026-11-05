import { UI } from '../lib/ui';
/** Brand art with a dark-mode version (no white, softer outline). Swaps automatically with the theme. */
export default function Brand({ name, className = '', alt = '', width }: { name: 'logo-full' | 'logo-mascot' | 'mascot-hero'; className?: string; alt?: string; width?: number }) {
  return (<>
    <img src={UI[name]} alt={alt} width={width} className={'light-only ' + className} draggable={false} />
    <img src={UI[name + '-dark']} alt={alt} width={width} className={'dark-only ' + className} draggable={false} />
  </>);
}
