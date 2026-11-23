// One-time notice about storage. Lumino only uses strictly necessary storage (no ads or tracking), so this informs rather than asks.
import { useState } from 'react';

const KEY = 'lumino:cookie-notice';
export default function CookieNotice() {
  const [seen, setSeen] = useState(() => { try { return localStorage.getItem(KEY) === 'ok'; } catch { return false; } });
  if (seen) return null;
  return (
    <div className="cookienotice" role="region" aria-label="Cookie notice">
      <span>🍪 Lumino uses only essential storage to keep you signed in and save your progress. No ads, no tracking. <a href="#/cookies">Cookie Policy</a></span>
      <button onClick={() => { try { localStorage.setItem(KEY, 'ok'); } catch { /* ignore */ } setSeen(true); }}>Got it</button>
    </div>
  );
}
