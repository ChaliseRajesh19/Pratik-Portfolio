import React from 'react'
import BlogEditor from './BlogEditor'

function BlogForm({ onCreated, onUpdated, initialBlog, onCancelEdit }) {
	const [title, setTitle] = React.useState('')
	const [author, setAuthor] = React.useState('')
	const [content, setContent] = React.useState('')
	const [tagsInput, setTagsInput] = React.useState('')
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [success, setSuccess] = React.useState('')

	React.useEffect(() => {
		if (initialBlog) {
			setTitle(initialBlog.title || '')
			setAuthor(initialBlog.author || '')
			setContent(initialBlog.content || '')
			setTagsInput(Array.isArray(initialBlog.tags) ? initialBlog.tags.join(', ') : '')
		} else {
			setTitle('')
			setAuthor('')
			setContent('')
			setTagsInput('')
		}
	}, [initialBlog])

	const normalizeTags = (value) => {
		return Array.from(
			new Set(
				value
					.split(',')
					.map((tag) => tag.trim().replace(/^#/, ''))
					.filter(Boolean)
			)
		)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError('')
		setSuccess('')

		const tags = normalizeTags(tagsInput)

		if (!title.trim()) {
			setError('Title is required.')
			return
		}
		if (!author.trim()) {
			setError('Author is required.')
			return
		}
		if (!content.trim()) {
			setError('Content is required.')
			return
		}

		try {
			setLoading(true)
			const token = localStorage.getItem('adminToken')
			const isEditing = Boolean(initialBlog?._id)
			const response = await fetch(
				isEditing
					? `http://localhost:5000/api/blogs/${initialBlog._id}`
					: 'http://localhost:5000/api/blogs/create',
				{
					method: isEditing ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {})
				},
				body: JSON.stringify({
					title: title.trim(),
					author: author.trim(),
					content: content.trim(),
					tags
				})
			})

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || 'Failed to create blog')
			}

			if (isEditing) {
				setSuccess('Blog post updated successfully.')
				if (onUpdated) {
					onUpdated()
				}
			} else {
				setSuccess('Blog post created successfully.')
				setTitle('')
				setAuthor('')
				setContent('')
				setTagsInput('')
				if (onCreated) {
					onCreated()
				}
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/30">
			<h2 className="text-xl font-semibold">{initialBlog ? 'Edit blog post' : 'New blog post'}</h2>
			<p className="mt-2 text-sm text-slate-400">
				{initialBlog ? 'Update and republish your blog post.' : 'Write a fresh post for your blog.'}
			</p>

			<form onSubmit={handleSubmit} className="mt-6 space-y-5">
				<label className="block text-sm font-medium text-slate-300">
					Title
					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="e.g. Designing with intention"
						className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
						required
					/>
				</label>

				<label className="block text-sm font-medium text-slate-300">
					Author
					<input
						type="text"
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
						placeholder="e.g. Pratik"
						className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
						required
					/>
				</label>

				<label className="block text-sm font-medium text-slate-300">
					Tags
					<input
						type="text"
						value={tagsInput}
						onChange={(event) => setTagsInput(event.target.value)}
						placeholder="e.g. design, ui, tips"
						className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
					/>
				</label>

				{normalizeTags(tagsInput).length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{normalizeTags(tagsInput).map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300"
							>
								#{tag}
							</span>
						))}
					</div>
				) : null}

				<label className="block text-sm font-medium text-slate-300">
					Content
					<div className="mt-2">
						<BlogEditor value={content} onChange={setContent} />
					</div>
				</label>

				<div className="flex flex-wrap gap-3">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
					>
						{loading
							? initialBlog
								? 'Updating...'
								: 'Publishing...'
							: initialBlog
								? 'Update blog'
								: 'Publish blog'}
					</button>
					{initialBlog ? (
						<button
							type="button"
							onClick={onCancelEdit}
							className="rounded-xl border border-slate-700/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
						>
							Cancel edit
						</button>
					) : null}
				</div>
			</form>

			{error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
			{success && <p className="mt-4 text-sm text-emerald-300">{success}</p>}
		</div>
	)
}

export default BlogForm
