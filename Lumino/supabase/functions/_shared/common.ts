import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

export const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info, stripe-signature' };
export const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
export const admin = () => createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

/** Returns the signed-in user for this request, or null. */
export async function getUser(req: Request) {
  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } });
  const { data } = await sb.auth.getUser();
  return data.user;
}

export const PLANS = {
  plus: { price: () => Deno.env.get('STRIPE_PRICE_PLUS')!, aiDaily: 30, assistants: ['study-buddy'] },
  pro: { price: () => Deno.env.get('STRIPE_PRICE_PRO')!, aiDaily: 150, assistants: ['study-buddy', 'sat-coach', 'essay-coach', 'science-lab'] },
} as const;
export type PaidPlan = keyof typeof PLANS;
