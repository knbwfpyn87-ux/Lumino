// Google Classroom sync. Actions (POST JSON { action }):
//   connect     { refreshToken }  saves the student's Google refresh token (from signing in with Google + Classroom scopes)
//   sync                          returns their current Classroom assignments, normalized for the planner
//   status                        whether Classroom is connected
//   disconnect                    revokes the token and forgets it
// Needs secrets GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (the same OAuth client used for Supabase's Google sign-in).
// Read-only scopes: classroom.courses.readonly and classroom.coursework.me.readonly.
import { cors, json, admin, getUser } from '../_shared/common.ts';

const API = 'https://classroom.googleapis.com/v1';
type Due = { year: number; month: number; day: number };
type Work = { id: string; title: string; dueDate?: Due; dueTime?: { hours?: number; minutes?: number }; alternateLink?: string; workType?: string; maxPoints?: number };
type Sub = { courseWorkId: string; state: string; late?: boolean; assignedGrade?: number };

async function accessToken(refreshToken: string): Promise<string> {
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: Deno.env.get('GOOGLE_CLIENT_ID')!, client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!, refresh_token: refreshToken, grant_type: 'refresh_token' }) });
  const d = await r.json();
  if (!r.ok) { const e = new Error(d.error ?? 'token_error') as Error & { code?: string }; e.code = d.error; throw e; }
  return d.access_token as string;
}
async function get<T>(token: string, path: string): Promise<T> {
  const r = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d?.error?.message ?? `Classroom ${r.status}`); }
  return r.json();
}
async function all<T>(token: string, path: string, key: string): Promise<T[]> {
  const out: T[] = []; let page = '';
  for (let i = 0; i < 10; i++) { const d = await get<Record<string, unknown>>(token, `${path}${path.includes('?') ? '&' : '?'}pageSize=100${page ? `&pageToken=${page}` : ''}`);
    out.push(...((d[key] as T[]) ?? [])); page = (d.nextPageToken as string) ?? ''; if (!page) break; }
  return out;
}
/** Classroom due dates are in UTC; convert to the student's local calendar day using their timezone offset (minutes, like JS getTimezoneOffset). */
function dueDay(d: Due, t: Work['dueTime'], tzOffset: number) {
  const utc = Date.UTC(d.year, d.month - 1, d.day, t?.hours ?? 23, t?.minutes ?? 59);
  return new Date(utc - tzOffset * 60000).toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const user = await getUser(req); if (!user) return json({ error: 'Not signed in' }, 401);
  if (!Deno.env.get('GOOGLE_CLIENT_ID') || !Deno.env.get('GOOGLE_CLIENT_SECRET')) return json({ error: 'not_configured', message: 'Google Classroom isn\'t set up on this server yet.' }, 501);
  const body = await req.json().catch(() => ({})); const db = admin();

  if (body.action === 'connect') {
    if (!body.refreshToken) return json({ error: 'missing_token', message: 'Google didn\'t return a refresh token. Try connecting again.' }, 400);
    try { await accessToken(body.refreshToken); } catch { return json({ error: 'bad_token', message: 'That Google sign-in didn\'t work. Try connecting again.' }, 400); }
    await db.from('google_links').upsert({ user_id: user.id, refresh_token: body.refreshToken, google_email: body.email ?? null, connected_at: new Date().toISOString() });
    return json({ ok: true });
  }

  const { data: link } = await db.from('google_links').select('refresh_token, google_email, last_sync').eq('user_id', user.id).maybeSingle();
  if (body.action === 'status') return json({ connected: !!link, email: link?.google_email ?? null, lastSync: link?.last_sync ?? null });
  if (!link) return json({ error: 'not_connected', message: 'Connect Google Classroom first.' }, 400);

  if (body.action === 'disconnect') {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(link.refresh_token)}`, { method: 'POST' }).catch(() => {});
    await db.from('google_links').delete().eq('user_id', user.id);
    return json({ ok: true });
  }

  if (body.action === 'sync') {
    let token: string;
    try { token = await accessToken(link.refresh_token); }
    catch (e) { if ((e as { code?: string }).code === 'invalid_grant') { await db.from('google_links').delete().eq('user_id', user.id); return json({ error: 'reconnect', message: 'Google access expired or was removed. Connect Google Classroom again.' }, 401); } throw e; }
    const tz = Number(body.tzOffset) || 0; const since = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
    const courses = await all<{ id: string; name: string; section?: string }>(token, '/courses?studentId=me&courseStates=ACTIVE', 'courses');
    const assignments: unknown[] = [];
    await Promise.all(courses.slice(0, 30).map(async c => {
      const [work, subs] = await Promise.all([
        all<Work>(token, `/courses/${c.id}/courseWork?orderBy=dueDate%20desc`, 'courseWork').catch(() => []),
        all<Sub>(token, `/courses/${c.id}/courseWork/-/studentSubmissions?userId=me`, 'studentSubmissions').catch(() => []),
      ]);
      const state = new Map(subs.map(s => [s.courseWorkId, s]));
      for (const w of work) {
        if (!w.dueDate) continue; const due = dueDay(w.dueDate, w.dueTime, tz); if (due < since) continue;
        const s = state.get(w.id);
        assignments.push({ id: `gc:${c.id}:${w.id}`, title: w.title, course: c.name, due, link: w.alternateLink ?? null,
          done: s ? ['TURNED_IN', 'RETURNED'].includes(s.state) : false, late: s?.late ?? false, type: w.workType ?? 'ASSIGNMENT' });
      }
    }));
    await db.from('google_links').update({ last_sync: new Date().toISOString() }).eq('user_id', user.id);
    return json({ assignments, courses: courses.map(c => c.name) });
  }
  return json({ error: 'bad_action' }, 400);
});
