import React from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, FileText, MessageSquareQuote, Zap, Clock,
  Plus, ArrowUpRight, Database, HardDrive, User
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
}

function SkeletonCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3 animate-pulse">
      <div className="h-3 w-24 bg-zinc-800 rounded" />
      <div className="h-10 w-16 bg-zinc-800 rounded" />
      <div className="h-3 w-32 bg-zinc-800 rounded" />
    </div>
  )
}

function StatCard({ icon: Icon, label, count, publishedCount, color, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:border-zinc-700 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-zinc-100 tabular-nums">{count}</span>
        {publishedCount !== undefined && (
          <span className="text-xs text-emerald-400 font-medium">{publishedCount} live</span>
        )}
      </div>
    </motion.div>
  )
}

export default function DashboardView({
  works, blogs, testimonials, capabilities, milestones,
  isLoading, onNavigate, supabaseConnected
}) {
  const activeWorks = works.filter(w => w.status !== 'Draft').length
  const activeBlogs = blogs.filter(b => b.status !== 'Draft').length
  const activeTestimonials = testimonials.filter(t => t.status !== 'Draft').length

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@pratikbhusal.com'

  const quickActions = [
    { label: 'New Case Study', icon: Briefcase, tab: 'works', action: 'new' },
    { label: 'New Blog Post', icon: FileText, tab: 'blog', action: 'new' },
    { label: 'New Testimonial', icon: MessageSquareQuote, tab: 'testimonials', action: 'new' },
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-zinc-800/60 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-semibold text-zinc-100">Dashboard</h2>
        <p className="text-sm text-zinc-500 mt-1">Overview of your portfolio content</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={Briefcase}
          label="Case Studies"
          count={works.length}
          publishedCount={activeWorks}
          color="bg-indigo-500/15 text-indigo-400"
          onClick={() => onNavigate('works')}
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          count={blogs.length}
          publishedCount={activeBlogs}
          color="bg-violet-500/15 text-violet-400"
          onClick={() => onNavigate('blog')}
        />
        <StatCard
          icon={MessageSquareQuote}
          label="Testimonials"
          count={testimonials.length}
          publishedCount={activeTestimonials}
          color="bg-amber-500/15 text-amber-400"
          onClick={() => onNavigate('testimonials')}
        />
        <StatCard
          icon={Zap}
          label="Capabilities"
          count={capabilities.length}
          color="bg-emerald-500/15 text-emerald-400"
          onClick={() => onNavigate('capabilities')}
        />
        <StatCard
          icon={Clock}
          label="Milestones"
          count={milestones.length}
          color="bg-cyan-500/15 text-cyan-400"
          onClick={() => onNavigate('milestones')}
        />
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(action => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(action.tab, action.action)}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-800/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Plus size={16} className="text-indigo-400" />
              {action.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        variants={fadeUp}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4"
      >
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">System Status</h3>
        <div className="divide-y divide-zinc-800">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Database size={16} />
              <span>Database Backend</span>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              supabaseConnected
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}>
              {supabaseConnected ? 'Supabase Cloud' : 'LocalStorage Fallback'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <HardDrive size={16} />
              <span>Image Storage</span>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              supabaseConnected
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              {supabaseConnected ? 'Supabase Storage' : 'Object URLs'}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <User size={16} />
              <span>Admin Account</span>
            </div>
            <span className="text-xs font-medium text-zinc-300">{ADMIN_EMAIL}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
