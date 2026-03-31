import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../lib/storage';
import { getSupportedColumns } from '../lib/supabaseColumns';

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
    videoURL: row.video_url || '',
    previewImage: row.preview_image || '',
    galleryImages: row.gallery_images || [],
    displayOrder: Number.isFinite(Number(row.display_order)) ? Number(row.display_order) : 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function sortWorksList(items) {
  return [...items].sort((left, right) => {
    const orderDelta = (left.displayOrder || 0) - (right.displayOrder || 0);
    if (orderDelta !== 0) return orderDelta;
    return new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime();
  });
}

async function uploadOrderedImages(imageItems) {
  if (!imageItems?.length) {
    throw new Error('At least one image is required');
  }

  return Promise.all(
    imageItems.map((item, index) => {
      if (item.kind === 'existing') {
        return item.url;
      }

      return uploadFile(item.file, BUCKET, index === 0 ? 'works' : 'gallery');
    })
  );
}

/**
 * useWorks - fetch works with optional category filter + full CRUD
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
      let query = supabase.from('works').select('*');
      if (category) query = query.eq('category', category);

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      setWorks(sortWorksList((data || []).map(formatWork)));
    } catch (err) {
      setError(err.message || 'Failed to fetch works');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  const createWork = useCallback(async ({
    headline,
    category: workCategory,
    imageItems = [],
    videoUrl = '',
    displayOrder = 0,
  }) => {
    const supportedColumns = await getSupportedColumns('works', ['video_url', 'display_order']);
    const orderedImageUrls = await uploadOrderedImages(imageItems);

    const insertData = {
      title: headline,
      headline,
      category: workCategory,
      image_url: orderedImageUrls[0],
      gallery_images: orderedImageUrls.slice(1),
    };

    if (supportedColumns.video_url) {
      insertData.video_url = videoUrl;
    }

    if (supportedColumns.display_order) {
      insertData.display_order = Number.isFinite(Number(displayOrder)) ? Number(displayOrder) : 0;
    }

    const { data, error: insertError } = await supabase
      .from('works')
      .insert([insertData])
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);

    const formatted = formatWork(data);
    setWorks((previousWorks) => sortWorksList([formatted, ...previousWorks]));
    return formatted;
  }, []);

  const updateWork = useCallback(async (id, {
    headline,
    category: workCategory,
    imageItems = [],
    videoUrl,
    displayOrder = 0,
  }) => {
    const supportedColumns = await getSupportedColumns('works', ['video_url', 'display_order']);
    const orderedImageUrls = await uploadOrderedImages(imageItems);

    const updateData = {
      title: headline,
      headline,
      category: workCategory,
      image_url: orderedImageUrls[0],
      gallery_images: orderedImageUrls.slice(1),
      updated_at: new Date().toISOString(),
    };

    if (supportedColumns.video_url && videoUrl !== undefined) {
      updateData.video_url = videoUrl;
    }

    if (supportedColumns.display_order) {
      updateData.display_order = Number.isFinite(Number(displayOrder)) ? Number(displayOrder) : 0;
    }

    const { data, error: updateError } = await supabase
      .from('works')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);

    const formatted = formatWork(data);
    setWorks((previousWorks) =>
      sortWorksList(previousWorks.map((work) => (work.id === id ? formatted : work)))
    );
    return formatted;
  }, []);

  const deleteWork = useCallback(async (id) => {
    const { error: deleteError } = await supabase.from('works').delete().eq('id', id);
    if (deleteError) throw new Error(deleteError.message);
    setWorks((previousWorks) => previousWorks.filter((work) => work.id !== id));
  }, []);

  return { works, loading, error, refetch: fetchWorks, createWork, updateWork, deleteWork };
}
