import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Wrench,
  Flag,
  Settings,
  Plus,
  Edit
} from 'lucide-react';

const CommandPalette = ({ isOpen, onClose, onNavigate, works = [], blogs = [], testimonials = [] }) => {
  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Dispatch a custom event that the parent can listen to to toggle the palette
          // Since we don't have an `onOpen` prop, this is a clean way to handle it globally.
          document.dispatchEvent(new CustomEvent('toggle-command-palette'));
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-50 w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl"
          >
            <Command className="flex h-full w-full flex-col overflow-hidden bg-transparent" label="Global Command Menu">
              {/* Search Input */}
              <div className="flex items-center border-b border-zinc-800 px-3">
                <Search className="mr-2 h-5 w-5 shrink-0 text-zinc-500" />
                <Command.Input 
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm text-zinc-50 outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              {/* List */}
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-zinc-50 transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-track]:bg-transparent">
                <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1">
                  <CommandItem onSelect={() => { onNavigate('dashboard'); onClose(); }}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('works'); onClose(); }}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Works
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('blog'); onClose(); }}>
                    <FileText className="mr-2 h-4 w-4" />
                    Blog
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('testimonials'); onClose(); }}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Testimonials
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('capabilities'); onClose(); }}>
                    <Wrench className="mr-2 h-4 w-4" />
                    Capabilities
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('milestones'); onClose(); }}>
                    <Flag className="mr-2 h-4 w-4" />
                    Milestones
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('settings'); onClose(); }}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </CommandItem>
                </Command.Group>

                <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1">
                  <CommandItem onSelect={() => { onNavigate('works', 'new'); onClose(); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Work
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('blog', 'new'); onClose(); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                  </CommandItem>
                  <CommandItem onSelect={() => { onNavigate('testimonials', 'new'); onClose(); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Testimonial
                  </CommandItem>
                </Command.Group>

                {works?.length > 0 && (
                  <Command.Group heading="Recent Works" className="px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1">
                    {works.slice(0, 5).map(work => (
                      <CommandItem key={work.id} onSelect={() => { onNavigate('works', work); onClose(); }}>
                        <Edit className="mr-2 h-4 w-4" />
                        {work.title}
                      </CommandItem>
                    ))}
                  </Command.Group>
                )}

                {blogs?.length > 0 && (
                  <Command.Group heading="Recent Posts" className="px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1">
                    {blogs.slice(0, 5).map(blog => (
                      <CommandItem key={blog.id} onSelect={() => { onNavigate('blog', blog); onClose(); }}>
                        <Edit className="mr-2 h-4 w-4" />
                        {blog.title}
                      </CommandItem>
                    ))}
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper component to keep styles consistent for Command Items
const CommandItem = ({ children, onSelect }) => {
  return (
    <Command.Item
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center rounded-sm border-l-2 border-transparent px-2 py-2 text-sm text-zinc-400 outline-none hover:bg-zinc-800 hover:text-zinc-50 aria-selected:border-indigo-500 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {children}
    </Command.Item>
  );
};

export default CommandPalette;
