import React from 'react'
import { assetUrl } from '../../lib/api'

const TrashIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EditIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

function UploadCard({ work, onEdit, onDelete }) {
  const [hovered, setHovered] = React.useState(false)
  const imageSrc = assetUrl(work.imageURL)
  const headline = work.headline || work.title || 'Untitled Image Set'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-[#11111a] rounded-[20px] overflow-hidden border transition-all duration-300 relative group"
      style={{
        borderColor: hovered ? 'rgba(168,85,247,0.3)' : 'rgba(51,65,85,0.4)',
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.4)' : 'none'
      }}
    >
      {/* Image half */}
      <div className="w-full aspect-square md:aspect-[4/3] bg-slate-900 overflow-hidden relative">
        <img
          src={imageSrc}
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11111a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content area */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-bold tracking-widest text-[#a855f7] uppercase mb-1.5">
          {work.category}
        </p>
        <h3 className="text-[17px] font-bold text-slate-100 mb-2 leading-tight line-clamp-2">
          {headline}
        </h3>
        <p className="text-[12px] text-slate-500 mb-6 flex-1">
          {(work.galleryImages?.length || 0) + 1} image{(work.galleryImages?.length || 0) + 1 > 1 ? 's' : ''}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={() => onEdit?.(work)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-[#a855f7] text-[#a855f7] font-semibold text-sm transition-colors hover:bg-[#a855f7] hover:text-white"
          >
            <EditIcon /> Edit
          </button>
          <button
            onClick={() => onDelete?.(work)}
            className="flex items-center justify-center p-2 rounded-xl border border-rose-500/50 text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
            title="Delete work"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadCard
