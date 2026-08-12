import React from 'react'
import { toast } from 'react-hot-toast'
import DeleteConfirmModal from './DeleteConfirmModal'
import AdminModal from './AdminModal'
import TestimonialForm from './TestimonialForm'
import { useTestimonials } from '../../hooks/useTestimonials'

function StarBadge({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-700'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function AvatarFallback({ name }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
      {initials}
    </div>
  )
}

function TestimonialList({ refreshKey }) {
  const { testimonials, loading, deleteTestimonial, refetch } = useTestimonials()
  const [search, setSearch] = React.useState('')
  const [deleteItem, setDeleteItem] = React.useState(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [editItem, setEditItem] = React.useState(null)

  React.useEffect(() => { refetch() }, [refreshKey])

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return
    setIsDeleting(true)
    try {
      await deleteTestimonial(deleteItem._id)
      toast.success('Testimonial deleted')
      setDeleteItem(null)
    } catch (err) {
      toast.error(err.message || 'Failed to delete')
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = testimonials.filter(t =>
    !search ||
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.role?.toLowerCase().includes(search.toLowerCase()) ||
    t.text?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Manage Testimonials
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65a7.5 7.5 0 111.06-1.06l-.06.06z" />
                <circle cx="10.5" cy="10.5" r="7.5" fill="none" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search testimonials..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-[#0d131f] pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:border-purple-400 w-full sm:w-[220px]"
            />
          </div>

          {/* Add button */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#b255ff] hover:bg-[#a044ec] shadow-lg shadow-purple-500/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="text-xl leading-none font-normal">+</span> Add Testimonial
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <svg className="animate-spin h-8 w-8 text-purple-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-slate-400">No testimonials yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(t => (
            <div
              key={t._id}
              className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5 flex flex-col gap-3"
            >
              {/* Stars */}
              <StarBadge rating={t.rating} />

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-slate-800/60">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 flex-shrink-0"
                  />
                ) : (
                  <AvatarFallback name={t.name} />
                )}
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-slate-500 text-xs truncate">{t.role}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setEditItem(t)}
                  className="flex-1 rounded-full border border-slate-600/60 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteItem(t)}
                  className="flex-1 rounded-full border border-rose-400/40 px-4 py-1.5 text-xs font-semibold text-rose-200 transition hover:border-rose-400/70"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteItem}
        isDeleting={isDeleting}
        title="Delete Testimonial"
        itemName={deleteItem?.name}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Add / Edit modal */}
      <AdminModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => { setIsAddOpen(false); setEditItem(null) }}
        title={editItem ? 'Edit Testimonial' : 'Add Testimonial'}
        contentClassName="h-full"
      >
        <TestimonialForm
          initialTestimonial={editItem}
          onCreated={() => { setIsAddOpen(false); setEditItem(null); refetch() }}
          onCancel={() => { setIsAddOpen(false); setEditItem(null) }}
        />
      </AdminModal>
    </div>
  )
}

export default TestimonialList
