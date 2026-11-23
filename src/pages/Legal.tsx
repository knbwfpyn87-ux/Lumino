import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AI_ENABLED } from '../lib/features';
// Starter policies. Have a lawyer or your school's counsel review before launch.
export function Terms() {
  return (
    <section className="focus legal">
      <h2>Terms of Use</h2>
      <p className="muted">Draft. Last updated November 2026.</p>
      <p><b>Who can use Lumino.</b> You must be at least 13. If you're under 18, a parent or guardian must agree to these terms and must be the one to buy a subscription.</p>
      <p><b>Be kind and honest.</b> No harassment, bullying, threats, hateful or sexual content, sharing other people's private information, or using Lumino to cheat on graded work or live tests. We may remove content and suspend or ban accounts that break these rules.</p>
      <p><b>Your content.</b> You own what you upload (tests, photos, messages). You give Lumino permission to store and show it to the people you share it with. Only upload material you have the right to share.</p>
      <p><b>Subscriptions.</b> Plus is $1.99/month and Pro is $3.99/month, billed monthly by Stripe until canceled. Cancel anytime in Account → Manage subscription; you keep access until the end of the paid period. Prices may change with 30 days' notice.</p>
      {AI_ENABLED && <p><b>AI assistants.</b> AI answers can be wrong. Use them to learn and check important information. Daily message limits apply.</p>}
      <p><b>No guarantees.</b> Lumino is provided as is. We're not responsible for test scores or grades.</p>
    </section>
  );
}
export function Privacy() {
  return (
    <section className="focus legal">
      <h2>Privacy Policy</h2>
      <p className="muted">Draft. Last updated November 2026.</p>
      <p><b>What we collect.</b> Email, username, role, school level, birth year (to confirm you're 13+), your study activity (XP, streaks, scores), and what you post (messages, tests, photos).</p>
      <p><b>What we don't do.</b> We don't sell your data or show ads. Calls are never recorded. Payments are handled by Stripe; we never see your card number.</p>
      <p><b>Who sees what.</b> Group content (chat, photo quizzes, scores) is visible only to members of that group. Moderators can see reported messages.</p>
      <p><b>Auto-delete.</b> Group chat messages are deleted automatically after 1, 7, or 30 days (the group owner chooses). Reported messages are kept for review.</p>
      {AI_ENABLED && <p><b>AI.</b> Messages you send to AI assistants are processed by Anthropic to generate replies and are not used to train their models. Photo quizzes don't use AI.</p>}
      <p><b>Services we use.</b> Supabase (accounts, database and storage), Stripe (payments), LiveKit (calls), ElevenLabs (Mr. Lumino's voice: the text of lines being read aloud){AI_ENABLED ? ', Anthropic (AI assistants)' : ''}, Google (optional Google sign-in, optional read-only Google Classroom sync, and web fonts), GitHub Pages (hosting).</p>
      <p><b>Google Classroom.</b> If you connect it, Lumino reads your class names, assignments, due dates and whether you turned work in, to show them in your planner. It can't see or change your grades, files or messages, and you can disconnect anytime.</p>
      <p><b>Cookies and storage.</b> Lumino doesn't use advertising or tracking cookies. See our <Link to="/cookies">Cookie Policy</Link> for what we store on your device.</p>
      <p><b>Your choices.</b> Delete your account anytime in Account → Delete my account. Parents can contact us to review or delete their child's data.</p>
      <p><b>Contact.</b> [Add a contact email before launch.]</p>
    </section>
  );
}

/** Everything Lumino keeps in the browser. Keep this list in sync with the code (search for "lumino:"). */
const STORED: [string, string][] = [
  ['Sign-in session', 'Keeps you signed in (stored by Supabase, our account provider). Removed when you sign out.'],
  ['Study progress', 'XP, level, streak, streak freezes, daily goal, finished lessons and labs, practice levels and scores.'],
  ['Review deck, boss and quests', 'Questions you missed (so they come back for spaced review), today\'s boss and your daily quests.'],
  ['Your classes and planner', 'The classes you picked and your upcoming assignments, including ones synced from Google Classroom.'],
  ['Notes and flashcards', 'Notes and decks you create on this device.'],
  ['Settings', 'Dark mode, read-aloud on or off, Learn with Mr. Lumino mode, and similar preferences.'],
  ['Google Classroom status', 'Whether Classroom is connected and when it last synced (your Google key is kept on our server, never in the browser).'],
];

export function Cookies() {
  const [cleared, setCleared] = useState(false);
  const clear = () => {
    if (!confirm('Clear all Lumino data saved in this browser? Anything not saved to your account (like notes, planner and review deck) will be deleted, and you\'ll be signed out.')) return;
    try { Object.keys(localStorage).filter(k => k.startsWith('lumino:') || k.startsWith('sb-')).forEach(k => localStorage.removeItem(k)); Object.keys(sessionStorage).filter(k => k.startsWith('lumino:')).forEach(k => sessionStorage.removeItem(k)); } catch { /* ignore */ }
    setCleared(true); setTimeout(() => window.location.reload(), 800);
  };
  return (
    <section className="focus legal">
      <h2>Cookie Policy</h2>
      <p className="muted">Draft. Last updated November 2026.</p>
      <p><b>The short version.</b> Lumino doesn't use advertising, analytics or tracking cookies, and we don't sell your data. We only store what the app needs to work, mostly on your own device, so we don't ask you to accept tracking.</p>

      <h3>What Lumino stores on your device</h3>
      <p>Lumino itself sets no HTTP cookies. Instead, it uses your browser's local storage (and session storage, for a moment during Google sign-in) for these things. They're all <b>strictly necessary</b> for features you use:</p>
      <table className="legaltable"><thead><tr><th>What</th><th>Why</th></tr></thead>
        <tbody>{STORED.map(([w, y]) => <tr key={w}><td>{w}</td><td>{y}</td></tr>)}</tbody></table>
      <p>This information stays in your browser. Some of it (your account, XP and streak, group content) is also saved to your Lumino account so it works on other devices; see the <Link to="/privacy">Privacy Policy</Link>. The iPhone app stores the same kinds of information on your phone.</p>

      <h3>Other services</h3>
      <ul>
        <li><b>Google Fonts.</b> Our text fonts load from Google's servers, which receive your IP address and browser details. Google says the Fonts service doesn't set cookies.</li>
        <li><b>Stripe.</b> When you subscribe, you pay on Stripe's checkout page. Stripe uses its own cookies there to process payments and prevent fraud.</li>
        <li><b>Google sign-in and Google Classroom.</b> If you use them, you sign in on Google's pages, which use Google's cookies.</li>
        <li><b>Supabase and LiveKit.</b> Our account and study-call services receive the information needed to run them (like your sign-in token) but don't set tracking cookies.</li>
        <li><b>Links to other sites</b> (like Desmos) follow those sites' own cookie policies once you open them.</li>
      </ul>
      <p>Those services' cookies are covered by their own policies: <a href="https://stripe.com/cookie-settings" target="_blank" rel="noreferrer">Stripe</a>, <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer">Google</a>.</p>

      <h3>Your choices</h3>
      <p>You can clear Lumino's data from this browser below, or through your browser's settings (look for "site data" or "cookies and site data"). Blocking storage entirely will stop Lumino from keeping you signed in or saving progress on this device.</p>
      <p>{cleared ? <b>Cleared. Reloading…</b> : <button className="ghost" onClick={clear}>Clear Lumino data on this device</button>}</p>
      <p>If we ever add cookies that aren't strictly necessary (like analytics), we'll update this policy and ask for your permission first.</p>
      <p><b>Contact.</b> [Add a contact email before launch.]</p>
    </section>
  );
}
