import { Image } from '@/components/ui/image';
import { ArrowRight, ChevronDown, Headphones, Menu, Package, Truck, Wrench, X, Zap, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalSearchModal } from '@/components/GlobalSearchModal';
import { cn } from "@/lib/utils";
import { useRef } from 'react';

const MenuContent = ({
  t,
  onClose
}: {
  t: any;
  onClose: () => void;
}) => {
  const servicesLinks = [
    { label: t('header.allServices'), href: '/services', icon: ArrowRight },
    { label: t('header.machinery'), href: '/machinery', icon: Wrench },
    { label: t('header.spareParts'), href: '/spare-parts', icon: Package },
    { label: t('header.technicalAssistance'), href: '/technical-assistance', icon: Headphones },
    { label: t('header.tradingMaterials'), href: '/trading-materials', icon: Truck },
  ];

  const productsLinks = [
    { label: t('header.productSolutions'), href: '/products', icon: Zap },
    { label: t('header.industries'), href: '/industries', icon: Wrench },
  ];

  const resourcesLinks = [
    { label: t('header.events'), href: '/news?tab=events', icon: Zap },
    { label: t('header.news'), href: '/news', icon: Package },
  ];

  return (
    <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-9">
        {/* COLUMN 1: SERVIÇOS */}
        <div className="space-y-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#666] pb-2.5 border-b border-gray-100 mb-2.5">
            {t('header.services')}
          </h3>
          <div className="flex flex-col">
            {servicesLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-2 text-sm font-normal text-primary/70 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary group/item"
                onClick={onClose}
              >
                <link.icon size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover/item:opacity-100" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 2: PRODUTOS */}
        <div className="space-y-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#666] pb-2.5 border-b border-gray-100 mb-2.5">
            {t('header.products')}
          </h3>
          <div className="flex flex-col">
            {productsLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-2 text-sm font-normal text-primary/70 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary group/item"
                onClick={onClose}
              >
                <link.icon size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover/item:opacity-100" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 3: RECURSOS */}
        <div className="space-y-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#666] pb-2.5 border-b border-gray-100 mb-2.5">
            {t('header.resources')}
          </h3>
          <div className="flex flex-col">
            {resourcesLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-2 text-sm font-normal text-primary/70 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary group/item"
                onClick={onClose}
              >
                <link.icon size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover/item:opacity-100" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 4: OPORTUNIDADES */}
        <div className="space-y-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#666] pb-2.5 border-b border-gray-100 mb-2.5">
            {t('header.opportunities')}
          </h3>
          <div className="flex flex-col space-y-4">
            <Link
              to="/request-quotation"
              className="flex items-center gap-2 text-sm font-normal text-primary/70 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary group/item"
              onClick={onClose}
            >
              <Zap size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover/item:opacity-100" />
              <span>{t('header.requestQuotation')}</span>
            </Link>

            <Link
              to="/contact"
              className="group/card block transition-all duration-300"
              onClick={onClose}
            >
              <div className="mt-3.5 p-4 bg-primary/5 border-l-4 border-accent transition-all duration-300 group-hover/card:bg-primary/10 group-hover/card:translate-x-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5 block">
                  {t('header.sellMachinery')}
                </span>
                <h4 className="text-sm font-bold text-primary mb-1">
                  {t('header.sellMachineryCardTitle')}
                </h4>
                <p className="text-xs font-light text-slate-600 leading-relaxed">
                  {t('header.sellMachineryCardDesc')}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider opacity-0 -translate-x-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0">
                  {t('header.more')} →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | undefined>(undefined);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const mobileLangRef = useRef<HTMLDivElement>(null);

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

    // Close mobile lang dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
    { code: 'pt', label: 'PT' }
  ];

  const isHeaderWhite = true;

  if (!isMounted) return null;

  const handleClose = () => setActiveMenu(undefined);

  return (
    <header className="sticky top-0 z-[9999] bg-white border-b border-gray-100 shadow-md transition-all duration-300">
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 md:h-24">
          <Link
            to="/"
            className="flex items-center h-full flex-shrink-0 relative z-[10000]"
            onClick={() => {
              setMobileMenuOpen(false);
              handleClose();
            }}
          >
            <div className="flex items-center justify-center h-full">
              <img
                src="/images/logo.png"
                alt="Soprani Engineering"
                className="h-[52px] xs:h-[60px] sm:h-[84px] md:h-[88px] w-auto object-contain transition-all duration-500"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main navigation">
            {[
              { label: t('header.services'), href: '/services' },
              { label: t('header.products'), href: '/products' },
              { label: t('header.company'), href: '/company' },
              { label: t('header.contact'), href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[70%] rounded-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}

            {/* More / Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "relative flex items-center gap-1 px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-300 group",
                  activeMenu === 'more' && "text-accent"
                )}
              >
                {t('header.more') || 'More'}
                <ChevronDown size={16} className={cn("transition-transform duration-300", activeMenu === 'more' && "rotate-180")} />
                <span className={cn(
                  "absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out rounded-full opacity-0 group-hover:w-[70%] group-hover:opacity-100",
                  activeMenu === 'more' && "w-[70%] opacity-100"
                )}></span>
              </button>

              {/* Mega Panel (More) - Fixed structure matching reference */}
              <div
                className={cn(
                  "fixed left-0 right-0 top-20 sm:top-24 md:top-24 bg-white border-t-4 border-accent shadow-lg z-40 transition-all duration-200 ease-out",
                  activeMenu === 'more' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                )}
              >
                <MenuContent t={t} onClose={handleClose} />
              </div>
            </div>
          </nav>

          {/* Right Actions Cluster */}
          <div className="flex items-center">
            {/* Language Selection */}
            <div className="hidden md:flex items-center border-l border-gray-100 pl-2 md:pl-3 mx-1 md:mx-2 relative group">
              <button
                className="flex items-center gap-1.5 text-xs font-bold text-primary/80 hover:text-accent px-2 py-1 relative transition-colors duration-300"
                aria-label="Language selection"
              >
                {i18n.language.split('-')[0].toUpperCase()}
                <ChevronDown size={14} className="text-primary/40 group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[60%] rounded-full opacity-0 group-hover:opacity-100"></span>
              </button>

              {/* Dropdown menu */}
              <div className="absolute right-0 top-full pt-2 w-16 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white border border-gray-100 shadow-xl flex flex-col py-1.5 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={cn(
                        "text-xs font-semibold px-3 py-2 transition-colors",
                        i18n.language === lang.code ? "text-accent bg-accent/5" : "text-gray-500 hover:bg-slate-50 hover:text-primary"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center justify-center p-2 text-gray-400 hover:text-accent hover:bg-slate-50 rounded-full transition-colors mr-2"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Request Quotation Button */}
            <Link
              to="/request-quotation"
              className="hidden sm:inline-flex ml-2 px-3 sm:px-3 lg:px-4 py-1.5 bg-accent/90 hover:bg-accent text-white hover:shadow-lg hover:shadow-accent/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 items-center gap-2 rounded-none backdrop-blur-sm border border-white/10"
              aria-label="Request Quotation"
            >
              {t('header.requestQuotation')}
              <ArrowRight size={12} />
            </Link>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              {/* Mobile Language Dropdown */}
              <div ref={mobileLangRef} className="relative">
                <button
                  className="flex items-center gap-1 p-2 text-primary hover:text-accent transition-colors text-xs font-bold"
                  onClick={() => setMobileLangOpen(prev => !prev)}
                  aria-label="Select language"
                >
                  {i18n.language.split('-')[0].toUpperCase()}
                  <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-200", mobileLangOpen && "rotate-180")} />
                </button>

                {/* Dropdown */}
                {mobileLangOpen && (
                  <div className="absolute right-0 top-full mt-1 w-16 bg-white border border-gray-100 shadow-xl z-[10001] overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setMobileLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-xs font-semibold px-3 py-2.5 text-left transition-colors",
                          i18n.language === lang.code
                            ? "text-accent bg-accent/5"
                            : "text-gray-500 hover:bg-slate-50 hover:text-primary"
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-primary hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-primary hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-2 px-4 shadow-inner">
              <Link to="/services" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                {t('header.services')}
              </Link>
              <Link to="/products" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                {t('header.products')}
              </Link>
              <Link to="/company" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                {t('header.company')}
              </Link>
              <Link to="/contact" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                {t('header.contact')}
              </Link>
              <Link to="/news" className="block py-2 text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                {t('header.news')}
              </Link>

              <div className="pt-4 border-t border-gray-50 mt-2">
                <Link
                  to="/request-quotation"
                  className="flex items-center justify-center gap-2 py-3 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('header.requestQuotation')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
