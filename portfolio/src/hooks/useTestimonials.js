import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../lib/storage';

const BUCKET = 'portfolio-images';

function formatTestimonial(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    role: row.role,
    avatarUrl: row.avatar_url,
    rating: row.rating ?? 5,
    text: row.text,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * useTestimonials — fetch testimonials + full CRUD with avatar image upload
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setTestimonials((data || []).map(formatTestimonial));
    } catch (err) {
      setError(err.message || 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const createTestimonial = useCallback(async ({ name, role, rating, text, avatarFile }) => {
    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = await uploadFile(avatarFile, BUCKET, 'testimonials');
    }
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ name, role, avatar_url: avatarUrl, rating, text }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    const formatted = formatTestimonial(data);
    setTestimonials(prev => [...prev, formatted]);
    return formatted;
  }, []);

  const updateTestimonial = useCallback(async (id, { name, role, rating, text, avatarFile }) => {
    const updateData = { name, role, rating, text, updated_at: new Date().toISOString() };
    if (avatarFile) {
      updateData.avatar_url = await uploadFile(avatarFile, BUCKET, 'testimonials');
    }
    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    const formatted = formatTestimonial(data);
    setTestimonials(prev => prev.map(t => (t.id === id ? formatted : t)));
    return formatted;
  }, []);

  const deleteTestimonial = useCallback(async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
