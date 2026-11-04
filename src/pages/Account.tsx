import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { PLAN_INFO } from '../lib/plans';
import { openBillingPortal, deleteAccount } from '../lib/api';
import { isCloud } from '../lib/supabase';

export default function Account() {
  const { profile, session, signOut, refresh } = useAuth(); const loc = useLocation();
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const justPaid = loc.search.includes('checkout=success') || window.location.hash.includes('checkout=success');
  if (!profile) return null;
  const info = PLAN_INFO[profile.plan];
  return (
    <section className="focus">
      <h2>Account</h2>
      {justPaid && <p className="note">🎉 Thanks for subscribing! It can take a few seconds to unlock. <a onClick={refresh}>Refresh</a></p>}
      <div className="item col">
        <b>{profile.username}</b>
        <span className="muted">{session?.user.email} · {profile.role === 'teacher' ? 'Teacher' : 'Student'} · {profile.school_level === 'college' ? 'College' : 'High school'}</span>
      </div>
      <h3>Plan</h3>
      <div className="item col">
        <div className="row between"><b>{info.name} · {info.price}</b>{profile.plan_renews_at && <span className="muted small">Renews {new Date(profile.plan_renews_at).toLocaleDateString()}</span>}</div>
        <div className="row">
          <Link to="/pricing"><button className="ghost">See plans</button></Link>
          {isCloud && profile.plan !== 'free' && <button disabled={busy} onClick={async () => { setBusy(true); try { await openBillingPortal(); } catch (e) { setErr((e as Error).message); setBusy(false); } }}>Manage subscription</button>}
        </div>
      </div>
      {isCloud && <>
        <h3>Session</h3>
        <button className="ghost" onClick={signOut}>Sign out</button>
        <h3>Danger zone</h3>
        <button className="bad" disabled={busy} onClick={async () => {
          if (prompt('This permanently deletes your account, groups you own, and photos, and cancels your subscription. Type DELETE to confirm.') !== 'DELETE') return;
          setBusy(true); try { await deleteAccount(); } catch (e) { setErr((e as Error).message); setBusy(false); }
        }}>Delete my account</button>
      </>}
      {err && <p className="wrong">{err}</p>}
      <p className="muted small"><Link to="/terms">Terms</Link> · <Link to="/privacy">Privacy</Link></p>
    </section>
  );
}
