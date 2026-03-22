import React from 'react'
import UploadForm from '../components/admin/UploadForm'
import UploadList from '../components/admin/UploadList'
import BlogForm from '../components/admin/BlogForm'
import BlogList from '../components/admin/BlogList'
import ServiceForm from '../components/admin/ServiceForm'
import ServiceList from '../components/admin/ServiceList'
import CategoryForm from '../components/admin/CategoryForm'
import CategoryList from '../components/admin/CategoryList'
import { useNavigate, Link } from 'react-router-dom'
import logoimg from '../assets/favicon.png'

// ─── Icons ────────────────────────────────────────────────────────────────────
const WorksIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)
const ServicesIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)
const BlogsIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 6h16M4 10h16M4 14h10" strokeLinecap="round" />
    <rect x="2" y="3" width="20" height="18" rx="2" />
  </svg>
)
const LogoutIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12V7a2 2 0 012-2h6" strokeLinecap="round" />
    <path d="M3 12v5a2 2 0 002 2h6" strokeLinecap="round" />
  </svg>
)
const ChevronDown = ({ open }) => (
  <svg
    width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"
    style={{ transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Tab Config ───────────────────────────────────────────────────────────────
const NAV = [
  {
    id: 'works',
    label: 'Works',
    Icon: WorksIcon,
    subs: [
      { id: 'list',               label: 'Manage Works' },
      { id: 'categories-list',    label: 'Manage Categories' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    Icon: ServicesIcon,
    subs: [
      { id: 'services-list',   label: 'Manage Services' },
    ],
  },
  {
    id: 'blogs',
    label: 'Blogs',
    Icon: BlogsIcon,
    subs: [
      { id: 'blog-list',   label: 'Manage Blogs' },
    ],
  },
]

// Map each view → which tab group it belongs to
const VIEW_TO_GROUP = {}
NAV.forEach(({ id, subs }) => subs.forEach(s => { VIEW_TO_GROUP[s.id] = id }))

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ view, setView, collapsed, setCollapsed }) {
  const navigate = useNavigate()

  const activeGroup = VIEW_TO_GROUP[view] || ''
  const [openGroups, setOpenGroups] = React.useState(() => {
    const g = {}
    NAV.forEach(n => { g[n.id] = n.subs.some(s => s.id === view) })
    return g
  })

  const toggleGroup = (id) => {
    if (collapsed) { setCollapsed(false) }
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '230px',
        transition: 'width .25s cubic-bezier(.4,0,.2,1)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#0f172a 0%,#0c1424 100%)',
        borderRight: '1px solid rgba(51,65,85,.5)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '22px 18px 18px',
        borderBottom: '1px solid rgba(51,65,85,.4)',
        minHeight: '70px',
      }}>
        <Link to="/" title="Go to website" style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'rgba(15,23,42,0.8)',
          border: '1px solid rgba(34,211,238,0.2)',
          boxShadow: '0 0 12px rgba(34,211,238,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'box-shadow .25s, border-color .25s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 22px rgba(34,211,238,0.45)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.12)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)' }}
        >
          <img src={logoimg} alt="Home" style={{ width: 22, height: 22, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }} />
        </Link>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9', letterSpacing: '0.01em' }}>Admin Panel</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>Portfolio Manager</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', padding: 4, borderRadius: 6, flexShrink: 0,
            display: 'flex', alignItems: 'center',
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {collapsed
              ? <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
        {!collapsed && (
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
            color: '#475569', textTransform: 'uppercase', padding: '4px 8px 10px'
          }}>Content</div>
        )}

        {NAV.map(({ id, label, Icon, subs }) => {
          const hasMultipleSubs = subs.length > 1
          const isGroupActive = hasMultipleSubs ? activeGroup === id : view === subs[0].id
          const isOpen = hasMultipleSubs && openGroups[id] && !collapsed

          return (
            <div key={id} style={{ marginBottom: 4 }}>
              {/* Group button */}
              <button
                onClick={() => hasMultipleSubs ? toggleGroup(id) : setView(subs[0].id)}
                title={collapsed ? label : undefined}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: 10, padding: '9px 10px', borderRadius: 10,
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: isGroupActive
                    ? 'linear-gradient(90deg,rgba(139,92,246,.18),rgba(99,102,241,.12))'
                    : 'transparent',
                  color: isGroupActive ? '#a78bfa' : '#94a3b8',
                  transition: 'all .18s',
                }}
                onMouseEnter={e => {
                  if (!isGroupActive) { e.currentTarget.style.background = 'rgba(148,163,184,.07)'; e.currentTarget.style.color = '#e2e8f0' }
                }}
                onMouseLeave={e => {
                  if (!isGroupActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8' }
                }}
              >
                <span style={{ flexShrink: 0 }}><Icon /></span>
                {!collapsed && (
                  <>
                    <span style={{ flex: 1, fontSize: 13.5, fontWeight: isGroupActive ? 600 : 500 }}>{label}</span>
                    {hasMultipleSubs && <ChevronDown open={isOpen} />}
                  </>
                )}
              </button>

              {/* Sub-tabs */}
              {isOpen && (
                <div style={{
                  marginLeft: 28, marginTop: 2,
                  borderLeft: '1.5px solid rgba(139,92,246,.2)',
                  paddingLeft: 12,
                }}>
                  {subs.map(sub => {
                    const isActiveSub = view === sub.id
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setView(sub.id)}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '7px 8px', borderRadius: 8,
                          border: 'none', cursor: 'pointer',
                          fontSize: 12.5, fontWeight: isActiveSub ? 600 : 400,
                          marginBottom: 2,
                          background: isActiveSub ? 'rgba(139,92,246,.15)' : 'transparent',
                          color: isActiveSub ? '#c4b5fd' : '#64748b',
                          transition: 'all .15s',
                        }}
                        onMouseEnter={e => {
                          if (!isActiveSub) { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(148,163,184,.06)' }
                        }}
                        onMouseLeave={e => {
                          if (!isActiveSub) { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent' }
                        }}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '14px 10px',
        borderTop: '1px solid rgba(51,65,85,.4)',
      }}>
        <button
          onClick={handleLogout}
          title="Logout"
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            gap: 10, padding: '9px 10px', borderRadius: 10,
            border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#ef4444',
            fontSize: 13, fontWeight: 500, transition: 'all .18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <LogoutIcon />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

// ─── Page header ──────────────────────────────────────────────────────────────
const TITLES = {
  list:               { title: 'Manage Works',      sub: 'Review and delete your portfolio uploads.' },
  'services-list':    { title: 'Manage Services',   sub: 'Review and remove existing services.' },
  'categories-list':  { title: 'Manage Categories', sub: 'Review active portfolio categories.' },
  'blog-list':        { title: 'Manage Blogs',      sub: 'Edit and manage your blog posts.' },
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function AdminDashboard() {
  const [categories, setCategories] = React.useState([])
  const [activeCategory, setActiveCategory] = React.useState('')
  const [refreshKey, setRefreshKey] = React.useState(0)

  // Fetch dynamic categories from API
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const slugs = data.map(c => c.slug)
          setCategories(slugs)
          setActiveCategory(slugs[0])
        }
      })
      .catch(() => {})
  }, [])
  const [view, setView] = React.useState('list')
  const [blogRefreshKey, setBlogRefreshKey] = React.useState(0)
  const [serviceRefreshKey, setServiceRefreshKey] = React.useState(0)
  const [categoryRefreshKey, setCategoryRefreshKey] = React.useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  const handleUploaded = (category) => {
    if (category && category !== activeCategory) setActiveCategory(category)
    setRefreshKey(prev => prev + 1)
  }



  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#0d1117 0%,#0f172a 50%,#0d1117 100%)',
      display: 'flex',
      color: '#e2e8f0',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <Sidebar
        view={view}
        setView={setView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Content area */}
        <div style={{ padding: '32px', flex: 1, height: '100%', overflowY: 'auto' }}>


          {view === 'list' && (
            <UploadList
              category={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={categories}
              refreshKey={refreshKey}
            />
          )}

          {view === 'services-list' && (
            <ServiceList refreshKey={serviceRefreshKey} />
          )}

          {view === 'categories-list' && (
            <CategoryList refreshKey={categoryRefreshKey} />
          )}

          {view === 'blog-list' && (
            <BlogList refreshKey={blogRefreshKey} />
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
