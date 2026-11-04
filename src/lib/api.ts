// Data layer. Uses Supabase when configured, otherwise falls back to local storage (demo mode).
import { supabase } from './supabase';
import { db, photoDb, uid, type Test, type PhotoQuiz } from './store';

export type GroupInfo = { id: string; name: string; invite_code: string; owner: string };
export type Msg = { id: string; user_id: string; username: string; text: string; created_at: string };
export type ResultRow = { username: string; score: number; total: number };
export type PhotoQuizInfo = { id: string; title: string; author: string; group_id: string | null; pages: string[] };
export type Resp = { id: string; page: number; username: string; text: string; created_at: string };

const must = <T,>(r: { data: T | null; error: { message: string } | null }): T => { if (r.error) throw new Error(r.error.message); return r.data as T; };
const me = async () => (await supabase!.auth.getUser()).data.user!.id;
const nameOf = (row: { profiles?: { username: string } | { username: string }[] | null }) => { const p = row.profiles; return (Array.isArray(p) ? p[0]?.username : p?.username) ?? 'someone'; };

// ---------- Groups ----------
export async function listGroups(): Promise<GroupInfo[]> {
  if (!supabase) return db.groups().map(g => ({ id: g.id, name: g.name, invite_code: g.id.toUpperCase(), owner: 'local' }));
  return must(await supabase.from('groups').select('id, name, invite_code, owner').order('created_at', { ascending: false }));
}
export async function createGroup(name: string): Promise<GroupInfo> {
  if (!supabase) { const g = { id: uid(), name, members: [db.user()], messages: [], testIds: [] }; db.saveGroups([...db.groups(), g]); return { id: g.id, name, invite_code: g.id.toUpperCase(), owner: 'local' }; }
  return must(await supabase.from('groups').insert({ name, owner: await me() }).select('id, name, invite_code, owner').single());
}
export async function joinGroup(code: string): Promise<string> {
  if (!supabase) { const g = db.groups().find(x => x.id.toUpperCase() === code.toUpperCase()); if (!g) throw new Error('Invalid invite code'); return g.id; }
  return must(await supabase.rpc('join_group', { code: code.trim() })) as string;
}
export async function leaveGroup(groupId: string) {
  if (!supabase) { db.saveGroups(db.groups().filter(g => g.id !== groupId)); return; }
  must(await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', await me()));
}
export async function listMembers(groupId: string): Promise<string[]> {
  if (!supabase) return db.groups().find(g => g.id === groupId)?.members ?? [];
  const rows = must(await supabase.from('group_members').select('profiles(username)').eq('group_id', groupId));
  return (rows as never[]).map(nameOf);
}

// ---------- Chat ----------
export async function listMessages(groupId: string): Promise<Msg[]> {
  if (!supabase) return (db.groups().find(g => g.id === groupId)?.messages ?? []).map(m => ({ id: m.id, user_id: m.user, username: m.user, text: m.text, created_at: new Date(m.at).toISOString() }));
  const rows = must(await supabase.from('messages').select('id, user_id, text, created_at, profiles(username)').eq('group_id', groupId).order('created_at').limit(500));
  return (rows as never[]).map((r: Msg & { profiles: never }) => ({ ...r, username: nameOf(r) }));
}
export async function sendMessage(groupId: string, text: string, username: string) {
  if (!supabase) { db.saveGroups(db.groups().map(g => g.id === groupId ? { ...g, messages: [...g.messages, { id: uid(), user: username, text, at: Date.now() }] } : g)); return; }
  must(await supabase.from('messages').insert({ group_id: groupId, user_id: await me(), text }));
}
/** Calls onChange whenever a new message arrives. Returns an unsubscribe function. */
export function subscribeMessages(groupId: string, onChange: () => void): () => void {
  if (!supabase) return () => {};
  const ch = supabase.channel('msg-' + groupId).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `group_id=eq.${groupId}` }, onChange).subscribe();
  return () => { supabase!.removeChannel(ch); };
}

// ---------- Tests ----------
export async function listUploadedTests(): Promise<Test[]> {
  if (!supabase) return db.tests();
  const rows = must(await supabase.from('tests').select('id, title, subject, level, questions, profiles(username)').order('created_at', { ascending: false }).limit(500));
  return (rows as never[]).map((r: Test & { profiles: never }) => ({ id: r.id, title: r.title, subject: r.subject, level: r.level, questions: r.questions, author: nameOf(r) }));
}
export async function uploadTest(t: Omit<Test, 'id' | 'author'>, username: string) {
  if (!supabase) { db.saveTests([...db.tests(), { ...t, id: uid(), author: username }]); return; }
  must(await supabase.from('tests').insert({ title: t.title, subject: t.subject, level: t.level, questions: t.questions, author: await me() }));
}
export async function listGroupTests(groupId: string): Promise<string[]> {
  if (!supabase) return db.groups().find(g => g.id === groupId)?.testIds ?? [];
  return (must(await supabase.from('group_tests').select('test_id').eq('group_id', groupId)) as { test_id: string }[]).map(r => r.test_id);
}
export async function assignTest(groupId: string, testId: string) {
  if (!supabase) { db.saveGroups(db.groups().map(g => g.id === groupId ? { ...g, testIds: [...new Set([...g.testIds, testId])] } : g)); return; }
  const r = await supabase.from('group_tests').insert({ group_id: groupId, test_id: testId });
  if (r.error && r.error.code !== '23505') throw new Error(r.error.message);
}

// ---------- Results ----------
export async function saveResult(r: { testId: string; title: string; score: number; total: number; groupId?: string }) {
  if (!supabase) return; // local results are kept by lib/progress
  must(await supabase.from('results').insert({ user_id: await me(), test_id: r.testId, title: r.title, score: r.score, total: r.total, group_id: r.groupId ?? null }));
}
/** Best score per person for a test inside a group. */
export async function groupLeaderboard(groupId: string, testId: string, localResults: { user: string; score: number; total: number; testId: string; groupId?: string }[]): Promise<ResultRow[]> {
  let rows: ResultRow[];
  if (!supabase) rows = localResults.filter(r => r.testId === testId && r.groupId === groupId).map(r => ({ username: r.user, score: r.score, total: r.total }));
  else rows = (must(await supabase.from('results').select('score, total, profiles(username)').eq('group_id', groupId).eq('test_id', testId)) as never[]).map((r: ResultRow & { profiles: never }) => ({ username: nameOf(r), score: r.score, total: r.total }));
  const best = new Map<string, ResultRow>(); rows.forEach(r => { const b = best.get(r.username); if (!b || b.score < r.score) best.set(r.username, r); });
  return [...best.values()].sort((a, b) => b.score - a.score);
}

// ---------- Profile sync ----------
export async function syncProgress(xp: number, streak: number, lastDay: string) {
  if (!supabase) return;
  const { data } = await supabase.auth.getUser(); if (!data.user) return;
  await supabase.from('profiles').update({ xp, streak, last_day: lastDay || null }).eq('id', data.user.id);
}

// ---------- Photo quizzes ----------
const dataUrlToBlob = async (u: string) => (await fetch(u)).blob();
async function signed(paths: string[]): Promise<string[]> {
  if (!paths.length) return [];
  const r = must(await supabase!.storage.from('photos').createSignedUrls(paths, 60 * 60));
  return (r as { signedUrl: string }[]).map(x => x.signedUrl);
}
export async function createPhotoQuiz(title: string, groupId: string | null, pages: string[], username: string): Promise<string> {
  if (!supabase) { const q: PhotoQuiz = { id: uid(), title, author: username, groupId: groupId ?? undefined, pages, responses: {}, at: Date.now() }; photoDb.save([...photoDb.all(), q]); return q.id; }
  const user = await me(); const id = crypto.randomUUID();
  const paths = await Promise.all(pages.map(async (p, i) => { const path = `${user}/${id}/${i}.jpg`; must(await supabase!.storage.from('photos').upload(path, await dataUrlToBlob(p), { contentType: 'image/jpeg' })); return path; }));
  must(await supabase.from('photo_quizzes').insert({ id, title, group_id: groupId, author: user, pages: paths }));
  return id;
}
export async function listPhotoQuizzes(groupId: string): Promise<PhotoQuizInfo[]> {
  if (!supabase) return photoDb.all().filter(q => q.groupId === groupId).map(q => ({ id: q.id, title: q.title, author: q.author, group_id: q.groupId ?? null, pages: q.pages }));
  const rows = must(await supabase.from('photo_quizzes').select('id, title, group_id, pages, profiles(username)').eq('group_id', groupId).order('created_at', { ascending: false })) as never[];
  return Promise.all(rows.map(async (r: PhotoQuizInfo & { profiles: never }) => ({ ...r, author: nameOf(r), pages: await signed(r.pages.slice(0, 1)) })));
}
export async function getPhotoQuiz(id: string): Promise<PhotoQuizInfo | null> {
  if (!supabase) { const q = photoDb.all().find(x => x.id === id); return q ? { id: q.id, title: q.title, author: q.author, group_id: q.groupId ?? null, pages: q.pages } : null; }
  const r = must(await supabase.from('photo_quizzes').select('id, title, group_id, pages, profiles(username)').eq('id', id).maybeSingle()) as (PhotoQuizInfo & { profiles: never }) | null;
  return r ? { ...r, author: nameOf(r), pages: await signed(r.pages) } : null;
}
export async function listResponses(quizId: string): Promise<Resp[]> {
  if (!supabase) { const q = photoDb.all().find(x => x.id === quizId); return q ? Object.entries(q.responses).flatMap(([page, rs]) => rs.map(r => ({ id: r.id, page: +page, username: r.user, text: r.text, created_at: new Date(r.at).toISOString() }))) : []; }
  const rows = must(await supabase.from('photo_responses').select('id, page, text, created_at, profiles(username)').eq('quiz_id', quizId).order('created_at')) as never[];
  return rows.map((r: Resp & { profiles: never }) => ({ ...r, username: nameOf(r) }));
}
export async function postResponse(quizId: string, page: number, text: string, username: string) {
  if (!supabase) { photoDb.save(photoDb.all().map(q => q.id === quizId ? { ...q, responses: { ...q.responses, [page]: [...(q.responses[page] ?? []), { id: uid(), user: username, text, at: Date.now() }] } } : q)); return; }
  must(await supabase.from('photo_responses').insert({ quiz_id: quizId, page, text, user_id: await me() }));
}
export function subscribeResponses(quizId: string, onChange: () => void): () => void {
  if (!supabase) return () => {};
  const ch = supabase.channel('resp-' + quizId).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'photo_responses', filter: `quiz_id=eq.${quizId}` }, onChange).subscribe();
  return () => { supabase!.removeChannel(ch); };
}

// ---------- Safety: report, block, auto-delete, moderation ----------
export type Reason = 'harassment' | 'bullying' | 'inappropriate' | 'spam' | 'cheating' | 'safety' | 'other';
export async function reportMessage(m: Msg, groupId: string, reason: Reason, details: string) {
  if (!supabase) return;
  must(await supabase.from('reports').insert({ reporter: await me(), reported_user: m.user_id, group_id: groupId, message_id: m.id, message_text: m.text, reason, details: details || null }));
}
export async function listBlocked(): Promise<string[]> {
  if (!supabase) { try { return JSON.parse(localStorage.getItem('lumino:blocked') ?? '[]'); } catch { return []; } }
  return (must(await supabase.from('blocks').select('blocked')) as { blocked: string }[]).map(b => b.blocked);
}
export async function blockUser(userId: string) {
  if (!supabase) { const b = await listBlocked(); try { localStorage.setItem('lumino:blocked', JSON.stringify([...new Set([...b, userId])])); } catch { /* ignore */ } return; }
  const r = await supabase.from('blocks').insert({ blocker: await me(), blocked: userId }); if (r.error && r.error.code !== '23505') throw new Error(r.error.message);
}
export async function unblockUser(userId: string) {
  if (!supabase) { const b = await listBlocked(); try { localStorage.setItem('lumino:blocked', JSON.stringify(b.filter(x => x !== userId))); } catch { /* ignore */ } return; }
  must(await supabase.from('blocks').delete().eq('blocker', await me()).eq('blocked', userId));
}
export async function getMessageTtl(groupId: string): Promise<number> {
  if (!supabase) return 7;
  return (must(await supabase.from('groups').select('message_ttl_days').eq('id', groupId).single()) as { message_ttl_days: number }).message_ttl_days;
}
export async function setMessageTtl(groupId: string, days: 1 | 7 | 30) {
  if (!supabase) return;
  must(await supabase.from('groups').update({ message_ttl_days: days }).eq('id', groupId));
}
export type Report = { id: string; reason: Reason; details: string | null; message_text: string; status: string; created_at: string; reported_user: string; reported: string; reporter_name: string };
export async function listReports(): Promise<Report[]> {
  if (!supabase) return [];
  const rows = must(await supabase.from('reports').select('id, reason, details, message_text, status, created_at, reported_user, reported:profiles!reports_reported_user_fkey(username), reporter:profiles!reports_reporter_fkey(username)').eq('status', 'open').order('created_at', { ascending: false })) as never[];
  return rows.map((r: Report & { reported: { username: string }; reporter: { username: string } }) => ({ ...r, reported: r.reported?.username ?? '?', reporter_name: r.reporter?.username ?? '?' }));
}
export async function resolveReport(id: string, status: 'actioned' | 'dismissed') { if (supabase) must(await supabase.from('reports').update({ status }).eq('id', id)); }
export async function banUser(userId: string) { if (supabase) must(await supabase.from('profiles').update({ banned: true }).eq('id', userId)); }
export async function amModerator(): Promise<boolean> {
  if (!supabase) return false;
  const { data } = await supabase.auth.getUser(); if (!data.user) return false;
  const r = await supabase.from('profiles').select('is_moderator').eq('id', data.user.id).single();
  return !!(r.data as { is_moderator: boolean } | null)?.is_moderator;
}

// ---------- Calls ----------
export async function getCallToken(groupId: string): Promise<{ token: string; url: string }> {
  if (!supabase) throw new Error('Calls need the live (Supabase) version of Lumino.');
  const { data, error } = await supabase.functions.invoke('livekit-token', { body: { groupId } });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return { token: data.token, url: data.url ?? import.meta.env.VITE_LIVEKIT_URL };
}
