import React from 'react'
import { toast } from 'react-hot-toast'
import BlogEditor from './BlogEditor'
import { useBlogs } from '../../hooks/useBlogs'
import { uploadFile } from '../../lib/storage'

const BLOG_CATEGORIES = [
	'General',
	'Branding',
	'Logo Design',
	'Brand Identity',
	'UI/UX',
	'Print Design',
	'Social Media',
	'Video Editing',
	'Motion Graphics',
	'Case Study',
	'Tutorial',
	'Industry Insights',
]

const BLOG_STATUSES = [
	{ value: 'draft', label: 'Draft' },
	{ value: 'published', label: 'Published' },
]

function toDateTimeLocal(value) {
	if (!value) return ''
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return ''
	const offset = date.getTimezoneOffset()
	const localDate = new Date(date.getTime() - offset * 60000)
	return localDate.toISOString().slice(0, 16)
}

function stripHtml(value = '') {
	return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function BlogForm({ onCreated, onUpdated, initialBlog, onCancelEdit, onCancel }) {
	const { createBlog, updateBlog } = useBlogs()
	const [title, setTitle] = React.useState('')
	const [author, setAuthor] = React.useState('')
	const [slug, setSlug] = React.useState('')
	const [category, setCategory] = React.useState('General')
	const [content, setContent] = React.useState('')
	const [tagsInput, setTagsInput] = React.useState('')
	const [excerpt, setExcerpt] = React.useState('')
	const [coverImage, setCoverImage] = React.useState(null)
	const [coverImagePreview, setCoverImagePreview] = React.useState('')
	const [coverImageAlt, setCoverImageAlt] = React.useState('')
	const [status, setStatus] = React.useState('draft')
	const [featured, setFeatured] = React.useState(false)
	const [seoTitle, setSeoTitle] = React.useState('')
	const [seoDescription, setSeoDescription] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const fileRef = React.useRef(null)

	const isEditing = Boolean(initialBlog?._id)

	React.useEffect(() => {
		if (initialBlog) {
			setTitle(initialBlog.title || '')
			setAuthor(initialBlog.author || '')
			setSlug(initialBlog.slug || '')
			setCategory(initialBlog.category || 'General')
			setContent(initialBlog.content || '')
			setTagsInput(Array.isArray(initialBlog.tags) ? initialBlog.tags.join(', ') : '')
			setExcerpt(initialBlog.excerpt || '')
			setCoverImage(null)
			setCoverImagePreview(initialBlog.coverImage || '')
			setCoverImageAlt(initialBlog.coverImageAlt || '')
			setStatus(initialBlog.status || 'draft')
			setFeatured(Boolean(initialBlog.featured))
			setSeoTitle(initialBlog.seoTitle || '')
			setSeoDescription(initialBlog.seoDescription || '')
		} else {
			setTitle('')
			setAuthor('')
			setSlug('')
			setCategory('General')
			setContent('')
			setTagsInput('')
			setExcerpt('')
			setCoverImage(null)
			setCoverImagePreview('')
			setCoverImageAlt('')
			setStatus('draft')
			setFeatured(false)
			setSeoTitle('')
			setSeoDescription('')
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
		const plainContent = stripHtml(content)
		if (!title.trim()) { toast.error('Title is required.'); return }
		if (!author.trim()) { toast.error('Author is required.'); return }
		if (!plainContent.trim()) { toast.error('Content is required.'); return }

		try {
			setLoading(true)
			let coverImageUrl = initialBlog?.coverImage || ''
			if (coverImage) {
				const toastId = toast.loading('Uploading cover image...')
				try {
					coverImageUrl = await uploadFile(coverImage, 'blog-images')
				} catch (err) {
					toast.dismiss(toastId)
					throw new Error('Image upload failed: ' + err.message)
				}
				toast.dismiss(toastId)
			}

			const payload = {
				title: title.trim(),
				author: author.trim(),
				slug: slug.trim(),
				category: category.trim() || 'General',
				content: content.trim(),
				tags,
				excerpt: excerpt.trim() || plainContent.slice(0, 180),
				coverImage: coverImageUrl,
				coverImageAlt: coverImageAlt.trim(),
				status,
				featured,
				seoTitle: seoTitle.trim(),
				seoDescription: seoDescription.trim(),
			}

			if (isEditing) {
				await updateBlog(initialBlog._id, payload)
				toast.success('Blog post updated!')
				if (onUpdated) onUpdated()
			} else {
				await createBlog(payload)
				toast.success('Blog post created!')
				if (onCreated) onCreated()
			}
		} catch (err) {
			toast.error(err.message || 'Failed to save blog')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="h-full bg-[#0b0d1a] text-slate-100">
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
						{status}
					</span>
					{featured && (
						<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/25">
							Featured
						</span>
					)}
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

			<form id="blog-form" onSubmit={handleSubmit} className="flex h-[calc(94vh-57px)] min-h-0 gap-0">
				<div className="flex-1 overflow-y-auto px-8 py-6 min-w-0">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add Title"
						className="w-full bg-transparent text-2xl font-bold text-white placeholder:text-slate-500 outline-none border-none mb-4"
						required
					/>

					<div className="grid gap-4 md:grid-cols-2 mb-5">
						<input
							type="text"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							placeholder="custom-blog-slug"
							className="w-full rounded-lg border border-slate-700/60 bg-slate-900/90 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
						/>
						<input
							list="blog-category-options"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="Category"
							className="w-full rounded-lg border border-slate-700/60 bg-slate-900/90 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
						/>
						<datalist id="blog-category-options">
							{BLOG_CATEGORIES.map((item) => (
								<option key={item} value={item} />
							))}
						</datalist>
					</div>

					<div className="rounded-xl">
						<BlogEditor value={content} onChange={setContent} />
					</div>
				</div>

				<div className="w-[380px] shrink-0 border-l border-slate-800/70 overflow-y-auto bg-[#0e1020]">
					<div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800/70">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="6" stroke="#a78bfa" strokeWidth="1.5"/>
							<path d="M8 5v3l2 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
						</svg>
						<span className="text-xs font-bold uppercase tracking-widest text-violet-300">Settings</span>
					</div>

					<div className="px-5 py-5 space-y-6">
						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Publishing</p>
							<label className="block text-xs text-slate-400 mb-1">Post Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50"
							>
								{BLOG_STATUSES.map((option) => (
									<option key={option.value} value={option.value}>{option.label}</option>
								))}
							</select>

							<label className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2.5">
								<div>
									<p className="text-sm font-semibold text-slate-100">Featured Post</p>
									<p className="text-[11px] text-slate-400">Push this post higher in blog listings.</p>
								</div>
								<input
									type="checkbox"
									checked={featured}
									onChange={(e) => setFeatured(e.target.checked)}
									className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500/40"
								/>
							</label>
						</div>

						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Organization</p>
							<label className="block text-xs text-slate-400 mb-1">Category</label>
							<input
								list="blog-category-sidebar-options"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder="e.g. Branding"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
							/>
							<datalist id="blog-category-sidebar-options">
								{BLOG_CATEGORIES.map((item) => (
									<option key={item} value={item} />
								))}
							</datalist>

							<label className="block text-xs text-slate-400 mt-3 mb-1">Tags</label>
							<input
								type="text"
								value={tagsInput}
								onChange={(e) => setTagsInput(e.target.value)}
								placeholder="e.g. Design, Branding, Tips"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
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
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
								required
							/>
						</div>

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
										<span className="text-xs font-bold text-slate-300">Upload</span>
										<span className="text-[10px] text-slate-500">PNG, JPG or WebP</span>
									</div>
								)}
							</button>
							<label className="block text-xs text-slate-400 mt-3 mb-1">Image Alt Text</label>
							<input
								type="text"
								value={coverImageAlt}
								onChange={(e) => setCoverImageAlt(e.target.value)}
								placeholder="Describe the cover image"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
							/>
						</div>

						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Summary</p>
							<textarea
								value={excerpt}
								onChange={(e) => setExcerpt(e.target.value)}
								placeholder="Write a short summary..."
								rows={4}
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500 resize-none"
							/>
						</div>

						<div>
							<p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">SEO</p>
							<label className="block text-xs text-slate-400 mb-1">SEO Title</label>
							<input
								type="text"
								value={seoTitle}
								onChange={(e) => setSeoTitle(e.target.value)}
								placeholder="Optional search title"
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500"
							/>
							<label className="block text-xs text-slate-400 mt-3 mb-1">SEO Description</label>
							<textarea
								value={seoDescription}
								onChange={(e) => setSeoDescription(e.target.value)}
								placeholder="Optional search description"
								rows={3}
								className="w-full rounded-lg border border-slate-700/60 bg-slate-900 text-sm text-slate-100 px-3 py-2 outline-none focus:border-violet-500/50 placeholder:text-slate-500 resize-none"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default BlogForm
