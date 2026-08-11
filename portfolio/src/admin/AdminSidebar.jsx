import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquareQuote,
  Zap,
  Clock,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut
} from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'works', label: 'Works', icon: Briefcase },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'capabilities', label: 'Capabilities', icon: Zap },
  { id: 'milestones', label: 'Milestones', icon: Clock },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }) {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';

  useEffect(() => {
    localStorage.setItem('pb_admin_sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem('pratik_admin_auth');
    window.location.reload();
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 256 }}
      className="flex flex-col h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 shrink-0 z-20"
    >
      {/* Logo Area */}
      <div className="h-14 flex items-center px-4 border-b border-zinc-800 overflow-hidden shrink-0">
        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-semibold text-zinc-50 whitespace-nowrap"
            >
              PB ADMIN
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              title={isCollapsed ? tab.label : undefined}
              className={`relative w-full flex items-center px-3 py-2 text-left rounded-md transition-colors z-10 focus:outline-none ${
                !isActive && 'hover:bg-zinc-800/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-zinc-800 rounded-md -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`shrink-0 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className={`ml-3 whitespace-nowrap overflow-hidden ${
                      isActive ? 'text-zinc-50 font-medium' : 'text-zinc-400'
                    } hover:text-zinc-50 transition-colors`}
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-zinc-800 flex flex-col gap-1 overflow-hidden shrink-0">
        {!isCollapsed && (
          <div className="px-3 py-2 text-xs text-zinc-500 truncate" title={adminEmail}>
            {adminEmail}
          </div>
        )}
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
          className="flex items-center px-3 py-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors w-full focus:outline-none"
        >
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand" : "Collapse"}
          className="flex items-center px-3 py-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors w-full focus:outline-none"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} className="shrink-0" />
          ) : (
            <PanelLeftClose size={20} className="shrink-0" />
          )}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-3 whitespace-nowrap overflow-hidden"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
