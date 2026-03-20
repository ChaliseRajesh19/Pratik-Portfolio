import React from 'react'
import { motion } from 'framer-motion'
import { ProjectCards3D } from '../components/three/ProjectCards3D'

// Static works data — same content as before, no changes
const works = [
  {
    id: 1,
    title: 'Logo Design',
    description: 'Crafting unique and memorable logos that capture the essence of your brand and leave a lasting impression on your audience.',
    imageURL: 'https://via.placeholder.com/400x300?text=Logo+Design',
    pagename: 'logo',
  },
  {
    id: 2,
    title: 'Graphic Design',
    description: 'Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.',
    imageURL: 'https://via.placeholder.com/400x300?text=Graphic+Design',
    pagename: 'graphic',
  },
  {
    id: 3,
    title: 'Brand Identity Design',
    description: 'Complete brand packages including color palettes, typography, and design systems that tell your unique story.',
    imageURL: 'https://via.placeholder.com/400x300?text=Brand+Identity+Design',
    pagename: 'brand',
  },
  {
    id: 4,
    title: 'Social Media, Poster & Banner Design',
    description: 'Eye-catching visuals for social media, marketing materials, and digital platforms that capture attention and drive engagement.',
    imageURL: 'https://via.placeholder.com/400x300?text=Social+Media+Design',
    pagename: 'socialmedia',
  },
  {
    id: 5,
    title: 'UI Design',
    description: 'User-centered interface designs that are both beautiful and functional, ensuring seamless digital experiences.',
    imageURL: 'https://via.placeholder.com/400x300?text=UI+Design',
    pagename: 'ui',
  },
]

function Portfolio({ withTopOffset = true }) {
  const containerClass = withTopOffset ? 'min-h-screen mt-16' : 'mt-0'

  return (
    <div
      className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-6 pb-16 ${containerClass}`}
    >
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mt-8 mb-4"
        >
          My Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="text-slate-400 max-w-xl mx-auto"
        >
          Hover each card to explore the work. Drag to scroll through all projects.
        </motion.p>
      </div>

      {/* 3D Tilt Cards with horizontal scroll (desktop) / vertical stack (mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <ProjectCards3D works={works} />
      </motion.div>
    </div>
  )
}

export default Portfolio