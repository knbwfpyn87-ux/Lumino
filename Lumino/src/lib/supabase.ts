import { createClient, type SupabaseClient } from '@supabase/supabase-js';
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example). Without them the app runs in local demo mode.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
export const isCloud = !!supabase;
