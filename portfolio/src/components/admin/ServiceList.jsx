import React from 'react'
import { toast } from 'react-hot-toast'
import DeleteConfirmModal from './DeleteConfirmModal'
import AdminModal from './AdminModal'
import ServiceForm from './ServiceForm'

function ServiceList({ refreshKey }) {
    const [services, setServices] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [deleteItem, setDeleteItem] = React.useState(null)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [isUploadOpen, setIsUploadOpen] = React.useState(false)
    const [editItem, setEditItem] = React.useState(null)

    const loadServices = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`)
                const data = await response.json()
                if (!response.ok) throw new Error(data.message || 'Failed to load services')
                setServices(data)
            } catch (err) {
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }

    React.useEffect(() => {
        loadServices()
    }, [refreshKey, isUploadOpen, editItem])

    const handleDeleteConfirm = async () => {
        if (!deleteItem) return
        setIsDeleting(true)
        try {
            const token = localStorage.getItem('adminToken')
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services/${deleteItem._id}`, {
                method: 'DELETE',
                headers: token ? { Authorization: `Bearer ${token}` } : undefined
            })
            if (!response.ok) throw new Error('Failed to delete service')
            setServices(prev => prev.filter(s => s._id !== deleteItem._id))
            toast.success('Service deleted successfully')
            setDeleteItem(null)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setIsDeleting(false)
        }
    }

    const filteredServices = services.filter(s => 
        !search || 
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex flex-col h-full w-full">
            {/* ── Dashboard-style Header ── */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Manage Services
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
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
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl border border-slate-700 bg-[#0d131f] pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:border-purple-400 w-full sm:w-[220px]"
                        />
                    </div>
                    
                    {/* + Add Service Button */}
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#b255ff] hover:bg-[#a044ec] shadow-lg shadow-purple-500/20 transition-all active:scale-95 whitespace-nowrap"
                    >
                        <span className="text-xl leading-none font-normal">+</span> Add Service
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
            ) : filteredServices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
                    <div className="text-6xl mb-4">🛠️</div>
                    <p className="text-slate-400">No services found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredServices.map(service => (
                        <div key={service._id} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5 flex flex-col items-center text-center">
                            <img src={service.imageURL.startsWith('http') ? service.imageURL : `${import.meta.env.VITE_API_URL}${service.imageURL}`} alt={service.title} className="w-16 h-16 object-cover rounded-xl mb-4" />
                            <h3 className="text-base font-semibold text-slate-100">{service.title}</h3>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => setEditItem(service)} className="rounded-full border border-slate-600/60 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-400">
                                    Edit
                                </button>
                                <button onClick={() => setDeleteItem(service)} className="rounded-full border border-rose-400/40 px-4 py-1.5 text-xs font-semibold text-rose-200 transition hover:border-rose-400/70">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <DeleteConfirmModal
                isOpen={!!deleteItem}
                isDeleting={isDeleting}
                title="Delete Service"
                itemName={deleteItem?.title}
                onClose={() => setDeleteItem(null)}
                onConfirm={handleDeleteConfirm}
            />
            
            {/* ── Add / Edit Modal ── */}
            <AdminModal
                isOpen={isUploadOpen || !!editItem}
                onClose={() => {
                    setIsUploadOpen(false)
                    setEditItem(null)
                }}
                title={editItem ? 'Edit Service' : 'Add New Service'}
            >
                <ServiceForm 
                    initialService={editItem}
                    onCreated={() => {
                        setIsUploadOpen(false)
                        setEditItem(null)
                        loadServices()
                    }}
                    onCancel={() => {
                        setIsUploadOpen(false)
                        setEditItem(null)
                    }}
                />
            </AdminModal>
        </div>
    )
}

export default ServiceList
