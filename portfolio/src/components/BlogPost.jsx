import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blogData'
import SEO from './SEO'
import { convertMarkdownToHtml } from '../admin/editor/MarkdownConverter'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractHeaders(content) {
  if (!content) return []

  if (content.trim().startsWith('<')) {
    const headers = []
    const regex = /<h([1-4])\b[^>]*>(.*?)<\/h[1-4]>/gi
    let match
    while ((match = regex.exec(content)) !== null) {
      const level = parseInt(match[1], 10)
      const rawText = match[2].replace(/<[^>]+>/g, '').trim()
      if (rawText) {
        headers.push({ level, text: rawText, id: slugify(rawText) })
      }
    }
    return headers
  }

  const lines = content.split('\n')
  const headers = []
  lines.forEach((line) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      headers.push({ level: 2, text: trimmed.substring(3), id: slugify(trimmed.substring(3)) })
    } else if (trimmed.startsWith('### ')) {
      headers.push({ level: 3, text: trimmed.substring(4), id: slugify(trimmed.substring(4)) })
    }
  })
  return headers
}

function renderMarkdownContent(content) {
  if (!content) return null
  const htmlContent = content.trim().startsWith('<') ? content : convertMarkdownToHtml(content)
  return (
    <div
      className="blog-html-content space-y-4 text-neutral-300 font-sans text-base sm:text-lg leading-relaxed"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

export default function BlogPost({ slug, initialBlogs }) {
  const navigate = useNavigate()
  const blogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts
  const [copied, setCopied] = useState(false)
  const post = blogs.find((p) => p.slug === slug)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!post) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-bebas text-6xl text-white tracking-widest mb-4">404</h1>
        <p className="text-neutral-400 font-mono text-sm uppercase tracking-wider mb-8">
          Post Not Found
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
        >
          BACK TO JOURNAL
        </Link>
      </div>
    )
  }

  const headers = extractHeaders(post.content)
  const relatedPosts = blogs.filter((p) => p.slug !== slug).slice(0, 2)
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const currentUrl = `${siteUrl}/blog/${post.slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="relative bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 selection:bg-[#1e90ff] selection:text-black">
      <SEO
        title={`${post.title} — Journal`}
        description={post.excerpt}
        image={post.featuredImage}
        type="article"
        publishDate={post.publishDate}
        authorName={post.author.name}
        url={currentUrl}
      />

      {/* Back button positioned in top-left corner */}
      <Link
        to="/blog"
        className="absolute left-6 top-[72px] sm:left-10 lg:left-14 group flex items-center gap-2 text-[13px] font-mono font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
      >
        <span className="group-hover:-translate-x-1 transition-transform text-sm">←</span>
        BACK TO JOURNAL
      </Link>

      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ZONE ────────────────────────────────────────────────── */}
        <header className="space-y-6">
          <span className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase">
            [ {post.category.toUpperCase()} ]
          </span>

          <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-none">
            {post.title}
          </h1>

          {/* Meta row & Share panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-neutral-900">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span>BY {post.author.name.toUpperCase()}</span>
              <span>·</span>
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span>·</span>
              <span className="text-neutral-500">{post.readTime}</span>
            </div>

            {/* Social Share links */}
            <div className="flex items-center gap-3.5">
              <button
                onClick={handleCopyLink}
                className="text-xs font-mono text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? 'COPIED!' : 'COPY LINK'}
              </button>
              <span className="text-neutral-800 text-[10px]">·</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neutral-500 hover:text-[#1e90ff] transition-colors"
              >
                X / TWITTER
              </a>
              <span className="text-neutral-800 text-[10px]">·</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neutral-500 hover:text-[#1e90ff] transition-colors"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </header>

        {/* Featured Main Image */}
        <div className="my-10 overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/9]">
          <img
            src={post.featuredImage}
            alt={post.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── TWO-COLUMN CONTENT AREA (ToC + Reading body) ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Table of Contents Column (Left sidebar on desktop, sticky) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 lg:pr-4">
            <h4 className="font-mono text-xs text-[#ff6b35] tracking-widest uppercase pb-2 border-b border-neutral-900">
              [ TABLE OF CONTENTS ]
            </h4>
            <nav className="flex flex-col gap-2.5">
              {headers.map((header) => (
                <a
                  key={header.id}
                  href={`#${header.id}`}
                  className={`font-mono text-[11px] tracking-wider transition-colors hover:text-[#1e90ff] leading-relaxed ${
                    header.level === 3 ? 'pl-4 text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  {header.text.toUpperCase()}
                </a>
              ))}
            </nav>
          </aside>

          {/* Core Reading Text Column */}
          <main className="lg:col-span-8 max-w-2xl prose prose-invert font-sans">
            {renderMarkdownContent(post.content)}
          </main>

        </div>

        {/* ── AUTHOR BIO CARD ────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-neutral-900">
          <div className="bg-[#080808] border border-neutral-900 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border border-neutral-800"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase">
                [ ABOUT THE AUTHOR ]
              </span>
              <h4 className="font-bebas text-xl text-white tracking-wide">{post.author.name}</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        </footer>

        {/* ── RELATED POSTS ──────────────────────────────────────────────── */}
        <section className="mt-20 pt-10 border-t border-neutral-900">
          <h3 className="font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase mb-8">
            [ RELATED READING ]
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group cursor-pointer flex flex-col space-y-3 block"
              >
                <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10]">
                  <img
                    src={related.featuredImage}
                    alt={related.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider">
                  <span>{related.category ? related.category.toUpperCase() : ''}</span>
                  <span>·</span>
                  <span className="text-neutral-500">{related.readTime}</span>
                </div>
                <h4 className="font-bebas text-xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </article>
  )
}
