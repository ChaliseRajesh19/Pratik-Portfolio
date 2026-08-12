import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection({ initialSettings }) {
  const settings = initialSettings && initialSettings.contactEmail ? initialSettings : { contactEmail: 'pratikbhusal12345@gmail.com' }
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const badgeRef = useRef(null)
  const bottomRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        labelRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        badgeRef.current,
        bottomRef.current,
        footerRef.current,
      ].filter(Boolean)

      // Set initial invisible state purely via GSAP (not Tailwind opacity-0)
      // so there's no class/inline-style conflict
      gsap.set(els, { opacity: 0 })

      // 'play reverse play reverse' with end:'bottom top':
      //   onEnter      → play (fade in as section enters viewport)
      //   onLeave      → reverse — but end='bottom top' is UNREACHABLE for the
      //                  last section (can't scroll page bottom to viewport top),
      //                  so this never fires mid-read ✅
      //   onEnterBack  → play (re-entering from below on scroll up)
      //   onLeaveBack  → reverse (fade out when scrolling back UP past entry point) ✅
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
        },
      })

      tl.to(els, {
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getWhatsappUrl = (val) => {
    if (!val) return 'https://wa.me/9779800000000'
    if (val.startsWith('http://') || val.startsWith('https://')) return val
    const cleaned = val.replace(/[^\d+]/g, '')
    return `https://wa.me/${cleaned.replace('+', '')}`
  }

  const whatsappUrl = getWhatsappUrl(settings.whatsappNumber)

  const socials = [
    { label: 'WHATSAPP',  url: whatsappUrl },
    { label: 'INSTAGRAM', url: settings.instagram || 'https://www.instagram.com/pratikbhusal_/' },
    { label: 'FACEBOOK',  url: settings.facebook  || 'https://www.facebook.com/pratikbhusal'    },
    { label: 'BEHANCE',   url: settings.behance   || 'https://www.behance.net/pratikbhusal'     },
    { label: 'LINKEDIN',  url: settings.linkedin  || 'https://www.linkedin.com/in/pratikbhusal' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-4 sm:py-6 border-t border-neutral-900 select-none overflow-hidden"
    >
      {/* CSS Animations for the spinning badge */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .badge-rotating {
          animation: badge-spin 22s linear infinite;
        }
        .badge-interactive-group:hover .badge-rotating {
          animation-duration: 13s;
        }
      `}} />

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-full pb-4 border-b border-neutral-900">
        <span className="text-xs font-mono text-[#ff6b35] font-bold tracking-widest">09</span>
        <div className="flex items-center gap-3">
          <span className="font-bebas text-sm tracking-[0.25em] text-neutral-300 uppercase">CONTACT</span>
          <span className="text-neutral-600 text-xs">/</span>
          <motion.button
            whileHover={{ color: '#ff6b35' }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              const el = document.getElementById('home')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase cursor-pointer hover:text-[#ff6b35] transition-colors"
          >
            CLOSE
          </motion.button>
        </div>
      </div>

      {/* ── MAIN CONTENT ZONE: 2-COLUMN GRID ───────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 sm:py-14">
        
        {/* Left Column: Headline */}
        <div className="md:col-span-7 flex flex-col justify-center">
          {/* Small label */}
          <p
            ref={labelRef}
            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#ff6b35] uppercase mb-6"
          >
            LET&apos;S CONVENE
          </p>

          {/* Giant 3-line statement */}
          <div className="space-y-0 leading-none">
            <h1
              ref={line1Ref}
              className="font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white"
            >
              LET&apos;S MAKE
            </h1>
            <h1
              ref={line2Ref}
              className="font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white"
            >
              SOMETHING
            </h1>
            <h1
              ref={line3Ref}
              className="font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white"
            >
              WORTH SEEING.
            </h1>
          </div>
        </div>

        {/* Right Column: Rotating Badge & Decorative Visual */}
        <div
          ref={badgeRef}
          className="md:col-span-5 flex items-center justify-center relative min-h-[200px] sm:min-h-[280px]"
        >
          {/* Faint Glow Atmospheric Visual behind the badge */}
          <div
            className="absolute w-[260px] sm:w-[320px] aspect-square rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Clickable Badge */}
          <motion.a
            href={`mailto:${settings.contactEmail}`}
            data-magnetic="true"
            data-cursor="VISIT"
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="badge-interactive-group relative w-[130px] sm:w-[170px] aspect-square rounded-full flex items-center justify-center cursor-pointer group"
          >
            {/* Rotating SVG textPath Ring */}
            <div className="badge-rotating absolute inset-0 w-full h-full will-change-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="badgeCirclePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text className="fill-neutral-400 font-mono text-[6.1px] font-bold uppercase tracking-[0.18em]">
                  <textPath href="#badgeCirclePath" startOffset="0%">
                    * AVAILABLE FOR WORK * LET&apos;S TALK * GET IN TOUCH * COLLAB *
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Static Center arrow inside small circular frame */}
            <div className="magnetic-inner relative w-12 sm:w-16 aspect-square rounded-full border border-neutral-800/80 bg-[#0c0c0c] flex items-center justify-center shadow-lg group-hover:border-[#ff6b35]/60 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#ff6b35] transition-colors duration-300"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </motion.a>
        </div>

      </div>

      {/* ── BOTTOM ROW: EMAIL + SOCIALS ─────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-4 border-t border-neutral-900"
      >
        {/* Email */}
        <motion.a
          href={`mailto:${settings.contactEmail}`}
          data-cursor="VISIT"
          whileHover={{ color: '#ffffff' }}
          transition={{ duration: 0.2 }}
          className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase hover:text-white transition-colors cursor-pointer text-center sm:text-left"
        >
          EMAIL:&nbsp;&nbsp;{settings.contactEmail.toUpperCase()}
        </motion.a>

        {/* Social Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {socials.map(({ label, url }, i) => (
            <React.Fragment key={label}>
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                whileHover={{ color: '#ff6b35' }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase hover:text-[#ff6b35] transition-colors cursor-pointer"
              >
                {label}
              </motion.a>
              {i < socials.length - 1 && (
                <span className="text-neutral-600 text-xs">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
