import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const BLOG_DEVICE_KEY = 'blogDeviceId';

const createDeviceId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getDeviceId = () => {
  if (typeof window === 'undefined') return null;

  const existingDeviceId = window.localStorage.getItem(BLOG_DEVICE_KEY);
  if (existingDeviceId) return existingDeviceId;

  const nextDeviceId = createDeviceId();
  window.localStorage.setItem(BLOG_DEVICE_KEY, nextDeviceId);
  return nextDeviceId;
};

const normalizeViewCounts = (rows = []) =>
  rows.reduce((accumulator, row) => {
    if (!row?.blog_id) return accumulator;

    return {
      ...accumulator,
      [row.blog_id]: Number(row.view_count) || 0,
    };
  }, {});

export function useBlogView(blogId) {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const registerView = useCallback(async () => {
    if (!blogId) {
      setViewCount(0);
      setLoading(false);
      return;
    }

    const deviceId = getDeviceId();
    if (!deviceId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc('register_blog_view', {
        target_blog_id: blogId,
        target_device_id: deviceId,
      });

      if (rpcError) throw rpcError;
      setViewCount(Number(data) || 0);
    } catch (err) {
      setError(err.message || 'Failed to register blog view');
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    registerView();
  }, [registerView]);

  return { viewCount, loading, error, refresh: registerView };
}

export function useBlogViewCounts() {
  const [viewCounts, setViewCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchViewCounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc('get_blog_view_counts');
      if (rpcError) throw rpcError;
      setViewCounts(normalizeViewCounts(data));
    } catch (err) {
      setError(err.message || 'Failed to load blog views');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchViewCounts();
  }, [fetchViewCounts]);

  return { viewCounts, loading, error, refetch: fetchViewCounts };
}
