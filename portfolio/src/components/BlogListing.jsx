import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blogData'
import SEO from './SEO'
import { gsap } from 'gsap'

export default function BlogListing({ initialBlogs }) {
  const navigate = useNavigate()
  const blogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(3)
  const cardsRef = useRef([])
  cardsRef.current = []

  const categories = ['All', 'Design', 'Branding', 'Case Studies']

  // Filter posts
  const filteredPosts = blogs.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  )

  // Stagger entry animation on load / category change
  useEffect(() => {
    const targets = cardsRef.current.filter(Boolean)
    if (targets.length === 0) return

    gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    )
  }, [selectedCategory, visibleCount])

  // Get featured (first) post and regular grid posts
  const featuredPost = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black">
      <SEO
        title="Journal & Insights — Pratik Bhusal"
        description="Read articles and deep-dives on digital design strategy, branding systems, visual scaling systems, and minimal typography."
        url={`${siteUrl}/blog`}
        type="website"
      />

      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <header className="border-b border-neutral-900 pb-8 mb-10">
          <p className="font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3">
            [ INSIGHTS / WRITING ]
          </p>
          <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none">
            JOURNAL
          </h1>
        </header>

        {/* ── FEATURED POST ──────────────────────────────────────────────── */}
        {featuredPost && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            ref={addToRefs}
            data-cursor="READ"
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-12 mb-12 block"
          >
            {/* Featured Image */}
            <div className="lg:col-span-7 overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/9]">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            {/* Featured Text */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider">
                <span>{featuredPost.category ? featuredPost.category.toUpperCase() : ''}</span>
                <span>·</span>
                <span className="text-neutral-500">{featuredPost.readTime}</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#1e90ff] transition-colors leading-none tracking-wide">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <time className="text-xs font-mono text-neutral-500" dateTime={featuredPost.publishDate}>
                {new Date(featuredPost.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </Link>
        )}

        {/* ── CATEGORY FILTER PILLS ──────────────────────────────────────── */}
        <nav className="flex flex-wrap gap-2.5 mb-10" aria-label="Blog categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setVisibleCount(3)
              }}
              className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1e90ff] text-black font-bold shadow-[0_0_12px_rgba(30,144,255,0.45)]'
                  : 'bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* ── ARTICLE GRID ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {gridPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              ref={addToRefs}
              data-cursor="READ"
              className="group cursor-pointer flex flex-col space-y-4 border-b border-neutral-900/50 pb-8 block"
            >
              {/* Thumbnail */}
              <div className="overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10]">
                <img
                  src={post.featuredImage}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Text metadata */}
              <div className="flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider">
                <span>{post.category ? post.category.toUpperCase() : ''}</span>
                <span>·</span>
                <span className="text-neutral-500">{post.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                {post.excerpt}
              </p>

              {/* Date */}
              <time className="text-xs font-mono text-neutral-500" dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </Link>
          ))}
        </div>

        {/* ── LOAD MORE BUTTON ───────────────────────────────────────────── */}
        {filteredPosts.length > visibleCount && (
          <div className="flex justify-center pt-16">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 border border-neutral-800 hover:border-[#1e90ff]/40 px-6 py-3 rounded-full text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-all bg-[#0a0a0a] cursor-pointer shadow-lg"
            >
              LOAD MORE INSIGHTS
              <span className="w-5 h-5 rounded-full bg-[#1e90ff] flex items-center justify-center text-black group-hover:bg-[#ff6b35] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
