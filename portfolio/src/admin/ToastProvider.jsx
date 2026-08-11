import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

let toastIdCount = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastIdCount;
    setToasts((prev) => {
      const newToasts = [{ id, message, type }, ...prev];
      return newToasts.slice(0, 5); // Keep max 5 visible, newest on top
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info') => addToast(message, type), [addToast]);

  const toast = {
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    warning: (message) => addToast(message, 'warning'),
    info: (message) => addToast(message, 'info'),
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 admin-toast-container">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-zinc-900 border-green-500/20',
    error: 'bg-zinc-900 border-red-500/20',
    warning: 'bg-zinc-900 border-amber-500/20',
    info: 'bg-zinc-900 border-blue-500/20',
  };

  const progressColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative overflow-hidden w-80 rounded-lg border ${bgColors[toast.type]} shadow-lg admin-toast`}
    >
      <div className="flex items-start p-4 pr-10">
        <div className="flex-shrink-0 mr-3">{icons[toast.type]}</div>
        <p className="text-sm font-medium text-zinc-50">{toast.message}</p>
        <button
          onClick={onRemove}
          className="absolute top-4 right-3 text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Shrinking Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-1 ${progressColors[toast.type]}`}
      />
    </motion.div>
  );
}

export default ToastProvider;
