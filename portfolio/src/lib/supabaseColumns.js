import { supabase } from './supabase';

const supportCache = new Map();

export async function getSupportedColumns(table, columns) {
  const supportEntries = await Promise.all(
    columns.map(async (column) => {
      const cacheKey = `${table}:${column}`;
      if (supportCache.has(cacheKey)) {
        return [column, supportCache.get(cacheKey)];
      }

      const { error } = await supabase
        .from(table)
        .select(column, { head: true, count: 'exact' })
        .limit(1);

      const isSupported = !error;
      supportCache.set(cacheKey, isSupported);
      return [column, isSupported];
    })
  );

  return Object.fromEntries(supportEntries);
}
