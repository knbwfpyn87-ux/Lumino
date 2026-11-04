import './polyfill';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
// Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in mobile/.env. Without them the app runs in demo mode.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL; const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const supabase: SupabaseClient | null = url && key
  ? createClient(url, key, { auth: { storage: localStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false } })
  : null;
export const isCloud = !!supabase;
export const SITE_URL = process.env.EXPO_PUBLIC_SITE_URL ?? 'https://lumino.example';
