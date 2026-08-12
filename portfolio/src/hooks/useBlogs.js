import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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
    coverImage: row.cover_image || row.featuredImage || row.image || '',
    coverImageAlt: row.cover_image_alt || row.imageAlt || '',
    tags: row.tags || [],
    featured: row.featured,
    seoTitle: row.seo_title || row.seoTitle || '',
    seoDescription: row.seo_description || row.seoDescription || '',
    status: row.status || 'draft',
    publishedAt: row.published_at || row.publishDate || row.date,
    date: row.date || row.publishDate,
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
  const validStatuses = new Set(['draft', 'published', 'Published', 'Draft']);
  const status = validStatuses.has(body.status) ? body.status.toLowerCase() : 'draft';
  const slug = body.slug?.trim() || slugify(body.title || existing?.title || '');

  let publishedAt = existing?.published_at || null;
  if ((status === 'published') && !publishedAt) publishedAt = new Date().toISOString();
  else if (status === 'draft') publishedAt = null;

  let date = existing?.date || new Date().toISOString();
  if (status === 'published') date = new Date().toISOString();

  return {
    title: body.title?.trim(),
    content: body.content,
    author: body.author?.trim() || 'Pratik Bhusal',
    slug,
    category: body.category?.trim() || 'General',
    excerpt: body.excerpt?.trim() || '',
    cover_image: body.coverImage?.trim() || body.featuredImage?.trim() || body.image?.trim() || '',
    cover_image_alt: body.coverImageAlt?.trim() || body.imageAlt?.trim() || '',
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
      if (!supabase) {
        setBlogs([]);
        return;
      }
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
    if (!supabase) throw new Error('Supabase client is not configured');
    const { data, error } = await supabase
      .from('blogs').insert([buildBlogRow(body)]).select().single();
    if (error) throw new Error(error.message);
    const formatted = formatBlog(data);
    setBlogs(prev => [formatted, ...prev]);
    return formatted;
  }, []);

  const updateBlog = useCallback(async (id, body) => {
    if (!supabase) throw new Error('Supabase client is not configured');
    const { data: existing } = await supabase.from('blogs').select('*').eq('id', id).single();
    const { data, error } = await supabase
      .from('blogs').update(buildBlogRow(body, existing)).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    const formatted = formatBlog(data);
    setBlogs(prev => prev.map(b => b.id === id ? formatted : b));
    return formatted;
  }, []);

  const deleteBlog = useCallback(async (id) => {
    if (!supabase) throw new Error('Supabase client is not configured');
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw new Error(error.message);
    setBlogs(prev => prev.filter(b => b.id !== id));
  }, []);

  const getBlogById = useCallback(async (id) => {
    if (!supabase) return null;
    const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return formatBlog(data);
  }, []);

  return { blogs, loading, error, refetch: fetchBlogs, createBlog, updateBlog, deleteBlog, getBlogById };
}
