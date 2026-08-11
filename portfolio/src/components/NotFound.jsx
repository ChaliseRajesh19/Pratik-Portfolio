import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from './SEO'
import { Head } from 'vite-react-ssg'

export default function NotFound() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist or has moved."
        url="https://pratikbhusal.com/404"
        ogType="website"
      />
      {/* Explicit noindex robot meta for 404 page */}
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-12 overflow-hidden selection:bg-[#1e90ff] selection:text-black">
        {/* Background Decorative Faded Numeral & Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div
            className="w-[500px] aspect-square rounded-full blur-[140px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(30,144,255,0.4) 0%, rgba(255,107,53,0.2) 50%, rgba(0,0,0,0) 70%)',
            }}
          />
          <span className="font-bebas text-[45vw] sm:text-[35vw] text-neutral-900/30 font-bold tracking-tighter leading-none">
            404
          </span>
        </div>

        {/* Top Brand Bar */}
        <div className="relative z-10 flex items-center justify-between w-full border-b border-neutral-900 pb-6">
          <Link
            to="/"
            className="font-bebas text-2xl tracking-widest text-white hover:text-[#1e90ff] transition-colors"
          >
            PRATIK BHUSAL
          </Link>
          <span className="font-mono text-xs font-bold tracking-widest text-[#ff6b35] uppercase">
            [ ERROR 404 ]
          </span>
        </div>

        {/* Center Hero Error Content */}
        <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center py-12">
          {/* Giant Oversized 404 Numeral */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-bebas text-[28vw] sm:text-[22vw] lg:text-[220px] font-bold tracking-tighter leading-[0.8] text-white select-none">
              404
            </h1>
          </motion.div>

          {/* On-Brand Headline */}
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 font-bebas text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight uppercase"
          >
            THIS PAGE WENT OFF-BRIEF.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="mt-4 font-mono text-xs sm:text-sm text-neutral-400 max-w-md tracking-wide leading-relaxed"
          >
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to something worth seeing.
          </motion.p>

          {/* CTA Links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-[#1e90ff] hover:bg-[#1a7fe0] text-black font-bold font-mono text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_28px_rgba(30,144,255,0.6)]"
            >
              [ RETURN TO HOMEPAGE ]
            </Link>

            <Link
              to="/works"
              className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
            >
              [ EXPLORE WORKS ]
            </Link>

            <Link
              to="/blog"
              className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
            >
              [ READ JOURNAL ]
            </Link>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between w-full border-t border-neutral-900 pt-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>PRATIK BHUSAL STUDIO</span>
          <span>SYSTEM ERROR 404</span>
        </div>
      </main>
    </>
  )
}
