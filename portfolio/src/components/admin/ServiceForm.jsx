import React from 'react'
import { toast } from 'react-hot-toast'
import { apiUrl } from '../../lib/api'

function ServiceForm({ onCreated, initialService, onCancel }) {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [imageFile, setImageFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (initialService) {
            setTitle(initialService.title || '')
            setDescription(initialService.description || '')
        }
    }, [initialService])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all fields.')
            return
        }
        if (!initialService && !imageFile) {
            toast.error('Please select an image.')
            return
        }

        const formData = new FormData()
        formData.append('title', title.trim())
        formData.append('description', description.trim())
        if (imageFile) formData.append('image', imageFile)

        try {
            setLoading(true)
            const token = localStorage.getItem('adminToken')
            
            const method = initialService ? 'PUT' : 'POST'
            const url = initialService
                ? apiUrl(`/api/services/${initialService._id}`)
                : apiUrl('/api/services')

            const response = await fetch(url, {
                method: method,
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                body: formData
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || (initialService ? 'Failed to update service' : 'Failed to create service'))
            }

            toast.success(initialService ? 'Service updated successfully.' : 'Service created successfully.')
            if (!initialService) {
                setTitle('')
                setDescription('')
                setImageFile(null)
            }
            if (onCreated) onCreated()
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-3xl p-2">
            <h2 className="text-xl font-semibold hidden">New Service</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block text-sm font-medium text-slate-300">
                    Title
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring" />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                    Description
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring resize-none" />
                </label>
                <label className="block text-sm font-medium text-slate-300">
                    Service Icon/Image {initialService && <span className="text-slate-500 font-normal">(Leave empty to keep existing)</span>}
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="mt-2 w-full rounded-xl border border-dashed border-slate-700/80 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-400 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate-900" />
                </label>
                <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70">
                        {loading ? (initialService ? 'Updating...' : 'Creating...') : (initialService ? 'Update Service' : 'Create Service')}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-700/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ServiceForm
