import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Wrench, Package, Briefcase, Phone, Presentation, LayoutDashboard, Layers, Newspaper, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Melhor que window.location.href

// Importamos seus dados locais
import productsData from '../data/productsolutions.json';
import newsData from '../data/news.json';

export function GlobalSearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // 1. Rotas estáticas que você já tinha
  const routes = [
    { title: t('header.machinery', 'Machinery'), path: '/machinery', icon: Wrench, category: 'Pages' },
    { title: t('header.spareParts', 'Spare Parts'), path: '/spare-parts', icon: Package, category: 'Pages' },
    { title: t('header.products', 'Products & Solutions'), path: '/products', icon: LayoutDashboard, category: 'Pages' },
    { title: t('header.contact', 'Contact Us'), path: '/contact', icon: Phone, category: 'Pages' },
  ];

  // 2. Transformamos os produtos em itens de busca
  const productItems = productsData.map(p => ({
    title: p.title,
    path: `/products`, // Ou o link específico do produto se houver
    icon: Package,
    category: 'Products'
  }));

  // 3. Transformamos as notícias em itens de busca
  const newsItems = newsData.map(n => ({
    title: n.headline,
    path: `/news`,
    icon: Newspaper,
    category: 'News'
  }));

  // Combinamos tudo
  const allItems = [...routes, ...productItems, ...newsItems];

  const results = allItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  // Agrupar por categoria para os "setores"
  const categories = Array.from(new Set(results.map(item => item.category)));

  const handleSelect = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm px-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-none shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Global Search" className="flex flex-col w-full bg-transparent">
          <div className="flex items-center border-b border-gray-100 px-4">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder={t('search.placeholder', 'Procurar produtos, notícias ou páginas...')}
              className="w-full bg-transparent p-4 text-lg outline-none placeholder-gray-400 text-primary"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 ml-2 text-gray-400 hover:text-accent hover:bg-slate-50 transition-colors"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-12 text-center text-gray-500 text-sm">
              {t('search.noResults', 'Nenhum resultado encontrado para "{{query}}"', { query })}
            </Command.Empty>

            {categories.map((category) => (
              <Command.Group
                key={category}
                heading={<span className="text-[10px] font-bold uppercase tracking-wider text-accent/70 px-4 py-2 block">{category}</span>}
              >
                {results
                  .filter(item => item.category === category)
                  .map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Command.Item
                        key={`${item.path}-${idx}`}
                        onSelect={() => handleSelect(item.path)}
                        value={`${item.category}-${item.title}`}
                        className="flex items-center px-4 py-3 rounded-none cursor-pointer hover:bg-accent/5 aria-selected:bg-accent/5 transition-colors group/item"
                      >
                        <div className="bg-gray-100 p-2 text-accent group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col ml-4">
                          <span className="font-medium text-gray-900 group-hover/item:text-accent transition-colors">{item.title}</span>
                          <span className="text-[10px] uppercase tracking-wider text-gray-400">{item.category}</span>
                        </div>
                      </Command.Item>
                    );
                  })}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
