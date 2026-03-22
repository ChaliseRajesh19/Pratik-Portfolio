import React from 'react'
import UploadCard from './UploadCard'
import DeleteConfirmModal from './DeleteConfirmModal'
import AdminModal from './AdminModal'
import UploadForm from './UploadForm'
import { toast } from 'react-hot-toast'
import { apiUrl } from '../../lib/api'

function UploadList({ category, categories, onCategoryChange, refreshKey, onAddWork }) {
  const [works, setWorks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [deleteWorkItem, setDeleteWorkItem] = React.useState(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const [editWorkItem, setEditWorkItem] = React.useState(null)

  // We should actually load ALL works if "All Categories" is selected.
  // The API endpoint /api/works/:category might not support 'All'.
  // We'll mimic 'All' by fetching without category if API allows, or handle via frontend filter if we have all.
  // For now, assuming the API fetches works based on category string, we'll continue using the existing logic
  // but let user search text within the displayed results.
  
  React.useEffect(() => {
    // If we want an "All Categories" option, we might pass an empty string to fetch all.
    // The previous implementation required a specific category to be selected.
    // Assuming backend /api/works returns all if no category param, or we can fetch a specific one.
    const fetchCategory = category === 'All Categories' ? '' : category;
    
    const controller = new AbortController()
    const loadWorks = async () => {
      setLoading(true)
      try {
        const url = fetchCategory 
          ? apiUrl(`/api/works/${fetchCategory}`)
          : apiUrl('/api/works')
          
        const response = await fetch(url, { signal: controller.signal })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to load works')
        
        setWorks(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name !== 'AbortError') toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWorks()
    return () => controller.abort()
  }, [category, refreshKey, isUploadOpen, editWorkItem])

  const handleDeleteConfirm = async () => {
    if (!deleteWorkItem?._id) return
    
    setIsDeleting(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(apiUrl(`/api/works/${deleteWorkItem._id}`), {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to delete work')
      
      setWorks(prev => prev.filter(item => item._id !== deleteWorkItem._id))
      toast.success('Work deleted successfully')
      setDeleteWorkItem(null)
    } catch (err) {
      toast.error(err.message || 'Error deleting work')
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredWorks = works.filter(w => 
    !search || 
    w.title?.toLowerCase().includes(search.toLowerCase()) ||
    w.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full w-full">
      {/* ── Dashboard-style Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Manage Portfolio Works
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="rounded-xl border border-slate-700 bg-[#0d131f] px-4 py-2.5 text-slate-200 outline-none focus:border-purple-400 min-w-[160px] cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            {categories.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          
          {/* Search Input */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65a7.5 7.5 0 111.06-1.06l-.06.06z"/>
                <circle cx="10.5" cy="10.5" r="7.5" fill="none" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search works..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-[#0d131f] pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:border-purple-400 w-full sm:w-[220px]"
            />
          </div>
          
          {/* + Add Work Button */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#b255ff] hover:bg-[#a044ec] shadow-lg shadow-purple-500/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="text-xl leading-none font-normal">+</span> Add Work
          </button>
        </div>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <svg className="animate-spin h-8 w-8 text-purple-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : filteredWorks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
          <div className="text-6xl mb-4">🗂️</div>
          <p className="text-slate-400">No works found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorks.map((work) => (
             <UploadCard 
               key={work._id} 
               work={work} 
               onDelete={() => setDeleteWorkItem(work)}
               onEdit={() => setEditWorkItem(work)}
             />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      <DeleteConfirmModal
        isOpen={!!deleteWorkItem}
        isDeleting={isDeleting}
        title="Delete Work"
        itemName={deleteWorkItem?.title}
        onClose={() => setDeleteWorkItem(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* ── Add / Edit Modal ── */}
      <AdminModal
        isOpen={isUploadOpen || !!editWorkItem}
        onClose={() => {
          setIsUploadOpen(false)
          setEditWorkItem(null)
        }}
        title={editWorkItem ? 'Edit Work' : 'Add New Work'}
      >
        <UploadForm 
          categories={categories}
          defaultCategory={category !== 'All Categories' ? category : ''}
          initialWork={editWorkItem}
          onUploaded={() => {
            setIsUploadOpen(false)
            setEditWorkItem(null)
          }}
          onCancel={() => {
            setIsUploadOpen(false)
            setEditWorkItem(null)
          }}
        />
      </AdminModal>
    </div>
  )
}

export default UploadList
