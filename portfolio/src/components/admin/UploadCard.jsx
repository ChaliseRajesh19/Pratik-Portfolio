import React from 'react'

function UploadCard({ work, onDelete }) {
	return (
		<div className="flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
			<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-900">
				<img
					src={work.imageURL}
					alt={work.title}
					className="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">{work.category}</p>
				<div className="mt-1 flex items-center justify-between gap-3">
					<h3 className="truncate text-sm font-semibold text-slate-100">{work.title}</h3>
					<button
						type="button"
						onClick={() => onDelete?.(work)}
						className="text-xs font-semibold text-rose-300 transition hover:text-rose-200"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default UploadCard
