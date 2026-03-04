import React from 'react'
import UploadForm from '../components/admin/UploadForm'
import UploadList from '../components/admin/UploadList'
import BlogForm from '../components/admin/BlogForm'
import BlogList from '../components/admin/BlogList'

function AdminDashboard() {
	const categories = ['logo', 'graphic', 'brand', 'socialmedia', 'ui']
	const [activeCategory, setActiveCategory] = React.useState(categories[0])
	const [refreshKey, setRefreshKey] = React.useState(0)
	const [view, setView] = React.useState('upload')
	const [blogRefreshKey, setBlogRefreshKey] = React.useState(0)
	const [editingBlog, setEditingBlog] = React.useState(null)

	const handleUploaded = (category) => {
		if (category && category !== activeCategory) {
			setActiveCategory(category)
		}
		setRefreshKey((prev) => prev + 1)
	}

	const handleBlogCreated = () => {
		setBlogRefreshKey((prev) => prev + 1)
	}

	const handleBlogUpdated = () => {
		setBlogRefreshKey((prev) => prev + 1)
		setEditingBlog(null)
		setView('blog-list')
	}

	const handleEditBlog = (blog) => {
		setEditingBlog(blog)
		setView('blog-create')
	}

	const handleCancelEdit = () => {
		setEditingBlog(null)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
			<div className="mx-auto max-w-6xl px-4 py-12">
				<div className="mb-10 flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">Admin Dashboard</p>
						<h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
							{view === 'upload' && 'Upload new work'}
							{view === 'list' && 'Uploaded works'}
							{view === 'blog-create' && (editingBlog ? 'Edit blog' : 'Create a new blog')}
							{view === 'blog-list' && 'Published blogs'}
						</h1>
						<p className="mt-2 text-sm text-slate-400">
							{view === 'upload' && 'Add new pieces to your portfolio.'}
							{view === 'list' && 'Review your portfolio uploads.'}
							{view === 'blog-create' && (editingBlog ? 'Update and republish your post.' : 'Write and publish new posts.')}
							{view === 'blog-list' && 'Manage your blog posts.'}
						</p>
					</div>
					{/* <div className="rounded-full border border-slate-800/80 bg-slate-900/60 px-4 py-2 text-xs text-slate-300">
						Active category: <span className="text-emerald-300">{activeCategory}</span>
					</div> */}
				</div>

				<div className="mb-8 flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={() => setView('upload')}
						className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
							view === 'upload'
								? 'bg-emerald-400 text-slate-900'
								: 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:text-slate-100'
						}`}
					>
						Upload new work
					</button>
					<button
						type="button"
						onClick={() => setView('list')}
						className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
							view === 'list'
								? 'bg-emerald-400 text-slate-900'
								: 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:text-slate-100'
						}`}
					>
						Uploaded works
					</button>
					<button
						type="button"
						onClick={() => setView('blog-create')}
						className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
							view === 'blog-create'
								? 'bg-emerald-400 text-slate-900'
								: 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:text-slate-100'
						}`}
					>
						Create blog
					</button>
					<button
						type="button"
						onClick={() => setView('blog-list')}
						className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
							view === 'blog-list'
								? 'bg-emerald-400 text-slate-900'
								: 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:text-slate-100'
						}`}
					>
						Blog list
					</button>
				</div>

				{view === 'upload' ? (
					<div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
						<UploadForm
							categories={categories}
							defaultCategory={activeCategory}
							onUploaded={handleUploaded}
						/>
					</div>
				) : null}

				{view === 'list' ? (
					<UploadList
						category={activeCategory}
						onCategoryChange={setActiveCategory}
						categories={categories}
						refreshKey={refreshKey}
					/>
				) : null}

				{view === 'blog-create' ? (
					<BlogForm
						onCreated={handleBlogCreated}
						onUpdated={handleBlogUpdated}
						initialBlog={editingBlog}
						onCancelEdit={handleCancelEdit}
					/>
				) : null}

				{view === 'blog-list' ? (
					<BlogList refreshKey={blogRefreshKey} onEdit={handleEditBlog} />
				) : null}
			</div>
		</div>
	)
}

export default AdminDashboard
