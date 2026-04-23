import { ArrowRight, ChevronDown, Headphones, Menu, Package, Truck, Wrench, X, Zap, Search, Globe, Home as HomeIcon, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalSearchModal } from '@/components/GlobalSearchModal';
import { cn } from "@/lib/utils";
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getServicesLinks = (t: any) => [
  { label: t('header.allServices'), href: '/services', icon: LayoutGrid },
  { label: t('header.machinery'), href: '/machinery', icon: Wrench },
  { label: t('header.spareParts'), href: '/spare-parts', icon: Package },
  { label: t('header.technicalAssistance'), href: '/technical-assistance', icon: Headphones },
  { label: t('header.tradingMaterials'), href: '/trading-materials', icon: Truck },
];

const getProductsLinks = (t: any) => [
  { label: t('header.productSolutions'), href: '/products', icon: Zap },
  { label: t('header.industries'), href: '/industries', icon: Wrench },
];

const getResourcesLinks = (t: any) => [
  { label: t('header.events'), href: '/news?tab=events', icon: Zap },
  { label: t('header.news'), href: '/news', icon: Package },
];

const MenuContent = ({
  t,
  onClose
}: {
  t: any;
  onClose: () => void;
}) => {
  const servicesLinks = getServicesLinks(t);
  const productsLinks = getProductsLinks(t);
  const resourcesLinks = getResourcesLinks(t);

  return (
    <div className="max-w-[100rem] mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 py-12 lg:py-16">
        {/* COLUMN 1: SERVIÇOS */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/80 mb-6">
            {t('header.services')}
          </h3>
          <div className="flex flex-col space-y-1">
            {servicesLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-3 text-sm font-bold text-slate-700 px-3 py-2.5 -mx-3 rounded-xl transition-all duration-300 hover:text-accent hover:bg-[#f5f5f5] group/item"
                onClick={onClose}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover/item:bg-accent/10 transition-colors">
                  <link.icon size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 2: PRODUTOS */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/80 mb-6">
            {t('header.products')}
          </h3>
          <div className="flex flex-col space-y-1">
            {productsLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-3 text-sm font-bold text-slate-700 px-3 py-2.5 -mx-3 rounded-xl transition-all duration-300 hover:text-accent hover:bg-[#f5f5f5] group/item"
                onClick={onClose}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover/item:bg-accent/10 transition-colors">
                  <link.icon size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 3: RECURSOS */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/80 mb-6">
            {t('header.resources')}
          </h3>
          <div className="flex flex-col space-y-1">
            {resourcesLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="flex items-center gap-3 text-sm font-bold text-slate-700 px-3 py-2.5 -mx-3 rounded-xl transition-all duration-300 hover:text-accent hover:bg-[#f5f5f5] group/item"
                onClick={onClose}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover/item:bg-accent/10 transition-colors">
                  <link.icon size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                </div>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMN 4: OPORTUNIDADES */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/80 mb-6">
            {t('header.opportunities')}
          </h3>
          <div className="flex flex-col space-y-4">
            <Link
              to="/request-quotation"
              className="flex items-center gap-3 text-sm font-bold text-white bg-accent p-4 rounded-2xl shadow-lg shadow-accent/20 hover:bg-red-700 hover:shadow-accent/30 transition-all duration-300 group/item"
              onClick={onClose}
            >
              <Zap size={18} className="text-white transition-colors" />
              <span>{t('header.requestQuotation')}</span>
            </Link>

            <Link
              to="/contact"
              className="group/card block transition-all duration-300"
              onClick={onClose}
            >
              <div className="p-5 bg-slate-50 border-l-4 border-l-accent border-y border-r border-slate-100 rounded-2xl transition-all duration-300 group-hover/card:bg-white group-hover/card:shadow-xl group-hover/card:border-transparent">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent mb-2 block">
                  {t('header.sellMachinery')}
                </span>
                <h4 className="text-sm font-bold text-primary mb-1.5">
                  {t('header.sellMachineryCardTitle')}
                </h4>
                <p className="text-[11px] font-normal text-slate-500 leading-relaxed">
                  {t('header.sellMachineryCardDesc')}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 -translate-x-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0">
                  {t('header.more')}
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
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | undefined>(undefined);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(undefined);
    setMobileMenuOpen(false);
    setMobileMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScrollClose = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (activeMenu) setActiveMenu(undefined);
    };

    if (mobileMenuOpen || activeMenu) {
      window.addEventListener('scroll', handleScrollClose, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [mobileMenuOpen, activeMenu]);

  const isCompact = isScrolled && !mobileMenuOpen;

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
    { code: 'es', label: 'ES' },
    { code: 'pt', label: 'PT' }
  ];

  if (!isMounted) return null;

  const handleClose = () => setActiveMenu(undefined);



  return (
    <>
      <header className={cn(
        "fixed left-0 right-0 z-[9999] transition-all duration-700 ease-in-out pointer-events-none flex justify-center px-4",
        isCompact ? "bottom-10" : "top-0 pt-4 md:pt-6"
      )}>
        <motion.div
          layout
          initial={false}
          transition={{
            layout: { type: "spring", stiffness: 400, damping: 33, bounce: 0 },
            opacity: { duration: 0.2 }
          }}
          className={cn(
            "pointer-events-auto bg-white/95 backdrop-blur-xl border border-gray-100 flex items-center relative shadow-2xl",
            isCompact
              ? "rounded-full px-2 py-2 w-auto"
              : "rounded-full px-3 xs:px-4 sm:px-5 lg:px-6 xl:px-8 max-w-[95vw] lg:max-w-[100rem] w-full h-[72px] sm:h-20 md:h-24"
          )}
        >
          <AnimatePresence>
            {!isCompact ? (
              <motion.div
                key="full-header"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center w-full"
              >
                <motion.div layout>
                  <Link
                    to="/"
                    className="flex items-center h-full flex-shrink-0 relative z-[10000]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleClose();
                    }}
                  >
                    <div className="flex items-center justify-center h-full overflow-visible">
                      <img
                        src="/images/logo.png"
                        alt="Soprani Engineering"
                        className={cn(
                          "w-auto object-contain transition-all duration-500 ease-in-out drop-shadow-sm hover:scale-105",
                          isScrolled
                            ? "h-[32px] xs:h-[36px] sm:h-[42px] md:h-[48px] lg:h-[54px] xl:h-[60px]"
                            : "h-[50px] xs:h-[60px] sm:h-[75px] md:h-[85px] lg:h-[95px] xl:h-[110px]"
                        )}
                      />
                    </div>
                  </Link>
                </motion.div>

                <motion.div layout className="hidden xl:flex items-center space-x-1 2xl:space-x-3">
                  <Link to="/services" className="text-[18px] font-heading font-semibold text-primary hover:text-accent transition-colors py-2 px-2 xl:px-3 whitespace-nowrap">
                    {t('header.services')}
                  </Link>
                  <Link to="/products" className="text-[18px] font-heading font-semibold text-primary hover:text-accent transition-colors py-2 px-2 xl:px-3 whitespace-nowrap">
                    {t('header.products')}
                  </Link>
                  <Link to="/company" className="text-[18px] font-heading font-semibold text-primary hover:text-accent transition-colors py-2 px-2 xl:px-3 whitespace-nowrap">
                    {t('header.company')}
                  </Link>
                  <Link to="/contact" className="text-[18px] font-heading font-semibold text-primary hover:text-accent transition-colors py-2 px-2 xl:px-3 whitespace-nowrap">
                    {t('header.contact')}
                  </Link>
                  <div className="relative group">
                    <button
                      onClick={() => setActiveMenu(activeMenu === 'more' ? undefined : 'more')}
                      className="text-[18px] font-heading font-semibold text-primary hover:text-accent transition-colors flex items-center py-2 px-2 xl:px-3 whitespace-nowrap"
                    >
                      {t('header.more')} <ChevronDown size={14} className={cn("ml-1 transition-transform", activeMenu === 'more' && "rotate-180")} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {activeMenu === 'more' && (
                        <>
                          <div
                            className="fixed inset-0 z-[-1] bg-transparent pointer-events-auto"
                            onClick={() => setActiveMenu(undefined)}
                            style={{ height: '200vh', width: '200vw', left: '-50vw', top: '-50vh' }}
                          />
                          <div
                            className={cn(
                              "fixed left-1/2 -translate-x-1/2 w-[95vw] lg:max-w-[98rem] bg-white border border-gray-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] z-[10020] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[2rem] lg:rounded-[3rem] overflow-hidden",
                              isScrolled
                                ? "top-[80px] sm:top-[88px] md:top-[96px] lg:top-[112px]"
                                : "top-[96px] sm:top-[104px] md:top-[128px]"
                            )}
                          >
                            <MenuContent t={t} onClose={handleClose} />
                          </div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div layout className="flex items-center space-x-1 xs:space-x-2 xl:space-x-4">
                  <div className="flex items-center border-l border-gray-100 pl-2 md:pl-3 mx-1 md:mx-2 relative group">
                    <button
                      onClick={() => setActiveMenu(activeMenu === 'lang' ? undefined : 'lang')}
                      className="flex items-center text-sm font-bold text-primary hover:text-accent transition-colors py-2 px-2"
                    >
                      <Globe size={16} className="mr-1.5 opacity-60" />
                      <span className="hidden xs:inline">{(i18n.language?.split('-')[0] || 'EN').toUpperCase()}</span>
                    </button>

                    {/* Lang Dropdown */}
                    <AnimatePresence>
                      {activeMenu === 'lang' && (
                        <>
                          <div
                            className="fixed inset-0 z-[-1] bg-transparent pointer-events-auto"
                            onClick={() => setActiveMenu(undefined)}
                            style={{ height: '200vh', width: '200vw', left: '-50vw', top: '-50vh' }}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-full pt-2 w-24 z-[10020]"
                          >
                            <div className="bg-white border border-gray-100 shadow-xl overflow-hidden rounded-xl">
                              {languages.map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() => {
                                    i18n.changeLanguage(lang.code);
                                    setActiveMenu(undefined);
                                  }}
                                  className={cn(
                                    "w-full px-4 py-2 text-xs font-bold text-left transition-colors",
                                    i18n.language?.startsWith(lang.code) ? "bg-accent text-white" : "text-primary hover:bg-slate-50"
                                  )}
                                >
                                  {lang.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-primary hover:text-accent transition-colors"
                    aria-label="Search"
                  >
                    <Search size={22} />
                  </button>

                  <Link
                    to="/request-quotation"
                    className="hidden xl:flex items-center bg-accent hover:bg-red-700 text-white px-4 md:px-7 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-lg shadow-accent/20 active:scale-95 group"
                  >
                    {t('header.requestQuotation')}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="xl:hidden p-2 text-primary hover:text-accent transition-colors"
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact-pill"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 px-4 py-1"
              >
                <Link
                  to="/"
                  className="p-2 text-primary/70 hover:text-accent hover:bg-primary/5 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Go to homepage"
                >
                  <HomeIcon size={20} strokeWidth={2.5} />
                </Link>
                <div className="w-[1px] h-4 bg-gray-200"></div>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-primary/70 hover:text-accent hover:bg-primary/5 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Open search"
                >
                  <Search size={20} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop for clicking outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1] pointer-events-auto"
                style={{ height: '200vh', width: '200vw', left: '-50vw', top: '-50vh' }}
              />
              <motion.div
                initial={{ opacity: 0, y: isCompact ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isCompact ? 10 : -10 }}
                className={cn(
                  "absolute left-0 right-0 px-4 pointer-events-auto z-[9998]",
                  isCompact ? "bottom-full mb-4" : "top-full pt-2"
                )}
              >
                <nav className="xl:hidden border border-gray-100 bg-white max-h-[calc(100vh-160px)] overflow-y-auto rounded-3xl shadow-2xl">
                  <div className="flex flex-col space-y-2 px-6 pt-6 pb-20 shadow-inner">
                    <Link to="/services" className="block py-2 text-base font-heading font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.services')}
                    </Link>
                    <Link to="/products" className="block py-2 text-base font-heading font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.products')}
                    </Link>
                    <Link to="/company" className="block py-2 text-base font-heading font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.company')}
                    </Link>
                    <Link to="/news" className="block py-2 text-base font-heading font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.news')}
                    </Link>
                    <Link to="/contact" className="block py-2 text-base font-heading font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.contact')}
                    </Link>

                    <div className="border-t border-gray-50 pt-4 mt-2">
                      <button
                        onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                        className="flex items-center justify-between w-full py-2 text-base font-heading font-semibold text-primary"
                      >
                        <span className="flex items-center gap-2 text-accent">
                          {t('header.more') || 'More'}
                        </span>
                        <ChevronDown size={20} className={cn("text-accent transition-transform duration-300", mobileMoreOpen && "rotate-180")} />
                      </button>

                      {mobileMoreOpen && (
                        <div className="pl-4 space-y-4 pt-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="space-y-4">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('header.services')}</p>
                            {getServicesLinks(t).slice(1).map((link, idx) => (
                              <Link key={idx} to={link.href} className="flex items-center gap-3 text-sm font-medium text-primary/70 py-1" onClick={() => setMobileMenuOpen(false)}>
                                <link.icon size={18} className="text-accent/60" />
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </header>
      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
