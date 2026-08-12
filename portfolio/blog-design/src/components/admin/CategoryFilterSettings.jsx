import React from 'react';
import { toast } from 'react-hot-toast';
import { useCategories } from '../../hooks/useCategories';

function CategoryFilterSettings({ refreshKey }) {
  const { categories, loading, refetch, updateCategoryFilter } = useCategories();
  const [savingId, setSavingId] = React.useState(null);

  React.useEffect(() => {
    refetch();
  }, [refreshKey, refetch]);

  const handleToggle = async (category, nextValue) => {
    setSavingId(category.id);
    try {
      await updateCategoryFilter(category.id, nextValue);
      toast.success(`${category.name} filter ${nextValue ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      toast.error(err.message || 'Failed to update filter setting');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Filter Settings
        </h1>
        <p className="max-w-2xl text-sm text-slate-400">
          Choose which portfolio categories should show the public image-title filter.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <svg className="h-8 w-8 animate-spin text-purple-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {categories.map((category) => {
            const enabled = category.showFilter !== false;
            const saving = savingId === category.id;

            return (
              <div
                key={category.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/80 text-xl">
                      {category.icon || '🎨'}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-slate-100">{category.name}</h3>
                      <p className="truncate text-xs text-slate-500">/{category.slug}/</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleToggle(category, !enabled)}
                  className={`relative flex h-11 w-full items-center rounded-full border px-1 transition sm:w-[132px] ${
                    enabled
                      ? 'border-cyan-400/30 bg-cyan-400/15 text-cyan-200'
                      : 'border-slate-700 bg-slate-900 text-slate-400'
                  } ${saving ? 'cursor-wait opacity-70' : 'hover:border-cyan-300/50'}`}
                  aria-pressed={enabled}
                >
                  <span
                    className={`absolute h-9 w-9 rounded-full bg-white shadow-lg transition-transform ${
                      enabled ? 'translate-x-[86px]' : 'translate-x-0'
                    }`}
                  />
                  <span className={`relative z-10 flex-1 text-center text-xs font-bold uppercase tracking-[0.16em] ${enabled ? 'text-cyan-100' : 'text-slate-500'}`}>
                    {enabled ? 'On' : 'Off'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryFilterSettings;
