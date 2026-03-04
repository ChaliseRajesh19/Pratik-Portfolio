import React from 'react'
import { Link, useParams } from 'react-router-dom'

function BlogPost() {
	const { id } = useParams()
	const [blog, setBlog] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState('')

	React.useEffect(() => {
		const controller = new AbortController()

		const loadBlog = async () => {
			setLoading(true)
			setError('')
			try {
				const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
					signal: controller.signal
				})
				const data = await response.json()
				if (!response.ok) {
					throw new Error(data.message || 'Failed to load blog')
				}
				setBlog(data)
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message || 'Unable to load blog')
				}
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			loadBlog()
		}

		return () => controller.abort()
	}, [id])

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 mt-16">
			<div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
				<Link to="/blog" className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
					Back to blog
				</Link>

				{loading ? (
					<div className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-sm text-slate-400">
						Loading blog post...
					</div>
				) : null}

				{error ? (
					<div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
						{error}
					</div>
				) : null}

				{!loading && !error && blog ? (
					<article className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/30">
						<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
							<span>{formatDate(blog.date) || 'Draft'}</span>
							{blog.author ? <span>By {blog.author}</span> : null}
						</div>
						<h1 className="mt-4 text-3xl font-semibold text-slate-100 sm:text-4xl">
							{blog.title}
						</h1>

						{Array.isArray(blog.tags) && blog.tags.length > 0 ? (
							<div className="mt-4 flex flex-wrap gap-2">
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

						<div
							className="prose prose-invert mt-6 max-w-none text-slate-200"
							dangerouslySetInnerHTML={{ __html: blog.content || '' }}
						/>
					</article>
				) : null}
			</div>
		</div>
	)
}

export default BlogPost
