import { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Filter, Search, ArrowRight, Settings, Cpu, Shield, Zap, Maximize2, X, Layers } from 'lucide-react';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useProducts } from '@/hooks/useSanity';
import { urlFor } from '@/lib/sanityClient';
import { SanityProduct } from '@/types/sanity';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};



export default function ProductsPage() {
  const { t } = useTranslation();
  const { data: products, loading: isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'koenig-bauer' | 'soudronic'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const brand = params.get('brand');
      if (brand === 'koenig-bauer' || brand === 'soudronic') return brand;
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
  const [isMounted, setIsMounted] = useState(false);

  // Reset tab when product changes
  useEffect(() => {
    setActiveTab('photo');
  }, [selectedProduct]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper for localized specs
  const getLocalizedSpecKey = (key?: string) => {
    if (!key) return '';
    const rawKey = key.toLowerCase().trim();
    const paramMap: Record<string, string> = {
      'maximum sheet size': 'maxSheetSize',
      'minimum sheet size': 'minSheetSize',
      'sheet thickness': 'sheetThickness',
      'production speed': 'productionSpeed',
      'production output': 'productionOutput',
      'coating speed': 'coatingSpeed',
      'coating types': 'coatingTypes',
      'size of printing plate': 'maxPrintingArea',
      'maximum printing area': 'maxPrintingArea',
      'energy savings': 'energySavings',
      'technology': 'technology',
      'feeding capacity': 'feedingCapacity',
      'heating type': 'heatingType',
      'container types': 'containerTypes',
      'can shapes': 'canShapes',
      'test types': 'testTypes',
      'application': 'application',
      'compatibility': 'compatibility',
      'gripper margin': 'gripperMargin',
      'printing colors': 'printingColors',
      'sheet width': 'sheetWidth',
      'sheet length': 'sheetLength',
      'strips': 'strips',
      'output': 'output'
    };
    const mappedKey = paramMap[rawKey];
    if (mappedKey) return t(`productSpecs.${mappedKey}`);
    return key;
  };

  // Helper for localized descriptions (Sanity data is often EN only)
  const getLocalizedDescription = (product: SanityProduct) => {
    const slug = product.slug?.current || '';
    const baseSlug = slug.toLowerCase();
    const keys = [
      `productDescriptions.${slug}`,
      `productDescriptions.${baseSlug}`,
      `productDescriptions.spn-${baseSlug}`,
      `productDescriptions.${baseSlug.replace('spn-', '')}`,
      `productDescriptions.${baseSlug.replace(/\s+/g, '-').toLowerCase()}`
    ];
    for (const key of keys) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    return product.description || '';
  };

  const getLocalizedTitle = (product: SanityProduct) => {
    const slug = product.slug?.current || '';
    const baseSlug = slug.toLowerCase();
    const keys = [
      `productTitles.${slug}`,
      `productTitles.${baseSlug}`,
      `productTitles.spn-${baseSlug}`,
      `productTitles.${baseSlug.replace('spn-', '')}`
    ];
    for (const key of keys) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    return product.title;
  };

  // Helper for localized spec values
  const getLocalizedValue = (value?: string) => {
    if (!value) return '';
    const rawValue = value.trim();

    // Try direct match first
    const directKey = `productValues.${rawValue}`;
    const directTranslated = t(directKey);
    if (directTranslated && directTranslated !== directKey) return directTranslated;

    // Handle common unit replacements
    let translatedValue = rawValue;
    const unitMap: Record<string, string> = {
      'sheets/min': t('units.sheetsMin'),
      'sheets/hour': t('units.sheetsHour'),
      'cans/min': t('units.cansMin'),
      'blanks/min': t('units.blanksMin'),
      'm/min': t('units.mMin')
    };

    Object.entries(unitMap).forEach(([en, pt]) => {
      translatedValue = translatedValue.replace(new RegExp(en.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), pt);
    });

    // Handle generic prefixes
    const upToPrefix = t('units.upTo') || 'Up to ';
    translatedValue = translatedValue.replace(/Up to /gi, upToPrefix);

    return translatedValue;
  };

  // Body scroll lock
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = selectedProduct ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [selectedProduct]);

  const allFilteredProducts = useMemo(() => {
    let combined = [...products];

    if (selectedCategory !== 'all') {
      combined = combined.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      combined = combined.filter(p => p.brand === selectedBrand);
    }

    if (searchQuery.trim()) {
      const fuse = new Fuse(combined, {
        keys: ['title', 'category', 'description', 'specs.key', 'specs.value'],
        threshold: 0.35,
      });
      combined = fuse.search(searchQuery).map(result => result.item);
    }

    return combined;
  }, [selectedCategory, selectedBrand, products, searchQuery]);

  // Brand Filtering logic
  const koenigProducts = useMemo(
    () => allFilteredProducts.filter(p => p.brand === 'koenig-bauer'),
    [allFilteredProducts]
  );
  const soudronicProducts = useMemo(
    () => allFilteredProducts.filter(p => p.brand === 'soudronic'),
    [allFilteredProducts]
  );

  // Derive available categories per brand (from all products, ignoring current search)
  const categoriesForBrand = useMemo(() => {
    const source = selectedBrand === 'all'
      ? products
      : products.filter(p => p.brand === selectedBrand);
    const cats = Array.from(new Set(source.map(p => p.category).filter(Boolean)));
    return ['all', ...cats];
  }, [selectedBrand, products]);

  // Reset category when brand changes if current category isn't in new list
  useEffect(() => {
    if (!categoriesForBrand.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [categoriesForBrand, selectedCategory]);

  // Products shown based on active brand tab + category
  const visibleKoenig = useMemo(() => {
    if (selectedBrand === 'soudronic') return [];
    return koenigProducts;
  }, [selectedBrand, koenigProducts]);

  const visibleSoudronic = useMemo(() => {
    if (selectedBrand === 'koenig-bauer') return [];
    return soudronicProducts;
  }, [selectedBrand, soudronicProducts]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-primary">

      {/* Premium Hero Section */}
      <section className="relative pt-36 sm:pt-44 md:pt-52 pb-24 overflow-hidden bg-[#001F5F]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container relative z-10 px-4 md:px-8 mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeUp}
            className="max-w-3xl text-left"
          >
            {/* Industrial Tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-accent" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                {t('productsPage.heroEyebrow')}
              </span>
            </div>

            <h1 className="mb-8 text-3xl xs:text-4xl font-black tracking-tight text-white md:text-7xl font-heading leading-[1.0]">
              {t('productsPage.heroTitle')}
            </h1>
            <p className="text-lg leading-relaxed md:text-xl text-slate-200 font-bold max-w-xl">
              {t('productsPage.heroSub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Switcher Tabs + Category chips */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-slate-200 shadow-sm py-3 md:py-2">
        <div className="container px-4 mx-auto flex flex-col gap-3">

          {/* Row 1: Search & Brand Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

            {/* Desktop Brand Pills */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {([
                { id: 'all', label: t('productsPage.allBrands') },
                { id: 'koenig-bauer', label: 'Koenig Bauer Metalprint' },
                { id: 'soudronic', label: 'Soudronic' },
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedBrand(tab.id)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedBrand === tab.id
                    ? tab.id === 'koenig-bauer'
                      ? 'bg-[#001F5F] text-white shadow-md shadow-[#001F5F]/20'
                      : tab.id === 'soudronic'
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Brand Select Dropdown */}
            <div className="md:hidden relative w-full">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value as any)}
                className="w-full appearance-none bg-slate-100 border-none text-xs font-bold uppercase tracking-wider text-slate-700 py-3.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white shadow-sm transition-all"
              >
                <option value="all">{t('productsPage.allBrands') || 'All Brands'}</option>
                <option value="koenig-bauer">Koenig Bauer Metalprint</option>
                <option value="soudronic">Soudronic</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative shrink-0 w-full md:w-auto">
              <Search className="absolute left-4 md:left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder={t('productsPage.searchPlaceholder') || "Search systems..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-56 pl-10 pr-4 py-3 md:py-2 bg-slate-100 border-none rounded-xl md:rounded-full focus:ring-2 focus:ring-accent focus:bg-white transition-all text-[13px] md:text-xs font-medium placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category Filters */}
          {categoriesForBrand.length > 1 && (
            <div className="flex flex-col md:flex-row md:items-center gap-2 overflow-x-auto no-scrollbar pt-1 md:pt-0 md:pb-1 -mx-4 px-4 md:mx-0 md:px-0">
              <span className="text-[10px] hidden md:inline-block font-black uppercase tracking-[0.3em] text-slate-400 shrink-0 mr-1">
                {t('productsPage.category') || 'Category:'}
              </span>

              {/* Desktop Category Chips */}
              <div className="hidden md:flex items-center gap-2 pr-12">
                {categoriesForBrand.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border ${selectedCategory === cat
                      ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                      }`}
                  >
                    {cat === 'all' ? (t('productsPage.allCategories') || 'All Categories') : cat}
                  </button>
                ))}
              </div>

              {/* Mobile Category Select */}
              <div className="md:hidden relative w-full mb-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {categoriesForBrand.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? (t('productsPage.allCategories') || 'All Categories') : cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Brands Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto space-y-20">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner className="w-12 h-12 text-accent" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
              <div className="p-4 rounded-full bg-red-50 text-accent">
                <X className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-primary">{t('productsPage.errorTitle')}</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                {t('productsPage.errorDesc')}
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                {t('productsPage.retry')}
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBrand + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Koenig Bauer Metalprint Group ── */}
                {visibleKoenig.length > 0 && (
                  <div>
                    {/* Brand Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-5 border-b-2 border-[#001F5F]/10">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-10 bg-[#001F5F] rounded-full shrink-0" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-0.5">{t('productArsenal.authorizedPartner') || 'Authorized Partner'}</p>
                          <h2 className="text-lg md:text-2xl font-heading font-black text-primary tracking-tight">
                            Koenig Bauer Metalprint
                          </h2>
                        </div>
                      </div>
                      <span className="sm:ml-auto text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 border border-[#001F5F]/30 rounded-full text-[#001F5F] shrink-0">
                        {t('productsPage.koenigCat') || 'Metal Decorating & Printing Systems'}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {visibleKoenig.map((product, idx) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          className="group"
                        >
                          <Card
                            className="h-full overflow-hidden transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-2xl rounded-none cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <div className="relative h-64 overflow-hidden bg-slate-100">
                              {product.mainImage ? (
                                <Image
                                  src={urlFor(product.mainImage).url()}
                                  alt={product.title}
                                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                  width={600}
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full bg-slate-200">
                                  <Settings className="w-12 h-12 text-slate-400 animate-spin-slow" />
                                </div>
                              )}
                              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-[#001F5F]/80 via-transparent group-hover:opacity-100" />
                              <div className="absolute top-4 left-4">
                                <Badge className="px-3 py-1 font-bold tracking-wider text-white border-none bg-[#001F5F] shadow-lg shadow-[#001F5F]/20">
                                  {t('productsPage.systemBadge')}
                                </Badge>
                              </div>
                              <button
                                className="absolute flex items-center justify-center transition-all bg-white rounded-full opacity-0 bottom-4 right-4 w-12 h-12 text-primary hover:bg-accent hover:text-white group-hover:opacity-100"
                              >
                                <Maximize2 size={20} />
                              </button>
                            </div>
                            <CardContent className="p-8">
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold tracking-widest uppercase text-[#001F5F]">{getLocalizedValue(product.category)}</span>
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{getLocalizedValue('Industrial Packaging')}</span>
                              </div>
                              <h3 className="mb-4 text-2xl font-bold text-primary group-hover:text-[#001F5F] transition-colors font-heading leading-tight">
                                {getLocalizedTitle(product)}
                              </h3>
                              <p className="mb-8 text-sm leading-relaxed text-slate-700 line-clamp-3 font-paragraph font-medium">
                                {getLocalizedDescription(product)}
                              </p>
                              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                {product.specs?.slice(0, 2).map((spec, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-2">
                                    {sIdx === 0 ? <Zap size={16} className="mt-1 text-[#001F5F] shrink-0" /> : <Cpu size={16} className="mt-1 text-[#001F5F] shrink-0" />}
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{getLocalizedSpecKey(spec.key)}</p>
                                      <p className="text-xs font-semibold text-primary truncate max-w-[100px]">{getLocalizedValue(spec.value)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div
                                className="w-full mt-8 font-bold border rounded-none hover:bg-[#001F5F] hover:text-white border-slate-100 group/btn flex items-center justify-center py-2 transition-colors duration-300"
                              >
                                {t('productsPage.viewDetails')} <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                {visibleKoenig.length > 0 && visibleSoudronic.length > 0 && (
                  <div className="flex items-center gap-6 py-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    <Layers size={16} className="text-slate-300 shrink-0" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                )}

                {/* ── Soudronic Group ── */}
                {visibleSoudronic.length > 0 && (
                  <div>
                    {/* Brand Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-5 border-b-2 border-accent/10">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-10 bg-accent rounded-full shrink-0" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-0.5">{getLocalizedValue('Authorized Partner')}</p>
                          <h2 className="text-xl md:text-2xl font-heading font-black text-primary tracking-tight">
                            Soudronic
                          </h2>
                        </div>
                      </div>
                      <span className="sm:ml-auto text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 border border-accent/30 rounded-full text-accent shrink-0">
                        {t('productsPage.soudronicCat') || 'Turnkey Can Making & Welding Systems'}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {visibleSoudronic.map((product, idx) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          className="group"
                        >
                          <Card
                            className="h-full overflow-hidden transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-2xl rounded-none cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <div className="relative h-64 overflow-hidden bg-slate-100">
                              {product.mainImage ? (
                                <Image
                                  src={urlFor(product.mainImage).url()}
                                  alt={product.title}
                                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                  width={600}
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full bg-slate-200">
                                  <Settings className="w-12 h-12 text-slate-400 animate-spin-slow" />
                                </div>
                              )}
                              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-accent/80 via-transparent group-hover:opacity-100" />
                              <div className="absolute top-4 left-4">
                                <Badge className="px-3 py-1 font-bold tracking-wider text-white border-none bg-accent shadow-lg shadow-accent/20">
                                  {t('productsPage.systemBadge')}
                                </Badge>
                              </div>
                              <button
                                className="absolute flex items-center justify-center transition-all bg-white rounded-full opacity-0 bottom-4 right-4 w-12 h-12 text-primary hover:bg-accent hover:text-white group-hover:opacity-100"
                              >
                                <Maximize2 size={20} />
                              </button>
                            </div>
                            <CardContent className="p-8">
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold tracking-widest uppercase text-accent">{getLocalizedValue(product.category)}</span>
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{getLocalizedValue('Industrial Packaging')}</span>
                              </div>
                              <h3 className="mb-4 text-2xl font-bold text-primary group-hover:text-accent transition-colors font-heading leading-tight">
                                {getLocalizedTitle(product)}
                              </h3>
                              <p className="mb-8 text-sm leading-relaxed text-slate-700 line-clamp-3 font-paragraph font-medium">
                                {getLocalizedDescription(product)}
                              </p>
                              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                {product.specs?.slice(0, 2).map((spec, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-2">
                                    {sIdx === 0 ? <Zap size={16} className="mt-1 text-accent shrink-0" /> : <Cpu size={16} className="mt-1 text-accent shrink-0" />}
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{getLocalizedSpecKey(spec.key)}</p>
                                      <p className="text-xs font-semibold text-primary truncate max-w-[100px]">{getLocalizedValue(spec.value)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div
                                className="w-full mt-8 font-bold border rounded-none hover:bg-accent hover:text-white border-slate-100 group/btn flex items-center justify-center py-2 transition-colors duration-300"
                              >
                                {t('productsPage.viewDetails')} <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {visibleKoenig.length === 0 && visibleSoudronic.length === 0 && (
                  <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-400 gap-3">
                    <Search size={36} className="opacity-30" />
                    <p className="text-sm font-semibold">{t('productsPage.emptyProducts')}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Machinery Details Drawer/Modal */}
      {isMounted && createPortal(
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[9999] overflow-y-auto w-[100vw] h-[100vh]">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-primary/60 backdrop-blur-sm"
                style={{ position: 'fixed', top: 0, left: 0 }}
              />

              {/* Panel/Drawer */}
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-4 md:inset-x-auto md:right-0 top-[5vh] md:top-0 h-auto max-h-[90vh] md:h-full w-auto md:w-[480px] bg-white shadow-2xl z-[10000] overflow-y-auto flex flex-col rounded-2xl md:rounded-none"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute shadow-lg z-20 top-6 right-6 flex items-center justify-center w-10 h-10 bg-white hover:bg-slate-100 text-slate-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="relative h-[280px] md:h-80 shrink-0 bg-slate-900 overflow-hidden flex flex-col">
                  {/* ✧ Gallery Tabs */}
                  {selectedProduct.title.includes('MetalStar 4') && (
                    <div className="absolute top-10 left-6 z-20 flex gap-6">
                      <button
                        onClick={() => setActiveTab('photo')}
                        className={`text-[10px] font-heading font-bold uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${activeTab === 'photo' ? 'text-white border-accent' : 'text-white/40 border-transparent'
                          }`}
                      >
                        📷 {t('productsPage.photo')}
                      </button>
                      <button
                        onClick={() => setActiveTab('video')}
                        className={`text-[10px] font-heading font-bold uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${activeTab === 'video' ? 'text-white border-accent' : 'text-white/40 border-transparent'
                          }`}
                      >
                        ▶ {t('productsPage.video')}
                      </button>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {activeTab === 'photo' ? (
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                      >
                        {selectedProduct.mainImage && (
                          <Image
                            src={selectedProduct.mainImage ? urlFor(selectedProduct.mainImage).url() : ''}
                            alt={selectedProduct.title}
                            className="object-cover w-full h-full opacity-80"
                            width={800}
                          />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full bg-black flex items-center justify-center"
                      >
                        <video
                          autoPlay
                          controls
                          className="w-full h-full object-contain"
                        >
                          <source src="/video/metalstar4.mp4" type="video/mp4" />
                        </video>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-8 right-8 pointer-events-none">
                    <Badge className="mb-4 bg-accent">{t('productsPage.systemBadge')}</Badge>
                    <h2 className="text-3xl font-bold text-white font-heading leading-tight">{getLocalizedTitle(selectedProduct)}</h2>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="mb-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{getLocalizedValue(selectedProduct.category)}</span>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <h4 className="mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('productArsenal.viewSpecs') || 'Overview'}</h4>
                      <p className="text-sm leading-relaxed text-slate-600 font-paragraph">{getLocalizedDescription(selectedProduct)}</p>
                    </div>

                    <div className="flex flex-col gap-5 p-6 rounded-none bg-slate-50 border border-slate-100">
                      {selectedProduct.specs?.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-4 border-b border-slate-200/60 pb-5 last:border-0 last:pb-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm shrink-0">
                            {idx % 3 === 0 ? <Zap size={18} className="text-accent" /> : idx % 3 === 1 ? <Cpu size={18} className="text-accent" /> : <Shield size={18} className="text-accent" />}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{getLocalizedSpecKey(spec.key)}</p>
                            <p className="text-sm font-semibold text-primary">{getLocalizedValue(spec.value)}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center gap-4 pt-5 border-t border-slate-200/60">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm shrink-0">
                          <Layers size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('productArsenal.industryApplication') || 'Industry Application'}</p>
                          <p className="text-sm font-semibold text-primary">{t('productArsenal.industrialPackaging') || 'Industrial Packaging'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a href={`/request-quotation?product=${encodeURIComponent(selectedProduct.title)}`} className="w-full block mt-10">
                    <Button className="w-full h-14 text-sm font-bold tracking-widest uppercase transition-all shadow-xl bg-accent hover:bg-accent-dark shadow-accent/20 rounded-none text-white shrink-0">
                      {t('productArsenal.requestInfo') || 'Request Information'}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

