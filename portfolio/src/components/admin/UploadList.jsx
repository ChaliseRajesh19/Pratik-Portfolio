import React from 'react'
import UploadCard from './UploadCard'

function UploadList({ category, categories, onCategoryChange, refreshKey }) {
	const [works, setWorks] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [deleteLoading, setDeleteLoading] = React.useState('')

	React.useEffect(() => {
		if (!category) {
			return
		}

		const controller = new AbortController()
		const loadWorks = async () => {
			setLoading(true)
			setError('')
			try {
				const response = await fetch(`http://localhost:5000/api/works/${category}`, {
					signal: controller.signal
				})
				const data = await response.json()
				if (!response.ok) {
					throw new Error(data.message || 'Failed to load works')
				}
				setWorks(data)
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setLoading(false)
			}
		}

		loadWorks()
		return () => controller.abort()
	}, [category, refreshKey])

	const handleDelete = async (work) => {
		if (!work?._id || deleteLoading) {
			return
		}
		const confirmed = window.confirm(`Delete "${work.title}"?`)
		if (!confirmed) {
			return
		}

		setDeleteLoading(work._id)
		setError('')
		try {
			const token = localStorage.getItem('adminToken')
			const response = await fetch(`http://localhost:5000/api/works/${work._id}`, {
				method: 'DELETE',
				headers: token ? { Authorization: `Bearer ${token}` } : undefined
			})
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || 'Failed to delete work')
			}
			setWorks((prev) => prev.filter((item) => item._id !== work._id))
		} catch (err) {
			setError(err.message)
		} finally {
			setDeleteLoading('')
		}
	}

	return (
		<div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="text-xl font-semibold">Uploaded works</h2>
					<p className="mt-2 text-sm text-slate-400">Review the current category list.</p>
				</div>
				<select
					value={category}
					onChange={(event) => onCategoryChange(event.target.value)}
					className="rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-2 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
				>
					{categories.map((item) => (
						<option key={item} value={item} className="bg-slate-950">
							{item}
						</option>
					))}
				</select>
			</div>

			<div className="mt-6 space-y-4">
				{loading && <p className="text-sm text-slate-400">Loading works...</p>}
				{error && <p className="text-sm text-rose-300">{error}</p>}
				{!loading && !error && works.length === 0 && (
					<p className="text-sm text-slate-400">No uploads yet for this category.</p>
				)}
				{!loading && !error && works.length > 0 && (
					<div className="grid gap-4 sm:grid-cols-2">
						{works.map((work) => (
							<UploadCard key={work._id} work={work} onDelete={handleDelete} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadList
