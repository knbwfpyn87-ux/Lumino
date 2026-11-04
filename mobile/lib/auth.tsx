import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Plan } from '@shared/plans';

export type Profile = { id: string; username: string; role: 'student' | 'teacher'; school_level: 'high_school' | 'college'; plan: Plan; plan_renews_at: string | null };
type Ctx = { session: Session | null; profile: Profile | null; loading: boolean; refresh: () => Promise<void>; signOut: () => Promise<void> };
const AuthCtx = createContext<Ctx>(null!);
// Demo mode (no keys): everything unlocked so the app can be previewed.
const DEMO: Profile = { id: 'local', username: 'Student', role: 'student', school_level: 'high_school', plan: 'pro', plan_renews_at: null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(supabase ? null : DEMO);
  const [loading, setLoading] = useState(!!supabase);
  const load = async (s: Session | null) => {
    if (!supabase) return; if (!s) { setProfile(null); return; }
    const { data } = await supabase.from('profiles').select('id, username, role, school_level, plan, plan_renews_at').eq('id', s.user.id).maybeSingle();
    setProfile(data as Profile | null);
  };
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => { setSession(data.session); await load(data.session); setLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); load(s); });
    return () => data.subscription.unsubscribe();
  }, []);
  return <AuthCtx.Provider value={{ session, profile, loading, refresh: () => load(session), signOut: async () => { await supabase?.auth.signOut(); } }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
export const usePlan = (): Plan => useAuth().profile?.plan ?? 'free';
