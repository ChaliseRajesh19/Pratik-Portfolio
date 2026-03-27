import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import api, { assetUrl, getErrorMessage, isRequestCanceled } from "../lib/api";

/* ── Reading progress bar ── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[200]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className="w-full h-full"
        style={{ background: "linear-gradient(90deg, #8b5cf6, #c084fc, #e879f9)" }}
      />
    </motion.div>
  );
}

/* ── Skeleton block ── */
function Skeleton({ className }) {
  return (
    <motion.div
      animate={{ opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-xl bg-slate-800/60 ${className}`}
    />
  );
}

/* ── Comments / Discussion ── */
function BlogComments() {
  const [comments, setComments] = React.useState([])
  const [text, setText] = React.useState('')

  const handlePost = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    setComments(prev => [...prev, { id: Date.now(), text: trimmed, date: new Date() }])
    setText('')
  }

  return (
    <div className="mt-10">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 rounded-full bg-violet-500" />
        <h2 className="text-base font-bold text-white">Discussion</h2>
      </div>

      {/* Comment box */}
      <div className="rounded-2xl border border-slate-800/60 bg-[#0d111e] p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 2V3a1 1 0 0 1 1-1z" stroke="#94a3b8" strokeWidth="1.3"/>
          </svg>
          <span className="text-sm font-semibold text-slate-300">
            Comments ({comments.length})
          </span>
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full rounded-lg border border-slate-700/60 bg-slate-900/80 text-sm text-slate-200 px-4 py-3 outline-none focus:border-violet-500/50 placeholder:text-slate-600 resize-none mb-3"
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handlePost() }}
        />

        <button
          onClick={handlePost}
          disabled={!text.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M2 8l12-6-5 14-2-5-5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          Post Comment
        </button>
      </div>

      {/* Comment list or empty state */}
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-600">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="mb-3 opacity-40">
            <path d="M4 4h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H11l-7 6V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <p className="text-sm">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {comments.map(c => (
            <div key={c.id} className="rounded-xl border border-slate-800/50 bg-[#0d111e] px-4 py-3">
              <p className="text-sm text-slate-300 leading-relaxed">{c.text}</p>
              <p className="text-[10px] text-slate-600 mt-1.5">
                {c.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const articleRef = useRef(null);

  /* ── fetch ── */
  useEffect(() => {
    const controller = new AbortController();
    const loadBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/api/blogs/${id}`, {
          signal: controller.signal,
        });
        setBlog(data);
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(getErrorMessage(err, "Unable to load blog"));
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) loadBlog();
    return () => controller.abort();
  }, [id]);

  /* ── tab title ── */
  useEffect(() => {
    if (blog?.title) document.title = `${blog.title} | Pratik`;
    return () => { document.title = "Pratik Bhusal — Creative Designer"; };
  }, [blog]);

  /* ── helpers ── */
  const formatDate = (v) => {
    if (!v) return "";
    const d = new Date(v);
    return isNaN(d)
      ? ""
      : d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  };

  const stripHtml = (v = "") => v.replace(/<[^>]+>/g, " ");
  const wordCount = blog ? stripHtml(blog.content).split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const primaryTag = blog?.category || blog?.tags?.[0] || null;

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-[#0b0d1a] text-slate-100">

        {/* ── Subtle background glow ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
            style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
          />
        </div>

        {/* ── Breadcrumb — full-width left edge ── */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex items-center gap-2 text-xs text-slate-500 px-6 pt-4 mb-4"
          >
            <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
            <span>›</span>
            <Link to="/blogs" className="hover:text-violet-400 transition-colors">Blog</Link>
            {!loading && blog && (
              <>
                <span>›</span>
                <span className="text-slate-400 truncate max-w-[200px]">{blog.title}</span>
              </>
            )}
          </motion.nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-24">

          {/* ══════════════════════════════
              LOADING SKELETON
          ══════════════════════════════ */}
          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-8 w-32 mx-auto" />
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
              <div className="pt-6 space-y-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════
              ERROR STATE
          ══════════════════════════════ */}
          {error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/8 p-5 text-sm text-rose-300">
              {error}
            </div>
          )}

          {/* ══════════════════════════════
              ARTICLE
          ══════════════════════════════ */}
          {!loading && !error && blog && (
            <motion.article
              ref={articleRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── Cover Image ── */}
              <div className="relative overflow-hidden rounded-2xl mb-6 h-64 sm:h-80 bg-gradient-to-br from-slate-800 to-slate-900">
                {blog.coverImage ? (
                  <img
                    src={assetUrl(blog.coverImage)}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: "linear-gradient(135deg, #130f2a 0%, #1e1040 50%, #0f1a35 100%)" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="15" y="15" width="90" height="90" rx="12" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="6 6"/>
                        <circle cx="60" cy="60" r="25" stroke="#c084fc" strokeWidth="1.5"/>
                        <circle cx="60" cy="60" r="8" fill="#7c3aed" opacity="0.4"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Centred header block ── */}
              <div className="text-center mb-8">
                {/* Category pill */}
                {primaryTag && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block mb-4 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] bg-violet-500/15 border border-violet-500/30 text-violet-300"
                  >
                    {primaryTag}
                  </motion.span>
                )}

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {blog.title}
                </motion.h1>

                {/* Metadata row — centred */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400"
                >
                  {blog.author && (
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      {blog.author}
                    </span>
                  )}
                  {formatDate(blog.date) && (
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      {formatDate(blog.date)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {readTime} min read
                  </span>
                </motion.div>
              </div>

              {/* ── Divider ── */}
              <div
                className="mb-8 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
              />

              {/* ── Body ── */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />

              {/* ── Share ── */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M5.8 9.1l4.4 2.8M10.2 4.1L5.8 6.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Share:
                </span>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.6 0h2.45l-5.35 6.1L16 16h-4.93l-3.86-5.05L3 16H0.55l5.73-6.55L0 0h5.05l3.48 4.56L12.6 0zm-.86 14.37h1.36L4.3 1.37H2.84l8.9 13z"/>
                  </svg>
                  Twitter
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M16 8.05A8 8 0 1 0 6.75 16v-5.6H4.72V8.05h2.03V6.3c0-2 1.2-3.1 3-3.1.87 0 1.78.16 1.78.16v1.96h-1c-.99 0-1.3.61-1.3 1.24v1.49h2.21l-.35 2.35H9.23V16A8 8 0 0 0 16 8.05z"/>
                  </svg>
                  Facebook
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 1.15C0 .52.53 0 1.19 0h13.62C15.47 0 16 .52 16 1.15v13.7c0 .63-.53 1.15-1.19 1.15H1.19C.53 16 0 15.48 0 14.85V1.15zM4.79 13.43V6.17H2.42v7.26h2.37zM3.6 5.13a1.38 1.38 0 1 0 0-2.76 1.38 1.38 0 0 0 0 2.76zm9.83 8.3v-3.93c0-2.09-.45-3.7-2.9-3.7-1.18 0-1.97.65-2.29 1.26h-.03V6.17H5.96v7.26h2.37V9.87c0-1.01.19-1.99 1.44-1.99 1.23 0 1.25 1.15 1.25 2.05v3.5h2.41z"/>
                  </svg>
                  LinkedIn
                </a>

                {/* Copy Link */}
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Copy Link
                </button>
              </div>

              {/* ── Discussion ── */}
              <BlogComments />

            </motion.article>
          )}
        </div>
      </div>

      {/* ── Prose styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .blog-prose {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.75;
          color: #cbd5e1;
        }
        .blog-prose p {
          margin-bottom: 1.4rem;
        }
        .blog-prose h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #f1f5f9;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
          padding-left: 0.75rem;
          border-left: 3px solid rgba(139,92,246,0.7);
        }
        .blog-prose h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .blog-prose strong { color: #e2e8f0; font-weight: 700; }
        .blog-prose em { color: #94a3b8; font-style: italic; }
        .blog-prose a {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(167,139,250,0.35);
          transition: text-decoration-color 0.2s;
        }
        .blog-prose a:hover { text-decoration-color: rgba(167,139,250,0.9); }
        .blog-prose ul, .blog-prose ol { margin-bottom: 1.4rem; padding-left: 1.4rem; }
        .blog-prose li { margin-bottom: 0.4rem; }
        .blog-prose ul li::marker { color: rgba(139,92,246,0.6); }
        .blog-prose ol li::marker { color: rgba(139,92,246,0.6); font-weight: 700; }
        .blog-prose blockquote {
          margin: 1.75rem 0;
          padding: 0.875rem 1.125rem;
          border-left: 3px solid rgba(139,92,246,0.5);
          background: rgba(139,92,246,0.05);
          border-radius: 0 10px 10px 0;
          color: #94a3b8;
          font-style: italic;
        }
        .blog-prose code {
          font-size: 0.875em;
          background: rgba(139,92,246,0.12);
          color: #c4b5fd;
          padding: 0.15em 0.45em;
          border-radius: 5px;
          border: 1px solid rgba(139,92,246,0.2);
        }
        .blog-prose pre {
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 12px;
          padding: 1.25rem;
          overflow-x: auto;
          margin-bottom: 1.4rem;
        }
        .blog-prose pre code { background: none; border: none; padding: 0; color: #cbd5e1; }
        .blog-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
          margin: 2rem 0;
        }
        .blog-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem auto;
          display: block;
        }
      `}</style>
    </>
  );
}
