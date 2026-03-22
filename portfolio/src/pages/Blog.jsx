import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlogCard from '../components/BlogCard'

export default function Blog({ withTopOffset = true }) {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  /* ── fetch ── */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        if (!apiUrl) {
          setBlogs([
            { _id: 'brand-identity-tips', title: 'Brand Identity: Why Consistency is Everything', excerpt: 'Your brand is more than just a logo. It is the feeling people get when they interact with your business. Consistent visual language builds trust.', content: 'Your brand is more than just a logo.', date: new Date().toISOString(), author: 'Pratik', tags: ['Branding', 'Design'], coverImage: '' },
            { _id: 'logo-design-process', title: 'My 5-Step Logo Design Process', excerpt: 'Great logos are not created by accident. Behind every iconic mark is a structured process of research, ideation, and refinement.', content: 'Great logos are not created by accident.', date: new Date().toISOString(), author: 'Pratik', tags: ['Logo', 'Process'], coverImage: '' },
            { _id: 'color-theory', title: 'Color Theory for Modern Designers', excerpt: 'Color is the silent communicator of design. Understanding psychology behind hues, saturation, and contrast transforms average design into great.', content: 'Color is the silent communicator.', date: new Date().toISOString(), author: 'Pratik', tags: ['Design', 'Color'], coverImage: '' },
            { _id: 'typography-guide', title: 'Typography: The Invisible Grid of Design', excerpt: 'Most people feel good typography without being able to name why. Typeface selection and spacing carry enormous weight in composition.', content: 'Most people feel good typography.', date: new Date().toISOString(), author: 'Pratik', tags: ['Typography', 'Design'], coverImage: '' },
          ])
          return
        }
        const response = await fetch(`${apiUrl}/api/blogs`)
        if (!response.ok) throw new Error('Failed to fetch blogs')
        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json'))
          throw new TypeError("Backend didn't return JSON.")
        setBlogs(await response.json())
      } catch (err) {
        setError(err.message || 'Unable to load blogs')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  /* ── tab title ── */
  useEffect(() => {
    document.title = 'Blog | Pratik'
    return () => { document.title = 'Pratik Bhusal — Creative Designer' }
  }, [])

  /* ── helpers ── */
  const stripHtml = (v = '') => v.replace(/<[^>]+>/g, ' ')
  const buildExcerpt = (blog) => {
    if (blog.excerpt) return blog.excerpt
    const c = stripHtml(blog.content || '').replace(/\s+/g, ' ').trim()
    return c ? (c.length > 140 ? `${c.slice(0, 140)}...` : c) : 'No summary available.'
  }
  const estimateReadTime = (content = '') => {
    const words = stripHtml(content).split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.ceil(words / 200))} min read`
  }
  const formatDate = (v) => {
    if (!v) return ''
    const d = new Date(v)
    return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  /* ── tag filter ── */
  const allTags = ['all', ...Array.from(new Set(blogs.flatMap(b => b.tags || [])))]
  const filtered = activeTag === 'all' ? blogs : blogs.filter(b => b.tags?.includes(activeTag))

  return (
    <div className={`relative bg-[#0b0d1a] text-slate-100 min-h-screen ${withTopOffset ? 'pt-4' : 'pt-0'}`}>

      {/* ── Subtle background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">

        {/* ════════════════════════════════
            HERO — centred
        ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-12 pb-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Design{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Insights
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 text-slate-400 text-sm max-w-md mx-auto leading-relaxed"
          >
            Expert tips, trends, and tutorials to help you master design and grow your creative career.
          </motion.p>

          {/* Category filter pills — centred */}
          {!isLoading && !error && allTags.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mt-6"
            >
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] border transition-all duration-200 ${
                    activeTag === tag
                      ? 'bg-violet-600 border-violet-500 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {tag === 'all' ? 'All' : tag}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ════════════════════════════════
            LOADING STATE
        ════════════════════════════════ */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
                className="h-72 rounded-2xl bg-slate-800/50 border border-slate-700/40"
              />
            ))}
          </div>
        )}

        {/* ════════════════════════════════
            ERROR STATE
        ════════════════════════════════ */}
        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/8 p-5 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* ════════════════════════════════
            BLOG GRID
        ════════════════════════════════ */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {filtered.length === 0 ? (
                <p className="col-span-2 text-center py-20 text-slate-500 text-sm">
                  No posts with tag <span className="text-violet-400">#{activeTag}</span> yet.
                </p>
              ) : (
                filtered.map((blog, i) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <BlogCard
                      id={blog._id}
                      title={blog.title}
                      excerpt={buildExcerpt(blog)}
                      date={formatDate(blog.date) || undefined}
                      readTime={estimateReadTime(blog.content)}
                      author={blog.author}
                      tags={blog.tags}
                      coverImage={blog.coverImage || ''}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  )
}