import { useState } from 'react';
import { PLAN_INFO, type Plan } from '../lib/plans';
import { usePlan } from '../lib/auth';
import { startCheckout, openBillingPortal } from '../lib/api';
import { isCloud } from '../lib/supabase';

export default function Pricing() {
  const plan = usePlan(); const [busy, setBusy] = useState<Plan | null>(null); const [err, setErr] = useState('');
  const go = async (p: Plan) => {
    setErr(''); setBusy(p);
    try { if (plan === 'free') await startCheckout(p as 'plus' | 'pro'); else await openBillingPortal(); }
    catch (e) { setErr((e as Error).message); setBusy(null); }
  };
  return (
    <section>
      <h1>Pick your plan</h1>
      <p className="muted">Cancel anytime. Under 18? Ask a parent or guardian to subscribe for you.</p>
      <div className="plans">{(['free', 'plus', 'pro'] as Plan[]).map(p => { const info = PLAN_INFO[p]; const current = plan === p; return (
        <div key={p} className={'plan' + (p === 'pro' ? ' featured' : '') + (current ? ' current' : '')}>
          {p === 'pro' && <span className="pill">Best value</span>}
          <h2>{info.name}</h2><div className="price">{info.price}</div><p className="muted">{info.tagline}</p>
          <ul>{info.features.map(f => <li key={f}>✓ {f}</li>)}</ul>
          {current ? <button disabled>Current plan</button>
            : p === 'free' ? <button className="ghost" disabled={!isCloud} onClick={() => go(p)}>Downgrade</button>
            : <button disabled={!isCloud || busy !== null} onClick={() => go(p)}>{busy === p ? 'Opening…' : plan === 'free' ? `Get ${info.name}` : `Switch to ${info.name}`}</button>}
        </div>); })}</div>
      {!isCloud && <p className="note">Demo mode: everything is unlocked. Subscriptions turn on in the live version.</p>}
      {err && <p className="wrong">{err}</p>}
      <p className="muted small">Payments are handled securely by Stripe. Lumino never sees your card number.</p>
    </section>
  );
}
