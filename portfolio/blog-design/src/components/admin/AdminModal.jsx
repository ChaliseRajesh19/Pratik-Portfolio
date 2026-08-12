import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  hideHeader = false,
  panelClassName = '',
  contentClassName = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex h-[94vh] w-[96vw] max-w-[1800px] flex-col overflow-hidden rounded-[28px] border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/50 ${panelClassName}`}
          >
            {!hideHeader && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-10">
                <h3 className="text-xl font-bold text-slate-100">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-rose-500/80 transition-colors"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            <div className={`min-h-0 flex-1 overflow-hidden ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
