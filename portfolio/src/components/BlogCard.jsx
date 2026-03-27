import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogCard({
  title = 'Designing Calm UI With Bold Type',
  excerpt = 'A quick walkthrough of layout rhythm, spacing systems, and type pairings.',
  date = 'Mar 02, 2026',
  readTime = '6 min read',
  tags = [],
  category = '',
  featured = false,
  author = '',
  id = '',
  coverImage = '',
  className = ''
}) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (id) navigate(`/blog/${id}`)
  }

  const primaryTag = category || (Array.isArray(tags) && tags.length > 0 ? tags[0] : null)

  return (
    <article
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-[#0d111e] transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${id ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-800 to-slate-900">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a1040 50%, #0b1a35 100%)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="10" y="10" width="60" height="60" rx="8" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 4"/>
                <circle cx="40" cy="40" r="15" stroke="#a78bfa" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Category pill */}
        {primaryTag && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-violet-500/15 border border-violet-500/30 text-violet-300">
              {primaryTag}
            </span>
            {featured ? (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Featured
              </span>
            ) : null}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif" }}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {readTime}
          </span>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
