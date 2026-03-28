import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

function formatCategory(row) {
    if (!row) return null;
    return {
        _id: row.id,
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        icon: row.icon,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

/**
 * useCategories — fetch categories + full CRUD
 */
export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
            if (error) throw error;
            setCategories((data || []).map(formatCategory));
        } catch (err) {
            setError(err.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    const createCategory = useCallback(async ({ name, slug, description, icon = '🎨' }) => {
        const { data, error } = await supabase.from('categories').insert([{ name, slug, description, icon }]).select().single();
        if (error) {
            if (error.code === '23505') throw new Error('Category slug already exists');
            throw new Error(error.message);
        }
        const formatted = formatCategory(data);
        setCategories(prev => [...prev, formatted]);
        return formatted;
    }, []);

    const updateCategory = useCallback(async (id, { name, slug, description, icon }) => {
        const { data, error } = await supabase.from('categories')
            .update({ name, slug, description, icon, updated_at: new Date().toISOString() })
            .eq('id', id).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatCategory(data);
        setCategories(prev => prev.map(c => c.id === id ? formatted : c));
        return formatted;
    }, []);

    const deleteCategory = useCallback(async (id) => {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw new Error(error.message);
        setCategories(prev => prev.filter(c => c.id !== id));
    }, []);

    return { categories, loading, error, refetch: fetchCategories, createCategory, updateCategory, deleteCategory };
}
