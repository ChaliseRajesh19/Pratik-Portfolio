import React from 'react'
import { toast } from 'react-hot-toast'
import api, { getErrorMessage } from '../../lib/api'

const ICON_CHOICES = [
  '🎨','✏️','🖌️','📐','📏','🖊️','🗂️','🖼️','💡','⭐',
  '🔷','🔶','🟣','🔵','🟢','🌈','💎','🏆','📸','🎭'
]

function CategoryForm({ onCreated, initialCategory, onCancel }) {
    const [name, setName] = React.useState('')
    const [slug, setSlug] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [icon, setIcon] = React.useState('🎨')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (initialCategory) {
            setName(initialCategory.name || '')
            setSlug(initialCategory.slug || '')
            setDescription(initialCategory.description || '')
            setIcon(initialCategory.icon || '🎨')
        }
    }, [initialCategory])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!name.trim() || !slug.trim() || !description.trim()) {
            toast.error('Please fill in all fields.')
            return
        }

        try {
            setLoading(true)
            const payload = {
                name: name.trim(),
                slug: slug.trim().toLowerCase(),
                description: description.trim(),
                icon,
            }

            await (initialCategory
                ? api.put(`/api/categories/${initialCategory._id}`, payload)
                : api.post('/api/categories', payload))

            toast.success(initialCategory ? 'Category updated successfully.' : 'Category created successfully.')
            if (!initialCategory) {
                setName('')
                setSlug('')
                setDescription('')
                setIcon('🎨')
            }
            if (onCreated) onCreated()
        } catch (err) {
            toast.error(getErrorMessage(err, initialCategory ? 'Failed to update category' : 'Failed to create category'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto px-6 py-6 md:px-8">
            <div className="mb-6 max-w-5xl">
                <h2 className="text-2xl font-semibold">{initialCategory ? 'Edit category' : 'New category'}</h2>
                <p className="mt-2 text-sm text-slate-400">Set up the category name, slug, icon, and header description in a full-width workspace.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-5xl">
                {/* Icon picker */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category Icon</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {ICON_CHOICES.map(emoji => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => setIcon(emoji)}
                                className={`text-xl w-10 h-10 rounded-xl border transition flex items-center justify-center ${
                                    icon === emoji
                                        ? 'border-emerald-400 bg-emerald-400/15 scale-110 shadow-lg shadow-emerald-500/20'
                                        : 'border-slate-700/60 bg-slate-950/40 hover:border-slate-500'
                                }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-xs">Custom:</span>
                        <input
                            type="text"
                            value={icon}
                            onChange={e => setIcon(e.target.value)}
                            maxLength={4}
                            className="w-20 rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xl text-center outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
                        />
                        <span className="text-slate-500 text-xs">Selected: <span className="text-2xl">{icon}</span></span>
                    </div>
                </div>

                <label className="block text-sm font-medium text-slate-300">
                    Category Name
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value)
                        if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
                        }
                    }} required className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring" />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                    Slug ID
                    <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring" />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                    Header Description
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} placeholder="This text appears at the top of the category page..." className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring resize-none" />
                </label>

                <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70">
                        {loading ? (initialCategory ? 'Updating...' : 'Creating...') : (initialCategory ? 'Update Category' : 'Create Category')}
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

export default CategoryForm
