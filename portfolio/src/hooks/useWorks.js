import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../lib/storage';

const BUCKET = 'portfolio-images';

function formatWork(row) {
    if (!row) return null;
    return {
        _id: row.id,
        id: row.id,
        title: row.title,
        headline: row.headline,
        category: row.category,
        imageURL: row.image_url,
        previewImage: row.preview_image || '',
        galleryImages: row.gallery_images || [],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

/**
 * useWorks — fetch works with optional category filter + full CRUD
 * @param {{ category?: string }} options
 */
export function useWorks({ category } = {}) {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase.from('works').select('*').order('created_at', { ascending: false });
            if (category) query = query.eq('category', category);
            const { data, error } = await query;
            if (error) throw error;
            setWorks((data || []).map(formatWork));
        } catch (err) {
            setError(err.message || 'Failed to fetch works');
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => { fetchWorks(); }, [fetchWorks]);

    const createWork = useCallback(async ({ headline, category: cat, mainImage, galleryImages = [] }) => {
        if (!mainImage) throw new Error('Main image is required');

        const imageURL = await uploadFile(mainImage, BUCKET, 'works');
        const galleryURLs = await Promise.all(
            galleryImages.map(f => uploadFile(f, BUCKET, 'gallery'))
        );

        const { data, error } = await supabase.from('works').insert([{
            title: headline,
            headline,
            category: cat,
            image_url: imageURL,
            gallery_images: galleryURLs,
        }]).select().single();

        if (error) throw new Error(error.message);
        const formatted = formatWork(data);
        setWorks(prev => [formatted, ...prev]);
        return formatted;
    }, []);

    const updateWork = useCallback(async (id, { headline, category: cat, mainImage, newGalleryImages = [], existingGalleryImages = [] }) => {
        const updateData = {
            title: headline,
            headline,
            category: cat,
            updated_at: new Date().toISOString(),
        };

        if (mainImage) {
            updateData.image_url = await uploadFile(mainImage, BUCKET, 'works');
        }

        if (newGalleryImages.length > 0) {
            const newUrls = await Promise.all(newGalleryImages.map(f => uploadFile(f, BUCKET, 'gallery')));
            updateData.gallery_images = [...existingGalleryImages, ...newUrls];
        } else {
            updateData.gallery_images = existingGalleryImages;
        }

        const { data, error } = await supabase.from('works').update(updateData).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatWork(data);
        setWorks(prev => prev.map(w => w.id === id ? formatted : w));
        return formatted;
    }, []);

    const deleteWork = useCallback(async (id) => {
        const { error } = await supabase.from('works').delete().eq('id', id);
        if (error) throw new Error(error.message);
        setWorks(prev => prev.filter(w => w.id !== id));
    }, []);

    return { works, loading, error, refetch: fetchWorks, createWork, updateWork, deleteWork };
}
