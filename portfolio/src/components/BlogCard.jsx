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
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 p-6 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-cyan-500/20 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-[1px] shadow-lg">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-900 text-xs font-semibold uppercase tracking-widest text-cyan-200">
              {category}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <span className="font-medium text-gray-300">{date}</span>
            <span className="mx-2 text-gray-600">•</span>
            <span>{readTime}</span>
          </div>
        </div>
        <div className="rounded-full border border-gray-700/80 bg-gray-900/70 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-400">
          {badgeText}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
          {id ? (
            <Link to={`/blog/${id}`} className="hover:text-cyan-300">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {excerpt}
        </p>
      </div>

      {imageUrl ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-800/80">
          <img
            src={imageUrl}
            alt={title}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-gray-700/80 bg-gray-900/60 p-4 text-xs text-gray-500">
          Add a cover image for extra impact.
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {Array.isArray(tags) && tags.length > 0
          ? tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-700/70 bg-gray-900/70 px-3 py-1 text-[11px] font-medium text-gray-400"
              >
                #{tag}
              </span>
            ))
          : null}
        {id ? (
          <Link
            to={`/blog/${id}`}
            className="ml-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-300"
          >
            Read more
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <span className="ml-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Read more
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        )}
      </div>
    </article>
  )
}

export default BlogCard