import React from 'react'
import { toast } from 'react-hot-toast'
import DeleteConfirmModal from './DeleteConfirmModal'
import AdminModal from './AdminModal'
import BlogForm from './BlogForm'
import api, { assetUrl, getErrorMessage } from '../../lib/api'

function BlogList({ refreshKey, onEdit }) {
	const [blogs, setBlogs] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [search, setSearch] = React.useState('')
	const [deleteItem, setDeleteItem] = React.useState(null)
	const [isDeleting, setIsDeleting] = React.useState(false)
	const [isUploadOpen, setIsUploadOpen] = React.useState(false)
	const [editItem, setEditItem] = React.useState(null)

	const loadBlogs = async () => {
			setLoading(true)
			try {
				const { data } = await api.get('/api/blogs')
				setBlogs(data)
			} catch (err) {
				toast.error(getErrorMessage(err, 'Failed to load blogs'))
			} finally {
				setLoading(false)
			}
		}

	React.useEffect(() => {
		loadBlogs()
	}, [refreshKey, isUploadOpen, editItem])

	const handleDeleteConfirm = async () => {
		if (!deleteItem) return
		setIsDeleting(true)
		try {
			await api.delete(`/api/blogs/${deleteItem._id}`)
			setBlogs((prev) => prev.filter((item) => item._id !== deleteItem._id))
			toast.success('Blog deleted successfully')
			setDeleteItem(null)
		} catch (err) {
			toast.error(getErrorMessage(err, 'Failed to delete blog'))
		} finally {
			setIsDeleting(false)
		}
	}

	const formatDate = (value) => {
		if (!value) return ''
		const parsed = new Date(value)
		if (Number.isNaN(parsed.getTime())) return ''
		return parsed.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric'
		})
	}

	const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ')

	const filteredBlogs = blogs.filter(b => 
		!search || 
		b.title?.toLowerCase().includes(search.toLowerCase()) ||
		b.content?.toLowerCase().includes(search.toLowerCase()) ||
		b.author?.toLowerCase().includes(search.toLowerCase()) ||
		b.category?.toLowerCase().includes(search.toLowerCase()) ||
		b.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
		b.slug?.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="flex flex-col h-full w-full">
			{/* ── Dashboard-style Header ── */}
			<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
				<h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
					Manage Blogs
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
							placeholder="Search blogs..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="rounded-xl border border-slate-700 bg-[#0d131f] pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:border-purple-400 w-full sm:w-[220px]"
						/>
					</div>
					
					{/* + Add Blog Button */}
					<button
						onClick={() => setIsUploadOpen(true)}
						className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#b255ff] hover:bg-[#a044ec] shadow-lg shadow-purple-500/20 transition-all active:scale-95 whitespace-nowrap"
					>
						<span className="text-xl leading-none font-normal">+</span> Create Blog
					</button>
				</div>
			</div>

			{/* ── List ── */}
			{loading ? (
				<div className="flex items-center justify-center py-20 text-slate-400">
					<svg className="animate-spin h-8 w-8 text-purple-400" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
					</svg>
				</div>
			) : filteredBlogs.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-center border border-slate-800 rounded-3xl bg-slate-900/30">
					<div className="text-6xl mb-4">✍️</div>
					<p className="text-slate-400">No blogs found.</p>
				</div>
			) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredBlogs.map((blog) => (
							<div
								key={blog._id}
								className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5"
							>
								{blog.coverImage ? (
									<img
										src={assetUrl(blog.coverImage)}
										alt={blog.title}
										className="mb-4 h-40 w-full rounded-xl object-cover"
									/>
								) : null}
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div>
										<h3 className="text-base font-semibold text-slate-100">{blog.title}</h3>
										<p className="mt-1 text-xs text-slate-400">
											{blog.author || 'Unknown author'}
											{blog.date ? ` • ${formatDate(blog.date)}` : ''}
										</p>
									</div>
									<div className="flex flex-wrap items-center gap-2 justify-end">
										{blog.featured ? (
											<span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-amber-400/30 bg-amber-400/10 text-amber-300">
												Featured
											</span>
										) : null}
										<span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
											blog.status === 'published'
												? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
												: blog.status === 'archived'
													? 'border border-rose-400/25 bg-rose-400/10 text-rose-300'
													: 'border border-slate-700/70 bg-slate-800/70 text-slate-300'
										}`}>
											{blog.status || 'draft'}
										</span>
									</div>
								</div>
								<div className="mt-3 flex flex-wrap items-center gap-2">
									<span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300">
										{blog.category || 'General'}
									</span>
									{blog.slug ? (
										<span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-400">
											/{blog.slug}
										</span>
									) : null}
								</div>
								
								<div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
									<button
										type="button"
										onClick={() => setEditItem(blog)}
										className="flex-1 rounded-lg border border-slate-600/60 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-400 hover:bg-slate-800/50 text-center"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => setDeleteItem(blog)}
										className="flex-1 rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:bg-rose-500/10 text-center"
									>
										Delete
									</button>
								</div>
								<p className="mt-3 text-sm text-slate-400">
									{(blog.excerpt || stripHtml(blog.content || '')).slice(0, 160)}
									{(blog.excerpt || stripHtml(blog.content || '')).length > 160 ? '...' : ''}
								</p>
								{Array.isArray(blog.tags) && blog.tags.length > 0 ? (
									<div className="mt-3 flex flex-wrap gap-2">
										{blog.tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-300"
											>
												#{tag}
											</span>
										))}
									</div>
								) : null}
							</div>
						))}
					</div>
				)}
			<DeleteConfirmModal
				isOpen={!!deleteItem}
				isDeleting={isDeleting}
				title="Delete Blog"
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
				title={editItem ? 'Edit Blog' : 'Create Blog'}
				hideHeader
				contentClassName="h-full"
			>
				<BlogForm 
					initialBlog={editItem}
					onCreated={() => {
						setIsUploadOpen(false)
						setEditItem(null)
						loadBlogs()
					}}
					onUpdated={() => {
						setIsUploadOpen(false)
						setEditItem(null)
						loadBlogs()
					}}
					onCancel={() => {
						setIsUploadOpen(false)
						setEditItem(null)
					}}
					onCancelEdit={() => {
						setIsUploadOpen(false)
						setEditItem(null)
					}}
				/>
			</AdminModal>
		</div>
	)
}

export default BlogList
