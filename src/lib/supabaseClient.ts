import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = !!url && !!anonKey;

if (!supabaseConfigured) {
  console.warn(
    'Supabase is not configured — VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing. ' +
      'Real sign-up/sign-in will not work until these are set (see .env.local.example). "View Demo" still works.',
  );
}

// Falls back to placeholder values when unconfigured so createClient doesn't throw;
// AuthContext checks supabaseConfigured before calling anything that would use them.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key');
