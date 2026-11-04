// Issues a short-lived LiveKit token for a group call, only to signed-in, non-banned group members.
// Deploy:  supabase functions deploy livekit-token
// Secrets: supabase secrets set LIVEKIT_API_KEY=... LIVEKIT_API_SECRET=...
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { AccessToken } from 'npm:livekit-server-sdk@2.6.1';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info' };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: 'Not signed in' }, 401);

  const { groupId } = await req.json().catch(() => ({}));
  if (typeof groupId !== 'string') return json({ error: 'groupId required' }, 400);

  const { data: member } = await supabase.from('group_members').select('user_id').eq('group_id', groupId).eq('user_id', user.id).maybeSingle();
  if (!member) return json({ error: 'Not a member of this group' }, 403);
  const { data: profile } = await supabase.from('profiles').select('username, banned').eq('id', user.id).single();
  if (!profile || profile.banned) return json({ error: 'Account restricted' }, 403);

  const at = new AccessToken(Deno.env.get('LIVEKIT_API_KEY')!, Deno.env.get('LIVEKIT_API_SECRET')!, { identity: user.id, name: profile.username, ttl: '2h' });
  // Calls are not recorded: no egress/recording permissions are granted.
  at.addGrant({ room: `group-${groupId}`, roomJoin: true, canPublish: true, canSubscribe: true, canPublishData: false, roomRecord: false });
  return json({ token: await at.toJwt(), url: Deno.env.get('LIVEKIT_URL') });
});
