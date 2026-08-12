import React from 'react';
import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { ENV } from '../config/env';

const TAB_TITLES = {
  dashboard: 'Dashboard',
  works: 'Works & Case Studies',
  blog: 'Blog Posts',
  testimonials: 'Testimonials',
  capabilities: 'Capabilities',
  milestones: 'Milestones',
  settings: 'Settings'
};

export default function AdminTopBar({ onOpenCommandPalette, activeTab }) {
  const adminEmail = ENV.ADMIN_EMAIL;
  const initial = adminEmail.charAt(0).toUpperCase();

  const title = TAB_TITLES[activeTab] || 'Dashboard';

  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10 px-6 flex items-center justify-between shrink-0">
      {/* Left side: Page Title */}
      <h1 className="text-lg font-semibold text-zinc-50 capitalize">
        {title}
      </h1>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search button */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-2 bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-1.5 hover:bg-zinc-800 transition-colors focus:outline-none"
        >
          <Search size={16} className="text-zinc-400" />
          <span className="text-sm text-zinc-400">Search...</span>
          <kbd className="hidden sm:inline-flex items-center justify-center rounded bg-zinc-900 border border-zinc-700 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
            ⌘K
          </kbd>
        </button>

        {/* Bell Icon Placeholder */}
        <button className="text-zinc-400 hover:text-zinc-50 transition-colors focus:outline-none">
          <Bell size={20} />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium text-sm">
          {initial}
        </div>
      </div>
    </header>
  );
}
