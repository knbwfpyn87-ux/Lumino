// Opens the Stripe customer portal (change plan, update card, cancel).
import Stripe from 'npm:stripe@16.12.0';
import { cors, json, admin, getUser } from '../_shared/common.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const { returnUrl } = await req.json().catch(() => ({}));
  const { data } = await admin().from('profiles').select('stripe_customer_id').eq('id', user.id).single();
  if (!data?.stripe_customer_id) return json({ error: 'No subscription yet' }, 400);
  const s = await stripe.billingPortal.sessions.create({ customer: data.stripe_customer_id, return_url: `${returnUrl ?? Deno.env.get('SITE_URL')}#/account` });
  return json({ url: s.url });
});
