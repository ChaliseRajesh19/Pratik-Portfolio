import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getSupportedColumns } from '../lib/supabaseColumns';

const DEFAULT_CATEGORY_ICON = '🎨';

function formatCategory(row) {
  if (!row) return null;

  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    showFilter: row.show_filter !== false,
    displayOrder: Number.isFinite(Number(row.display_order)) ? Number(row.display_order) : 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function sortCategoriesList(items) {
  return [...items].sort((left, right) => {
    const orderDelta = (left.displayOrder || 0) - (right.displayOrder || 0);
    if (orderDelta !== 0) return orderDelta;
    return new Date(left.createdAt || 0).getTime() - new Date(right.createdAt || 0).getTime();
  });
}

/**
 * useCategories - fetch categories + full CRUD
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.from('categories').select('*');
      if (fetchError) throw fetchError;
      setCategories(sortCategoriesList((data || []).map(formatCategory)));
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(async ({
    name,
    slug,
    description,
    icon = DEFAULT_CATEGORY_ICON,
    displayOrder = 0,
    showFilter = true,
  }) => {
    const supportedColumns = await getSupportedColumns('categories', ['display_order', 'show_filter']);
    const insertData = { name, slug, description, icon };

    if (supportedColumns.display_order) {
      insertData.display_order = Number.isFinite(Number(displayOrder)) ? Number(displayOrder) : 0;
    }
    if (supportedColumns.show_filter) {
      insertData.show_filter = showFilter !== false;
    }

    const { data, error: insertError } = await supabase
      .from('categories')
      .insert([insertData])
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') throw new Error('Category slug already exists');
      throw new Error(insertError.message);
    }

    const formatted = formatCategory(data);
    setCategories((previousCategories) => sortCategoriesList([...previousCategories, formatted]));
    return formatted;
  }, []);

  const updateCategory = useCallback(async (id, {
    name,
    slug,
    description,
    icon,
    displayOrder = 0,
    showFilter = true,
  }) => {
    const supportedColumns = await getSupportedColumns('categories', ['display_order', 'show_filter']);
    const updateData = {
      name,
      slug,
      description,
      icon,
      updated_at: new Date().toISOString(),
    };

    if (supportedColumns.display_order) {
      updateData.display_order = Number.isFinite(Number(displayOrder)) ? Number(displayOrder) : 0;
    }
    if (supportedColumns.show_filter) {
      updateData.show_filter = showFilter !== false;
    }

    const { data, error: updateError } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);

    const formatted = formatCategory(data);
    setCategories((previousCategories) =>
      sortCategoriesList(previousCategories.map((category) => (category.id === id ? formatted : category)))
    );
    return formatted;
  }, []);

  const updateCategoryFilter = useCallback(async (id, showFilter) => {
    const supportedColumns = await getSupportedColumns('categories', ['show_filter']);
    if (!supportedColumns.show_filter) {
      throw new Error('Filter settings column is missing. Run the latest Supabase migration first.');
    }

    const { data, error: updateError } = await supabase
      .from('categories')
      .update({
        show_filter: showFilter !== false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);

    const formatted = formatCategory(data);
    setCategories((previousCategories) =>
      sortCategoriesList(previousCategories.map((category) => (category.id === id ? formatted : category)))
    );
    return formatted;
  }, []);

  const deleteCategory = useCallback(async (id) => {
    const { error: deleteError } = await supabase.from('categories').delete().eq('id', id);
    if (deleteError) throw new Error(deleteError.message);
    setCategories((previousCategories) => previousCategories.filter((category) => category.id !== id));
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    updateCategoryFilter,
    deleteCategory,
  };
}
