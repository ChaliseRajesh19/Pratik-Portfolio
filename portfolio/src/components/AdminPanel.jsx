import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { contentServices, supabase } from '../services/contentService'
import { motion } from 'framer-motion'
import { ENV } from '../config/env'

export default function AdminPanel({ currentPath, onNavigate }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pratik_admin_auth') === 'true'
    }
    return false
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (isAuthenticated && location.pathname !== '/admin') {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  // Selected tab state
  const [activeTab, setActiveTab] = useState('dashboard')

  // Loaded database states
  const [works, setWorks] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const [milestones, setMilestones] = useState([])
  const [settings, setSettings] = useState({})

  // Form states (Add/Edit modals or inline edits)
  const [editingItem, setEditingItem] = useState(null) // holds item object or 'new'
  const [editType, setEditType] = useState(null) // 'works', 'blogs', 'testimonials', 'capabilities', 'milestones'
  const [slugWarning, setSlugWarning] = useState('')

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('')

  // Single admin credentials (central config)
  const ADMIN_EMAIL = ENV.ADMIN_EMAIL
  const ADMIN_PASSWORD = ENV.ADMIN_PASSWORD

  // Fetch all site content on auth success
  useEffect(() => {
    if (!isAuthenticated) return
    loadData()
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      const [w, b, t, c, m, s] = await Promise.all([
        contentServices.getWorks(),
        contentServices.getBlogPosts(),
        contentServices.getTestimonials(),
        contentServices.getCapabilities(),
        contentServices.getMilestones(),
        contentServices.getSettings()
      ])
      setWorks(w)
      setBlogs(b)
      setTestimonials(t)
      setCapabilities(c)
      setMilestones(m)
      setSettings(s || {})
    } catch (err) {
      console.error('Error loading content in admin panel:', err)
    }
  }

  // Auth operations
  const handleLogin = (e) => {
    e.preventDefault()
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('pratik_admin_auth', 'true')
      setLoginError('')
      if (location.pathname !== '/admin') {
        navigate('/admin', { replace: true })
      }
    } else {
      setLoginError('Invalid administrator credentials.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('pratik_admin_auth')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6 py-12 selection:bg-[#1e90ff] selection:text-black font-sans">
        <div className="w-full max-w-md bg-[#0e0e0e] border border-neutral-800 rounded-xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-[#ff6b35] tracking-widest block font-bold">[ ADMIN CONTROL ]</span>
            <h1 className="font-bebas text-4xl tracking-wider text-white">SIGN IN</h1>
          </div>

          {loginError && (
            <div className="bg-red-950/40 border border-red-800 text-red-300 text-xs px-4 py-3 rounded-lg font-mono">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-400 uppercase tracking-wider block">[ EMAIL ADDRESS ]</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pratikbhusal.com"
                className="w-full bg-[#121212] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1e90ff] transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-400 uppercase tracking-wider block">[ PASSWORD ]</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#1e90ff] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1e90ff] text-black font-bold uppercase rounded-lg py-3 cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-all shadow-[0_0_15px_rgba(30,144,255,0.25)]"
            >
              ACCESS PANEL
            </button>
          </form>

          <div className="text-center font-mono text-[9px] text-neutral-600">
            SECURE ACCESS ONLY · DISALLOW: /ADMIN ROBOTS
          </div>
        </div>
      </div>
    )
  }

  // Helper values
  const activeWorksCount = works.filter(w => w.status !== 'Draft').length
  const activeBlogsCount = blogs.filter(b => b.status !== 'Draft').length
  const activeTestimonialsCount = testimonials.filter(t => t.status !== 'Draft').length

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-200 font-sans flex flex-col md:flex-row selection:bg-[#1e90ff] selection:text-black">
      
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-neutral-900/60 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#1e90ff] animate-pulse" />
            <h1 className="font-bebas text-2xl tracking-wider text-white">PB ADMIN</h1>
          </div>

          <nav className="flex flex-col gap-1.5 font-mono text-xs">
            {[
              { id: 'dashboard', label: 'DASHBOARD' },
              { id: 'works', label: 'WORKS' },
              { id: 'blog', label: 'BLOG POSTS' },
              { id: 'testimonials', label: 'TESTIMONIALS' },
              { id: 'capabilities', label: 'CAPABILITIES' },
              { id: 'milestones', label: 'MILESTONES' },
              { id: 'settings', label: 'SITE SETTINGS' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setEditingItem(null)
                  setSearchQuery('')
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-neutral-900 border-neutral-800 text-[#1e90ff] font-bold'
                    : 'bg-transparent border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-900 font-mono text-xs space-y-4">
          <div className="text-[10px] text-neutral-500">
            LOGGED IN AS:<br />
            <span className="text-white font-bold">{ADMIN_EMAIL}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-950/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 hover:text-white font-bold rounded-lg transition-colors cursor-pointer text-center block"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-5xl">
        {editingItem ? (
          /* ─── RENDERING EDIT / ADD FORMS ─── */
          <EditForm
            item={editingItem}
            type={editType}
            onCancel={() => setEditingItem(null)}
            onSave={async (savedData) => {
              if (editType === 'works') {
                await contentServices.saveWork(savedData)
              } else if (editType === 'blogs') {
                await contentServices.saveBlogPost(savedData)
              } else if (editType === 'testimonials') {
                await contentServices.saveTestimonial(savedData)
              } else if (editType === 'capabilities') {
                await contentServices.saveCapability(savedData)
              } else if (editType === 'milestones') {
                await contentServices.saveMilestone(savedData)
              }
              setEditingItem(null)
              loadData()
            }}
            works={works}
            blogs={blogs}
          />
        ) : (
          /* ─── TAB SWITCH PANELS ─── */
          <div>
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-bebas text-4xl text-white tracking-wide">DASHBOARD</h2>
                  <p className="text-xs text-neutral-500 font-mono">QUICK METRICS OVERVIEW</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { count: works.length, label: 'TOTAL CASE STUDIES', active: activeWorksCount },
                    { count: blogs.length, label: 'TOTAL BLOG POSTS', active: activeBlogsCount },
                    { count: testimonials.length, label: 'TESTIMONIALS', active: activeTestimonialsCount }
                  ].map((card, i) => (
                    <div key={i} className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-2">
                      <span className="font-mono text-[10px] text-neutral-500 tracking-wider block">{card.label}</span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-bebas text-5xl text-white">{card.count}</span>
                        <span className="font-mono text-xs text-[#ff6b35]">({card.active} Published)</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-4">
                  <h3 className="font-bebas text-xl text-white tracking-wide">SYSTEM INTEGRATION STATUS</h3>
                  <div className="font-mono text-xs divide-y divide-neutral-900">
                    <div className="py-3 flex justify-between">
                      <span className="text-neutral-500">DATABASE BACKEND</span>
                      <span className={supabase ? "text-green-400 font-bold" : "text-amber-400"}>
                        {supabase ? "SUPABASE CLOUD (CONNECTED)" : "LOCALSTORAGE (SANDBOX FALLBACK)"}
                      </span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-neutral-500">IMAGE STORAGE</span>
                      <span className={supabase ? "text-green-400 font-bold" : "text-neutral-400"}>
                        {supabase ? "SUPABASE STORAGE" : "MOCK LOCAL OBJECT URLS"}
                      </span>
                    </div>
                    <div className="py-3 flex justify-between">
                      <span className="text-neutral-500">ADMIN ACCOUNT</span>
                      <span className="text-white font-bold">{ADMIN_EMAIL}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'works' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-4xl text-white tracking-wide">WORKS & CASE STUDIES</h2>
                    <p className="text-xs text-neutral-500 font-mono">MANAGE PORTFOLIO ITEMS</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditType('works')
                      setEditingItem({
                        title: '', slug: '', client: '', category: 'Branding', tag: 'TRANSFORMATION',
                        bgWord: '', tagline: '', year: new Date().getFullYear().toString(), services: [],
                        image: '', gallery: [], challenge: '', approach: '', solution: '', results: '',
                        status: 'Draft', index: (works.length + 1).toString().padStart(2, '0')
                      })
                    }}
                    className="bg-[#1e90ff] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
                  >
                    + ADD NEW WORK
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search works by title or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#1e90ff]"
                />

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#121212] text-neutral-500 border-b border-neutral-900 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Index</th>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Year</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60">
                      {works
                        .filter(w => w.title.toLowerCase().includes(searchQuery.toLowerCase()) || w.client.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(work => (
                          <tr key={work.id || work.slug} className="hover:bg-neutral-900/20">
                            <td className="px-6 py-4 font-bold text-neutral-400">{work.index}</td>
                            <td className="px-6 py-4 text-white font-bold">{work.title}</td>
                            <td className="px-6 py-4">{work.client}</td>
                            <td className="px-6 py-4">{work.year}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] ${work.status === 'Draft' ? 'bg-neutral-800 text-neutral-400' : 'bg-green-950/60 border border-green-800 text-green-400 font-bold'}`}>
                                {work.status || 'Published'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditType('works')
                                  setEditingItem(work)
                                }}
                                className="text-[#1e90ff] hover:text-white transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete this case study? This action is permanent.')) {
                                    await contentServices.deleteWork(work.id)
                                    loadData()
                                  }
                                }}
                                className="text-red-500 hover:text-white transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-4xl text-white tracking-wide">JOURNAL BLOG POSTS</h2>
                    <p className="text-xs text-neutral-500 font-mono">MANAGE JOURNAL WRITINGS</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditType('blogs')
                      setEditingItem({
                        title: '', slug: '', excerpt: '', category: 'Design',
                        publishDate: new Date().toISOString().split('T')[0],
                        content: '', featuredImage: '', status: 'Draft',
                        imageAlt: '', seoTitle: '', seoDescription: ''
                      })
                    }}
                    className="bg-[#1e90ff] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
                  >
                    + ADD NEW POST
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search articles by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#1e90ff]"
                />

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#121212] text-neutral-500 border-b border-neutral-900 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Published</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60">
                      {blogs
                        .filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.category.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(post => (
                          <tr key={post.id || post.slug} className="hover:bg-neutral-900/20">
                            <td className="px-6 py-4 text-white font-bold">{post.title}</td>
                            <td className="px-6 py-4">{post.category}</td>
                            <td className="px-6 py-4">{post.publishDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] ${post.status === 'Draft' ? 'bg-neutral-800 text-neutral-400' : 'bg-green-950/60 border border-green-800 text-green-400 font-bold'}`}>
                                {post.status || 'Published'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditType('blogs')
                                  setEditingItem(post)
                                }}
                                className="text-[#1e90ff] hover:text-white transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete this article? This action is permanent.')) {
                                    await contentServices.deleteBlogPost(post.id)
                                    loadData()
                                  }
                                }}
                                className="text-red-500 hover:text-white transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-4xl text-white tracking-wide">TESTIMONIALS</h2>
                    <p className="text-xs text-neutral-500 font-mono">MANAGE CLIENT REVIEWS</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditType('testimonials')
                      setEditingItem({
                        name: '', role: '', company: '', quote: '', order: testimonials.length + 1, status: 'Published'
                      })
                    }}
                    className="bg-[#1e90ff] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
                  >
                    + ADD NEW TESTIMONIAL
                  </button>
                </div>

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#121212] text-neutral-500 border-b border-neutral-900 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Quote</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60">
                      {testimonials.map(item => (
                        <tr key={item.id} className="hover:bg-neutral-900/20">
                          <td className="px-6 py-4 font-bold text-neutral-400">{item.order}</td>
                          <td className="px-6 py-4 text-white font-bold">{item.name}</td>
                          <td className="px-6 py-4">{item.company} ({item.role})</td>
                          <td className="px-6 py-4 max-w-xs truncate text-neutral-400">{item.quote}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditType('testimonials')
                                setEditingItem(item)
                              }}
                              className="text-[#1e90ff] hover:text-white transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm('Delete this testimonial?')) {
                                  await contentServices.deleteTestimonial(item.id)
                                  loadData()
                                }
                              }}
                              className="text-red-500 hover:text-white transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'capabilities' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-4xl text-white tracking-wide">CAPABILITIES LIST</h2>
                    <p className="text-xs text-neutral-500 font-mono">MANAGE ABOUT PAGE SKILLS</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditType('capabilities')
                      setEditingItem({
                        name: '', desc: '', order: capabilities.length + 1
                      })
                    }}
                    className="bg-[#1e90ff] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
                  >
                    + ADD SKILL
                  </button>
                </div>

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#121212] text-neutral-500 border-b border-neutral-900 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Index</th>
                        <th className="px-6 py-4">Skill Title</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60">
                      {capabilities.map((c, i) => (
                        <tr key={c.id || i} className="hover:bg-neutral-900/20">
                          <td className="px-6 py-4 font-bold text-neutral-400">{c.order || (i + 1)}</td>
                          <td className="px-6 py-4 text-white font-bold">{c.name}</td>
                          <td className="px-6 py-4 max-w-sm text-neutral-400">{c.desc}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditType('capabilities')
                                setEditingItem(c)
                              }}
                              className="text-[#1e90ff] hover:text-white transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm('Delete this capability?')) {
                                  await contentServices.deleteCapability(c.id)
                                  loadData()
                                }
                              }}
                              className="text-red-500 hover:text-white transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bebas text-4xl text-white tracking-wide">MILESTONES &amp; JOURNEY</h2>
                    <p className="text-xs text-neutral-500 font-mono">MANAGE ABOUT TIMELINE</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditType('milestones')
                      setEditingItem({
                        year: new Date().getFullYear().toString(), title: '', desc: '', order: milestones.length + 1
                      })
                    }}
                    className="bg-[#1e90ff] text-black font-mono text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
                  >
                    + ADD MILESTONE
                  </button>
                </div>

                <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl overflow-hidden font-mono text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#121212] text-neutral-500 border-b border-neutral-900 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Year</th>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60">
                      {milestones.map(item => (
                        <tr key={item.id} className="hover:bg-neutral-900/20">
                          <td className="px-6 py-4 font-bold text-[#1e90ff]">{item.year}</td>
                          <td className="px-6 py-4 text-white font-bold">{item.title}</td>
                          <td className="px-6 py-4 max-w-sm text-neutral-400">{item.desc}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditType('milestones')
                                setEditingItem(item)
                              }}
                              className="text-[#1e90ff] hover:text-white transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm('Delete this timeline milestone?')) {
                                  await contentServices.deleteMilestone(item.id)
                                  loadData()
                                }
                              }}
                              className="text-red-500 hover:text-white transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <SettingsForm
                initialSettings={settings}
                onSave={async (saved) => {
                  await contentServices.saveSettings(saved)
                  loadData()
                  alert('Settings updated successfully!')
                }}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

/* ─── RENDERING GENERIC EDIT / ADD FORM VIEW ─── */
function EditForm({ item, type, onCancel, onSave }) {
  const [formData, setFormData] = useState({ ...item })
  const [tempTag, setTempTag] = useState('')

  // Validation warnings
  const [seoTitleWarning, setSeoTitleWarning] = useState('')
  const [seoDescWarning, setSeoDescWarning] = useState('')

  useEffect(() => {
    // SEO length counters
    if (formData.seoTitle) {
      const len = formData.seoTitle.length
      if (len > 60) setSeoTitleWarning(`Title is long (${len}/60 chars max recommended)`)
      else if (len < 40) setSeoTitleWarning(`Title is short (${len}/40-60 chars recommended)`)
      else setSeoTitleWarning('')
    }
    if (formData.seoDescription) {
      const len = formData.seoDescription.length
      if (len > 160) setSeoDescWarning(`Meta Description is long (${len}/160 chars max)`)
      else if (len < 120) setSeoDescWarning(`Meta Description is short (${len}/120-160 chars)`)
      else setSeoDescWarning('')
    }
  }, [formData.seoTitle, formData.seoDescription])

  const handleFieldChange = (field, val) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: val }
      // Auto-generate slug from title
      if (field === 'title' && prev.slug !== undefined) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }
      return updated
    })
  }

  const handleFileUpload = async (field, file) => {
    if (!file) return
    const url = await contentServices.uploadFile(file)
    handleFieldChange(field, url)
  }

  const handleAddService = (e) => {
    if (e.key === 'Enter' && tempTag.trim()) {
      e.preventDefault()
      if (!formData.services.includes(tempTag.trim())) {
        handleFieldChange('services', [...formData.services, tempTag.trim()])
      }
      setTempTag('')
    }
  }

  const handleRemoveService = (tag) => {
    handleFieldChange('services', formData.services.filter(s => s !== tag))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-6">
        <div>
          <h2 className="font-bebas text-3xl text-white tracking-wide">
            {formData.id ? 'EDIT' : 'CREATE NEW'} {type.toUpperCase()}
          </h2>
        </div>
        <div className="space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#1e90ff] text-black font-bold rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Block */}
        <div className="md:col-span-8 space-y-4">
          
          {/* ─── WORKS FORM FIELDS ─── */}
          {type === 'works' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ PROJECT TITLE ]</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ UNIQUE SLUG ]</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ CLIENT NAME ]</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => handleFieldChange('client', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ CATEGORY ]</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="BRAND IDENTITY & REBRANDING">BRAND IDENTITY & REBRANDING</option>
                    <option value="PUBLISHING & EDITORIAL">PUBLISHING & EDITORIAL</option>
                    <option value="SPORTS & SOCIAL MEDIA CAMPAIGN">SPORTS & SOCIAL MEDIA CAMPAIGN</option>
                    <option value="PACKAGING & BRANDING">PACKAGING & BRANDING</option>
                    <option value="SOCIAL MEDIA GRAPHIC DESIGN">SOCIAL MEDIA GRAPHIC DESIGN</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ YEAR ]</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => handleFieldChange('year', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ TAG EYEBROW ]</label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => handleFieldChange('tag', e.target.value)}
                    placeholder="TRANSFORMATION"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ BACKGROUND WORD ]</label>
                  <input
                    type="text"
                    required
                    value={formData.bgWord}
                    onChange={(e) => handleFieldChange('bgWord', e.target.value)}
                    placeholder="PATHAO"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ DISPLAY INDEX ]</label>
                  <input
                    type="text"
                    required
                    value={formData.index}
                    onChange={(e) => handleFieldChange('index', e.target.value)}
                    placeholder="01"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ PROJECT HERO TAGLINE ]</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => handleFieldChange('tagline', e.target.value)}
                  placeholder="THE OVERHAUL OF URBAN MOBILITY."
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ SERVICES / ROLE TAGS (PRESS ENTER) ]</label>
                <div className="flex flex-wrap gap-2 p-3 bg-[#0c0c0c] border border-neutral-900 rounded-lg">
                  {formData.services?.map(s => (
                    <span key={s} className="bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded flex items-center gap-1.5 text-neutral-300">
                      {s}
                      <button type="button" onClick={() => handleRemoveService(s)} className="text-neutral-500 hover:text-white">✕</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tempTag}
                    onChange={(e) => setTempTag(e.target.value)}
                    onKeyDown={handleAddService}
                    placeholder="Add tag..."
                    className="bg-transparent focus:outline-none flex-1 text-white min-w-[100px]"
                  />
                </div>
              </div>

              {/* Repeatable Sections Builder */}
              <div className="space-y-3 pt-4 border-t border-neutral-900">
                <div className="flex justify-between items-center">
                  <label className="text-neutral-400 uppercase tracking-widest block font-bold">[ CASE STUDY BODY SECTIONS ]</label>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSecs = formData.sections || []
                      handleFieldChange('sections', [...currentSecs, { heading: 'NEW SECTION', paragraphs: [{ text: '', highlights: [] }] }])
                    }}
                    className="text-[#1e90ff] hover:underline"
                  >
                    + Add Section
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.sections?.map((sec, sIdx) => (
                    <div key={sIdx} className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-lg space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => {
                          handleFieldChange('sections', formData.sections.filter((_, i) => i !== sIdx))
                        }}
                        className="absolute right-3 top-3 text-neutral-500 hover:text-red-500 text-xs"
                      >
                        Remove
                      </button>

                      <div className="space-y-1">
                        <label className="text-neutral-500">SECTION HEADING</label>
                        <input
                          type="text"
                          required
                          value={sec.heading}
                          onChange={(e) => {
                            const newSecs = [...formData.sections]
                            newSecs[sIdx].heading = e.target.value
                            handleFieldChange('sections', newSecs)
                          }}
                          className="w-full bg-[#0c0c0c] border border-neutral-800 rounded px-3 py-2 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-neutral-500">PARAGRAPHS</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newSecs = [...formData.sections]
                              newSecs[sIdx].paragraphs.push({ text: '', highlights: [] })
                              handleFieldChange('sections', newSecs)
                            }}
                            className="text-neutral-400 hover:text-white"
                          >
                            + Add Paragraph
                          </button>
                        </div>

                        {sec.paragraphs.map((p, pIdx) => (
                          <div key={pIdx} className="space-y-1.5 p-3 bg-black/30 border border-neutral-950 rounded">
                            <textarea
                              required
                              value={p.text}
                              onChange={(e) => {
                                const newSecs = [...formData.sections]
                                newSecs[sIdx].paragraphs[pIdx].text = e.target.value
                                handleFieldChange('sections', newSecs)
                              }}
                              placeholder="Write paragraph sentences..."
                              rows="3"
                              className="w-full bg-[#0c0c0c] border border-neutral-800 rounded p-2 text-white resize-none focus:outline-none"
                            />
                            <div>
                              <label className="text-[10px] text-neutral-500 block mb-1">KEYWORD HIGHLIGHTS (COMMA SEPARATED)</label>
                              <input
                                type="text"
                                value={p.highlights ? p.highlights.join(', ') : ''}
                                onChange={(e) => {
                                  const tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                  const newSecs = [...formData.sections]
                                  newSecs[sIdx].paragraphs[pIdx].highlights = tags
                                  handleFieldChange('sections', newSecs)
                                }}
                                placeholder="three core services, Super-App identity"
                                className="w-full bg-[#0c0c0c] border border-neutral-800 rounded px-2 py-1.5 text-neutral-300 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repeatable Gallery Builder */}
              <div className="space-y-3 pt-6 border-t border-neutral-900">
                <div className="flex justify-between items-center">
                  <label className="text-neutral-400 uppercase tracking-widest block font-bold">[ CASE STUDY GALLERY SHOWCASE ]</label>
                  <button
                    type="button"
                    onClick={() => {
                      const currentGallery = formData.gallery || []
                      handleFieldChange('gallery', [...currentGallery, { url: '', caption: '' }])
                    }}
                    className="text-[#1e90ff] hover:underline"
                  >
                    + Add Image to Gallery
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.gallery?.map((item, gIdx) => (
                    <div key={gIdx} className="p-4 bg-neutral-900/40 border border-neutral-905 rounded-lg space-y-3 relative">
                      <div className="absolute right-3 top-3 space-x-2">
                        {gIdx > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = [...formData.gallery]
                              const temp = newGallery[gIdx]
                              newGallery[gIdx] = newGallery[gIdx - 1]
                              newGallery[gIdx - 1] = temp
                              handleFieldChange('gallery', newGallery)
                            }}
                            className="text-neutral-500 hover:text-white cursor-pointer"
                          >
                            ▲
                          </button>
                        )}
                        {gIdx < formData.gallery.length - 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = [...formData.gallery]
                              const temp = newGallery[gIdx]
                              newGallery[gIdx] = newGallery[gIdx + 1]
                              newGallery[gIdx + 1] = temp
                              handleFieldChange('gallery', newGallery)
                            }}
                            className="text-neutral-500 hover:text-white cursor-pointer"
                          >
                            ▼
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            handleFieldChange('gallery', formData.gallery.filter((_, i) => i !== gIdx))
                          }}
                          className="text-neutral-500 hover:text-red-500 font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-neutral-500 block uppercase">IMAGE {gIdx + 1}</span>
                        {item.url && (
                          <img src={item.url} alt="Gallery Preview" className="w-full aspect-[16/10] object-cover rounded-lg border border-neutral-950" />
                        )}
                        <input
                          type="file"
                          onChange={async (e) => {
                            const file = e.target.files[0]
                            if (file) {
                              const url = await contentServices.uploadFile(file)
                              const newGallery = [...formData.gallery]
                              newGallery[gIdx].url = url
                              handleFieldChange('gallery', newGallery)
                            }
                          }}
                          className="w-full text-[10px] text-neutral-400 file:py-1 file:px-2 file:rounded file:bg-neutral-800 file:text-white cursor-pointer"
                        />
                        <input
                          type="text"
                          placeholder="Image caption..."
                          value={item.caption || ''}
                          onChange={(e) => {
                            const newGallery = [...formData.gallery]
                            newGallery[gIdx].caption = e.target.value
                            handleFieldChange('gallery', newGallery)
                          }}
                          className="w-full bg-[#0c0c0c] border border-neutral-850 rounded px-2.5 py-2 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─── BLOG POSTS FORM FIELDS ─── */}
          {type === 'blogs' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ ARTICLE TITLE ]</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ UNIQUE SLUG ]</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ CATEGORY ]</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    placeholder="Design"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ PUBLISH DATE ]</label>
                  <input
                    type="date"
                    required
                    value={formData.publishDate}
                    onChange={(e) => handleFieldChange('publishDate', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ ESTIMATED READ TIME ]</label>
                  <input
                    type="text"
                    required
                    value={formData.readTime || '5 min read'}
                    onChange={(e) => handleFieldChange('readTime', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ POST EXCERPT / SUMMARY ]</label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) => handleFieldChange('excerpt', e.target.value)}
                  rows="2"
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ CONTENT MARKDOWN WRITING SURFACE ]</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  rows="14"
                  placeholder="## Heading... Use markdown formatting."
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg p-4 font-mono text-xs text-neutral-200 resize-y focus:outline-none"
                />
              </div>
            </>
          )}

          {/* ─── TESTIMONIALS FORM FIELDS ─── */}
          {type === 'testimonials' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ CLIENT NAME ]</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ ROLE / TITLE ]</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    placeholder="Creative Director"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ COMPANY ]</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ SORTING ORDER ]</label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) => handleFieldChange('order', parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ CLIENT QUOTE STATEMENT ]</label>
                <textarea
                  required
                  value={formData.quote}
                  onChange={(e) => handleFieldChange('quote', e.target.value)}
                  rows="4"
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
                />
              </div>
            </>
          )}

          {/* ─── CAPABILITIES FORM FIELDS ─── */}
          {type === 'capabilities' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ CAPABILITY NAME ]</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ SORT ORDER ]</label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) => handleFieldChange('order', parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ BRIEF DESCRIPTION ]</label>
                <textarea
                  required
                  value={formData.desc}
                  onChange={(e) => handleFieldChange('desc', e.target.value)}
                  rows="3"
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
                />
              </div>
            </>
          )}

          {/* ─── MILESTONES FORM FIELDS ─── */}
          {type === 'milestones' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ YEAR ]</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => handleFieldChange('year', e.target.value)}
                    placeholder="2026"
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ MILESTONE TITLE ]</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-500 uppercase">[ ORDER ]</label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) => handleFieldChange('order', parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-500 uppercase">[ DETAIL DESCRIPTION ]</label>
                <textarea
                  required
                  value={formData.desc}
                  onChange={(e) => handleFieldChange('desc', e.target.value)}
                  rows="3"
                  className="w-full bg-[#0c0c0c] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
                />
              </div>
            </>
          )}

        </div>

        {/* Right Sidebar Block: Image Uploads & SEO settings */}
        <div className="md:col-span-4 space-y-5">
          
          {/* Status Settings */}
          {formData.status !== undefined && (
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-5 space-y-3">
              <label className="text-neutral-400 uppercase tracking-wider block font-bold">[ PUBLISH STATUS ]</label>
              <div className="flex gap-3">
                {['Draft', 'Published'].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleFieldChange('status', st)}
                    className={`flex-1 py-2 text-center border rounded-lg cursor-pointer transition-all ${
                      formData.status === st
                        ? st === 'Published'
                          ? 'bg-green-950/60 border-green-800 text-green-400 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-white font-bold'
                        : 'bg-transparent border-neutral-900 text-neutral-500'
                    }`}
                  >
                    {st.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Images */}
          {(type === 'works' || type === 'blogs') && (
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-5 space-y-4">
              <label className="text-neutral-400 uppercase tracking-wider block font-bold">[ IMAGES &amp; ALT TEXT ]</label>
              
              <div className="space-y-3">
                <span className="text-neutral-500 block uppercase">[ DISPLAY THUMBNAIL ]</span>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-full aspect-[16/10] object-cover rounded-lg border border-neutral-900" />
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileUpload('image', e.target.files[0])}
                  className="w-full text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                />
                <input
                  type="text"
                  required
                  placeholder="Required Image Alt Text (SEO)..."
                  value={formData.imageAlt || ''}
                  onChange={(e) => handleFieldChange('imageAlt', e.target.value)}
                  className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-neutral-300 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Testimonial Client Avatar */}
          {type === 'testimonials' && (
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-5 space-y-4">
              <label className="text-neutral-400 uppercase tracking-wider block font-bold">[ CLIENT AVATAR ]</label>
              
              <div className="space-y-3">
                <span className="text-neutral-500 block uppercase">[ UPLOAD PHOTO ]</span>
                {formData.avatarImage && (
                  <img src={formData.avatarImage} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover border border-neutral-850 shadow-md" />
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileUpload('avatarImage', e.target.files[0])}
                  className="w-full text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Or paste avatar URL..."
                  value={formData.avatarImage || ''}
                  onChange={(e) => handleFieldChange('avatarImage', e.target.value)}
                  className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-neutral-300 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* SEO overrides metadata (Works & Blogs) */}
          {(type === 'works' || type === 'blogs') && (
            <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-5 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-neutral-400 uppercase tracking-wider block font-bold">[ SEO TITLE OVERRIDE ]</label>
                  <span className="text-[10px] text-neutral-500">{(formData.seoTitle || '').length}/60</span>
                </div>
                <input
                  type="text"
                  value={formData.seoTitle || ''}
                  onChange={(e) => handleFieldChange('seoTitle', e.target.value)}
                  placeholder={formData.title}
                  className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
                {seoTitleWarning && <p className="text-[10px] text-amber-500">{seoTitleWarning}</p>}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-neutral-400 uppercase tracking-wider block font-bold">[ META DESCRIPTION ]</label>
                  <span className="text-[10px] text-neutral-500">{(formData.seoDescription || '').length}/160</span>
                </div>
                <textarea
                  value={formData.seoDescription || ''}
                  onChange={(e) => handleFieldChange('seoDescription', e.target.value)}
                  placeholder={formData.excerpt || formData.subtitle}
                  rows="3"
                  className="w-full bg-[#121212] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
                />
                {seoDescWarning && <p className="text-[10px] text-amber-500">{seoDescWarning}</p>}
              </div>
            </div>
          )}

        </div>
      </div>
    </form>
  )
}

/* ─── RENDERING GLOBAL SETTINGS FORM ─── */
function SettingsForm({ initialSettings, onSave }) {
  const [settings, setSettings] = useState({ ...initialSettings })

  const handleFieldChange = (field, val) => {
    setSettings(prev => ({ ...prev, [field]: val }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(settings)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-6">
        <div>
          <h2 className="font-bebas text-4xl text-white tracking-wide">SITE SETTINGS</h2>
          <p className="text-xs text-neutral-500">MANAGE GLOBAL AND HOMEPAGE STRINGS</p>
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#1e90ff] text-black font-bold rounded-lg cursor-pointer hover:bg-[#ff6b35] hover:text-white transition-colors shadow-lg"
        >
          SAVE SITE SETTINGS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-4">
          <h3 className="font-bebas text-lg text-white tracking-wider border-b border-neutral-900 pb-2">METADATA &amp; HEADER</h3>
          
          <div className="space-y-1">
            <label className="text-neutral-500">GLOBAL WEBSITE TITLE</label>
            <input
              type="text"
              required
              value={settings.siteTitle || ''}
              onChange={(e) => handleFieldChange('siteTitle', e.target.value)}
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-500">DEFAULT META DESCRIPTION</label>
            <textarea
              required
              value={settings.metaDescription || ''}
              onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
              rows="3"
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg p-3 text-white resize-none focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-500">HOMEPAGE HERO TITLE TEXT</label>
            <input
              type="text"
              required
              value={settings.homepageHeadline || ''}
              onChange={(e) => handleFieldChange('homepageHeadline', e.target.value)}
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-4">
          <h3 className="font-bebas text-lg text-white tracking-wider border-b border-neutral-900 pb-2">SOCIAL CHANNELS &amp; CONTACT</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-neutral-500">INSTAGRAM LINK</label>
              <input
                type="text"
                required
                value={settings.instagram || ''}
                onChange={(e) => handleFieldChange('instagram', e.target.value)}
                className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-500">FACEBOOK LINK</label>
              <input
                type="text"
                required
                value={settings.facebook || ''}
                onChange={(e) => handleFieldChange('facebook', e.target.value)}
                className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-neutral-500">BEHANCE PORTFOLIO</label>
              <input
                type="text"
                required
                value={settings.behance || ''}
                onChange={(e) => handleFieldChange('behance', e.target.value)}
                className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-500">LINKEDIN PROFILE</label>
              <input
                type="text"
                required
                value={settings.linkedin || ''}
                onChange={(e) => handleFieldChange('linkedin', e.target.value)}
                className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-500">CONTACT INQUIRY EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={settings.contactEmail || ''}
              onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-4">
        <h3 className="font-bebas text-lg text-white tracking-wider border-b border-neutral-900 pb-2">SECTION 02 (TRANSFORMATION) WATERMARK &amp; HEADLINE</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-neutral-500">TOP PARALLAX WATERMARK TEXT</label>
            <input
              type="text"
              required
              value={settings.sectionTwoTopWatermark || 'NORDIC'}
              onChange={(e) => handleFieldChange('sectionTwoTopWatermark', e.target.value)}
              placeholder="e.g. NORDIC, STUDIO, BRAND"
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none uppercase"
            />
          </div>

          <div className="space-y-1">
            <label className="text-neutral-500">BOTTOM PARALLAX WATERMARK TEXT</label>
            <input
              type="text"
              required
              value={settings.sectionTwoBottomWatermark || 'STUDIO'}
              onChange={(e) => handleFieldChange('sectionTwoBottomWatermark', e.target.value)}
              placeholder="e.g. STUDIO, CRAFT, IDENTITY"
              className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none uppercase"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-neutral-500">SECTION 02 SUBTITLE / CATEGORY TAG</label>
          <input
            type="text"
            required
            value={settings.sectionTwoSubtitle || '01 — NORDIC BRAND IDENTITY'}
            onChange={(e) => handleFieldChange('sectionTwoSubtitle', e.target.value)}
            className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-neutral-500">SECTION 02 HEADLINE STATEMENT</label>
          <input
            type="text"
            required
            value={settings.sectionTwoHeadline || 'THE GEOMETRY OF COLD LIGHT.'}
            onChange={(e) => handleFieldChange('sectionTwoHeadline', e.target.value)}
            className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#0c0c0c] border border-neutral-900 rounded-xl p-6 space-y-4">
        <h3 className="font-bebas text-lg text-white tracking-wider border-b border-neutral-900 pb-2">ABOUT BIOGRAPHY OVERRIDES</h3>
        
        <div className="space-y-1">
          <label className="text-neutral-500">ABOUT HERO TITLE STATEMENT</label>
          <input
            type="text"
            required
            value={settings.aboutHeroText || ''}
            onChange={(e) => handleFieldChange('aboutHeroText', e.target.value)}
            className="w-full bg-[#121212] border border-neutral-900 rounded-lg px-4 py-3 text-white focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-neutral-500">BIOGRAPHY TEXT</label>
          <textarea
            required
            value={settings.aboutBio || ''}
            onChange={(e) => handleFieldChange('aboutBio', e.target.value)}
            rows="6"
            className="w-full bg-[#121212] border border-neutral-900 rounded-lg p-4 text-white resize-y focus:outline-none"
          />
        </div>
      </div>
    </form>
  )
}
