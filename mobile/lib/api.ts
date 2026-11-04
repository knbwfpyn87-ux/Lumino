import { supabase } from './supabase';

const must = <T,>(r: { data: T | null; error: { message: string } | null }): T => { if (r.error) throw new Error(r.error.message); return r.data as T; };
const me = async () => (await supabase!.auth.getUser()).data.user!.id;
const nameOf = (row: { profiles?: unknown }) => { const p = row.profiles as { username: string } | { username: string }[] | null; return (Array.isArray(p) ? p[0]?.username : p?.username) ?? 'someone'; };

export type Group = { id: string; name: string; invite_code: string };
export type Msg = { id: string; user_id: string; username: string; text: string; created_at: string };

// Demo-mode stand-ins so the screens work without a backend.
const demoGroups: Group[] = [{ id: 'demo', name: 'AP Calc Squad', invite_code: 'DEMO42' }];
const demoMsgs: Msg[] = [
  { id: '1', user_id: 'a', username: 'Maya', text: 'Anyone done unit 3 level 2 yet?', created_at: new Date().toISOString() },
  { id: '2', user_id: 'b', username: 'Jordan', text: 'Yeah, the ArrayList one is tricky 😅', created_at: new Date().toISOString() },
];

export async function listGroups(): Promise<Group[]> {
  if (!supabase) return demoGroups;
  return must(await supabase.from('groups').select('id, name, invite_code').order('created_at', { ascending: false }));
}
export async function createGroup(name: string): Promise<Group> {
  if (!supabase) { const g = { id: String(Date.now()), name, invite_code: 'LOCAL' }; demoGroups.unshift(g); return g; }
  return must(await supabase.from('groups').insert({ name, owner: await me() }).select('id, name, invite_code').single());
}
export async function joinGroup(code: string): Promise<string> {
  if (!supabase) throw new Error('Joining needs the live version.');
  return must(await supabase.rpc('join_group', { code: code.trim() })) as string;
}
export async function listMessages(groupId: string): Promise<Msg[]> {
  if (!supabase) return groupId === 'demo' ? demoMsgs : [];
  const rows = must(await supabase.from('messages').select('id, user_id, text, created_at, profiles(username)').eq('group_id', groupId).order('created_at').limit(300)) as never[];
  return rows.map((r: Msg & { profiles: unknown }) => ({ ...r, username: nameOf(r) }));
}
export async function sendMessage(groupId: string, text: string) {
  if (!supabase) { demoMsgs.push({ id: String(Date.now()), user_id: 'me', username: 'You', text, created_at: new Date().toISOString() }); return; }
  must(await supabase.from('messages').insert({ group_id: groupId, user_id: await me(), text }));
}
export function subscribeMessages(groupId: string, cb: () => void) {
  if (!supabase) return () => {};
  const ch = supabase.channel('m-' + groupId).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `group_id=eq.${groupId}` }, cb).subscribe();
  return () => { supabase!.removeChannel(ch); };
}
export async function reportMessage(m: Msg, groupId: string, reason: string) {
  if (!supabase) return;
  must(await supabase.from('reports').insert({ reporter: await me(), reported_user: m.user_id, group_id: groupId, message_id: m.id, message_text: m.text, reason }));
}
export async function blockUser(userId: string) { if (supabase) await supabase.from('blocks').insert({ blocker: await me(), blocked: userId }); }
export async function saveResult(r: { testId: string; title: string; score: number; total: number }) {
  if (!supabase) return; await supabase.from('results').insert({ user_id: await me(), test_id: r.testId, title: r.title, score: r.score, total: r.total });
}
export async function askTutor(assistant: string, messages: { role: 'user' | 'assistant'; content: string }[]): Promise<string> {
  if (!supabase) return '(Demo mode: Lumino AI answers once the app is connected.)';
  const { data, error } = await supabase.functions.invoke('ai-assistant', { body: { assistant, messages } });
  if (error) { const ctx = (error as { context?: Response }).context; const b = ctx ? await ctx.json().catch(() => null) : null; throw new Error(b?.message ?? error.message); }
  return data.reply;
}
