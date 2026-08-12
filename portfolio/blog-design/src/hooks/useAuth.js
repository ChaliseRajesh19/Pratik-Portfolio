import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useAuth — Supabase Auth hook
 * Returns: { session, user, loading, login, logout }
 */
export function useAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = useCallback(async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        return data.session;
    }, []);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    return {
        session,
        user: session?.user ?? null,
        isAdmin: !!session,
        loading,
        login,
        logout,
    };
}
