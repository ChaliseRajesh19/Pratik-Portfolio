import React from 'react'

function BlogList({ refreshKey, onEdit }) {
	const [blogs, setBlogs] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [deleteLoading, setDeleteLoading] = React.useState('')

	React.useEffect(() => {
		const controller = new AbortController()

		const loadBlogs = async () => {
			setLoading(true)
			setError('')
			try {
				const response = await fetch('http://localhost:5000/api/blogs', {
					signal: controller.signal
				})
				const data = await response.json()
				if (!response.ok) {
					throw new Error(data.message || 'Failed to load blogs')
				}
				setBlogs(data)
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setLoading(false)
			}
		}

		loadBlogs()
		return () => controller.abort()
	}, [refreshKey])

	const handleDelete = async (blog) => {
		if (!blog?._id || deleteLoading) {
			return
		}
		const confirmed = window.confirm(`Delete "${blog.title}"?`)
		if (!confirmed) {
			return
		}

		setDeleteLoading(blog._id)
		setError('')
		try {
			const token = localStorage.getItem('adminToken')
			const response = await fetch(`http://localhost:5000/api/blogs/${blog._id}`, {
				method: 'DELETE',
				headers: token ? { Authorization: `Bearer ${token}` } : undefined
			})
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || 'Failed to delete blog')
			}
			setBlogs((prev) => prev.filter((item) => item._id !== blog._id))
		} catch (err) {
			setError(err.message)
		} finally {
			setDeleteLoading('')
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

	return (
		<div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="text-xl font-semibold">Published blogs</h2>
					<p className="mt-2 text-sm text-slate-400">Manage your latest posts.</p>
				</div>
			</div>

			<div className="mt-6 space-y-4">
				{loading && <p className="text-sm text-slate-400">Loading blogs...</p>}
				{error && <p className="text-sm text-rose-300">{error}</p>}
				{!loading && !error && blogs.length === 0 && (
					<p className="text-sm text-slate-400">No blogs published yet.</p>
				)}
				{!loading && !error && blogs.length > 0 && (
					<div className="space-y-4">
						{blogs.map((blog) => (
							<div
								key={blog._id}
								className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5"
							>
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div>
										<h3 className="text-base font-semibold text-slate-100">{blog.title}</h3>
										<p className="mt-1 text-xs text-slate-400">
											{blog.author || 'Unknown author'}
											{blog.date ? ` • ${formatDate(blog.date)}` : ''}
										</p>
									</div>
									<div className="flex flex-wrap items-center gap-2">
										<button
											type="button"
											onClick={() => onEdit?.(blog)}
											className="rounded-full border border-slate-600/60 px-4 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
										>
											Edit
										</button>
										<button
											type="button"
											onClick={() => handleDelete(blog)}
											disabled={deleteLoading === blog._id}
											className="rounded-full border border-rose-400/40 px-4 py-1 text-xs font-semibold text-rose-200 transition hover:border-rose-400/70 disabled:cursor-not-allowed disabled:opacity-60"
										>
											{deleteLoading === blog._id ? 'Deleting...' : 'Delete'}
										</button>
									</div>
								</div>
								<p className="mt-3 text-sm text-slate-400">
									{stripHtml(blog.content || '').slice(0, 160)}
									{stripHtml(blog.content || '').length > 160 ? '...' : ''}
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
			</div>
		</div>
	)
}

export default BlogList
