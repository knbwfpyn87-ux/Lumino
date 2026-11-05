// Permanently deletes the signed-in user's account and data, and cancels any subscription.
import Stripe from 'npm:stripe@16.12.0';
import { cors, json, admin, getUser } from '../_shared/common.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const db = admin();
  const { data: p } = await db.from('profiles').select('stripe_customer_id').eq('id', user.id).maybeSingle();
  if (p?.stripe_customer_id && Deno.env.get('STRIPE_SECRET_KEY')) {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });
    const subs = await stripe.subscriptions.list({ customer: p.stripe_customer_id, status: 'all' });
    for (const s of subs.data) if (s.status !== 'canceled') await stripe.subscriptions.cancel(s.id);
  }
  const { data: files } = await db.storage.from('photos').list(user.id, { limit: 1000 });
  for (const f of files ?? []) { const { data: inner } = await db.storage.from('photos').list(`${user.id}/${f.name}`); await db.storage.from('photos').remove((inner ?? []).map(x => `${user.id}/${f.name}/${x.name}`)); }
  const { error } = await db.auth.admin.deleteUser(user.id); // cascades to profile and all their rows
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
});
