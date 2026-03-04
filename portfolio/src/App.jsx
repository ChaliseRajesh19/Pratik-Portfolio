import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


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
    <>
    <Header />
    <Outlet />
    <Footer />
  
    </>
  )
}

export default App
