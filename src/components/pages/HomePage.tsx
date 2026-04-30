// WI-HPI
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  MarqueeSkeleton,
  SplitLayoutSkeleton,
  ServicesSkeleton,
  PartnersSkeleton,
  NewsSkeleton,
} from '@/components/ui/SkeletonLoaders';
import { NewsandUpdates, ProductSolutions } from '@/entities';
import { MockBaseCrudService as BaseCrudService } from '@/lib/mockService';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNewsPosts } from '@/hooks/useSanity';
import { urlFor } from '@/lib/sanityClient';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';

// ⚡ Lazy-loaded sections — only Hero renders immediately
// ⚡ Lazy-loaded sections — only Hero renders immediately
import SopraniLegacyHero from '@/components/SopraniLegacyHero';
const CorporateMarquee = lazy(() => import('@/components/CorporateMarquee'));
const OurServicesSection = lazy(() => import('@/components/OurServicesSection'));
const ProductArsenalSection = lazy(() => import('@/components/ProductArsenalSection'));
const PartnersSection = lazy(() => import('@/components/PartnersSection'));
const SellAssetCTA = lazy(() => import('@/components/SellAssetCTA'));




// ─────────────────────────────────────────────
// 🧲 MAGNETIC BUTTON
// ─────────────────────────────────────────────
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  to?: string;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps & React.HTMLAttributes<HTMLElement>> = ({
  children,
  className = '',
  strength = 12,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x: springX, y: springY }}>
        <div className={className} {...props}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// 📦 STAGGER CONTAINER VARIANTS
// ─────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const staggerCardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

const staggerLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

// ─────────────────────────────────────────────
// 🎥 INTERSECTION-BASED STAGGER WRAPPER
// ─────────────────────────────────────────────
const StaggerReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left';
}> = ({ children, className = '', direction = 'up' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 🃏 STAGGER CARD ITEM
// ─────────────────────────────────────────────
const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left';
}> = ({ children, className = '', direction = 'up' }) => (
  <motion.div
    className={className}
    variants={direction === 'left' ? staggerLeftVariant : staggerCardVariant}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// 🧩 LEGACY ANIMATED ELEMENT (unchanged)
// ─────────────────────────────────────────────
const AnimatedElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
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

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    switch (direction) {
      case 'up': return 'translateY(40px) scale(0.98)';
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      case 'none': return 'scale(0.95)';
      default: return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        willChange: 'opacity, transform',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────
// 🏠 MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductSolutions[]>([]);

  const { data: news, loading: isLoadingNews } = useNewsPosts();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await BaseCrudService.getAll<ProductSolutions>('productsolutions', [], { limit: 8 });
        setProducts(productsRes.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchData();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const baseLang = i18n.language?.split('-')[0];
    const locale = baseLang === 'pt' ? 'pt-BR' : baseLang === 'es' ? 'es-ES' : baseLang === 'it' ? 'it-IT' : 'en-GB';
    return date
      .toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
      .replace(/\//g, '.');
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary selection:bg-accent selection:text-white flex flex-col overflow-x-hidden">
      {/* Header and ScrollProgressBar are now in the global Layout */}

      <main className="flex-grow overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <SopraniLegacyHero />




        {/* ⚡ LAZY: CORPORATE MARQUEE */}
        <Suspense fallback={<MarqueeSkeleton />}>
          <CorporateMarquee />
        </Suspense>

        {/* ⚡ LAZY: OUR SERVICES */}
        <Suspense fallback={<ServicesSkeleton />}>
          <OurServicesSection />
        </Suspense>

        {/* ⚡ LAZY: PRODUCT ARSENAL (NEW) */}
        <Suspense fallback={<div className="h-96 bg-black" />}>
          <ProductArsenalSection />
        </Suspense>

        {/* ⚡ LAZY: PARTNERS */}
        <Suspense fallback={<PartnersSkeleton />}>
          <PartnersSection />
        </Suspense>

        {/* ══════════════════════════════════════
            LATEST NEWS SECTION — Staggered Reveal
        ══════════════════════════════════════ */}
        <section className="py-12 xs:py-16 sm:py-20 md:py-32 bg-[#f8f9fa]">
          <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-10 xs:mb-12 sm:mb-16">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3 xs:mb-4">
                  {t('newsPage.heroTitle')}
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                  {t('newsPage.heroSub')}
                </p>
              </div>
            </AnimatedElement>

            {isLoadingNews ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Featured News */}
                <div className="lg:col-span-7">
                  <AnimatedElement direction="up" delay={100} className="h-full">
                    <Link
                      to="/news"
                      className="group block h-full bg-white rounded-none overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-t-4 border-accent border-x border-b border-border-light relative"
                    >
                      {/* Category Tag */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="bg-accent text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg">
                          {news[0].category || 'INSIGHT'}
                        </span>
                      </div>

                      <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                        {news[0].mainImage ? (
                          <Image
                            src={urlFor(news[0].mainImage).url()}
                            alt={news[0].title || 'News'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            ...
                          </div>
                        )}
                      </div>
                      <div className="p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {formatDate(news[0].publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                          {news[0].title}
                        </h3>
                        <p className="text-slate-600 mb-8 line-clamp-3 text-base md:text-lg leading-relaxed font-normal">
                          {news[0].excerpt}
                        </p>

                        <div className="inline-flex items-center px-6 py-3 bg-accent text-white text-xs font-bold uppercase tracking-widest group-hover:bg-accent-dark transition-all duration-300">
                          {t('news.readMore')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedElement>
                </div>

                {/* ✦ STAGGERED News List (Right) */}
                <StaggerReveal className="lg:col-span-5 flex flex-col gap-6">
                  {news.slice(1, 5).map((item) => (
                    <StaggerItem key={item._id} className="h-full">
                      <Link
                        to="/news"
                        className="group flex bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full min-h-[140px] border-l-4 border-l-accent border-y border-r border-border-light"
                      >
                        <div className="w-1/3 relative overflow-hidden bg-gray-200 flex-shrink-0">
                          {item.mainImage ? (
                            <Image
                              src={urlFor(item.mainImage).url()}
                              alt={item.title || 'News'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center font-bold px-4">
                              {t('news.industrialSolution')}
                            </div>
                          )}
                        </div>
                        <div className="w-2/3 p-5 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">
                              {item.category || 'NEWS'}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {formatDate(item.publishedAt)}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-primary mb-2 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                            {item.title}
                          </h4>
                          <div className="mt-auto flex justify-end">
                            <ArrowRight size={18} className="text-accent transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted">{t('news.noNews')}</div>
            )}
          </div>
        </section>



        {/* OUR SERVICES PRODUCTS SECTION */}

        {/* ⚡ LAZY: SELL ASSET CTA */}
        <Suspense fallback={<div className="h-64 bg-primary" />}>
          <SellAssetCTA />
        </Suspense>
      </main>
    </div>
  );
}
