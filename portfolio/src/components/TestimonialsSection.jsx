import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Niraj Joshi',
    role: 'Founder, Joshi Media',
    quote: "Pratik's visual systems transformed our digital products. His eye for typography and grid alignment is second to none.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 2,
    name: 'Alex Moreau',
    role: 'Creative Director, Studio Moreau',
    quote: 'An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 3,
    name: 'Sophie Chen',
    role: 'Marketing Lead, Lumina UK',
    quote: 'We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 4,
    name: 'Marcus Vance',
    role: 'Principal Architect, Vance & Co.',
    quote: 'Pratik brings architectural layouts to the web. The composition and spacing are exactly what our premium brand needed.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 5,
    name: 'Elena Rostova',
    role: 'Product Owner, Zenith Apps',
    quote: 'We worked on a dark-mode mobile interface system. His capability to balance technical constraints with rich styling was brilliant.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
  },
]

export default function TestimonialsSection({ initialTestimonials }) {
  const list = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : TESTIMONIALS
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [clickedIdx, setClickedIdx] = useState(null)

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const handleRowInteraction = (index, isEnter) => {
    if (isTouchDevice) return
    if (isEnter) {
      setHoveredIdx(index)
    } else {
      setHoveredIdx(null)
    }
  }

  const handleRowClick = (index) => {
    if (clickedIdx === index) {
      setClickedIdx(null)
    } else {
      setClickedIdx(index)
    }
  }

  const activeIndex = isTouchDevice ? clickedIdx : hoveredIdx
  const isAnyActive = activeIndex !== null

  return (
    <section
      id="testimonials"
      className="relative bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 select-none overflow-hidden"
    >
      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-full pb-4 border-b border-neutral-900 mb-10">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">08</span>
        <span className="font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase">CLIENT WORDS</span>
      </div>

      {/* ── ROLODEX ACCORDION LIST ───────────────────────────────────────── */}
      <dl className="max-w-4xl mx-auto divide-y divide-neutral-900/60 border-b border-neutral-900/60">
        {list.map((t, index) => {
          const isActive = activeIndex === index
          const isDimmed = isAnyActive && !isActive

          return (
            <div
              key={t.id}
              className="group py-5 sm:py-6 transition-all duration-300"
              style={{
                opacity: isDimmed ? 0.45 : 1,
              }}
              onMouseEnter={() => handleRowInteraction(index, true)}
              onMouseLeave={() => handleRowInteraction(index, false)}
              onClick={() => handleRowClick(index)}
            >
              {/* Row Trigger Title */}
              <dt
                role="button"
                aria-expanded={isActive}
                aria-controls={`quote-content-${t.id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleRowClick(index)
                  }
                }}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h3
                  className={`font-bebas text-2xl sm:text-4xl tracking-wide uppercase transition-all duration-300 ${
                    isActive ? 'text-[#ff6b35] scale-[1.02]' : 'text-neutral-300 group-hover:text-white'
                  }`}
                >
                  {t.name}
                </h3>
                <span className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest flex-shrink-0">
                  {t.role}
                </span>
              </dt>

              {/* Smooth Grid-Template-Rows Height Expansion */}
              <dd
                id={`quote-content-${t.id}`}
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  gridTemplateRows: isActive ? '1fr' : '0fr',
                }}
              >
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-5"
                      >
                        {/* Client Avatar / Photo */}
                        <img
                          src={t.avatarImage || t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border border-neutral-800/80 shadow-md flex-shrink-0"
                          loading="lazy"
                        />

                        {/* Quote Block */}
                        <div className="border-l border-[#ff6b35] pl-4 py-0.5">
                          <p className="text-neutral-200 font-sans text-base sm:text-[17px] leading-relaxed italic">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
