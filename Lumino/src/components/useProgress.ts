import { useEffect, useState } from 'react';
import { getProgress } from '../lib/progress';
export function useProgress() {
  const [p, setP] = useState(getProgress());
  useEffect(() => { const f = () => setP(getProgress()); window.addEventListener('lumino:progress', f); return () => window.removeEventListener('lumino:progress', f); }, []);
  return p;
}
