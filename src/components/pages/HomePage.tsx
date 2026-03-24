// WI-HPI
import CorporateMarquee from '@/components/CorporateMarquee';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OurServicesSection from '@/components/OurServicesSection';
import OurServicesProducts from '@/components/OurServicesProducts';
import PremiumCTASection from '@/components/PremiumCTASection';
import SplitLayoutSection from '@/components/SplitLayoutSection';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { IndustryEvents, NewsandUpdates, ProductSolutions } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Animation Components ---

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
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsandUpdates[]>([]);
  const [events, setEvents] = useState<IndustryEvents[]>([]);
  const [products, setProducts] = useState<ProductSolutions[]>([]);

  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes, productsRes] = await Promise.all([
          BaseCrudService.getAll<NewsandUpdates>('news', [], { limit: 5 }),
          BaseCrudService.getAll<IndustryEvents>('events', [], { limit: 3 }),
          BaseCrudService.getAll<ProductSolutions>('productsolutions', [], { limit: 8 })
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
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary selection:bg-accent selection:text-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden flex items-center min-h-screen pt-16 xs:pt-18 sm:pt-20 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: 'url(https://static.wixstatic.com/media/9bbed2_7beb404c5dec4a3c84cf9c1b13aa551e~mv2.png)',
          backgroundAttachment: 'fixed'
        }}>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-primary/60" />
          </div>

         {/* Hero Content */}
         <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 relative z-10 w-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
             <AnimatedElement direction="left" className="max-w-2xl">
               <div>
                 <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 xs:mb-5 sm:mb-6 leading-tight tracking-tight">
                   Industrial Solutions for Metal Packaging
                 </h1>
                 <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 mb-6 xs:mb-7 sm:mb-8 leading-relaxed">
                   Machinery, spare parts, technical assistance, and material trading for the global metal packaging industry.
                 </p>
                 <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                   <Link
                     to="/request-quotation"
                     className="px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 bg-accent text-white font-semibold uppercase tracking-wider hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:scale-105 text-center text-xs xs:text-sm sm:text-base rounded-none"
                   >
                     Request Quotation
                   </Link>
                   <Link
                     to="/contact"
                     className="px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-200 text-center text-xs xs:text-sm sm:text-base rounded-none"
                   >
                     Contact Us
                   </Link>
                 </div>
               </div>
             </AnimatedElement>

             {/* Hero Image */}
             <AnimatedElement direction="right" delay={200} className="hidden lg:block" children={''}>

             </AnimatedElement>
           </div>
         </div>

         {/* Scroll Down Indicator */}
         <button
           onClick={scrollToContent}
           className="absolute bottom-6 xs:bottom-7 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 z-20 group"
           aria-label="Scroll to content"
         >
           <ChevronDown size={32} className="xs:size-[40px] animate-bounce group-hover:scale-110 transition-transform" strokeWidth={1.5} />
         </button>
       </section>
        {/* CORPORATE MARQUEE - Below Hero */}
        <CorporateMarquee />
        {/* SPLIT LAYOUT SECTION */}
        <SplitLayoutSection />
        {/* OUR SERVICES SECTION */}
        <OurServicesSection />
        {/* SERVICES OVERVIEW SECTION */}
        {/* INDUSTRIES SECTION */}

        {/* PREMIUM CTA SECTION */}
        <PremiumCTASection />
        {/* LATEST NEWS SECTION */}
        <section className="py-12 xs:py-16 sm:py-20 md:py-32 bg-background-alt">
          <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-10 xs:mb-12 sm:mb-16">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3 xs:mb-4">
                  Latest News & Updates
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
                  Stay informed about industry trends and company updates
                </p>
              </div>
            </AnimatedElement>

            {isLoadingNews ? (
              <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Featured News (Left) */}
                <div className="lg:col-span-7">
                  <AnimatedElement direction="up" delay={100} className="h-full">
                    <Link to={`/news`} className="group block h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-border-light">
                      <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                        {news[0].coverImage ? (
                          <Image
                            src={news[0].coverImage}
                            alt={news[0].headline || 'News'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-heading font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                          {news[0].headline}
                        </h3>
                        <p className="text-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">
                          {news[0].content}
                        </p>
                        <span className="text-accent text-sm font-semibold flex items-center group-hover:translate-x-2 transition-transform duration-300">
                          Read more <ArrowRight size={16} className="ml-2" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedElement>
                </div>

                {/* News List (Right) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {news.slice(1, 5).map((item, idx) => (
                    <AnimatedElement key={item._id} direction="up" delay={200 + (idx * 100)}>
                      <Link to={`/news`} className="group flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[120px] border border-border-light">
                        <div className="w-1/3 relative overflow-hidden bg-gray-200 flex-shrink-0">
                          {item.coverImage ? (
                            <Image
                              src={item.coverImage}
                              alt={item.headline || 'News'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
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
                    </AnimatedElement>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted">No news available.</div>
            )}

            <AnimatedElement delay={400} className="mt-12 flex justify-center">
              <button
                onClick={() => navigate('/news')}
                className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-none"
              >
                View All News
              </button>
            </AnimatedElement>
          </div>
        </section>
        {/* EVENTS SECTION */}
        <section className="bg-white">
          {/* Dark Header Strip */}
          <div className="py-8 bg-[#031742ff]">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                Upcoming Events
              </h2>
            </div>
          </div>

          {/* Events Content */}
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16 md:py-24">
            {isLoadingEvents ? (
              <div className="flex justify-center py-12"><LoadingSpinner /></div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Events List */}
                <div className="space-y-8">
                  {events.map((event, idx) => (
                    <AnimatedElement key={event._id} direction="left" delay={idx * 100}>
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-b border-border-light pb-8 last:border-0">
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
                            to={`/events`}
                            className="inline-block px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider rounded-none"
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>

                {/* Featured Event Image */}
                <AnimatedElement direction="right" delay={200} className="h-full hidden lg:block">
                  <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl group border border-border-light">
                    <Image
                      src={events[0]?.eventImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"}
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
        <OurServicesProducts />
        {/* VISION & PROTECTION SECTION */}
        {/* TRADING MATERIALS FEATURED SECTION */}
        {/* MPH HIGHLIGHTS SECTION - FULL WIDTH */}
        <section className="relative w-full min-h-screen md:min-h-auto py-16 md:py-24 lg:py-32 bg-primary-dark text-white overflow-hidden">
          {/* Watermark MPH Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden bg-primary">
            <div className="absolute right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 top-1/2 -translate-y-1/2 text-[12rem] md:text-[25rem] lg:text-[30rem] font-black font-sans opacity-5 leading-none whitespace-nowrap pointer-events-none">
  MPH
</div>
          </div>

          <div className="relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 min-h-full">
              {/* LEFT COLUMN - MAIN CONTENT */}
              <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-24 flex flex-col justify-center space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 w-fit">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                    <div className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
</div>
                    <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white">
                      Coming Soon — New Digital Platform
                    </span>
                  </div>
                </div>

                {/* Subtitle with line */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gray-500" />
                  <span className="text-sm md:text-base font-medium uppercase tracking-widest text-gray-400">
                    The Future of the Sector
                  </span>
                </div>

                {/* Main Title */}
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight text-white">
                    Introducing MPH
                  </h2>
                  <p className="text-xl md:text-2xl font-heading font-semibold text-gray-400">
                    Metal Packaging Hub
                  </p>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
                  A dedicated platform for the global metal packaging industry. One stop. The entire supply chain. Machinery, spare parts, and materials worldwide.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {['Machinery Marketplace', 'Spare Parts Network', 'Material Trading', 'Global Suppliers'].map((tag, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 border border-white/20 text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-white/40 transition-colors duration-300 rounded-none"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border border-white/40 rounded-none text-white font-semibold uppercase tracking-wider text-sm md:text-base hover:border-white hover:bg-white/5 transition-all duration-300">
                    Register Your Interest
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN - FEATURES LIST */}
              <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-24 flex flex-col justify-center space-y-0 relative z-20">
                {[
                  {
                    number: '01',
                    title: 'Peak & Complete Machinery',
                    description: 'Industry-leading equipment and complete packaging machinery from global suppliers'
                  },
                  {
                    number: '02',
                    title: 'Source Quality Parts & Spares',
                    description: 'Genuine replacement parts and spare components for all major packaging equipment'
                  },
                  {
                    number: '03',
                    title: 'Trade Materials & Aluminum',
                    description: 'Premium raw materials and aluminum sourcing for metal packaging production'
                  },
                  {
                    number: '04',
                    title: 'Verified Supplier Directory',
                    description: 'Trusted network of verified suppliers and manufacturers in the metal packaging industry'
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`py-6 md:py-8 ${idx !== 3 ? 'border-b border-white/10' : ''}`}>
                    <div className="flex gap-4 md:gap-6">
                      <span className="text-2xl md:text-3xl font-black text-gray-500 flex-shrink-0 min-w-fit">
                        {item.number}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-heading font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
