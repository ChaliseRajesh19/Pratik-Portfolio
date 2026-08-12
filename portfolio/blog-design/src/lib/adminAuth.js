import { supabase } from './supabase';

// ── Auth ──────────────────────────────────────────────────

export async function adminLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data.session;
}

export async function adminLogout() {
    await supabase.auth.signOut();
}

export async function getAdminSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
}

export function hasValidAdminToken() {
    // Sync check — Supabase persists session in localStorage automatically.
    // We check the 'adminSession' key set by the Supabase client.
    try {
        const raw = localStorage.getItem('sb-ujrmasdqypgyqjewxwpq-auth-token');
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        const expiresAt = parsed?.expires_at;
        if (!expiresAt) return true;
        return Date.now() / 1000 < expiresAt;
    } catch {
        return false;
    }
}

// Legacy compat shims (used in a few places)
export const getAdminToken = () => null;
export const setAdminToken = () => {};
export const clearAdminToken = () => supabase.auth.signOut();
export const isAdminTokenValid = () => hasValidAdminToken();
