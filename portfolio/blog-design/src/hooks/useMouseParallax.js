import { useState, useEffect } from 'react'

/**
 * Tracks the mouse position and returns a normalized {x, y}
 * where x and y are in the range [-1, 1].
 * Used by HeroScene to drive the 3D geometry tilt.
 */
export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}
