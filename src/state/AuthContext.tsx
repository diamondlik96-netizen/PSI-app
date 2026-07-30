import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

export interface Profile {
  fullName: string;
  companyName: string;
  email: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'demo' | 'signed-out';

interface SignUpInput {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  status: AuthStatus;
  profile: Profile | null;
  isLoggedIn: boolean;
  isDemoMode: boolean;
  signUp(input: SignUpInput): Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signIn(email: string, password: string): Promise<{ error: string | null }>;
  signOut(): Promise<void>;
  enterDemo(): void;
  exitDemo(): void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_KEY = 'psi-demo-mode';

async function fetchProfile(userId: string, fallbackEmail: string): Promise<Profile> {
  const { data } = await supabase.from('profiles').select('full_name, company_name, email').eq('id', userId).single();
  return {
    fullName: data?.full_name ?? '',
    companyName: data?.company_name ?? '',
    email: data?.email ?? fallbackEmail,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [demoMode, setDemoMode] = useState(() => {
    try {
      return localStorage.getItem(DEMO_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    fetchProfile(session.user.id, session.user.email ?? '').then(setProfile);
  }, [session?.user?.id]);

  useEffect(() => {
    try {
      localStorage.setItem(DEMO_KEY, String(demoMode));
    } catch {
      // storage unavailable — demo flag just won't persist across reloads
    }
  }, [demoMode]);

  const status: AuthStatus = loading ? 'loading' : session?.user ? 'authenticated' : demoMode ? 'demo' : 'signed-out';

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      profile,
      isLoggedIn: status === 'authenticated' || status === 'demo',
      isDemoMode: status === 'demo',

      async signUp({ fullName, companyName, email, password }) {
        if (!supabaseConfigured) return { error: 'Sign-up is not set up yet — check back soon.', needsEmailConfirmation: false };
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, company_name: companyName } },
        });
        if (error) return { error: error.message, needsEmailConfirmation: false };
        const needsEmailConfirmation = !!data.user && !data.session;
        return { error: null, needsEmailConfirmation };
      },

      async signIn(email, password) {
        if (!supabaseConfigured) return { error: 'Sign-in is not set up yet — check back soon.' };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (/invalid login credentials/i.test(error.message)) return { error: 'Invalid email or password.' };
          if (/email not confirmed/i.test(error.message)) return { error: 'Please confirm your email before signing in — check your inbox for the link.' };
          return { error: error.message };
        }
        return { error: null };
      },

      async signOut() {
        if (supabaseConfigured) await supabase.auth.signOut();
        setDemoMode(false);
      },

      enterDemo() {
        setDemoMode(true);
      },
      exitDemo() {
        setDemoMode(false);
      },
    }),
    [status, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
