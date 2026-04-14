import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Image } from '@/components/ui/image';
import { ArrowRight, Box, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ProductSolutions } from '@/entities';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const MachineryPart3D = lazy(() => import('./MachineryPart3D'));

interface Product {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  learnMoreKey: string;
}

const AnimatedProductCard: React.FC<{ product: Product; delay: number }> = ({ product, delay }) => {
  // ... (keep the existing AnimatedProductCard implementation but use framer-motion or the existing ref observer)
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-2xl border border-primary/5 transition-all duration-300">
        <div className="relative w-full h-64 bg-primary/5 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={256}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 p-8 flex flex-col">
          <div className="mb-4">
            <span className="inline-block text-4xl font-black text-accent/20 font-heading">
              {product.number}
            </span>
          </div>
          <h3 className="text-xl font-heading font-bold text-primary mb-3 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-base text-primary/60 leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
            {product.description}
          </p>
          <Link to="/products" className="flex items-center text-accent font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all duration-300">
            <span>{product.learnMoreKey}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function OurServicesProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await BaseCrudService.getAll<ProductSolutions>('productsolutions');
        const mappedProducts: Product[] = (result.items || []).map((item, index) => ({
          id: item._id,
          number: String(index + 1).padStart(2, '0'),
          title: item.solutionName || 'Product',
          description: item.detailedDescription || '',
          learnMoreKey: t('productsPage.viewDetails'),
          image: item.solutionImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  return (
    <section className="hidden lg:block py-32 bg-primary/[0.02] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-block text-accent font-black uppercase tracking-widest text-xs mb-4"
            >
              Industrial Systems & Engineering
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-primary leading-tight"
            >
              {t('productsSection.ourProducts')}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xl text-primary/60 max-w-md leading-relaxed font-light"
          >
            {t('productsSection.desc')}
          </motion.p>
        </div>

        {/* --- Highlighted 3D Showcase (desktop only) --- */}
        <motion.div className="hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[600px] mb-24 rounded-none overflow-hidden shadow-2xl bg-primary-dark border border-white/5"
        >
          {/* 3D Backdrop Decor */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(225,29,72,0.05),transparent_50%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
            {/* 3D Viewer Side */}
            <div className="lg:col-span-8 h-full relative border-r border-white/5">
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-white/30 space-y-4">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-heading font-black tracking-[0.2em] uppercase">Initializing 3D Engine...</span>
                </div>
              }>
                <MachineryPart3D />
              </Suspense>
              
              {/* Interaction Hint */}
              <div className="absolute top-8 left-8 z-10">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <div className="flex -space-x-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live: Soudronic Welding Station</span>
                </div>
              </div>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-4 p-12 flex flex-col justify-center bg-gradient-to-br from-white/[0.03] to-transparent">
              <h3 className="text-3xl font-heading font-black text-white mb-8 leading-tight tracking-tight">
                High-End <span className="text-accent block mt-1">Engineering</span>
              </h3>
              
              <div className="space-y-10">
                {[
                  { icon: Zap, title: "Precision Performance", desc: "Digital control systems allowing micron-level accuracy at maximum production speeds." },
                  { icon: ShieldCheck, title: "Redundant Reliability", desc: "Multi-stage automated inspection systems ensuring zero-defect output." },
                  { icon: Cpu, title: "Modular Architecture", desc: "Future-proof designs enabling seamless integration and rapid scalability." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-none bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 transition-all duration-500 group-hover:bg-accent group-hover:border-accent">
                      <item.icon size={20} className="text-accent group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-heading font-black text-xs md:text-sm uppercase tracking-[0.2em] mb-2">{item.title}</h4>
                      <p className="text-white/60 text-base leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14 pt-10 border-t border-white/5">
                <button className="flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-[0.3em] group hover:text-accent transition-colors duration-300">
                  Full Technical Specifications <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform text-accent" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {!isLoading && products.length > 0 ? (
            products.slice(0, 6).map((product, index) => (
              <AnimatedProductCard
                key={product.id}
                product={product}
                delay={index * 100}
              />
            ))
          ) : isLoading ? (
             <div className="col-span-full flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">{t('productsSection.noProducts')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
