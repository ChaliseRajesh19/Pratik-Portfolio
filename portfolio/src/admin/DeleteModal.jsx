import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName, itemType }) {
  const cancelBtnRef = useRef(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isOpen && cancelBtnRef.current) {
      // Focus after slight delay to allow animation
      setTimeout(() => cancelBtnRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    // If we wanted to check visibility/readiness, we could conditionally trigger shake here.
    // For now we assume standard confirm.
    onConfirm();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={
              shake
                ? { scale: 1, opacity: 1, x: [-10, 10, -10, 10, 0] }
                : { scale: 1, opacity: 1, x: 0 }
            }
            exit={{ scale: 0.95, opacity: 0 }}
            transition={
              shake
                ? { duration: 0.4 }
                : { type: 'spring', stiffness: 300, damping: 30 }
            }
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="text-amber-500" size={24} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-zinc-50">
                  Delete {itemType}?
                </h3>
                <p className="text-zinc-400">
                  Are you sure you want to delete "{itemName}"? This action cannot be undone.
                </p>
              </div>

              <div className="flex w-full gap-3 pt-4">
                <button
                  ref={cancelBtnRef}
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-transparent border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
