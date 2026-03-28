import React from 'react'
import { toast } from 'react-hot-toast'
import { useTestimonials } from '../../hooks/useTestimonials'
import { getErrorMessage } from '../../lib/api'

const STAR_COUNT = 5

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1 mt-2">
      {Array.from({ length: STAR_COUNT }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <svg
            className={`w-7 h-7 ${i < value ? 'text-amber-400 fill-amber-400' : 'text-slate-600 fill-slate-700'} transition-colors`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm text-slate-400 self-center">{value} / {STAR_COUNT}</span>
    </div>
  )
}

function TestimonialForm({ onCreated, initialTestimonial, onCancel }) {
  const { createTestimonial, updateTestimonial } = useTestimonials()

  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState('')
  const [rating, setRating] = React.useState(5)
  const [text, setText] = React.useState('')
  const [avatarFile, setAvatarFile] = React.useState(null)
  const [avatarPreview, setAvatarPreview] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (initialTestimonial) {
      setName(initialTestimonial.name || '')
      setRole(initialTestimonial.role || '')
      setRating(initialTestimonial.rating ?? 5)
      setText(initialTestimonial.text || '')
      setAvatarPreview(initialTestimonial.avatarUrl || null)
    }
  }, [initialTestimonial])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setAvatarFile(file)
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !role.trim() || !text.trim()) {
      toast.error('Please fill in Name, Role, and Quote.')
      return
    }

    try {
      setLoading(true)
      if (initialTestimonial) {
        await updateTestimonial(initialTestimonial._id, {
          name: name.trim(),
          role: role.trim(),
          rating,
          text: text.trim(),
          avatarFile,
        })
        toast.success('Testimonial updated!')
      } else {
        await createTestimonial({
          name: name.trim(),
          role: role.trim(),
          rating,
          text: text.trim(),
          avatarFile,
        })
        toast.success('Testimonial created!')
        setName(''); setRole(''); setRating(5); setText('')
        setAvatarFile(null); setAvatarPreview(null)
      }
      if (onCreated) onCreated()
    } catch (err) {
      toast.error(getErrorMessage(err, initialTestimonial ? 'Failed to update' : 'Failed to create'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full overflow-y-auto px-6 py-6 md:px-8">
      <div className="mb-6 max-w-2xl">
        <h2 className="text-2xl font-semibold">
          {initialTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Add a client review that will appear on the homepage testimonials section.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

        {/* Avatar image upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Client Photo {initialTestimonial && (
              <span className="text-slate-500 font-normal">(Leave empty to keep existing)</span>
            )}
          </label>
          <div className="flex items-center gap-5">
            {/* Preview */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 flex items-center justify-center flex-shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-xl border border-dashed border-slate-700/80 bg-slate-950/40 px-4 py-3 text-sm text-slate-200
                file:mr-4 file:rounded-full file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white
                hover:file:bg-purple-400 transition"
            />
          </div>
        </div>

        {/* Name */}
        <label className="block text-sm font-medium text-slate-300">
          Client Name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Emily Watson"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
          />
        </label>

        {/* Role */}
        <label className="block text-sm font-medium text-slate-300">
          Role / Company
          <input
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            placeholder="e.g. Marketing Director, PixelCo"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
          />
        </label>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-300">Rating</label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Quote */}
        <label className="block text-sm font-medium text-slate-300">
          Quote / Review
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            required
            rows={4}
            placeholder="Write the client's testimonial here..."
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring resize-none"
          />
        </label>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? (initialTestimonial ? 'Updating...' : 'Creating...')
              : (initialTestimonial ? 'Update Testimonial' : 'Create Testimonial')}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-700/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TestimonialForm
