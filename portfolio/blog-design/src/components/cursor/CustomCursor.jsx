import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCursorContext, CURSOR_STATES } from './CursorContext'
import './cursor.css'

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */

/** Linearly interpolate a → b by t */
const lerp = (a, b, t) => a + (b - a) * t

/** Is the device touch-primary? */
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window)

/** Particle color palette per cursor state */
const PARTICLE_COLORS = {
  [CURSOR_STATES.DEFAULT]:      '#38bdf8',
  [CURSOR_STATES.HOVER_LINK]:   '#a5f3fc',
  [CURSOR_STATES.HOVER_BUTTON]: '#c084fc',
  [CURSOR_STATES.HOVER_CARD]:   '#38bdf8',
  [CURSOR_STATES.HOVER_IMAGE]:  '#fbbf24',
  [CURSOR_STATES.DRAGGING]:     '#fb923c',
}

/** Map element tag / attributes → cursor state + label */
function detectElementState(el) {
  if (!el) return null

  // Walk up max 6 levels to find a meaningful parent
  let node = el
  for (let i = 0; i < 6; i++) {
    if (!node || node === document.body) break

    const tag  = node.tagName?.toLowerCase() ?? ''
    const role = node.getAttribute?.('role') ?? ''
    const dc   = node.dataset?.cursor ?? ''
    const dcl  = node.dataset?.cursorLabel ?? ''

    // Explicit overrides via data-cursor attribute
    if (dc) return { state: dc, label: dcl }

    // Input / textarea
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      return { state: CURSOR_STATES.HOVER_INPUT, label: '' }
    }

    // Button or role=button
    if (tag === 'button' || role === 'button') {
      return { state: CURSOR_STATES.HOVER_BUTTON, label: dcl }
    }

    // Image
    if (tag === 'img' || tag === 'picture' || tag === 'video') {
      return { state: CURSOR_STATES.HOVER_IMAGE, label: dcl || '⟳' }
    }

    // Anchor
    if (tag === 'a') {
      return { state: CURSOR_STATES.HOVER_LINK, label: dcl }
    }

    // Text nodes (p, h1-h6, li, span with real text content)
    if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'td', 'th'].includes(tag)) {
      return { state: CURSOR_STATES.HOVER_TEXT, label: '' }
    }

    // Cards (look for common class patterns)
    const classList = node.className ?? ''
    if (
      typeof classList === 'string' &&
      (classList.includes('card') ||
        classList.includes('work-card') ||
        classList.includes('service-card') ||
        classList.includes('blog-card') ||
        classList.includes('testimonial'))
    ) {
      return { state: CURSOR_STATES.HOVER_CARD, label: dcl || 'View →' }
    }

    node = node.parentElement
  }

  return null
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */

export default function CustomCursor() {
  // Skip on touch devices entirely
  if (isTouchDevice()) return null

  return <CursorInner />
}

function CursorInner() {
  const { state, label, color, setCursorState, setCursorLabel, reset } = useCursorContext()

  /* DOM refs */
  const rootRef     = useRef(null)
  const dotRef      = useRef(null)
  const ringRef     = useRef(null)
  const labelRef    = useRef(null)
  const particleBox = useRef(null)

  /* Animation state (mutable, no re-render needed) */
  const mouse    = useRef({ x: -200, y: -200 })
  const dot      = useRef({ x: -200, y: -200 })
  const ring     = useRef({ x: -200, y: -200 })
  const lastPos  = useRef({ x: -200, y: -200 })
  const rafId    = useRef(null)
  const idleTimer = useRef(null)
  const isIdle   = useRef(false)
  const isDown   = useRef(false)
  const magnetTarget = useRef(null) // { x, y } when magnetic snap active

  /* Particle pool */
  const POOL_SIZE    = 14
  const particlePool = useRef([])
  const poolIndex    = useRef(0)

  /* ── Particle pool initialisation ───────────────────────── */
  const initParticles = useCallback(() => {
    if (!particleBox.current) return
    particleBox.current.innerHTML = ''
    particlePool.current = []
    for (let i = 0; i < POOL_SIZE; i++) {
      const p = document.createElement('div')
      p.className = 'ccursor-particle'
      particleBox.current.appendChild(p)
      particlePool.current.push(p)
    }
  }, [])

  /* ── Spawn a particle at (x, y) ─────────────────────────── */
  const spawnParticle = useCallback((x, y, curState) => {
    const pool = particlePool.current
    if (!pool.length) return
    const p = pool[poolIndex.current % POOL_SIZE]
    poolIndex.current++

    const spread = 10
    const px = x + (Math.random() - 0.5) * spread
    const py = y + (Math.random() - 0.5) * spread
    const size = 2 + Math.random() * 3
    const col  = PARTICLE_COLORS[curState] ?? '#38bdf8'

    p.style.left    = `${px}px`
    p.style.top     = `${py}px`
    p.style.width   = `${size}px`
    p.style.height  = `${size}px`
    p.style.background = col
    p.style.boxShadow  = `0 0 ${size * 2}px ${col}`

    // Restart animation
    p.style.animation = 'none'
    p.offsetHeight // reflow
    p.style.animation = 'particle-fade 0.65s ease-out forwards'
  }, [])

  /* ── Click ripple ────────────────────────────────────────── */
  const spawnRipple = useCallback((x, y) => {
    if (!rootRef.current) return
    const r = document.createElement('div')
    r.className = 'ccursor-ripple'
    r.style.left = `${x}px`
    r.style.top  = `${y}px`
    rootRef.current.appendChild(r)
    r.addEventListener('animationend', () => r.remove(), { once: true })
  }, [])

  /* ── RAF loop ────────────────────────────────────────────── */
  const tick = useCallback(() => {
    const mx = magnetTarget.current?.x ?? mouse.current.x
    const my = magnetTarget.current?.y ?? mouse.current.y

    // Lerp positions — dot leads, ring trails slightly but stays close
    dot.current.x  = lerp(dot.current.x,  mx, 0.18)
    dot.current.y  = lerp(dot.current.y,  my, 0.18)
    ring.current.x = lerp(ring.current.x, mx, 0.16)
    ring.current.y = lerp(ring.current.y, my, 0.16)

    // Velocity for 3D tilt
    const vx = ring.current.x - lastPos.current.x
    const vy = ring.current.y - lastPos.current.y
    lastPos.current = { x: ring.current.x, y: ring.current.y }
    const speed = Math.sqrt(vx * vx + vy * vy)

    // Apply positions
    if (dotRef.current) {
      dotRef.current.style.left = `${dot.current.x}px`
      dotRef.current.style.top  = `${dot.current.y}px`
    }

    if (ringRef.current) {
      // 3D tilt based on velocity
      const tiltX = -vy * 0.5
      const tiltY =  vx * 0.5
      ringRef.current.style.left = `${ring.current.x}px`
      ringRef.current.style.top  = `${ring.current.y}px`
      ringRef.current.style.transform =
        `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }

    // Spawn particles when moving fast
    if (speed > 4) {
      spawnParticle(dot.current.x, dot.current.y,
        rootRef.current?.dataset?.state ?? CURSOR_STATES.DEFAULT)
    }

    rafId.current = requestAnimationFrame(tick)
  }, [spawnParticle])

  /* ── Idle detection ──────────────────────────────────────── */
  const resetIdleTimer = useCallback(() => {
    if (isIdle.current) {
      isIdle.current = false
      rootRef.current?.classList.remove('is-idle')
    }
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      isIdle.current = true
      rootRef.current?.classList.add('is-idle')
    }, 3000)
  }, [])

  /* ── Mouse move ──────────────────────────────────────────── */
  const onMouseMove = useCallback((e) => {
    mouse.current.x = e.clientX
    mouse.current.y = e.clientY
    resetIdleTimer()

    // Element-based state detection
    const detected = detectElementState(e.target)
    if (detected) {
      setCursorState(detected.state)
      if (detected.label !== undefined) setCursorLabel(detected.label)
    } else {
      reset()
    }
  }, [reset, setCursorState, setCursorLabel, resetIdleTimer])

  /* ── Mouse enter / leave ─────────────────────────────────── */
  const onMouseLeave = useCallback(() => {
    setCursorState(CURSOR_STATES.HIDDEN)
  }, [setCursorState])

  const onMouseEnter = useCallback(() => {
    reset()
  }, [reset])

  /* ── Mouse down / up ─────────────────────────────────────── */
  const onMouseDown = useCallback((e) => {
    isDown.current = true
    setCursorState(CURSOR_STATES.CLICKING)
    spawnRipple(e.clientX, e.clientY)
  }, [setCursorState, spawnRipple])

  const onMouseUp = useCallback(() => {
    isDown.current = false
    // Re-detect from current element
    reset()
  }, [reset])

  /* ── Magnetic: bind to [data-magnetic] elements ──────────── */
  const bindMagnetic = useCallback(() => {
    const els = document.querySelectorAll('[data-magnetic], button, .btn, a.nav-link')
    const handlers = []

    els.forEach((el) => {
      const enter = () => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width  / 2
        const cy = rect.top  + rect.height / 2
        magnetTarget.current = { x: cx, y: cy }
      }
      const leave = () => {
        magnetTarget.current = null
      }
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      handlers.push({ el, enter, leave })
    })

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  /* ── Mount / unmount ─────────────────────────────────────── */
  useEffect(() => {
    // Mark html element so CSS cursor:none kicks in
    document.documentElement.classList.add('custom-cursor-active')

    initParticles()
    rafId.current = requestAnimationFrame(tick)

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseup',    onMouseUp)

    // Bind magnetic after short delay so DOM is ready
    const unbindMagnetic = bindMagnetic()
    const magneticRebindTimer = setInterval(bindMagnetic, 2000) // re-bind periodically for dynamic content

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      cancelAnimationFrame(rafId.current)
      clearTimeout(idleTimer.current)
      clearInterval(magneticRebindTimer)
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseup',    onMouseUp)
      unbindMagnetic()
    }
  }, [tick, initParticles, onMouseMove, onMouseLeave, onMouseEnter, onMouseDown, onMouseUp, bindMagnetic])

  /* ── Sync context state → data-state attr ────────────────── */
  useEffect(() => {
    if (rootRef.current) rootRef.current.dataset.state = state
  }, [state])

  /* ── Sync custom color ───────────────────────────────────── */
  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return
    if (color) {
      dotRef.current.style.background  = color
      ringRef.current.style.borderColor = color
    } else {
      dotRef.current.style.background  = ''
      ringRef.current.style.borderColor = ''
    }
  }, [color])

  /* ─────────────────────────────────────────────────────────── */

  return createPortal(
    <div ref={rootRef} className="ccursor-root" data-state={state} aria-hidden="true">
      {/* Particle layer */}
      <div ref={particleBox} className="ccursor-particles" />

      {/* Outer ring */}
      <div ref={ringRef} className="ccursor-ring">
        <span ref={labelRef} className="ccursor-label">
          {label}
        </span>
      </div>

      {/* Inner dot */}
      <div ref={dotRef} className="ccursor-dot ccursor-dot-blend" />
    </div>,
    document.body
  )
}
