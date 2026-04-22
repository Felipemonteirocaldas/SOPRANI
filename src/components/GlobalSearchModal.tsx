import React, { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Settings,
  Puzzle,
  LayoutGrid,
  Phone,
  Box,
  Newspaper,
  X,
  ChevronRight,
  Command as CommandIcon,
  CornerDownLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data integration (as in current file)
import productsData from '../data/productsolutions.json';
import newsData from '../data/news.json';

export function GlobalSearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  // Handle loading simulation
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [query]);

  // Data Preparation
  const routes = [
    { title: t('header.machinery', 'Machinery'), path: '/machinery', icon: Settings, category: 'PAGES' },
    { title: t('header.spareParts', 'Spare Parts'), path: '/spare-parts', icon: Puzzle, category: 'PAGES' },
    { title: t('header.products', 'Products & Solutions'), path: '/products', icon: LayoutGrid, category: 'PAGES' },
    { title: t('header.contact', 'Contact Us'), path: '/contact', icon: Phone, category: 'PAGES' },
  ];

  const productItems = productsData.map(p => ({
    title: t(`search.results.${p._id}`, p.title),
    path: `/products`,
    icon: Box,
    category: 'PRODUCTS'
  }));

  const newsItems = newsData.map(n => ({
    title: t(`search.results.${n._id}`, n.headline),
    path: `/news`,
    icon: Newspaper,
    category: 'NEWS'
  }));

  const allItems = [...routes, ...productItems, ...newsItems];

  const filteredItems = allItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const categories = ['PAGES', 'PRODUCTS', 'NEWS'];

  const handleSelect = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10001] flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#001F5F]/40 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-[0_32px_64px_-16px_rgba(0,31,95,0.3)] border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Global Search" className="flex flex-col w-full h-full">
              {/* Header / Input Area */}
              <div className="relative flex items-center border-b border-slate-100 px-6 py-5">
                <Search className="w-5 h-5 text-slate-400" />
                <Command.Input
                  ref={inputRef}
                  value={query}
                  onValueChange={setQuery}
                  autoFocus
                  placeholder="Search products, news or pages..."
                  className="flex-1 bg-transparent ml-4 text-lg outline-none placeholder-slate-400 text-[#001F5F] font-medium"
                />
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Results List */}
              <Command.List className="max-h-[65vh] overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {isLoading ? (
                  <div className="p-4 space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-100 rounded w-1/3" />
                          <div className="h-3 bg-slate-50 rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <Command.Empty className="py-16 flex flex-col items-center justify-center text-slate-400">
                      <Search className="w-12 h-12 mb-4 opacity-10" />
                      <p className="text-sm font-medium">No results found for <span className="text-[#001F5F]">"{query}"</span></p>
                      <p className="text-xs mt-1">Try checking for typos or use more general terms.</p>
                    </Command.Empty>

                    {categories.map((category) => {
                      const itemsInCategory = filteredItems.filter(item => item.category === category);
                      if (itemsInCategory.length === 0) return null;

                      return (
                        <div key={category} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between px-4 py-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                              {category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 border border-slate-200">
                              {itemsInCategory.length}
                            </span>
                          </div>

                          {itemsInCategory.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Command.Item
                                key={`${item.path}-${idx}`}
                                onSelect={() => handleSelect(item.path)}
                                value={`${item.category}-${item.title}`}
                                className="flex items-center px-4 py-3.5 rounded-lg cursor-pointer aria-selected:bg-[#001F5F]/5 transition-all group relative border border-transparent aria-selected:border-[#001F5F]/10 outline-none"
                              >
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm border border-slate-100 transition-all group-aria-selected:text-[#001F5F] group-aria-selected:bg-white group-aria-selected:shadow-sm">
                                  <Icon size={18} />
                                </div>
                                <div className="flex flex-col ml-4 flex-1">
                                  <span className="font-bold text-[#001F5F] text-sm tracking-tight group-aria-selected:text-accent transition-colors">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                                    {item.category}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-200 opacity-0 group-aria-selected:opacity-100 transition-opacity" />
                              </Command.Item>
                            );
                          })}

                          {/* Separator line except for last category */}
                          {category !== categories[categories.length - 1] && (
                            <div className="h-px bg-slate-50 mx-4 mt-4 mb-2" />
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </Command.List>

              {/* Footer / Shortcuts */}
              <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600 flex items-center gap-0.5">
                      <CornerDownLeft size={8} /> Enter
                    </span>
                    to select
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="flex gap-0.5">
                      <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600"><ArrowUp size={8} /></span>
                      <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600"><ArrowDown size={8} /></span>
                    </span>
                    to navigate
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600 font-sans">ESC</span>
                  to close
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
