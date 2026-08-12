import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronUp, 
  ChevronDown, 
  Pencil, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff,
  PlusCircle
} from 'lucide-react';
import EmptyState from './EmptyState';

export default function DataTable({
  columns,
  data = [],
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  searchQuery = '',
  searchKeys = [],
  isLoading = false,
  emptyTitle = 'No items found',
  emptyDescription = 'Get started by creating a new item.',
  onCreateNew,
  selectedIds = new Set(),
  onSelectToggle,
  onSelectAll
}) {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => {
      return searchKeys.some((key) => {
        const val = item[key];
        return val && String(val).toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, searchQuery, searchKeys]);

  // Sort
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  };

  const renderStatus = (val) => {
    const isPublished = val === 'Published' || val === true || val === 'published';
    if (isPublished) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Published
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
        Draft
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-4 h-4 bg-zinc-800 animate-pulse rounded" />
              {columns.map((_, j) => (
                <div key={j} className="h-6 bg-zinc-800 animate-pulse rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && !searchQuery) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Create New"
        onAction={onCreateNew}
        icon={PlusCircle}
      />
    );
  }

  const getItemId = (item) => item.id ?? item.slug ?? item.title;

  const allSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.has(getItemId(item)));
  const someSelected = paginatedData.some(item => selectedIds.has(getItemId(item))) && !allSelected;

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400 border-collapse">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
            <tr>
              {onSelectToggle && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500"
                    checked={allSelected}
                    ref={input => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-medium ${col.sortable ? 'cursor-pointer select-none hover:text-zinc-200 group' : ''}`}
                  onClick={() => col.sortable ? requestSort(col.key) : null}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortConfig?.key === col.key && (
                      <motion.div
                        initial={{ rotate: sortConfig.direction === 'asc' ? 180 : 0 }}
                        animate={{ rotate: sortConfig.direction === 'asc' ? 0 : 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronUp size={14} />
                      </motion.div>
                    )}
                    {col.sortable && sortConfig?.key !== col.key && (
                      <ChevronDown size={14} className="opacity-0 group-hover:opacity-50" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={getItemId(item)}
                  className="group hover:bg-zinc-800/50 transition-colors"
                >
                  {onSelectToggle && (
                    <td className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        className="rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500"
                        checked={selectedIds.has(getItemId(item))}
                        onChange={() => onSelectToggle(getItemId(item))}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                      {col.render 
                        ? col.render(item[col.key], item)
                        : col.key === 'status' 
                          ? renderStatus(item[col.key])
                          : item[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onToggleStatus && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onToggleStatus(item)}
                          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 rounded transition-colors"
                          title="Toggle Status"
                        >
                          {(item.status === 'Published' || item.status === true || item.status === 'published') ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </motion.button>
                      )}
                      {onEdit && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onEdit(item)}
                          className="p-1.5 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-700 rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </motion.button>
                      )}
                      {onDuplicate && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onDuplicate(item)}
                          className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700 rounded transition-colors"
                          title="Duplicate"
                        >
                          <Copy size={16} />
                        </motion.button>
                      )}
                      {onDelete && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onDelete(item)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (onSelectToggle ? 2 : 1)} className="px-4 py-8 text-center text-zinc-500">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-t border-zinc-800 text-sm">
          <div className="text-zinc-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
