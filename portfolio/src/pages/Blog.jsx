import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'

function Blog({ withTopOffset = true }) {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const data = await response.json()
        setBlogs(data)
      } catch (err) {
        setError(err.message || 'Unable to load blogs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

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

  const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ')

  const buildExcerpt = (content = '') => {
    const cleaned = stripHtml(content).replace(/\s+/g, ' ').trim()
    if (!cleaned) return 'No summary available yet.'
    return cleaned.length > 140 ? `${cleaned.slice(0, 140)}...` : cleaned
  }

  const estimateReadTime = (content = '') => {
    const words = stripHtml(content).split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min read`
  }

  const containerClass = withTopOffset
    ? 'min-h-screen mt-16'
    : 'mt-0'

  return (
    <div className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 ${containerClass}`}>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold">My Blog</h1>
        <p className="mt-3 text-sm text-slate-400">
          Fresh writing pulled straight from your database.
        </p>

        {isLoading ? (
          <div className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-sm text-slate-400">
            Loading blog posts...
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {blogs.map((blog) => {
            const formattedDate = formatDate(blog.date)
            return (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                excerpt={buildExcerpt(blog.content)}
                date={formattedDate || undefined}
                readTime={estimateReadTime(blog.content)}
                author={blog.author}
                tags={blog.tags}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Blog