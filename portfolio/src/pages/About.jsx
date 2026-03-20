import React from 'react'
import { motion } from 'framer-motion'
import ProfileImage from '../assets/Profile.png'
import { AboutOrb } from '../components/three/AboutOrb'

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: 'easeOut' },
  }),
}

function About({ withTopOffset = true }) {
  const sectionClassName = `min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-16 md:py-24 ${withTopOffset ? 'mt-16' : 'mt-0'}`

  return (
    <section className={sectionClassName}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content with scroll-triggered fade ── */}
          <div>
            <motion.h2
              variants={fadeInLeft}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={fadeInLeft}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-24 h-1 bg-cyan-500 mb-8"
            />

            {[
              'I am a Graphics Designer and Video Editor with 3+ years of experience delivering impactful visual content for brands worldwide. My work balances creative vision with strategic thinking to help businesses build strong visual identities, engage their audiences, and communicate their message through high-quality design and video.',
              'From branding and social media creatives to marketing visuals, professional video editing, and motion-based content, I deliver modern, results-driven solutions tailored to each client\'s goals. Every project is handled with attention to detail, thoughtful storytelling, and a commitment to quality.',
              'My mission is to transform ideas into compelling visuals and videos that elevate brands, strengthen online presence, and leave a lasting impression.',
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={fadeInLeft}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-slate-400 text-lg leading-relaxed mb-6"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* ── RIGHT: Profile photo + floating 3D orb ── */}
          <div className="flex flex-col items-center gap-8 justify-center h-full">
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative max-w-md w-full"
            >
              <div className="absolute -inset-3 rounded-2xl border border-cyan-500/20" />
              <img
                src={ProfileImage}
                alt="Pratik Bhusal"
                className="relative w-full h-auto rounded-2xl object-cover border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About