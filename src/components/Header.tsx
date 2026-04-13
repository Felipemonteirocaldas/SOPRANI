import { Image } from '@/components/ui/image';
import { ArrowRight, ChevronDown, Headphones, Menu, Package, Truck, Wrench, X, Zap, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalSearchModal } from '@/components/GlobalSearchModal';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const megaMenuColumns = [
    {
      title: t('header.services'),
      links: [
        { label: t('header.allServices'), href: '/services', icon: Zap },
        { label: t('header.machinery'), href: '/machinery', icon: Wrench },
        { label: t('header.spareParts'), href: '/spare-parts', icon: Package },
        { label: t('header.technicalAssistance'), href: '/technical-assistance', icon: Headphones },
        { label: t('header.tradingMaterials'), href: '/trading-materials', icon: Truck },
      ]
    },
    {
      title: t('header.productSolutions'),
      links: [
        { label: t('header.productSolutions'), href: '/products', icon: Zap },
        { label: t('header.industries'), href: '/industries', icon: Wrench },
      ]
    },
    {
      title: t('header.resources'),
      links: [
        { label: t('header.events'), href: '/events', icon: Zap },
        { label: t('header.news'), href: '/news', icon: Wrench },
      ]
    },
    {
      title: t('header.platform'),
      links: [
        { label: t('header.mphPlatform'), href: '/mph', icon: Zap },
        { label: t('header.requestQuotation'), href: '/request-quotation', icon: Wrench },
      ],
      promo: {
        tag: t('header.newBadge'),
        title: t('header.mphPlatform'),
        subtitle: t('header.mphSubtitle')
      }
    }
  ];

  const mainNavLinks = [
    { label: t('header.services'), href: '/services' },
    { label: t('header.products'), href: '/products' },
    { label: t('header.company'), href: '/company' },
    { label: t('header.contact'), href: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
    { code: 'pt', label: 'PT' }
  ];

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout) clearTimeout(megaMenuTimeout);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => setMegaMenuOpen(false), 150);
    setMegaMenuTimeout(timeout);
  };

  return (
    <header
      className={`sticky top-0 z-[9999] transition-all duration-300 border-b ${isScrolled
        ? 'bg-white py-0 shadow-xl border-border-light'
        : 'bg-white py-2 shadow-md border-border-light'
        }`}
    >
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 opacity-[1]">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full flex-shrink-0 relative z-[10000]">
            <div className="flex items-center justify-center h-full">
              <img
                src="/images/logo.png"
                className="h-[68px] xs:h-[76px] sm:h-[84px] md:h-[88px] w-auto object-contain"
                alt="Soprani Logo"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main navigation">
            {/* Main Navigation Links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[70%] rounded-full opacity-0 group-hover:opacity-100" />
              </Link>
            ))}

            {/* More Menu - Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                id="mega-trigger"
                className="relative flex items-center gap-1 px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-300 group"
                aria-expanded={megaMenuOpen}
                aria-controls="mega-panel"
              >
                {t('header.more')}
                <ChevronDown size={16} className={`transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-1/2 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out rounded-full ${megaMenuOpen ? 'w-[70%] opacity-100' : 'w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100'}`} />
              </button>

              {/* Mega Menu Panel - Full Width */}
              <div
                id="mega-panel"
                className={`fixed left-0 right-0 top-20 sm:top-24 md:top-24 bg-white border-t-4 border-accent shadow-2xl z-40 transition-all duration-300 ease-out pointer-events-none ${megaMenuOpen
                  ? 'opacity-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 -translate-y-4'
                  }`}
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-9">
                    {megaMenuColumns.map((column, idx) => (
                      <div key={idx}>
                        {/* Column Header */}
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 pb-2.5 border-b border-border-light mb-2.5">
                          {column.title}
                        </h3>

                        {/* Links */}
                        <div className="space-y-0">
                          {column.links.map((link, linkIdx) => {
                            const IconComponent = link.icon;
                            return (
                              <Link
                                key={linkIdx}
                                to={link.href}
                                className="flex items-center gap-2 text-sm font-normal text-gray-600 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary"
                                onClick={() => setMegaMenuOpen(false)}
                              >
                                <IconComponent size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover:opacity-100" />
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Promo Section */}
                        {column.promo && (
                          <div className="mt-3.5 p-4 bg-background-alt border-l-4 border-accent">
                            <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1.25">
                              {column.promo.tag}
                            </div>
                            <div className="text-sm font-bold text-primary mb-1">
                              {column.promo.title}
                            </div>
                            <div className="text-xs font-light text-text-muted">
                              {column.promo.subtitle}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Language Switcher Dropdown */}
            <div className="hidden md:flex items-center border-l border-gray-200 pl-2 md:pl-3 mx-1 md:mx-2 relative group">
              <button
                className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-accent px-2 py-1 relative transition-colors duration-300"
                aria-label="Language selection"
              >
                {i18n.resolvedLanguage?.toUpperCase() || 'EN'}
                <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[60%] rounded-full opacity-0 group-hover:opacity-100" />
              </button>

              {/* Dropdown Menu (With Invisible Hover Bridge) */}
              <div className="absolute right-0 top-full pt-2 w-16 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-none flex flex-col py-1.5 overflow-hidden">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => i18n.changeLanguage(lng.code)}
                      className={`text-xs font-semibold px-3 py-2 transition-colors ${i18n.resolvedLanguage === lng.code
                        ? 'text-accent bg-accent/5'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                        }`}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center justify-center p-2 text-gray-400 hover:text-accent hover:bg-gray-50 rounded-full transition-colors mr-2"
              aria-label="Search"
              title="Global Search (Ctrl+K)"
            >
              <Search size={18} />
            </button>

            <Link
              to="/request-quotation"
              className="hidden sm:inline-flex ml-2 px-3 sm:px-3 lg:px-4 py-1.5 bg-accent/90 hover:bg-accent text-white hover:shadow-lg hover:shadow-accent/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 items-center gap-2 rounded-none backdrop-blur-sm border border-white/10"
              aria-label={t('header.requestQuotation')}
            >
              {t('header.requestQuotation')}
              <ArrowRight size={12} />
            </Link>
          </nav>

          {/* Mobile Actions: Search & Menu */}
          <div className="flex md:hidden items-center gap-2">
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 xs:py-4 border-t border-border-light">
            <div className="flex flex-col space-y-1 xs:space-y-2 px-2 xs:px-3">
              {/* Main Mobile Links */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile More Menu */}
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="w-full text-left px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-none flex items-center justify-between"
              >
                {t('header.more')}
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mobile More Menu Items */}
              {megaMenuOpen && (
                <div className="pl-2 xs:pl-3 space-y-0.5 xs:space-y-1">
                  {megaMenuColumns.flatMap((column) => column.links).map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.href}
                      className="block px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-none"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMegaMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Language Switcher */}
              <div className="flex bg-gray-50 border border-gray-100 rounded-none p-1 mt-2 justify-between">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => {
                      i18n.changeLanguage(lng.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex-1 text-xs font-bold py-2 rounded-none transition-all duration-200 ${i18n.resolvedLanguage === lng.code
                      ? 'text-accent bg-white shadow-sm'
                      : 'text-gray-400 hover:text-primary'
                      }`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>

              <Link
                to="/request-quotation"
                className="w-full mt-3 xs:mt-4 px-4 xs:px-5 py-2.5 xs:py-3 bg-accent text-white text-xs xs:text-sm font-semibold uppercase tracking-wider rounded-none transition-all duration-300 hover:bg-accent-dark hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                aria-label={t('header.requestQuotation')}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('header.requestQuotation')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        )}
      </div>
      {isMounted && <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />}
    </header>
  );
}
