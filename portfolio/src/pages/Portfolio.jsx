import React from 'react'
import { motion } from 'framer-motion'
import ProjectCards3D from '../components/three/ProjectCards3D'
import { SectionHeader } from '../components/SectionHeader'
import { apiUrl } from '../lib/api'

function Portfolio({ withTopOffset = true, limit = null, showViewAll = false }) {
  const containerClass = withTopOffset ? 'min-h-screen mt-16' : 'mt-0'

  const [works, setWorks] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const controller = new AbortController()
    fetch(apiUrl('/api/categories'), { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWorks(
            data.map((cat, i) => ({
              id:          cat._id || i,
              title:       cat.name,
              description: cat.description || '',
              pagename:    cat.slug,
              icon:        cat.icon || '🎨',
            }))
          )
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <div
      className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-6 pb-10 md:pb-16 ${containerClass}`}
    >
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <SectionHeader
          label="My Work"
          title="My Portfolio"
          subtitle="Pixel-perfect visuals crafted with purpose — every project tells a story."
        />
      </div>

      {loading ? (
        <div className="text-center text-slate-500 py-20 text-sm tracking-widest uppercase">
          Loading categories…
        </div>
      ) : works.length === 0 ? (
        <div className="text-center text-slate-600 py-20 text-sm">
          No categories found.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <ProjectCards3D works={works} limit={limit} showViewAll={showViewAll} />
        </motion.div>
      )}
    </div>
  )
}

export default Portfolio
