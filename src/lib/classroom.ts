// Google Classroom → "Upcoming Assignments". Connect once with Google (read-only Classroom access); after that the
// app pulls new assignments, due-date changes and turned-in status when it opens, every 30 minutes, and on "Sync now".
// The refresh token is kept by the google-classroom edge function, never in the browser.
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { invoke } from './api';
import { getUpcoming, saveUpcoming, mergeAssignments } from './planner';

export const CLASSROOM_SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly';
const STATE = 'lumino:classroom', PENDING = 'lumino:classroom-connecting';
export type ClassroomState = { connected: boolean; email?: string | null; lastSync?: number; error?: string; courses?: string[] };
export const getClassroomState = (): ClassroomState => { try { return JSON.parse(localStorage.getItem(STATE) ?? '{"connected":false}'); } catch { return { connected: false }; } };
const setState = (s: ClassroomState) => { try { localStorage.setItem(STATE, JSON.stringify(s)); } catch { /* ignore */ } window.dispatchEvent(new Event('lumino:classroom')); };

/** Starts the Google sign-in that grants read-only Classroom access. The page redirects to Google and back. */
export async function connectClassroom() {
  if (!supabase) throw new Error('This needs the live version of Lumino.');
  const { data } = await supabase.auth.getUser(); if (!data.user) throw new Error('Sign in to Lumino first.');
  try { sessionStorage.setItem(PENDING, '1'); } catch { /* ignore */ }
  const options = { scopes: CLASSROOM_SCOPES, redirectTo: window.location.origin + window.location.pathname, queryParams: { access_type: 'offline', prompt: 'consent' } };
  const hasGoogle = data.user.identities?.some(i => i.provider === 'google');
  const { error } = hasGoogle ? await supabase.auth.signInWithOAuth({ provider: 'google', options }) : await supabase.auth.linkIdentity({ provider: 'google', options });
  if (error) { try { sessionStorage.removeItem(PENDING); } catch { /* ignore */ } throw error; }
}

/** Call when the auth session changes: finishes a Classroom connection after Google redirects back. */
export async function finishClassroomConnect(session: Session | null) {
  let pending = false; try { pending = sessionStorage.getItem(PENDING) === '1'; } catch { /* ignore */ }
  if (!pending || !session) return;
  try { sessionStorage.removeItem(PENDING); } catch { /* ignore */ }
  if (!session.provider_refresh_token) { setState({ ...getClassroomState(), error: 'Google didn\'t grant offline access. Try connecting again.' }); return; }
  try {
    await invoke('google-classroom', { action: 'connect', refreshToken: session.provider_refresh_token, email: session.user.user_metadata?.email ?? session.user.email });
    setState({ connected: true, email: session.user.email }); await syncClassroom(true);
  } catch (e) { setState({ connected: false, error: (e as Error).message }); }
}

let syncing: Promise<void> | null = null;
/** Pulls the latest assignments. Skips if it ran in the last 10 minutes unless forced. */
export function syncClassroom(force = false): Promise<void> {
  const st = getClassroomState(); if (!st.connected) return Promise.resolve();
  if (!force && st.lastSync && Date.now() - st.lastSync < 10 * 60e3) return Promise.resolve();
  return (syncing ??= (async () => {
    try {
      const r = await invoke<{ assignments: Parameters<typeof mergeAssignments>[1]; courses: string[] }>('google-classroom', { action: 'sync', tzOffset: new Date().getTimezoneOffset() });
      saveUpcoming(mergeAssignments(getUpcoming(), r.assignments, new Date().toISOString().slice(0, 10)));
      setState({ ...getClassroomState(), connected: true, lastSync: Date.now(), error: undefined, courses: r.courses });
    } catch (e) {
      const code = (e as { code?: string }).code;
      setState({ ...getClassroomState(), connected: code !== 'reconnect' && code !== 'not_connected', error: (e as Error).message });
    } finally { syncing = null; }
  })());
}

export async function disconnectClassroom() {
  await invoke('google-classroom', { action: 'disconnect' }).catch(() => {});
  saveUpcoming(getUpcoming().filter(u => u.source !== 'classroom' || u.done));
  setState({ connected: false });
}

/** Keeps assignments fresh while the app is open: on start, every 30 minutes, and when the tab comes back into focus. */
export function startClassroomAutoSync() {
  syncClassroom();
  const timer = setInterval(() => syncClassroom(), 30 * 60e3);
  const onFocus = () => { if (document.visibilityState === 'visible') syncClassroom(); };
  document.addEventListener('visibilitychange', onFocus);
  return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onFocus); };
}
