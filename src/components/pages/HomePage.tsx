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
  EventsSkeleton,
} from '@/components/ui/SkeletonLoaders';
import { IndustryEvents, NewsandUpdates, ProductSolutions } from '@/entities';
import { MockBaseCrudService as BaseCrudService } from '@/lib/mockService';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';

// ⚡ Lazy-loaded sections — only Hero renders immediately
const CorporateMarquee = lazy(() => import('@/components/CorporateMarquee'));
const OurServicesSection = lazy(() => import('@/components/OurServicesSection'));
const ProductArsenalSection = lazy(() => import('@/components/ProductArsenalSection'));
const PartnersSection = lazy(() => import('@/components/PartnersSection'));
const SellAssetCTA = lazy(() => import('@/components/SellAssetCTA'));


// ─────────────────────────────────────────────
// 🔴 SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-accent"
      aria-hidden="true"
    />
  );
};

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsandUpdates[]>([]);
  const [events, setEvents] = useState<IndustryEvents[]>([]);
  const [products, setProducts] = useState<ProductSolutions[]>([]);

  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
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
        const [newsRes, eventsRes, productsRes] = await Promise.all([
          BaseCrudService.getAll<NewsandUpdates>('news', [], { limit: 5 }),
          BaseCrudService.getAll<IndustryEvents>('events', [], { limit: 3 }),
          BaseCrudService.getAll<ProductSolutions>('productsolutions', [], { limit: 8 }),
        ]);
        setNews(newsRes.items || []);
        setEvents(eventsRes.items || []);
        setProducts(productsRes.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingNews(false);
        setIsLoadingEvents(false);
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
    return date
      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .replace(/\//g, '.');
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary selection:bg-accent selection:text-white flex flex-col">
      {/* ✦ SCROLL PROGRESS BAR */}
      <ScrollProgressBar />

      <Header />
      <main className="flex-grow">

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden flex items-center min-h-screen pt-24 sm:pt-28 bg-[#001F5F]">
          {/* Background Video — with poster for instant visual feedback */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-bg.png"
            preload="none"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/video/videohero.mp4" type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#001F5F]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001F5F]/40 via-transparent to-[#001F5F]/40" />
            <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
          </div>

          {/* Hero Content */}
          <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <AnimatedElement direction="left" className="max-w-2xl">
                <div>
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-heading font-black text-white mb-6 leading-tight tracking-tight">
                    {t('hero.title')}
                  </h1>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-200 mb-8 xs:mb-10 sm:mb-12 leading-relaxed max-w-2xl font-light">
                    {t('hero.subtitle')}
                  </p>

                  {/* ✦ MAGNETIC CTA BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <MagneticButton strength={10}>
                      <Link
                        to="/request-quotation"
                        className="block w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest hover:bg-accent-dark transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 text-center text-sm sm:text-base btn-shimmer"
                      >
                        {t('hero.requestQuotation')}
                      </Link>
                    </MagneticButton>
                    <MagneticButton strength={10}>
                      <Link
                        to="/contact"
                        className="block w-full sm:w-auto px-8 py-4 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center text-sm sm:text-base"
                      >
                        {t('hero.contactUs')}
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </AnimatedElement>

              {/* Hero Right Column (reserved) */}
              <AnimatedElement direction="right" delay={200} className="hidden lg:block" children={''} />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-6 xs:bottom-7 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 z-20 group"
            aria-label="Scroll to content"
          >
            <ChevronDown
              size={32}
              className="xs:size-[40px] animate-bounce group-hover:scale-110 transition-transform"
              strokeWidth={1.5}
            />
          </button>
        </section>

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
        <section className="py-12 xs:py-16 sm:py-20 md:py-32 bg-background-alt">
          <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-10 xs:mb-12 sm:mb-16">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3 xs:mb-4">
                  {t('newsPage.heroTitle')}
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
                  {t('newsPage.heroSub')}
                </p>
              </div>
            </AnimatedElement>

            {isLoadingNews ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Featured News */}
                <div className="lg:col-span-7">
                  <AnimatedElement direction="up" delay={100} className="h-full">
                    <Link
                      to="/news"
                      className="group block h-full bg-white rounded-none overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border-light"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                        {news[0].coverImage ? (
                          <Image
                            src={news[0].coverImage}
                            alt={news[0].headline || 'News'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            ...
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-heading font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                          {news[0].headline}
                        </h3>
                        <p className="text-primary/70 mb-6 line-clamp-3 text-base md:text-lg leading-relaxed font-light">
                          {news[0].content}
                        </p>
                        <span className="text-accent text-sm font-semibold flex items-center group-hover:translate-x-2 transition-transform duration-300">
                          Read more <ArrowRight size={16} className="ml-2" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedElement>
                </div>

                {/* ✦ STAGGERED News List (Right) */}
                <StaggerReveal className="lg:col-span-5 flex flex-col gap-4">
                  {news.slice(1, 5).map((item) => (
                    <StaggerItem key={item._id}>
                      <Link
                        to="/news"
                        className="group flex bg-white rounded-none overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-[120px] border border-border-light"
                      >
                        <div className="w-1/3 relative overflow-hidden bg-gray-200 flex-shrink-0">
                          {item.coverImage ? (
                            <Image
                              src={item.coverImage}
                              alt={item.headline || 'News'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center font-bold px-4">
                              SOPRANI INDUSTRIAL SOLUTION
                            </div>
                          )}
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-center">
                          <h4 className="text-sm font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                            {item.headline}
                          </h4>
                          <span className="text-accent text-xs font-semibold mt-auto inline-flex items-center">
                            Read more
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted">No news available.</div>
            )}

            <AnimatedElement delay={400} className="mt-12 flex justify-center">
              <button
                onClick={() => navigate('/news')}
                className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-none"
              >
                {t('newsPage.readMore')}
              </button>
            </AnimatedElement>
          </div>
        </section>

        {/* ══════════════════════════════════════
            EVENTS SECTION — Staggered Reveal
        ══════════════════════════════════════ */}
        <section className="bg-white">
          {/* Dark Header Strip */}
          <div className="py-8 bg-primary">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                {t('eventsPage.heroTitle')}
              </h2>
            </div>
          </div>

          {/* Events Content */}
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16 md:py-24">
            {isLoadingEvents ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* ✦ STAGGERED Events List */}
                <StaggerReveal direction="left">
                  {events.map((event) => (
                    <StaggerItem key={event._id} direction="left" className="border-b border-border-light pb-8 last:border-0">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                        <div className="md:w-32 flex-shrink-0">
                          <p className="text-accent font-bold text-lg">
                            {formatDate(event.eventDate)}
                          </p>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {event.eventName}
                          </h3>
                          <p className="text-text-muted text-sm mb-4 flex items-center">
                            <MapPin size={14} className="mr-2" /> {event.location}
                          </p>
                          <Link
                            to="/news?tab=events"
                            className="inline-block px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider rounded-none"
                          >
                            {t('eventsPage.btnLearnMore')}
                          </Link>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>

                {/* Featured Event Image */}
                <AnimatedElement direction="right" delay={200} className="h-full hidden lg:block">
                  <div className="relative h-full min-h-[400px] rounded-none overflow-hidden shadow-2xl group border border-border-light bg-white">
                    <Image
                      src={
                        events[0]?.eventImage ||
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop'
                      }
                      alt="Featured Event"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                  </div>
                </AnimatedElement>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted">No upcoming events.</div>
            )}
          </div>
        </section>

        {/* OUR SERVICES PRODUCTS SECTION */}

        {/* ⚡ LAZY: SELL ASSET CTA */}
        <Suspense fallback={<div className="h-64 bg-primary" />}>
          <SellAssetCTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
