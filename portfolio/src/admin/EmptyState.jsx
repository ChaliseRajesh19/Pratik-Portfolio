import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ title, description, actionLabel, onAction, icon: IconComponent }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {IconComponent && (
        <div className="mb-4">
          <IconComponent size={48} className="text-zinc-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-300 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {onAction && actionLabel && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
