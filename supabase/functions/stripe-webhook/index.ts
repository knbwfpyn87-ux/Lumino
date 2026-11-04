// Keeps profiles.plan in sync with Stripe. Deploy with --no-verify-jwt.
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_PLUS, STRIPE_PRICE_PRO
import Stripe from 'npm:stripe@16.12.0';
import { admin } from '../_shared/common.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });
const planFor = (priceId?: string) => priceId === Deno.env.get('STRIPE_PRICE_PRO') ? 'pro' : priceId === Deno.env.get('STRIPE_PRICE_PLUS') ? 'plus' : 'free';

Deno.serve(async (req) => {
  const sig = req.headers.get('stripe-signature'); if (!sig) return new Response('missing signature', { status: 400 });
  let event: Stripe.Event;
  try { event = await stripe.webhooks.constructEventAsync(await req.text(), sig, Deno.env.get('STRIPE_WEBHOOK_SECRET')!, undefined, Stripe.createSubtleCryptoProvider()); }
  catch { return new Response('bad signature', { status: 400 }); }

  if (event.type.startsWith('customer.subscription.')) {
    const sub = event.data.object as Stripe.Subscription;
    const active = ['active', 'trialing', 'past_due'].includes(sub.status) && event.type !== 'customer.subscription.deleted';
    const plan = active ? planFor(sub.items.data[0]?.price.id) : 'free';
    const { error } = await admin().from('profiles')
      .update({ plan, plan_renews_at: active ? new Date(sub.current_period_end * 1000).toISOString() : null })
      .eq('stripe_customer_id', sub.customer as string);
    if (error) return new Response(error.message, { status: 500 }); // Stripe retries
  }
  return new Response('ok');
});
