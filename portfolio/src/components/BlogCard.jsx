import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({
  title = 'Designing Calm UI With Bold Type',
  excerpt = 'A quick walkthrough of layout rhythm, spacing systems, and type pairings that feel modern but timeless.',
  date = 'Mar 02, 2026',
  readTime = '6 min read',
  category = 'Blog',
  imageUrl = '',
  tags = [],
  author = '',
  id = '',
  className = ''
}) {
  const badgeText = author ? `By ${author}` : 'New'

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-blue-900/30 bg-[#061230] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 p-[1px] shadow-lg">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#020617] text-xs font-semibold uppercase tracking-widest text-blue-200">
              {category}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <span className="font-medium text-gray-300">{date}</span>
            <span className="mx-2 text-gray-600">•</span>
            <span>{readTime}</span>
          </div>
        </div>
        <div className="rounded-full border border-blue-900/50 bg-[#020617]/50 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-400">
          {badgeText}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
          {id ? (
            <Link to={`/blog/${id}`} className="hover:text-blue-400">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {excerpt}
        </p>
      </div>

      {imageUrl ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-900/30">
          <img
            src={imageUrl}
            alt={title}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-blue-900/50 bg-[#020617]/50 p-4 text-xs text-slate-500">
          Add a cover image for extra impact.
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {Array.isArray(tags) && tags.length > 0
          ? tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-900/40 bg-[#020617]/40 px-3 py-1 text-[11px] font-medium text-slate-400"
              >
                #{tag}
              </span>
            ))
          : null}
        {id ? (
          <Link
            to={`/blog/${id}`}
            className="ml-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400"
          >
            Read more
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <span className="ml-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Read more
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        )}
      </div>
    </article>
  )
}

export default BlogCard