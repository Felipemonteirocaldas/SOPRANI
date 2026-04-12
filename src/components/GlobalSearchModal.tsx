import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Wrench, Package, Briefcase, Phone, Presentation, LayoutDashboard, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function GlobalSearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  // Define site pages for global search
  const routes = [
    { title: t('header.machinery', 'Machinery'), path: '/machinery', icon: Wrench, category: 'Services' },
    { title: t('header.spareParts', 'Spare Parts'), path: '/spare-parts', icon: Package, category: 'Services' },
    { title: t('header.technicalAssistance', 'Technical Assistance'), path: '/technical-assistance', icon: FileText, category: 'Services' },
    { title: t('header.tradingMaterials', 'Trading Materials'), path: '/trading-materials', icon: Briefcase, category: 'Services' },
    { title: t('header.products', 'Products & Solutions'), path: '/products', icon: LayoutDashboard, category: 'Product Solutions' },
    { title: t('header.industries', 'Industries'), path: '/industries', icon: Presentation, category: 'Product Solutions' },
    { title: t('header.company', 'Company'), path: '/company', icon: Briefcase, category: 'Company' },
    { title: t('header.contact', 'Contact Us'), path: '/contact', icon: Phone, category: 'Company' },
    { title: t('header.mphPlatform', 'MPH Platform'), path: '/mph', icon: Layers, category: 'Platform' },
    { title: t('header.requestQuotation', 'Request Quotation'), path: '/request-quotation', icon: FileText, category: 'Platform' },
  ];

  const results = routes.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    onOpenChange(false);
    window.location.href = path;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm px-4" onClick={() => onOpenChange(false)}>
      <div 
        className="w-full max-w-2xl bg-white rounded-none shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Global Search" className="flex flex-col w-full bg-transparent">
          <div className="flex items-center border-b border-gray-100 px-4">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Command.Input 
              value={query}
              onValueChange={setQuery}
              placeholder="Search pages, products, or services..." 
              className="w-full bg-transparent p-4 text-lg outline-none placeholder-gray-400 text-primary"
            />
            <div className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50 flex-shrink-0">
              ESC
            </div>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-gray-500">
              <p className="text-sm">No results found for "{query}".</p>
            </Command.Empty>

            {results.length > 0 && (
              <div className="py-2">
                {results.map((route) => {
                  const Icon = route.icon;
                  return (
                    <Command.Item
                      key={route.path}
                      onSelect={() => handleSelect(route.path)}
                      className="flex items-center px-4 py-3 rounded-none cursor-pointer hover:bg-gray-50"
                    >
                      <div className="bg-gray-100 p-2 rounded-none mr-4 text-accent">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{route.title}</span>
                        <span className="text-xs text-gray-500">{route.category}</span>
                      </div>
                    </Command.Item>
                  );
                })}
              </div>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
