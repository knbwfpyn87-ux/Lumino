import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { db } from './store';

export type Profile = { id: string; username: string; role: 'student' | 'teacher'; school_level: 'high_school' | 'college' };
type Ctx = { session: Session | null; profile: Profile | null; loading: boolean; refresh: () => Promise<void>; signOut: () => Promise<void> };
const AuthCtx = createContext<Ctx>(null!);

// In local demo mode (no Supabase keys) a fake profile is used so the app still works.
const localProfile = (): Profile => ({ id: 'local', username: db.user(), role: 'student', school_level: 'high_school' });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(supabase ? null : localProfile());
  const [loading, setLoading] = useState(!!supabase);

  const loadProfile = async (s: Session | null) => {
    if (!supabase || !s) { setProfile(supabase ? null : localProfile()); return; }
    const { data } = await supabase.from('profiles').select('id, username, role, school_level').eq('id', s.user.id).maybeSingle();
    setProfile(data as Profile | null);
  };
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => { setSession(data.session); await loadProfile(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); loadProfile(s); });
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthCtx.Provider value={{ session, profile, loading,
    refresh: () => loadProfile(session),
    signOut: async () => { await supabase?.auth.signOut(); } }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
export const myName = (p: Profile | null) => p?.username ?? db.user();
