// Starts a Stripe Checkout session for Plus ($1.99/mo) or Pro ($3.99/mo).
// Secrets: STRIPE_SECRET_KEY, STRIPE_PRICE_PLUS, STRIPE_PRICE_PRO
import Stripe from 'npm:stripe@16.12.0';
import { cors, json, admin, getUser, PLANS, type PaidPlan } from '../_shared/common.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  const { plan, returnUrl } = await req.json().catch(() => ({}));
  if (!(plan in PLANS)) return json({ error: 'Unknown plan' }, 400);

  const db = admin();
  const { data: profile } = await db.from('profiles').select('stripe_customer_id, username, plan').eq('id', user.id).single();
  if (!profile) return json({ error: 'Finish setting up your profile first' }, 400);
  if (profile.plan !== 'free') return json({ error: 'You already have a plan. Use "Manage subscription" to change it.' }, 400);

  let customer = profile.stripe_customer_id as string | null;
  if (!customer) {
    customer = (await stripe.customers.create({ email: user.email, metadata: { user_id: user.id, username: profile.username } })).id;
    await db.from('profiles').update({ stripe_customer_id: customer }).eq('id', user.id);
  }
  const back = typeof returnUrl === 'string' ? returnUrl : Deno.env.get('SITE_URL')!;
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription', customer,
    line_items: [{ price: PLANS[plan as PaidPlan].price(), quantity: 1 }],
    allow_promotion_codes: true,
    client_reference_id: user.id,
    subscription_data: { metadata: { user_id: user.id, plan } },
    success_url: `${back}#/account?checkout=success`,
    cancel_url: `${back}#/pricing`,
  });
  return json({ url: session.url });
});
