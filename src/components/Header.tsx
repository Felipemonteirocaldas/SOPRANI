import { Image } from '@/components/ui/image';
import { ArrowRight, ChevronDown, Headphones, Menu, Package, Truck, Wrench, X, Zap, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalSearchModal } from '@/components/GlobalSearchModal';
import { cn } from "@/lib/utils";
import { useRef } from 'react';

const MenuContent = ({
  title,
  links,
  featured,
  t,
  onClose
}: {
  title: string;
  links: any[];
  featured: { title: string; desc: string };
  t: any;
  onClose: () => void;
}) => (
  <div className="w-screen max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
    <div className="grid grid-cols-12 gap-0 py-8 lg:py-12">
      {/* DYNAMIC CATEGORIES */}
      <div className="col-span-12 lg:col-span-9">
        <div className="space-y-6">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-3">
            {title}
          </h3>
          <div className={cn(
            "grid gap-x-8 gap-y-2",
            links.length > 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
          )}>
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx}
                  to={link.href}
                  className="group flex items-start gap-4 p-3 -mx-3 hover:bg-slate-50 transition-all duration-300 rounded-lg"
                  onClick={onClose}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {link.label}
                    </div>
                    <div className="text-[11px] text-gray-500 leading-snug">
                      {link.desc}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* SPOTLIGHT COLUMN */}
      <div className="hidden lg:block lg:col-span-3 lg:pl-10 lg:ml-10 border-l border-gray-100">
        <div className="h-full flex flex-col">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-3 mb-6">
            {t('header.featuredTitle')}
          </h3>
          <div className="relative flex-grow bg-slate-900 rounded-xl overflow-hidden group/card shadow-xl shadow-slate-200/50 flex flex-col p-6 text-white min-h-[250px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/90 z-0 opacity-90 transition-opacity duration-500 group-hover/card:opacity-100" />
            <div className="absolute inset-0 grid-pattern opacity-10 z-0" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-accent" size={20} />
              </div>
              <h4 className="text-lg font-bold leading-tight mb-2">
                {featured.title}
              </h4>
              <p className="text-[11px] text-white/70 leading-relaxed mb-auto">
                {featured.desc}
              </p>
              <Link
                to="/request-quotation"
                className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-accent transition-colors duration-300 group/btn"
                onClick={onClose}
              >
                {t('header.requestQuotation')}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | undefined>(undefined);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = (menuId: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(undefined);
    }, 300); // 300ms safe-bridge delay
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesLinks = [
    { label: t('header.machinery'), desc: t('header.machineryDesc'), href: '/machinery', icon: Wrench },
    { label: t('header.spareParts'), desc: t('header.sparePartsDesc'), href: '/spare-parts', icon: Package },
    { label: t('header.technicalAssistance'), desc: t('header.technicalAssistanceDesc'), href: '/technical-assistance', icon: Headphones },
    { label: t('header.tradingMaterials'), desc: t('header.tradingMaterialsDesc'), href: '/trading-materials', icon: Truck },
  ];

  const productsLinks = [
    { label: t('header.productSolutions'), desc: t('header.productSolutionsDesc'), href: '/products', icon: Zap },
    { label: t('header.industries'), desc: t('header.industriesDesc'), href: '/industries', icon: Wrench },
  ];

  const newsroomLinks = [
    { label: t('header.news'), desc: t('header.newsDesc'), href: '/news', icon: Zap },
    { label: t('header.pressKit'), desc: t('header.pressKitDesc'), href: '/press', icon: Package },
  ];

  const moreLinks = [
    { label: t('header.events'), desc: t('header.eventsDesc'), href: '/events', icon: Zap },
    { label: t('header.requestQuotation'), desc: t('header.requestQuotationDesc'), href: '/request-quotation', icon: Wrench },
    { label: t('header.faq'), desc: t('header.faqDesc'), href: '/faq', icon: Headphones },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
    { code: 'pt', label: 'PT' }
  ];

  const isHeaderWhite = isScrolled || !!activeMenu;

  if (!isMounted) return null;

  const handleClose = () => setActiveMenu(undefined);

  return (
    <header className={cn(
      "fixed w-full z-50 pointer-events-none transition-all duration-500",
      activeMenu ? "h-screen" : "h-auto"
    )}>
      <div className={cn(
        "w-full pointer-events-auto transition-all duration-500",
        isHeaderWhite ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4 sm:py-6"
      )}>
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group relative z-[61]"
              onClick={() => {
                setMobileMenuOpen(false);
                handleClose();
              }}
            >
              <div className="flex items-center">
                <span className={cn(
                  "text-xl sm:text-2xl font-black font-heading tracking-tighter transition-colors duration-300",
                  isHeaderWhite ? "text-primary" : "text-white"
                )}>
                  SOPRANI
                </span>
                <span className="text-xl sm:text-2xl font-light font-heading tracking-tighter text-accent ml-1">
                  ENGINEERING
                </span>
              </div>
            </Link>

            {/* Desktop Navigation using Radix UI for maximum stability */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 h-full relative">
              <nav className="flex items-center h-full space-x-1 sm:space-x-2 xl:space-x-4">
                {/* Services */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={cn(
                    "h-full flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white",
                    activeMenu === 'services' && "text-accent"
                  )}>
                    {t('header.services')}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", activeMenu === 'services' && "rotate-180")} />
                  </button>
                </div>

                {/* Products */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={cn(
                    "h-full flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white",
                    activeMenu === 'products' && "text-accent"
                  )}>
                    {t('header.products')}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", activeMenu === 'products' && "rotate-180")} />
                  </button>
                </div>

                {/* Newsroom */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter('newsroom')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={cn(
                    "h-full flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white",
                    activeMenu === 'newsroom' && "text-accent"
                  )}>
                    {t('header.newsroom') || 'Newsroom'}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", activeMenu === 'newsroom' && "rotate-180")} />
                  </button>
                </div>

                {/* Company */}
                <Link
                  to="/company"
                  className={cn(
                    "inline-flex items-center justify-center text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white"
                  )}
                >
                  {t('header.company')}
                </Link>

                {/* Contact */}
                <Link
                  to="/contact"
                  className={cn(
                    "inline-flex items-center justify-center text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white"
                  )}
                >
                  {t('header.contact')}
                </Link>

                {/* More */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter('more')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={cn(
                    "h-full flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest px-3 sm:px-4 py-2 transition-colors",
                    isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white",
                    activeMenu === 'more' && "text-accent"
                  )}>
                    {t('header.more') || 'More'}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", activeMenu === 'more' && "rotate-180")} />
                  </button>
                </div>
              </nav>

              {/* CUSTOM MEGA-MENU VIEWPORT (Safe Bridge) */}
              {activeMenu && (
                <div
                  className="fixed left-0 top-[64px] sm:top-[80px] w-screen bg-white border-t border-gray-100 shadow-2xl z-[60] animate-in fade-in slide-in-from-top-2 duration-300"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-full flex justify-center">
                    {activeMenu === 'services' && (
                      <MenuContent
                        title={t('header.services')}
                        links={servicesLinks}
                        featured={{ title: t('header.servicesFeaturedTitle'), desc: t('header.servicesFeaturedDesc') }}
                        t={t}
                        onClose={handleClose}
                      />
                    )}
                    {activeMenu === 'products' && (
                      <MenuContent
                        title={t('header.products')}
                        links={productsLinks}
                        featured={{ title: t('header.productsFeaturedTitle'), desc: t('header.productsFeaturedDesc') }}
                        t={t}
                        onClose={handleClose}
                      />
                    )}
                    {activeMenu === 'newsroom' && (
                      <MenuContent
                        title={t('header.newsroom') || 'Newsroom'}
                        links={newsroomLinks}
                        featured={{ title: t('header.newsroomFeaturedTitle') || 'Industrial Insights', desc: t('header.newsroomFeaturedDesc') || 'Latest updates from Soprani Engineering' }}
                        t={t}
                        onClose={handleClose}
                      />
                    )}
                    {activeMenu === 'more' && (
                      <MenuContent
                        title={t('header.more') || 'More'}
                        links={moreLinks}
                        featured={{ title: t('header.moreFeaturedTitle') || 'Global Presence', desc: t('header.moreFeaturedDesc') || 'Explore our worldwide reach and events' }}
                        t={t}
                        onClose={handleClose}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border-l border-gray-200 pl-2 md:pl-3 mx-1 md:mx-2 relative group h-full">
              <button
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-colors duration-300 px-3 py-1.5 relative",
                  isHeaderWhite ? "text-gray-700 hover:text-accent" : "text-white/90 hover:text-white"
                )}
              >
                {i18n.resolvedLanguage?.toUpperCase() || 'EN'}
                <ChevronDown size={14} className={cn(
                  "transition-transform duration-300 group-hover:rotate-180",
                  isHeaderWhite ? "text-gray-400" : "text-white/60"
                )} />
              </button>
              <div className="absolute right-0 top-full pt-2 w-16 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white border border-gray-100 shadow-xl flex flex-col py-1.5">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => i18n.changeLanguage(lng.code)}
                      className={cn(
                        "text-xs font-semibold px-3 py-2 transition-colors",
                        i18n.resolvedLanguage === lng.code ? "text-accent bg-accent/5" : "text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "hidden lg:flex items-center justify-center p-2 rounded-full transition-colors mr-2",
                isHeaderWhite ? "text-gray-400 hover:text-accent hover:bg-gray-50" : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Search size={18} />
            </button>

            <Link
              to="/request-quotation"
              className={cn(
                "hidden sm:inline-flex ml-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 items-center gap-2 border",
                isHeaderWhite
                  ? "bg-accent text-white hover:bg-accent-dark border-accent/20"
                  : "bg-white/10 text-white hover:bg-white/20 border-white/20"
              )}
            >
              {t('header.requestQuotation')}
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn("p-2 transition-colors", isHeaderWhite ? "text-primary" : "text-white")}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("p-2 transition-colors", isHeaderWhite ? "text-primary" : "text-white")}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-2 px-4">
              {[
                { label: t('header.services'), href: '/services' },
                { label: t('header.products'), href: '/products' },
                { label: t('header.newsroom') || 'Newsroom', href: '/newsroom' },
                { label: t('header.company'), href: '/company' },
                { label: t('header.contact'), href: '/contact' },
                { label: t('header.more') || 'More', href: '#' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/request-quotation"
                className="flex items-center justify-center gap-2 py-3 bg-accent text-white text-xs font-bold uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('header.requestQuotation')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        )}
      </div>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
