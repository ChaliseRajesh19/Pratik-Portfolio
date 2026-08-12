import { useState, useEffect, useRef } from 'react'
import './PageLoader.css'

/* ─────────────────────────────────────────────────────────────
   PageLoader
   Shows a premium full-screen entrance animation on first load.
   Uses sessionStorage so it only shows once per browser session.
───────────────────────────────────────────────────────────── */

const BRAND    = 'PRATIK'
const TAGLINE  = 'Creative Developer & Designer'
const DURATION = 2200   // ms of fake loading
const SKIP_KEY = 'pl_shown'

export default function PageLoader() {
  // Skip if already shown this session
  const alreadyShown =
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem(SKIP_KEY) === '1'

  const [show, setShow] = useState(!alreadyShown)
  const [progress, setProgress]   = useState(0)
  const [lettersIn, setLettersIn] = useState(false)
  const [tagIn, setTagIn]         = useState(false)
  const [exiting, setExiting]     = useState(false)

  const rafRef   = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (!show) return

    // Mark shown so it won't play again this session
    sessionStorage.setItem(SKIP_KEY, '1')

    // Stagger the letters in after a tiny delay
    const t1 = setTimeout(() => setLettersIn(true), 150)
    const t2 = setTimeout(() => setTagIn(true), 350)

    // Animate progress bar
    startRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - startRef.current
      const p = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(p)

      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Wait a moment at 100% then exit
        setTimeout(() => {
          setExiting(true)
          // Unmount after exit animation finishes
          setTimeout(() => setShow(false), 900)
        }, 350)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      cancelAnimationFrame(rafRef.current)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className={`pl-overlay${exiting ? ' is-done' : ''}`}
      aria-hidden="true"
    >
      {/* Scan lines */}
      <div className="pl-scan" />

      {/* Radial glow */}
      <div className="pl-glow" />

      {/* Ghost counter */}
      <span className="pl-counter" aria-hidden="true">
        {String(progress).padStart(2, '0')}
      </span>

      {/* Centre content */}
      <div className="pl-content">
        {/* Brand name: letter-by-letter stagger */}
        <div className="pl-name" aria-label={BRAND}>
          {BRAND.split('').map((ch, i) => (
            <span
              key={i}
              className={`pl-letter${lettersIn ? ' visible' : ''}`}
              style={{ transitionDelay: `${i * 70}ms` }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className={`pl-tagline${tagIn ? ' visible' : ''}`}>
          {TAGLINE}
        </p>

        {/* Progress bar */}
        <div className="pl-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="pl-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom edge glow */}
      <div className="pl-edge" />
    </div>
  )
}
