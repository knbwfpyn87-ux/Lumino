import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { db } from './store';

import type { Plan } from './plans';
import { finishClassroomConnect, startClassroomAutoSync } from './classroom';
export type Profile = { id: string; username: string; role: 'student' | 'teacher'; school_level: 'high_school' | 'college'; plan: Plan; plan_renews_at: string | null };
type Ctx = { session: Session | null; profile: Profile | null; loading: boolean; refresh: () => Promise<void>; signOut: () => Promise<void> };
const AuthCtx = createContext<Ctx>(null!);

// In local demo mode (no Supabase keys) a fake profile is used so the app still works.
// Demo mode unlocks everything so the app can be previewed.
const localProfile = (): Profile => ({ id: 'local', username: db.user(), role: 'student', school_level: 'high_school', plan: 'pro', plan_renews_at: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(supabase ? null : localProfile());
  const [loading, setLoading] = useState(!!supabase);

  const loadProfile = async (s: Session | null) => {
    if (!supabase || !s) { setProfile(supabase ? null : localProfile()); return; }
    const { data } = await supabase.from('profiles').select('id, username, role, school_level, plan, plan_renews_at').eq('id', s.user.id).maybeSingle();
    setProfile(data as Profile | null);
  };
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => { setSession(data.session); await loadProfile(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); loadProfile(s); finishClassroomConnect(s); });
    const stopSync = startClassroomAutoSync();
    return () => { sub.subscription.unsubscribe(); stopSync(); };
  }, []);

  return <AuthCtx.Provider value={{ session, profile, loading,
    refresh: () => loadProfile(session),
    signOut: async () => { await supabase?.auth.signOut(); } }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
export const myName = (p: Profile | null) => p?.username ?? db.user();
export const usePlan = (): Plan => useAuth().profile?.plan ?? 'free';
