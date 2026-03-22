import React from 'react'
import { toast } from 'react-hot-toast'
import BlogEditor from './BlogEditor'
import { apiUrl } from '../../lib/api'

function BlogForm({ onCreated, onUpdated, initialBlog, onCancelEdit, onCancel }) {
	const [title, setTitle] = React.useState('')
	const [author, setAuthor] = React.useState('')
	const [content, setContent] = React.useState('')
	const [tagsInput, setTagsInput] = React.useState('')
	const [excerpt, setExcerpt] = React.useState('')
	const [coverImage, setCoverImage] = React.useState(null)
	const [coverImagePreview, setCoverImagePreview] = React.useState('')
	const [status, setStatus] = React.useState('draft')
	const [loading, setLoading] = React.useState(false)
	const fileRef = React.useRef(null)

	const isEditing = Boolean(initialBlog?._id)

	React.useEffect(() => {
		if (initialBlog) {
			setTitle(initialBlog.title || '')
			setAuthor(initialBlog.author || '')
			setContent(initialBlog.content || '')
			setTagsInput(Array.isArray(initialBlog.tags) ? initialBlog.tags.join(', ') : '')
			setExcerpt(initialBlog.excerpt || '')
			setCoverImagePreview(initialBlog.coverImage || '')
			setStatus(initialBlog.status || 'draft')
		} else {
			setTitle('')
			setAuthor('')
			setContent('')
			setTagsInput('')
			setExcerpt('')
			setCoverImage(null)
			setCoverImagePreview('')
			setStatus('draft')
		}
	}, [initialBlog])

	const normalizeTags = (value) =>
		Array.from(
			new Set(
				value
					.split(',')
					.map((tag) => tag.trim().replace(/^#/, ''))
					.filter(Boolean)
			)
		)

	const handleImageChange = (e) => {
		const file = e.target.files?.[0]
		if (!file) return
		setCoverImage(file)
		setCoverImagePreview(URL.createObjectURL(file))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const tags = normalizeTags(tagsInput)
		if (!title.trim()) { toast.error('Title is required.'); return }
		if (!author.trim()) { toast.error('Author is required.'); return }
		if (!content.trim()) { toast.error('Content is required.'); return }

		try {
			setLoading(true)
			const token = localStorage.getItem('adminToken')

			let coverImageUrl = initialBlog?.coverImage || ''
			if (coverImage) {
				const formData = new FormData()
				formData.append('image', coverImage)
				const uploadRes = await fetch(apiUrl('/api/upload'), {
					method: 'POST',
					headers: token ? { Authorization: `Bearer ${token}` } : {},
					body: formData,
				})
				if (uploadRes.ok) {
					const uploadData = await uploadRes.json()
					coverImageUrl = uploadData.url || coverImageUrl
				}
			}

			const response = await fetch(
				isEditing
					? apiUrl(`/api/blogs/${initialBlog._id}`)
					: apiUrl('/api/blogs/create'),
				{
					method: isEditing ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
					body: JSON.stringify({
						title: title.trim(),
						author: author.trim(),
						content: content.trim(),
						tags,
						excerpt: excerpt.trim(),
						coverImage: coverImageUrl,
						status,
					}),
				}
			)

			const data = await response.json()
			if (!response.ok) throw new Error(data.message || 'Failed to save blog')

			if (isEditing) {
				toast.success('Blog post updated!')
				if (onUpdated) onUpdated()
			} else {
				toast.success('Blog post created!')
				setTitle(''); setAuthor(''); setContent(''); setTagsInput(''); setExcerpt('')
				setCoverImage(null); setCoverImagePreview(''); setStatus('draft')
				if (onCreated) onCreated()
			}
		} catch (err) {
			toast.error(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-[#0b0d1a] text-slate-100">
			{/* ── Top bar ── */}
			<div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-[#0e1020]">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onCancelEdit || onCancel}
						className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
					>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path d="M14 9H4M8 5l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
					<span className="text-sm font-semibold">{isEditing ? 'Edit Post' : 'Create Post'}</span>
					<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-700/60 text-slate-300">
						{status === 'published' ? 'Published' : 'Draft'}
					</span>
				</div>
				<div className="flex items-center gap-2">
					{(onCancelEdit || onCancel) && (
						<button
							type="button"
							onClick={onCancelEdit || onCancel}
							className="px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 hover:border-slate-500 transition-colors"
						>
							Cancel
						</button>
					)}
					<button
						form="blog-form"
						type="submit"
						disabled={loading}
						className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-colors disabled:opacity-60"
					>
						{loading ? (isEditing ? 'Saving...' : 'Creating...') : isEditing ? 'Save Changes' : 'Create'}
					</button>
				</div>
			</div>

			{/* ── Two-column layout ── */}
			<form id="blog-form" onSubmit={handleSubmit} className="flex gap-0 h-[calc(100vh-57px)]">

				{/* LEFT — Editor */}
				<div className="flex-1 overflow-y-auto px-8 py-6">
					{/* Title */}
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add Title"
						className="w-full bg-transparent text-2xl font-bold text-white placeholder:text-slate-600 outline-none border-none mb-4"
						required
					/>

					{/* Rich text editor */}
					<div className="border border-slate-800/60 rounded-xl overflow-hidden">
						<BlogEditor value={content} onChange={setContent} />
					</div>
				</div>

				{/* RIGHT — Settings sidebar */}
				<div className="w-72 shrink-0 border-l border-slate-800/70 overflow-y-auto bg-[#0e1020]">
					{/* Settings header */}
					<div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800/70">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="6" stroke="#a78bfa" strokeWidth="1.5"/>
							<path d="M8 5v3l2 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
						</svg>
						<span className="text-xs font-bold uppercase tracking-widest text-violet-300">Settings</span>
					</div>

					<div className="px-5 py-5 space-y-6">

						{/* Status & Visibility */}
						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Status &amp; Visibility</p>
							<label className="block text-xs text-slate-400 mb-1">Post Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-200 px-3 py-2 outline-none focus:border-violet-500/50"
							>
								<option value="draft">Draft</option>
								<option value="published">Published</option>
							</select>
						</div>

						{/* Organization */}
						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Organization</p>
							<label className="block text-xs text-slate-400 mb-1">Category (Tags)</label>
							<input
								type="text"
								value={tagsInput}
								onChange={(e) => setTagsInput(e.target.value)}
								placeholder="e.g. Design, Branding"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-200 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-600"
							/>
							{normalizeTags(tagsInput).length > 0 && (
								<div className="flex flex-wrap gap-1.5 mt-2">
									{normalizeTags(tagsInput).map((tag) => (
										<span key={tag} className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-[10px] text-violet-300 font-bold uppercase tracking-wide">
											{tag}
										</span>
									))}
								</div>
							)}
							<label className="block text-xs text-slate-400 mt-3 mb-1">Author</label>
							<input
								type="text"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								placeholder="e.g. Pratik"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-200 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-600"
								required
							/>
						</div>

						{/* Featured Image */}
						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Featured Image</p>
							<input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
							<button
								type="button"
								onClick={() => fileRef.current?.click()}
								className="w-full rounded-xl border-2 border-dashed border-slate-700 hover:border-violet-500/40 bg-slate-900/50 transition-colors overflow-hidden"
							>
								{coverImagePreview ? (
									<img src={coverImagePreview} alt="Cover" className="w-full h-36 object-cover"/>
								) : (
									<div className="flex flex-col items-center justify-center py-8 gap-2">
										<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
											<rect x="2" y="6" width="24" height="18" rx="3" stroke="#7c3aed" strokeWidth="1.5"/>
											<path d="M9 13l4 4 6-7" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span className="text-xs font-bold text-slate-400">Upload</span>
										<span className="text-[10px] text-slate-600">PNG, JPG or WebP</span>
									</div>
								)}
							</button>
							<p className="text-[10px] text-violet-400/70 mt-1.5">Required for SEO</p>
						</div>

						{/* Excerpt */}
						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Excerpt</p>
							<textarea
								value={excerpt}
								onChange={(e) => setExcerpt(e.target.value)}
								placeholder="Write a short summary..."
								rows={4}
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-200 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-600 resize-none"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default BlogForm
