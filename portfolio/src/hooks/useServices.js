import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../lib/storage';

const BUCKET = 'portfolio-images';

function formatService(row) {
    if (!row) return null;
    return {
        _id: row.id,
        id: row.id,
        title: row.title,
        description: row.description,
        imageURL: row.image_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

/**
 * useServices — fetch services + full CRUD with image upload
 */
export function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (error) throw error;
            setServices((data || []).map(formatService));
        } catch (err) {
            setError(err.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchServices(); }, [fetchServices]);

    const createService = useCallback(async ({ title, description, imageFile }) => {
        if (!imageFile) throw new Error('Image is required');
        const imageURL = await uploadFile(imageFile, BUCKET, 'services');
        const { data, error } = await supabase.from('services').insert([{ title, description, image_url: imageURL }]).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatService(data);
        setServices(prev => [...prev, formatted]);
        return formatted;
    }, []);

    const updateService = useCallback(async (id, { title, description, imageFile }) => {
        const updateData = { title, description, updated_at: new Date().toISOString() };
        if (imageFile) {
            updateData.image_url = await uploadFile(imageFile, BUCKET, 'services');
        }
        const { data, error } = await supabase.from('services').update(updateData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatService(data);
        setServices(prev => prev.map(s => s.id === id ? formatted : s));
        return formatted;
    }, []);

    const deleteService = useCallback(async (id) => {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw new Error(error.message);
        setServices(prev => prev.filter(s => s.id !== id));
    }, []);

    return { services, loading, error, refetch: fetchServices, createService, updateService, deleteService };
}
