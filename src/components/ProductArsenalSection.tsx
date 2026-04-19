import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from 'framer-motion';
import {
  X,
  ChevronRight,
  Settings,
  Cpu,
  BarChart3,
  Layers,
  Maximize2,
  Activity,
  Loader2
} from 'lucide-react';
import { useProducts } from '@/hooks/useSanity';
import { urlFor } from '@/lib/sanityClient';
import { SanityProduct } from '@/types/sanity';

// ─────────────────────────────────────────────
// 📦 TYPES
// ─────────────────────────────────────────────
interface ProductSpec {
  title: string;
  [key: string]: any;
  features: string[];
}

interface BrandGroup {
  brand: 'koenig-bauer' | 'soudronic';
  label: string;
  specialty: string;
  accentColor: string;
}

const BRAND_CONFIG: Record<'koenig-bauer' | 'soudronic', { label: string; specialty: string; accentColor: string }> = {
  'koenig-bauer': {
    label: 'Koenig Bauer Metalprint',
    specialty: 'Metal Decorating & Printing Systems',
    accentColor: '#001F5F',
  },
  'soudronic': {
    label: 'Soudronic',
    specialty: 'Turnkey Can Making & Welding Systems',
    accentColor: '#DC2626',
  },
};



// ─────────────────────────────────────────────
// 🃏 PRODUCT CARD COMPONENT
// ─────────────────────────────────────────────
const ProductCard: React.FC<{
  product: SanityProduct;
  onOpenSpecs: (product: SanityProduct) => void;
  index: number;
}> = ({ product, onOpenSpecs, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative group min-h-[500px] w-full cursor-pointer"
      onClick={() => onOpenSpecs(product)}
    >
      {/* ✧ Background Glow - Softer for light theme */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-700" />

      {/* ✧ Card Body */}
      <div className="relative h-full w-full bg-white border border-slate-200 overflow-hidden rounded-none flex flex-col items-center justify-between p-8 transition-all duration-500 group-hover:border-accent/40 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10">

        {/* Reflection Overlay - Softer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] via-transparent to-primary/[0.05] opacity-40" />

        {/* Product Image - with scale transition */}
        <div className="relative z-10 w-full h-64 mb-8">
          <img
            src={urlFor(product.mainImage).url()}
            alt={product.title}
            className="w-full h-full object-contain filter group-hover:drop-shadow-[0_15px_30px_rgba(0,31,95,0.12)] transition-all duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full text-center">
          <span className="text-xs font-heading font-black text-accent uppercase tracking-[0.3em] mb-3 block">
            Industrial Solution
          </span>
          <h3 className="text-2xl font-heading font-bold text-primary mb-6 tracking-tight">
            {product.title}
          </h3>

          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-6 py-2 border border-primary/20 text-primary/60 group-hover:text-white group-hover:border-accent group-hover:bg-accent transition-all duration-300 text-xs font-bold uppercase tracking-widest">
              {t('productArsenal.viewSpecs')}
              <Maximize2 size={12} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Floating ID Tag - Adjusted for visibility on white */}
        <div className="absolute top-4 right-4 text-[4rem] font-black text-primary/[0.04] pointer-events-none">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 🔬 SPECS MODAL COMPONENT
// ─────────────────────────────────────────────
const SpecsModal: React.FC<{
  product: SanityProduct | null;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = product?.specs || [];

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
      'compatibility': 'compatibility'
    };
    const mappedKey = paramMap[rawKey];
    if (mappedKey) return t(`productSpecs.${mappedKey}`);
    return key;
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
        >
      {/* Backdrop - Slightly lighter for light theme */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative w-full max-w-5xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_50px_rgba(0,31,95,0.15)] flex flex-col md:block"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 text-primary/40 hover:text-primary hover:bg-slate-100 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
          {/* ✧ Visual Section */}
          <div className="relative p-8 lg:p-16 flex items-center justify-center bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 grid-pattern-light opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={urlFor(product.mainImage).url()}
              alt={product.title}
              className="relative z-10 w-full max-h-[400px] object-contain drop-shadow-[0_15px_30px_rgba(0,31,95,0.1)]"
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] tracking-[0.2em] font-bold uppercase">
                <Activity size={12} className="text-accent animate-pulse" /> Status: Online
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <div className="text-slate-400 text-[10px] tracking-[0.2em] font-bold uppercase">
                SPN-{product.slug.current.toUpperCase()}
              </div>
            </div>
          </div>

          {/* ✧ Data Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-between max-h-[80vh] bg-white overflow-y-auto">
            <div>
              <span className="text-xs font-heading font-black text-accent uppercase tracking-[0.4em] mb-4 block">
                Technical Mastery
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-primary mb-8">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed mb-10 font-paragraph">
                {product.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 mb-12">
                {features.map((spec, idx) => (
                  <div key={idx} className="border-l-2 border-slate-200 pl-6 py-1 hover:border-accent transition-colors group">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 group-hover:text-accent/60 transition-colors">
                      {getLocalizedSpecKey(spec.key)}
                    </p>
                    <p className="text-primary text-xl font-heading font-bold">{spec.value}</p>
                  </div>
                ))}
              </div>


            </div>

            <div className="mt-12 flex flex-col gap-4">
              <a href={`/request-quotation?product=${encodeURIComponent(product.title)}`} className="w-full py-4 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/10">
                {t('productArsenal.requestInfo') || 'Request Information'} <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ─────────────────────────────────────────────
// 🏟️ MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ProductArsenalSection() {
  const { t } = useTranslation();
  const { data: products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-40 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F9FA 0%, #EEF2F7 100%)',
      }}
    >
      {/* ✧ Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-pattern-light opacity-30" />

        {/* Parallax Blobs - Adjusted for light theme (softer blues) */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-[100rem] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-xs font-heading font-black text-accent uppercase tracking-[0.5em]">
              Industrial Arsenal
            </span>
            <div className="w-12 h-0.5 bg-accent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-primary mb-8 tracking-tighter"
          >
            {t('productArsenal.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-normal"
          >
            {t('productArsenal.subtitle')}
          </motion.p>
        </div>

        {/* Content */}
        <div className="space-y-20 md:space-y-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Loading Arsenal...</p>
            </div>
          ) : error ? (
            <div className="text-center py-40">
              <p className="text-sm font-bold text-red-500 uppercase tracking-widest">Mastery Temporarily Offline</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">No Industrial Systems Found</p>
            </div>
          ) : (
            (['koenig-bauer', 'soudronic'] as const).map((brandKey) => {
              const config = BRAND_CONFIG[brandKey];
              const allBrandProducts = products.filter(p => p.brand === brandKey);
              const brandProducts = allBrandProducts.slice(0, 3);
              
              if (allBrandProducts.length === 0) return null;

              return (
                <div key={brandKey}>
                  {/* Brand Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10 md:mb-14 pb-6 border-b border-slate-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-1 h-12 shrink-0 rounded-full"
                        style={{ background: config.accentColor }}
                      />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">
                          Authorized Partner
                        </p>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-primary tracking-tight">
                          {config.label}
                        </h3>
                      </div>
                    </div>
                    <span
                      className="sm:ml-auto text-[11px] font-bold uppercase tracking-widest px-4 py-2 border rounded-full shrink-0"
                      style={{ color: config.accentColor, borderColor: `${config.accentColor}40` }}
                    >
                      {config.specialty}
                    </span>
                  </motion.div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {brandProducts.map((product, index) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        index={index}
                        onOpenSpecs={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>

                  {/* Per-Brand View All Shortcut */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 flex justify-start"
                  >
                    <a
                      href={`/products?brand=${brandKey}`}
                      className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary/40 hover:text-accent transition-colors"
                    >
                      View all {config.label} products
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              );
            })
          )}
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 flex justify-center"
        >
          <a
            href="/products"
            className="group relative flex items-center gap-4 px-10 py-5 bg-primary text-white overflow-hidden shadow-2xl hover:shadow-accent/30 transition-all duration-500"
          >
            {/* Gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 text-sm font-black uppercase tracking-[0.3em]">
              {t('productsPage.allProducts') || 'View All Products'}
            </span>
            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300 text-accent" />
            
            {/* Border outline animation */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </motion.div>
      </div>

      {/* ✧ Specs Modal Overlay */}
      <SpecsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* ✧ Bottom Label Overlay */}
      <div className="absolute bottom-12 left-12 hidden lg:block opacity-30 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Engineered by Soprani</span>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Global Precision Standard &copy;{new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
