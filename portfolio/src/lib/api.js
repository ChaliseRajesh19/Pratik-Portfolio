// api.js — thin compatibility shim
// All data fetching now uses the Supabase client directly.
// This file only exports helpers used across the codebase.

export function getErrorMessage(error, fallback = 'Something went wrong') {
    if (!error) return fallback;
    if (typeof error === 'string') return error;
    return error?.message || fallback;
}

export function isRequestCanceled(error) {
    return error?.name === 'AbortError' || error?.code === 'ERR_CANCELED';
}

// assetUrl — images from Supabase Storage are already absolute public URLs
export function assetUrl(url = '') {
    return url || '';
}

export function apiUrl(path = '') {
    return path;
}

export const API_BASE_URL = '';
export const RESOLVED_API_BASE_URL = '';

// Default export stub — nothing should call api.get/post anymore
const api = {
    get: () => Promise.reject(new Error('Use Supabase client directly')),
    post: () => Promise.reject(new Error('Use Supabase client directly')),
    put: () => Promise.reject(new Error('Use Supabase client directly')),
    delete: () => Promise.reject(new Error('Use Supabase client directly')),
};
export default api;
