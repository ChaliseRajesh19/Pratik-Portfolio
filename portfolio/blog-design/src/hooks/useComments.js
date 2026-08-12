import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useComments — fetch & post comments for a blog post
 * @param {string} blogId — the blog post id
 */
export function useComments(blogId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!blogId) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const postComment = useCallback(async ({ authorName, text }) => {
    if (!blogId || !text?.trim()) return;
    setPosting(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([{
          blog_id: blogId,
          author_name: authorName?.trim() || 'Anonymous',
          text: text.trim(),
        }])
        .select()
        .single();
      if (error) throw error;
      setComments(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to post comment');
      throw err;
    } finally {
      setPosting(false);
    }
  }, [blogId]);

  const deleteComment = useCallback(async (commentId) => {
    if (!commentId) return;
    setDeletingCommentId(commentId);
    setError(null);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);
      if (error) throw error;
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.message || 'Failed to delete comment');
      throw err;
    } finally {
      setDeletingCommentId(null);
    }
  }, []);

  return {
    comments,
    loading,
    posting,
    deletingCommentId,
    error,
    postComment,
    deleteComment,
    refetch: fetchComments,
  };
}
