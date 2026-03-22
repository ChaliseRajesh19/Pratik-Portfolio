import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProfileImage from '../assets/Profile.png'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

function ScrollRevealTextContainer({ paragraphs }) {
  const containerRef = useRef(null)
  
  // Track scroll progress across the entire set of paragraphs block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%']
  })

  return (
    <div ref={containerRef} className="space-y-8 mt-10">
      {paragraphs.map((text, pi) => {
        // Each paragraph occupies a fraction of the total 0..1 scroll progress
        const paraStart = pi / paragraphs.length
        const paraEnd = (pi + 1) / paragraphs.length
        
        const words = text.split(' ')

        return (
          <p key={pi} className="text-slate-300 text-base leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
            {words.map((word, i) => {
              // Calculate word fraction relative to its paragraph
              const wordLocalStart = i / words.length
              const wordLocalEnd = wordLocalStart + (1 / words.length)
              
              // Map local fraction to the global paragraph fraction
              const globalStart = paraStart + (wordLocalStart * (paraEnd - paraStart))
              const globalEnd = paraStart + (wordLocalEnd * (paraEnd - paraStart))

              return (
                <Word key={i} progress={scrollYProgress} range={[globalStart, globalEnd]}>
                  {word}
                </Word>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

function About({ withTopOffset = true }) {
  const sectionClassName = `min-h-screen bg-[#020617] text-slate-100 px-4 py-10 md:py-24 ${withTopOffset ? 'mt-16' : 'mt-0'}`

  const paragraphs = [
    'I am a Graphics Designer and Video Editor with 3+ years of experience delivering impactful visual content for brands worldwide. My work balances creative vision with strategic thinking to help businesses build strong visual identities, engage their audiences, and communicate their message through high-quality design and video.',
    'From branding and social media creatives to marketing visuals, professional video editing, and motion-based content, I deliver modern, results-driven solutions tailored to each client\'s goals. Every project is handled with attention to detail, thoughtful storytelling, and a commitment to quality.',
    'My mission is to transform ideas into compelling visuals and videos that elevate brands, strengthen online presence, and leave a lasting impression.',
  ]

  return (
    <section id="about" className={sectionClassName}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text Content ── */}
          <div>
            {/* Title */}
            <motion.h2 
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              About Me
            </motion.h2>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-8 rounded-full"
            />

            {/* Paragraphs with scroll-linked word reveal spanning the full text */}
            <ScrollRevealTextContainer paragraphs={paragraphs} />
          </div>

          {/* ── RIGHT: Profile photo — no borders, minimal hover glow ── */}
          <div className="flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative max-w-md w-full group cursor-default"
            >
              {/* Minimal hover glow — no border, just soft light */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

              <img
                src={ProfileImage}
                alt="Pratik Bhusal"
                className="relative w-full h-auto rounded-2xl object-cover"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
