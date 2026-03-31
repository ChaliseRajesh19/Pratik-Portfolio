import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../components/SectionHeader'
import { SectionMotionShell } from '../components/motion/SectionMotionShell'
import { TestimonialCard } from '../components/Testimonials'
import { useTestimonials } from '../hooks/useTestimonials'
import { useSEO } from '../hooks/useSEO'

function SkeletonCard() {
  return (
    <div className="w-full rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] animate-pulse">
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

function TestimonialsPage() {
  useSEO({
    title: 'Client Testimonials — Pratik Bhusal',
    description: 'Read real reviews and feedback from clients who have collaborated with Pratik Bhusal on design, video, and brand identity projects.',
    canonicalPath: '/testimonials',
    keywords: ['client testimonials', 'reviews', 'feedback', 'Pratik Bhusal reviews', 'freelance design reviews'],
  })

  const { testimonials, loading } = useTestimonials()

  return (
    <SectionMotionShell
      variant="violet"
      ghostLabel="reviews"
      className="min-h-screen pt-24 pb-16 md:pt-32"
    >
      <div className="text-center mb-16 px-4 relative z-10 w-full max-w-7xl mx-auto">
        <SectionHeader
          label="Testimonials"
          title="All Client Reviews"
          subtitle="Real words from real collaborators — unedited and unfiltered experiences from the people I've worked with."
        />
        
        {/* Trust badge */}
        {!loading && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 mt-8 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-inner"
          >
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
              Trusted by <span className="text-white font-bold">{Math.max(100, testimonials.length)}+</span> happy clients
            </p>
          </motion.div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No testimonials available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {testimonials.map((t, index) => (
              <div key={t.id} className="w-full flex justify-center [&>div]:w-full [&>div]:mx-0">
                <TestimonialCard t={t} index={index % 12} />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionMotionShell>
  )
}

export default TestimonialsPage
