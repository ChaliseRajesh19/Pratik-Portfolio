import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { SectionHeader } from './SectionHeader'
import { SectionMotionShell } from './motion/SectionMotionShell'
import { useTestimonials } from '../hooks/useTestimonials'

/* ─── Stars ──────────────────────────────────────────────── */
const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-700'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

/* ─── Avatar ─────────────────────────────────────────────── */
function Avatar({ avatarUrl, name }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-rose-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
  ]
  const idx = name ? name.charCodeAt(0) % gradients.length : 0

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-white/10 flex-shrink-0"
      />
    )
  }
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[idx]} flex items-center justify-center text-white text-xs font-black tracking-wide shadow-lg flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

/* ─── Single card — animated by scroll direction ─────────── */
function TestimonialCard({ t, index, scrollDir }) {
  /* 
   * scrollDir: 'down' → cards slide in from right (left-to-right reveal)
   *            'up'   → cards slide in from left  (right-to-left reveal)
   */
  const xStart = scrollDir === 'up' ? -60 : 60
  const delay = index * 0.06

  return (
    <motion.div
      key={`${t.id}-${scrollDir}`}
      initial={{ opacity: 0, x: xStart, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.025 }}
      className="relative flex-shrink-0 w-[320px] md:w-[360px] mx-3 rounded-2xl p-6
                 bg-white/[0.04] border border-white/10 backdrop-blur-md
                 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                 hover:border-violet-500/30 hover:shadow-[0_12px_44px_rgba(139,92,246,0.18)]
                 transition-[border-color,box-shadow] duration-300 cursor-default select-none"
    >
      {/* Accent gradient line */}
      <div className="absolute -top-px left-6 h-px w-28 bg-gradient-to-r from-violet-500 via-blue-400 to-transparent opacity-70" />

      <Stars count={t.rating} />

      <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-4">
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <Avatar avatarUrl={t.avatarUrl} name={t.name} />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Skeleton card ──────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[360px] mx-3 rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] animate-pulse">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded bg-slate-800" />)}
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-3 rounded bg-slate-800 w-full" />
        <div className="h-3 rounded bg-slate-800 w-4/5" />
        <div className="h-3 rounded bg-slate-800 w-3/5" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-800" />
        <div className="space-y-1.5">
          <div className="h-3 rounded bg-slate-800 w-24" />
          <div className="h-2.5 rounded bg-slate-800 w-16" />
        </div>
      </div>
    </div>
  )
}

/* ─── Infinite-marquee row — direction flips with scroll ─── */
function MarqueeRow({ items, marqueDir = 1, scrollDir, speed = 40 }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex"
        animate={{
          x: marqueDir > 0 ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={`${t.id}-${i}`}
            t={t}
            index={i % items.length}
            scrollDir={scrollDir}
          />
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Skeleton row ───────────────────────────────────────── */
function SkeletonRow({ count = 4 }) {
  return (
    <div className="overflow-hidden py-2 flex">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function Testimonials() {
  const { testimonials, loading } = useTestimonials()

  /* Track scroll direction */
  const sectionRef = useRef(null)
  const [scrollDir, setScrollDir] = useState('down')

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (current) => {
    const prev = scrollY.getPrevious()
    if (current > prev) setScrollDir('down')
    else if (current < prev) setScrollDir('up')
  })

  /* Split into two rows */
  const half = Math.ceil(testimonials.length / 2)
  const row1 = testimonials.slice(0, half)
  const row2 = testimonials.slice(half)
  const canShow = !loading && testimonials.length >= 2

  return (
    <SectionMotionShell
      variant="violet"
      ghostLabel="testimonials"
      className="py-24 md:py-32 scroll-mt-24"
    >
      {/* Section header */}
      <div className="relative z-10 px-4">
        <SectionHeader
          label="Testimonials"
          title="What Clients Say"
          subtitle="Real words from real collaborators — a glimpse into the experiences behind every project."
        />
      </div>

      {/* ── Marquee content ─────────────────────────────── */}
      <div ref={sectionRef} className="relative z-10 space-y-4">
        {loading ? (
          <>
            <SkeletonRow count={4} />
            <SkeletonRow count={4} />
          </>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-slate-500 py-12">No testimonials yet.</p>
        ) : canShow ? (
          <>
            {/* Row 1 → always scrolls left */}
            <MarqueeRow
              items={row1.length >= 2 ? row1 : testimonials}
              marqueDir={1}
              scrollDir={scrollDir}
              speed={38}
            />
            {/* Row 2 → always scrolls right */}
            {row2.length >= 2 && (
              <MarqueeRow
                items={row2}
                marqueDir={-1}
                scrollDir={scrollDir}
                speed={44}
              />
            )}
          </>
        ) : (
          /* Fallback for <2 items */
          <div className="flex justify-center gap-4 flex-wrap px-4">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} scrollDir={scrollDir} />
            ))}
          </div>
        )}
      </div>

      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 z-20"
        style={{ background: 'linear-gradient(90deg, var(--portfolio-bg) 0%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 z-20"
        style={{ background: 'linear-gradient(270deg, var(--portfolio-bg) 0%, transparent 100%)' }}
      />

      {/* Trust badge */}
      {!loading && testimonials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 mt-14 flex justify-center px-4"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-inner">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#020617] overflow-hidden flex-shrink-0"
                >
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-[9px] font-black text-white">
                      {t.name?.charAt(0) ?? '?'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-slate-300 text-sm font-medium">
              Trusted by{' '}
              <span className="text-white font-bold">100+</span> happy clients worldwide
            </p>
          </div>
        </motion.div>
      )}
    </SectionMotionShell>
  )
}
