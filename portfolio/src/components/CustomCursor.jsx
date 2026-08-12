import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  // Track positions in mutable refs to keep React out of the 60fps rAF loop
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const isVisible = useRef(false)

  const hoverState = useRef('default') // 'default' | 'clickable' | 'label' | 'drag'
  const activeLabelText = useRef('')
  const isSpinning = useRef(false)

  const activeMagneticEl = useRef(null)
  const magneticDisplacement = useRef({ x: 0, y: 0 })
  const targetMagneticDisplacement = useRef({ x: 0, y: 0 })

  const prefersReducedMotion = useRef(false)

  // Touch device state guard
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // 1. Mobile & Touch Device Guard: Disable completely on mobile screens (< 768px) and touch devices
    const checkIsMobileOrTouch = () => {
      if (typeof window === 'undefined') return true
      const isMobileWidth = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches
      const isTouch =
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)

      return isMobileWidth || isTouch
    }

    if (checkIsMobileOrTouch()) {
      document.documentElement.classList.remove('has-custom-cursor')
      setEnabled(false)
      return
    }

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const handleResize = () => {
      if (checkIsMobileOrTouch()) {
        document.documentElement.classList.remove('has-custom-cursor')
        setEnabled(false)
      } else {
        document.documentElement.classList.add('has-custom-cursor')
        setEnabled(true)
      }
    }

    window.addEventListener('resize', handleResize)

    // 2. Reduced Motion Check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = motionQuery.matches

    const handleMotionChange = (e) => {
      prefersReducedMotion.current = e.matches
    }
    motionQuery.addEventListener('change', handleMotionChange)

    let animationFrameId
    let rotationAngle = 0

    const PROXIMITY_RADIUS = 80
    const MAX_DISPLACEMENT = 12

    // Helper: Find nearest element with [data-magnetic] within proximity radius
    const findMagneticElementNear = (x, y) => {
      const magneticEls = document.querySelectorAll('[data-magnetic]')
      let closestEl = null
      let minDistance = PROXIMITY_RADIUS

      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.hypot(x - centerX, y - centerY)

        if (distance < minDistance) {
          minDistance = distance
          closestEl = el
        }
      })

      return { el: closestEl, distance: minDistance }
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible.current) {
        isVisible.current = true
        ringPos.current.x = e.clientX
        ringPos.current.y = e.clientY
      }

      const target = e.target
      if (!target) return

      // Tagged Data Attribute Inspections
      const labelEl = target.closest('[data-cursor]')
      const magneticEl = target.closest('[data-magnetic]')
      const clickableEl = target.closest(
        'a, button, [role="button"], input, select, textarea, .clickable, .cursor-pointer'
      )

      // Magnetic Proximity Detection
      const { el: nearMagneticEl } = findMagneticElementNear(e.clientX, e.clientY)
      const currentMag = magneticEl || nearMagneticEl

      // Reset old magnetic element if mouse moved away
      if (activeMagneticEl.current && activeMagneticEl.current !== currentMag) {
        activeMagneticEl.current.style.transform = 'translate3d(0px, 0px, 0px)'
        const inner = activeMagneticEl.current.querySelector('.magnetic-inner')
        if (inner) inner.style.transform = 'translate3d(0px, 0px, 0px)'
      }

      activeMagneticEl.current = currentMag

      if (currentMag && !prefersReducedMotion.current) {
        const rect = currentMag.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        const dist = Math.hypot(dx, dy)

        if (dist < PROXIMITY_RADIUS) {
          const factor = Math.pow(1 - dist / PROXIMITY_RADIUS, 1.2)
          const pullX = Math.max(
            -MAX_DISPLACEMENT,
            Math.min(MAX_DISPLACEMENT, dx * 0.35 * factor)
          )
          const pullY = Math.max(
            -MAX_DISPLACEMENT,
            Math.min(MAX_DISPLACEMENT, dy * 0.35 * factor)
          )

          targetMagneticDisplacement.current = { x: pullX, y: pullY }
        } else {
          targetMagneticDisplacement.current = { x: 0, y: 0 }
        }
      } else {
        targetMagneticDisplacement.current = { x: 0, y: 0 }
      }

      // Nav Header Check: Restore normal default browser cursor when hovering over navigation
      const isNavHeader = target.closest('header, nav, [aria-label="Main Navigation"]') !== null

      if (isNavHeader) {
        isVisible.current = false
        if (dotRef.current) dotRef.current.style.opacity = '0'
        if (ringRef.current) ringRef.current.style.opacity = '0'
        hoverState.current = 'default'
        activeLabelText.current = ''
        isSpinning.current = false
        activeMagneticEl.current = null
        targetMagneticDisplacement.current = { x: 0, y: 0 }
        return
      }

      // Determine Hover Mode
      if (labelEl) {
        const label = labelEl.getAttribute('data-cursor')
        const spin =
          labelEl.getAttribute('data-cursor-spin') === 'true' ||
          label === 'DRAG'

        hoverState.current = spin ? 'drag' : 'label'
        activeLabelText.current = label || ''
        isSpinning.current = spin
      } else if (clickableEl) {
        hoverState.current = 'clickable'
        activeLabelText.current = ''
        isSpinning.current = false
      } else {
        hoverState.current = 'default'
        activeLabelText.current = ''
        isSpinning.current = false
      }
    }

    const handleMouseLeave = () => {
      isVisible.current = false
      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = 'translate3d(0px, 0px, 0px)'
        const inner = activeMagneticEl.current.querySelector('.magnetic-inner')
        if (inner) inner.style.transform = 'translate3d(0px, 0px, 0px)'
        activeMagneticEl.current = null
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // ── High Performance 60fps rAF Render Loop ──────────────────
    const render = () => {
      let targetX = mousePos.current.x
      let targetY = mousePos.current.y

      // 1. Interpolate Magnetic Displacement (Spring physics)
      magneticDisplacement.current.x +=
        (targetMagneticDisplacement.current.x - magneticDisplacement.current.x) * 0.2
      magneticDisplacement.current.y +=
        (targetMagneticDisplacement.current.y - magneticDisplacement.current.y) * 0.2

      if (activeMagneticEl.current && !prefersReducedMotion.current) {
        const magX = magneticDisplacement.current.x
        const magY = magneticDisplacement.current.y

        activeMagneticEl.current.style.transform = `translate3d(${magX}px, ${magY}px, 0px)`

        const inner = activeMagneticEl.current.querySelector('.magnetic-inner')
        if (inner) {
          inner.style.transform = `translate3d(${magX * 0.65}px, ${magY * 0.65}px, 0px)`
        }

        // Pull ring slightly toward button center
        const rect = activeMagneticEl.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        targetX += (centerX - mousePos.current.x) * 0.22
        targetY += (centerY - mousePos.current.y) * 0.22
      }

      // 2. Ring Spring / Lerp Trailing
      const lerpSpeed = prefersReducedMotion.current ? 1 : 0.16
      ringPos.current.x += (targetX - ringPos.current.x) * lerpSpeed
      ringPos.current.y += (targetY - ringPos.current.y) * lerpSpeed

      // Rotation cue for DRAG state
      if (isSpinning.current) {
        rotationAngle = (rotationAngle + 2.5) % 360
      } else if (rotationAngle !== 0) {
        rotationAngle *= 0.88
        if (rotationAngle < 0.2) rotationAngle = 0
      }

      // 3. Direct DOM Modifications
      if (dotRef.current && ringRef.current) {
        if (!isVisible.current) {
          dotRef.current.style.opacity = '0'
          ringRef.current.style.opacity = '0'
        } else {
          // Dot: Zero smoothing (1:1 with cursor)
          const dotRadius = 4
          dotRef.current.style.transform = `translate3d(${mousePos.current.x - dotRadius}px, ${mousePos.current.y - dotRadius}px, 0)`

          // Ring: Elastic spring position
          const ringRadius = 20
          ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringRadius}px, ${ringPos.current.y - ringRadius}px, 0) rotate(${rotationAngle}deg)`

          // Update Classes according to state
          if (hoverState.current === 'label') {
            dotRef.current.style.opacity = '0'
            ringRef.current.style.opacity = '1'
            ringRef.current.className = 'custom-cursor-ring ring-label'
          } else if (hoverState.current === 'drag') {
            dotRef.current.style.opacity = '0'
            ringRef.current.style.opacity = '1'
            ringRef.current.className = 'custom-cursor-ring ring-drag'
          } else if (hoverState.current === 'clickable') {
            dotRef.current.style.opacity = '0'
            ringRef.current.style.opacity = '1'
            ringRef.current.className = 'custom-cursor-ring ring-clickable'
          } else {
            dotRef.current.style.opacity = '1'
            ringRef.current.style.opacity = '1'
            ringRef.current.className = 'custom-cursor-ring ring-default'
          }

          // Label Text inside ring
          if (labelRef.current) {
            if (activeLabelText.current) {
              labelRef.current.innerText = activeLabelText.current
              labelRef.current.style.opacity = '1'
              labelRef.current.style.transform = 'scale(1)'
            } else {
              labelRef.current.style.opacity = '0'
              labelRef.current.style.transform = 'scale(0.7)'
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      motionQuery.removeEventListener('change', handleMotionChange)
      document.documentElement.classList.remove('has-custom-cursor')

      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = 'translate3d(0px, 0px, 0px)'
        const inner = activeMagneticEl.current.querySelector('.magnetic-inner')
        if (inner) inner.style.transform = 'translate3d(0px, 0px, 0px)'
      }
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="custom-cursor-root pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Solid Dot (~8px, zero lag) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff6b35] shadow-[0_0_10px_rgba(255,107,53,0.9)] pointer-events-none transition-opacity duration-200"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* 2. Trailing Ring (~40px, spring lag) */}
      <div
        ref={ringRef}
        className="custom-cursor-ring ring-default fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow,border-style] duration-200"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-200 select-none opacity-0 scale-75 whitespace-nowrap px-1"
        />
      </div>
    </div>
  )
}
