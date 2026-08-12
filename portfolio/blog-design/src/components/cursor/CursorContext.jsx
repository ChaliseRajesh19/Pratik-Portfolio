import { createContext, useContext, useState, useCallback } from 'react'

/**
 * CursorContext — global cursor state broadcaster.
 * Any component can call useCursorContext() to:
 *   - setCursorState('hover-button') etc.
 *   - setCursorLabel('View')
 *   - setCursorColor('#7c3aed')
 */

const CursorContext = createContext(null)

export const CURSOR_STATES = {
  DEFAULT:        'default',
  HOVER_LINK:     'hover-link',
  HOVER_BUTTON:   'hover-button',
  HOVER_CARD:     'hover-card',
  HOVER_TEXT:     'hover-text',
  HOVER_IMAGE:    'hover-image',
  HOVER_INPUT:    'hover-input',
  CLICKING:       'clicking',
  DRAGGING:       'dragging',
  HIDDEN:         'hidden',
}

export function CursorProvider({ children }) {
  const [state, setState]   = useState(CURSOR_STATES.DEFAULT)
  const [label, setLabel]   = useState('')
  const [color, setColor]   = useState(null) // null = use default

  const setCursorState = useCallback((s) => setState(s), [])
  const setCursorLabel = useCallback((l) => setLabel(l), [])
  const setCursorColor = useCallback((c) => setColor(c), [])

  const reset = useCallback(() => {
    setState(CURSOR_STATES.DEFAULT)
    setLabel('')
    setColor(null)
  }, [])

  return (
    <CursorContext.Provider value={{ state, label, color, setCursorState, setCursorLabel, setCursorColor, reset }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursorContext() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursorContext must be used inside <CursorProvider>')
  return ctx
}
