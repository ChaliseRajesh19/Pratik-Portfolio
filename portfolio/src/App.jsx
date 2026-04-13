import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { CursorProvider } from './components/cursor/CursorContext'
import CustomCursor from './components/cursor/CustomCursor'
import PageLoader from './components/PageLoader'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const target = document.querySelector(location.hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return (
    <CursorProvider>
      {/* Page loader — full-screen entrance animation, shows once per session */}
      <PageLoader />

      {/* Custom cursor rendered as a portal above everything */}
      <CustomCursor />

      <div className="min-h-screen bg-slate-900 flex flex-col pt-14 md:pt-16">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CursorProvider>
  )
}

export default App
