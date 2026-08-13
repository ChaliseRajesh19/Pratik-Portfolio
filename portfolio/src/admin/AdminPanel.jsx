import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { contentServices, supabase } from '../services/contentService'
import { AnimatePresence, motion } from 'framer-motion'
import { ENV } from '../config/env'
import NotFound from '../components/NotFound'
import './admin.css'

// Admin sub-components
import AdminSidebar from './AdminSidebar'
import AdminTopBar from './AdminTopBar'
import CommandPalette from './CommandPalette'
import DashboardView from './DashboardView'
import DataTable from './DataTable'
import EditForm from './EditForm'
import DeleteModal from './DeleteModal'
import DragReorderList from './DragReorderList'
import SettingsView from './SettingsView'
import { ToastProvider, useToast } from './ToastProvider'
import {
  Briefcase, FileText, MessageSquareQuote, Zap, Clock,
  Pencil, Trash2
} from 'lucide-react'

/* ─── Login Screen ─── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const ADMIN_EMAIL = ENV.ADMIN_EMAIL
  const ADMIN_PASSWORD = ENV.ADMIN_PASSWORD

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Small delay for perceived security
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('pratik_admin_auth', 'true')
        setError('')
        onLogin()
      } else {
        setError('Invalid credentials. Please try again.')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-sm"
      >
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-lg font-semibold text-zinc-100 tracking-wide">PB Admin</span>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-zinc-100">Welcome back</h1>
            <p className="text-sm text-zinc-500 mt-1">Sign in to manage your portfolio</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg py-3 text-sm cursor-pointer transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <p className="text-xs text-zinc-600 text-center mt-6">
            Secure admin access only
          </p>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Content Tab View (Works, Blog, Testimonials) ─── */
function ContentTabView({
  type, data, isLoading, onEdit, onDelete, onDuplicate,
  onToggleStatus, onCreateNew, tabTitle, tabSubtitle,
  columns, searchKeys, emptyTitle, emptyDescription,
  emptyIcon, showToast, onReorder
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [deleteTarget, setDeleteTarget] = useState(null)

  // For orderable types (capabilities, milestones) use DragReorderList
  const isOrderable = type === 'capabilities' || type === 'milestones'

  const getItemKey = (item) => item.id ?? item.slug ?? item.title

  const handleSelectToggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectAll = (selectAllChecked) => {
    if (selectAllChecked === false || selectedIds.size === data.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(data.map(getItemKey)))
    }
  }

  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      const itemToDelete = data.find(d => getItemKey(d) === id) || { id }
      await onDelete(itemToDelete, true) // bulk = true, skip confirmation
    }
    setSelectedIds(new Set())
  }

  const confirmDelete = (item) => {
    setDeleteTarget(item)
  }

  const triggerBulkDelete = () => {
    setDeleteTarget({ isBulk: true })
  }

  const executeDelete = async () => {
    if (deleteTarget) {
      if (deleteTarget.isBulk) {
        for (const id of selectedIds) {
          const itemToDelete = data.find(d => getItemKey(d) === id) || { id }
          await onDelete(itemToDelete, true)
        }
        setSelectedIds(new Set())
      } else {
        await onDelete(deleteTarget)
      }
      setDeleteTarget(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">{tabTitle}</h2>
          <p className="text-sm text-zinc-500 mt-1">{tabSubtitle}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          Create New
        </motion.button>
      </div>

      {/* Search */}
      {!isOrderable && (
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${tabTitle.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}

      {/* Orderable list for capabilities/milestones */}
      {isOrderable ? (
        <DragReorderList
          items={data}
          onReorder={onReorder}
          renderItem={(item, index) => (
            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 group hover:border-zinc-700 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  {type === 'milestones' && (
                    <span className="text-xs font-mono text-indigo-400 font-bold">{item.year}</span>
                  )}
                  <span className="text-sm font-medium text-zinc-200">{item.name || item.title}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1 truncate">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Pencil size={15} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => confirmDelete(item)}
                  className="p-1.5 rounded-md hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                </motion.button>
              </div>
            </div>
          )}
        />
      ) : (
        /* Data Table for works, blog, testimonials */
        <DataTable
          columns={columns}
          data={data}
          onEdit={onEdit}
          onDelete={confirmDelete}
          onDuplicate={onDuplicate}
          onToggleStatus={onToggleStatus}
          searchQuery={searchQuery}
          searchKeys={searchKeys}
          isLoading={isLoading}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          onCreateNew={onCreateNew}
          selectedIds={selectedIds}
          onSelectToggle={handleSelectToggle}
          onSelectAll={handleSelectAll}
        />
      )}

      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-3 shadow-2xl shadow-black/60 flex items-center gap-4 z-50"
          >
            <span className="text-sm text-zinc-300">{selectedIds.size} selected</span>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={triggerBulkDelete}
              className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              Delete Selected
            </motion.button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
        itemName={
          deleteTarget?.isBulk
            ? `${selectedIds.size} selected item${selectedIds.size > 1 ? 's' : ''}`
            : deleteTarget?.title || deleteTarget?.name || deleteTarget?.label || 'this item'
        }
        itemType={deleteTarget?.isBulk ? 'Multiple Items' : type}
      />
    </motion.div>
  )
}

/* ─── Main Admin Panel (authenticated) ─── */
function AdminDashboard() {
  const { showToast } = useToast()

  // Data state
  const [works, setWorks] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const [milestones, setMilestones] = useState([])
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingItem, setEditingItem] = useState(null)
  const [editType, setEditType] = useState(null)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pb_admin_sidebar_collapsed') === 'true'
    }
    return false
  })

  // Global Cmd+K handler
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      }
    }
    // Listen for custom event from CommandPalette component
    const customHandler = () => setCommandPaletteOpen(true)
    window.addEventListener('keydown', handler)
    window.addEventListener('toggle-command-palette', customHandler)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('toggle-command-palette', customHandler)
    }
  }, [])

  // Load all data
  const loadData = useCallback(async () => {
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
      console.error('Error loading admin data:', err)
      showToast('Failed to load data', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Create new item templates
  const handleCreateNew = useCallback((type) => {
    const templates = {
      works: {
        title: '', slug: '', client: '', category: 'BRAND IDENTITY & REBRANDING', tag: 'TRANSFORMATION',
        bgWord: '', tagline: '', year: new Date().getFullYear().toString(), services: [],
        image: '', gallery: [], sections: [], challenge: '', approach: '', solution: '', results: '',
        status: 'Draft', index: (works.length + 1).toString().padStart(2, '0')
      },
      blog: {
        title: '', slug: '', excerpt: '', category: 'Design',
        publishDate: new Date().toISOString().split('T')[0],
        content: '', featuredImage: '', image: '', status: 'Draft',
        imageAlt: '', seoTitle: '', seoDescription: '', readTime: '5 min read'
      },
      testimonials: {
        name: '', role: '', company: '', quote: '', order: testimonials.length + 1, status: 'Published', avatarImage: ''
      },
      capabilities: {
        name: '', desc: '', order: capabilities.length + 1
      },
      milestones: {
        year: new Date().getFullYear().toString(), title: '', desc: '', order: milestones.length + 1
      }
    }
    const mappedType = type === 'blog' ? 'blogs' : type
    setEditType(mappedType)
    setEditingItem(templates[type] || templates[mappedType] || {})
  }, [works.length, testimonials.length, capabilities.length, milestones.length])

  // Navigation handler
  const handleNavigate = useCallback((tab, action) => {
    const normalizedTab = tab === 'work' ? 'works' : (tab === 'blogs' ? 'blog' : tab)
    setActiveTab(normalizedTab)
    setEditingItem(null)
    setEditType(null)

    if (action === 'new') {
      // Open new item form
      setTimeout(() => {
        handleCreateNew(normalizedTab)
      }, 50)
    }
  }, [handleCreateNew])

  // Command palette navigation
  const handleCommandNavigate = useCallback((tab, item) => {
    const normalizedTab = tab === 'work' ? 'works' : (tab === 'blogs' ? 'blog' : tab)
    setCommandPaletteOpen(false)
    setActiveTab(normalizedTab)
    if (item === 'new') {
      setEditingItem(null)
      setEditType(null)
      setTimeout(() => handleCreateNew(normalizedTab), 50)
    } else if (item && typeof item === 'object') {
      setEditType(normalizedTab === 'blog' ? 'blogs' : normalizedTab)
      setEditingItem(item)
    } else {
      setEditingItem(null)
      setEditType(null)
    }
  }, [handleCreateNew])

  // CRUD handlers with optimistic updates
  const notifyContentUpdate = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('portfolio_content_updated'))
    }
  }

  const handleSave = useCallback(async (data) => {
    try {
      if (editType === 'works') {
        await contentServices.saveWork(data)
      } else if (editType === 'blogs') {
        await contentServices.saveBlogPost(data)
      } else if (editType === 'testimonials') {
        await contentServices.saveTestimonial(data)
      } else if (editType === 'capabilities') {
        await contentServices.saveCapability(data)
      } else if (editType === 'milestones') {
        await contentServices.saveMilestone(data)
      }

      setEditingItem(null)
      setEditType(null)
      showToast('Saved successfully', 'success')
      loadData()
      notifyContentUpdate()
    } catch (err) {
      console.error('Save error:', err)
      const errorMsg = err.message || 'Failed to save — please try again'
      showToast(errorMsg, 'error')
      setEditingItem(null)
      setEditType(null)
      loadData()
      notifyContentUpdate()
    }
  }, [editType, showToast, loadData])

  const handleDelete = useCallback(async (item, skipToast) => {
    try {
      const type = activeTab
      const targetId = item.id ?? item.slug ?? item.title ?? item.name ?? item.quote

      if (type === 'works') {
        setWorks(prev => prev.filter(w => String(w.id ?? w.slug ?? w.title) !== String(targetId)))
        await contentServices.deleteWork(targetId)
      } else if (type === 'blog' || type === 'blogs') {
        setBlogs(prev => prev.filter(b => String(b.id ?? b.slug ?? b.title) !== String(targetId)))
        await contentServices.deleteBlogPost(targetId)
      } else if (type === 'testimonials') {
        setTestimonials(prev => prev.filter(t => String(t.id ?? t.name ?? t.quote) !== String(targetId)))
        await contentServices.deleteTestimonial(targetId)
      } else if (type === 'capabilities') {
        setCapabilities(prev => prev.filter(c => String(c.id ?? c.name ?? c.title) !== String(targetId)))
        await contentServices.deleteCapability(targetId)
      } else if (type === 'milestones') {
        setMilestones(prev => prev.filter(m => String(m.id ?? m.title ?? m.year) !== String(targetId)))
        await contentServices.deleteMilestone(targetId)
      }
      if (!skipToast) showToast('Deleted successfully', 'success')
      notifyContentUpdate()
    } catch (err) {
      console.error('Delete error:', err)
      showToast('Failed to delete', 'error')
      loadData() // rollback
    }
  }, [activeTab, showToast, loadData])

  const handleDuplicate = useCallback((item) => {
    const copy = { ...item, id: undefined, title: `${item.title || item.name} (Copy)`, slug: item.slug ? `${item.slug}-copy` : undefined }
    if (copy.name) copy.name = `${item.name} (Copy)`
    setEditType(activeTab === 'blog' ? 'blogs' : activeTab)
    setEditingItem(copy)
  }, [activeTab])

  const handleToggleStatus = useCallback(async (item) => {
    const newStatus = item.status === 'Published' ? 'Draft' : 'Published'
    const updated = { ...item, status: newStatus }

    try {
      if (activeTab === 'works') {
        setWorks(prev => prev.map(w => w.id === item.id ? updated : w))
        await contentServices.saveWork(updated)
      } else if (activeTab === 'blog') {
        setBlogs(prev => prev.map(b => b.id === item.id ? updated : b))
        await contentServices.saveBlogPost(updated)
      } else if (activeTab === 'testimonials') {
        setTestimonials(prev => prev.map(t => t.id === item.id ? updated : t))
        await contentServices.saveTestimonial(updated)
      }
      showToast(`${newStatus === 'Published' ? 'Published' : 'Unpublished'} successfully`, 'success')
    } catch (err) {
      showToast('Failed to update status', 'error')
      loadData()
    }
  }, [activeTab, showToast, loadData])

  // Reorder handler for drag-and-drop
  const handleReorder = useCallback(async (newItems) => {
    const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }))

    try {
      if (activeTab === 'capabilities') {
        setCapabilities(reordered)
        for (const item of reordered) {
          await contentServices.saveCapability(item)
        }
      } else if (activeTab === 'milestones') {
        setMilestones(reordered)
        for (const item of reordered) {
          await contentServices.saveMilestone(item)
        }
      }
      showToast('Order updated', 'success')
    } catch (err) {
      showToast('Failed to reorder', 'error')
      loadData()
    }
  }, [activeTab, showToast, loadData])

  // Settings save
  const handleSaveSettings = useCallback(async (newSettings) => {
    await contentServices.saveSettings(newSettings)
    setSettings(newSettings)
  }, [])

  // Sidebar toggle
  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => {
      const next = !prev
      localStorage.setItem('pb_admin_sidebar_collapsed', String(next))
      return next
    })
  }, [])

  // Column definitions for data tables
  const worksColumns = useMemo(() => [
    { key: 'index', label: '#', sortable: true },
    { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-medium text-zinc-100">{v}</span> },
    { key: 'client', label: 'Client', sortable: true },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ], [])

  const blogColumns = useMemo(() => [
    { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-medium text-zinc-100">{v}</span> },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'publishDate', label: 'Published', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ], [])

  const testimonialColumns = useMemo(() => [
    { key: 'order', label: '#', sortable: true },
    { key: 'name', label: 'Client', sortable: true, render: (v) => <span className="font-medium text-zinc-100">{v}</span> },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'quote', label: 'Quote', render: (v) => <span className="text-zinc-500 truncate max-w-xs block">{v}</span> },
    { key: 'status', label: 'Status', sortable: true },
  ], [])

  // Page title map
  const pageTitles = {
    dashboard: 'Dashboard',
    works: 'Works & Case Studies',
    blog: 'Blog Posts',
    testimonials: 'Testimonials',
    capabilities: 'Capabilities',
    milestones: 'Milestones',
    settings: 'Site Settings'
  }

  // Render content area
  const renderContent = () => {
    // If editing, show edit form
    if (editingItem) {
      return (
        <EditForm
          key={editingItem.id || 'new'}
          item={editingItem}
          type={editType}
          onCancel={() => {
            if (editType) {
              const tabName = editType === 'blogs' ? 'blog' : editType;
              setActiveTab(tabName);
            }
            setEditingItem(null);
            setEditType(null);
          }}
          onSave={handleSave}
          allWorks={works}
          allBlogs={blogs}
        />
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            works={works}
            blogs={blogs}
            testimonials={testimonials}
            capabilities={capabilities}
            milestones={milestones}
            isLoading={isLoading}
            onNavigate={handleNavigate}
            supabaseConnected={!!supabase}
          />
        )
      case 'works':
      case 'work':
        return (
          <ContentTabView
            type="works"
            data={works}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('works'); setEditingItem(item) }}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleToggleStatus}
            onCreateNew={() => handleCreateNew('works')}
            tabTitle="Works & Case Studies"
            tabSubtitle="Manage your portfolio projects"
            columns={worksColumns}
            searchKeys={['title', 'client']}
            emptyTitle="No works yet"
            emptyDescription="Create your first case study to showcase your design projects."
            emptyIcon={Briefcase}
            showToast={showToast}
          />
        )
      case 'blog':
      case 'blogs':
        return (
          <ContentTabView
            type="blog"
            data={blogs}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('blogs'); setEditingItem(item) }}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleToggleStatus}
            onCreateNew={() => handleCreateNew('blog')}
            tabTitle="Blog Posts"
            tabSubtitle="Manage your journal writings"
            columns={blogColumns}
            searchKeys={['title', 'category']}
            emptyTitle="No blog posts yet"
            emptyDescription="Start writing your first article about design."
            emptyIcon={FileText}
            showToast={showToast}
          />
        )
      case 'testimonials':
        return (
          <ContentTabView
            type="testimonials"
            data={testimonials}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('testimonials'); setEditingItem(item) }}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleToggleStatus}
            onCreateNew={() => handleCreateNew('testimonials')}
            tabTitle="Testimonials"
            tabSubtitle="Manage client reviews"
            columns={testimonialColumns}
            searchKeys={['name', 'company']}
            emptyTitle="No testimonials yet"
            emptyDescription="Add client feedback to build trust on your portfolio."
            emptyIcon={MessageSquareQuote}
            showToast={showToast}
          />
        )
      case 'capabilities':
        return (
          <ContentTabView
            type="capabilities"
            data={capabilities}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('capabilities'); setEditingItem(item) }}
            onDelete={handleDelete}
            onCreateNew={() => handleCreateNew('capabilities')}
            onReorder={handleReorder}
            tabTitle="Capabilities"
            tabSubtitle="Manage your skill areas — drag to reorder"
            emptyTitle="No capabilities yet"
            emptyDescription="Add your design capabilities and expertise."
            emptyIcon={Zap}
            showToast={showToast}
          />
        )
      case 'milestones':
        return (
          <ContentTabView
            type="milestones"
            data={milestones}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('milestones'); setEditingItem(item) }}
            onDelete={handleDelete}
            onCreateNew={() => handleCreateNew('milestones')}
            onReorder={handleReorder}
            tabTitle="Milestones"
            tabSubtitle="Manage your journey timeline — drag to reorder"
            emptyTitle="No milestones yet"
            emptyDescription="Add your career journey and key milestones."
            emptyIcon={Clock}
            showToast={showToast}
          />
        )
      case 'settings':
        return (
          <SettingsView
            initialSettings={settings}
            onSave={handleSaveSettings}
            showToast={showToast}
          />
        )
      default:
        return (
          <ContentTabView
            type="works"
            data={works}
            isLoading={isLoading}
            onEdit={(item) => { setEditType('works'); setEditingItem(item) }}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleToggleStatus}
            onCreateNew={() => handleCreateNew('works')}
            tabTitle="Works & Case Studies"
            tabSubtitle="Manage your portfolio projects"
            columns={worksColumns}
            searchKeys={['title', 'client']}
            emptyTitle="No works yet"
            emptyDescription="Create your first case study to showcase your design projects."
            emptyIcon={Briefcase}
            showToast={showToast}
          />
        )
    }
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-zinc-950 text-zinc-200 flex admin-panel">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); setEditingItem(null); setEditType(null) }}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
        <AdminTopBar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          activeTab={activeTab}
        />

        <main className="flex-1 h-full min-h-0 overflow-y-auto admin-scroll p-4 sm:p-6 lg:p-8" data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
          <div className="w-full">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleCommandNavigate}
        works={works}
        blogs={blogs}
        testimonials={testimonials}
      />
    </div>
  )
}

/* ─── Root Export with Auth Gate ─── */
export default function AdminPanel() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pratik_admin_auth') === 'true'
    }
    return false
  })

  useEffect(() => {
    if (isAuthenticated && location.pathname !== '/admin') {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  const handleSuccessLogin = () => {
    setIsAuthenticated(true)
    if (location.pathname !== '/admin') {
      navigate('/admin', { replace: true })
    }
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleSuccessLogin} />
  }

  return (
    <ToastProvider>
      <AdminDashboard />
    </ToastProvider>
  )
}
