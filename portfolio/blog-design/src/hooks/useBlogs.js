import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/** Map DB row (snake_case) → camelCase for consistent frontend usage */
function formatBlog(row) {
    if (!row) return null;
    return {
        _id: row.id,
        id: row.id,
        title: row.title,
        content: row.content,
        author: row.author,
        slug: row.slug,
        category: row.category,
        excerpt: row.excerpt,
        coverImage: row.cover_image,
        coverImageAlt: row.cover_image_alt,
        tags: row.tags || [],
        featured: row.featured,
        seoTitle: row.seo_title,
        seoDescription: row.seo_description,
        status: row.status,
        publishedAt: row.published_at,
        date: row.date,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function slugify(value = '') {
    return `${value}`.toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function normalizeTags(tags = []) {
    if (Array.isArray(tags)) return tags.map(t => `${t}`.trim()).filter(Boolean);
    if (typeof tags === 'string') return tags.split(',').map(t => t.trim()).filter(Boolean);
    return [];
}

function buildBlogRow(body = {}, existing = null) {
    const validStatuses = new Set(['draft', 'published']);
    const status = validStatuses.has(body.status) ? body.status : 'draft';
    const slug = body.slug?.trim() || slugify(body.title || existing?.title || '');

    let publishedAt = existing?.published_at || null;
    if (status === 'published' && !publishedAt) publishedAt = new Date().toISOString();
    else if (status === 'draft') publishedAt = null;

    let date = existing?.date || new Date().toISOString();
    if (status === 'published') date = new Date().toISOString();

    return {
        title: body.title?.trim(),
        content: body.content,
        author: body.author?.trim(),
        slug,
        category: body.category?.trim() || 'General',
        excerpt: body.excerpt?.trim() || '',
        cover_image: body.coverImage?.trim() || '',
        cover_image_alt: body.coverImageAlt?.trim() || '',
        tags: normalizeTags(body.tags),
        featured: Boolean(body.featured),
        seo_title: body.seoTitle?.trim() || '',
        seo_description: body.seoDescription?.trim() || '',
        status,
        published_at: publishedAt,
        date,
        updated_at: new Date().toISOString(),
    };
}

/**
 * useBlogs — fetch all blogs (admin: all, public: published only)
 * @param {{ onlyPublished?: boolean }} options
 */
export function useBlogs({ onlyPublished = false } = {}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase.from('blogs').select('*')
                .order('featured', { ascending: false })
                .order('published_at', { ascending: false, nullsFirst: false })
                .order('created_at', { ascending: false });

            if (onlyPublished) query = query.eq('status', 'published');

            const { data, error } = await query;
            if (error) throw error;
            setBlogs((data || []).map(formatBlog));
        } catch (err) {
            setError(err.message || 'Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    }, [onlyPublished]);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    const createBlog = useCallback(async (body) => {
        const { data, error } = await supabase
            .from('blogs').insert([buildBlogRow(body)]).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatBlog(data);
        setBlogs(prev => [formatted, ...prev]);
        return formatted;
    }, []);

    const updateBlog = useCallback(async (id, body) => {
        // Fetch existing to preserve published_at
        const { data: existing } = await supabase.from('blogs').select('*').eq('id', id).single();
        const { data, error } = await supabase
            .from('blogs').update(buildBlogRow(body, existing)).eq('id', id).select().single();
        if (error) throw new Error(error.message);
        const formatted = formatBlog(data);
        setBlogs(prev => prev.map(b => b.id === id ? formatted : b));
        return formatted;
    }, []);

    const deleteBlog = useCallback(async (id) => {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw new Error(error.message);
        setBlogs(prev => prev.filter(b => b.id !== id));
    }, []);

    const getBlogById = useCallback(async (id) => {
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (error) throw new Error(error.message);
        return formatBlog(data);
    }, []);

    return { blogs, loading, error, refetch: fetchBlogs, createBlog, updateBlog, deleteBlog, getBlogById };
}
