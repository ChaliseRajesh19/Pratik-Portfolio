import React from 'react'

function UploadForm({ categories, defaultCategory, onUploaded }) {
	const [title, setTitle] = React.useState('')
	const [category, setCategory] = React.useState(defaultCategory || categories[0])
	const [imageFile, setImageFile] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [success, setSuccess] = React.useState('')

	React.useEffect(() => {
		if (defaultCategory) {
			setCategory(defaultCategory)
		}
	}, [defaultCategory])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError('')
		setSuccess('')

		if (!title.trim()) {
			setError('Title is required.')
			return
		}
		if (!imageFile) {
			setError('Please select an image to upload.')
			return
		}

		const formData = new FormData()
		formData.append('title', title.trim())
		formData.append('category', category)
		formData.append('image', imageFile)

		try {
			setLoading(true)
			const token = localStorage.getItem('adminToken')
			const response = await fetch('http://localhost:5000/api/works/upload', {
				method: 'POST',
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				body: formData
			})

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || 'Upload failed')
			}

			setSuccess('Work uploaded successfully.')
			setTitle('')
			setImageFile(null)
			if (onUploaded) {
				onUploaded(category)
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/30">
			<h2 className="text-xl font-semibold">New work</h2>
			<p className="mt-2 text-sm text-slate-400">Upload an image and select the category.</p>

			<form onSubmit={handleSubmit} className="mt-6 space-y-5">
				<label className="block text-sm font-medium text-slate-300">
					Title
					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="e.g. Skyline Logo"
						className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
						required
					/>
				</label>

				<label className="block text-sm font-medium text-slate-300">
					Category
					<select
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
					>
						{categories.map((item) => (
							<option key={item} value={item} className="bg-slate-950">
								{item}
							</option>
						))}
					</select>
				</label>

				<label className="block text-sm font-medium text-slate-300">
					Image file
					<input
						type="file"
						accept="image/*"
						onChange={(event) => setImageFile(event.target.files?.[0] || null)}
						className="mt-2 w-full rounded-xl border border-dashed border-slate-700/80 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-400 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate-900"
					/>
				</label>

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{loading ? 'Uploading...' : 'Upload work'}
				</button>
			</form>

			{error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
			{success && <p className="mt-4 text-sm text-emerald-300">{success}</p>}
		</div>
	)
}

export default UploadForm
