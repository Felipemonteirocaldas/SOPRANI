// WI-HPI
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CorporateMarquee from '@/components/CorporateMarquee';
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
         <section className="relative w-full overflow-hidden flex items-center min-h-screen pt-20 bg-cover bg-center bg-no-repeat" style={{
           backgroundImage: 'url(https://static.wixstatic.com/media/9bbed2_7beb404c5dec4a3c84cf9c1b13aa551e~mv2.png)',
           backgroundAttachment: 'fixed'
         }}>
           {/* Overlay for text readability */}
           <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-primary/60" />
           </div>

          {/* Hero Content */}
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedElement direction="left" className="max-w-2xl">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight">
                    Industrial Solutions for Metal Packaging
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    Machinery, spare parts, technical assistance, and material trading for the global metal packaging industry.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/request-quotation"
                      className="px-8 py-4 bg-accent text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:scale-105 text-center"
                    >
                      Request Quote
                    </Link>
                    <Link
                      to="/contact"
                      className="px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-white hover:text-primary transition-all duration-200 text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </AnimatedElement>

              {/* Hero Image */}
              <AnimatedElement direction="right" delay={200} className="hidden lg:block">

              </AnimatedElement>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 z-20 group"
            aria-label="Scroll to content"
          >
            <ChevronDown size={40} className="animate-bounce group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </button>
        </section>

        {/* CORPORATE MARQUEE - Below Hero */}
        <CorporateMarquee />

        {/* SERVICES OVERVIEW SECTION */}
        <section className="py-20 md:py-32 bg-background-alt">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                  Our Core Services
                </h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
                  Complete solutions for metal packaging machinery and materials
                </p>
              </div>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: 'Machinery', icon: '⚙️', desc: 'Advanced packaging equipment' },
                { title: 'Spare Parts', icon: '🔧', desc: 'Quality replacement parts' },
                { title: 'Technical Assistance', icon: '🛠️', desc: 'Expert support & maintenance' },
                { title: 'Revamping', icon: '🔄', desc: 'Equipment modernization' },
                { title: 'Trading Materials', icon: '📦', desc: 'Raw materials supply' }
              ].map((service, idx) => (
                <AnimatedElement key={idx} direction="up" delay={idx * 50}>
                  <Link to={`/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="group bg-white p-8 rounded-xl text-center transition-all duration-300 hover:border-accent hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer">
                    <div className="text-5xl mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                    <p className="text-sm text-text-muted group-hover:text-primary transition-colors duration-300">{service.desc}</p>
                  </Link>
                </AnimatedElement>
              ))}
            </div>

            {/* Services CTA Section */}
            <AnimatedElement delay={300} className="mt-16 md:mt-20">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                <Link
                  to="/contact"
                  className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg hover:border-primary"
                  aria-label="Contact Us"
                >
                  Contact Us
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-3 bg-accent text-white hover:bg-accent-dark transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg hover:shadow-lg hover:scale-105"
                  aria-label="Request a Quotation"
                >
                  Request a Quotation
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                  Industries We Serve
                </h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
                  Trusted by leading manufacturers across the metal packaging sector
                </p>
              </div>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Food Cans',
                'Beverage Cans',
                'Industrial Containers',
                'Lids & Ends Production',
                'Metal Decorating',
                'Tomato Cans',
                'Tuna Cans',
                'Powdered Milk Containers'
              ].map((industry, idx) => (
                <AnimatedElement key={idx} direction="up" delay={idx * 30}>
                  <div className="bg-background-alt p-8 rounded-xl text-center border border-border-light hover:border-accent hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <p className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">{industry}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 md:py-32 bg-gradient-dark text-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                Ready to Partner with Soprani Engineering?
              </h2>
              <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                Contact us today to discuss your metal packaging machinery, spare parts, or material trading needs. Our expert team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg hover:shadow-lg hover:scale-105"
                >
                  Contact Us
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg hover:shadow-lg hover:scale-105"
                >
                  Request a Quotation
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* LATEST NEWS SECTION */}
        <section className="py-20 md:py-32 bg-background-alt">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <AnimatedElement>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                  Latest News & Updates
                </h2>
                <p className="text-lg text-text-muted max-w-2xl mx-auto">
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
                className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg"
              >
                View All News
              </button>
            </AnimatedElement>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="bg-white">
          {/* Dark Header Strip */}
          <div className="bg-gradient-dark py-8">
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
                            className="inline-block px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider rounded-lg"
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

        {/* PRODUCTS SECTION */}
        <section className="py-24 bg-background-alt border-t border-border-light">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
                Our Product Solutions
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Comprehensive range of metal packaging solutions tailored to your industry needs. From machinery to spare parts, we deliver excellence.
              </p>
            </AnimatedElement>

            {isLoadingProducts ? (
              <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, idx) => (
                  <AnimatedElement key={product._id} direction="up" delay={idx * 50}>
                    <div className="group flex flex-col h-full">
                      <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-white flex items-center justify-center p-4 rounded-xl border border-border-light group-hover:border-accent transition-colors">
                        {product.solutionImage ? (
                          <Image
                            src={product.solutionImage}
                            alt={product.solutionName || 'Product'}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-background-alt rounded-full flex items-center justify-center text-text-muted">Img</div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors">
                        {product.solutionName || product.category || 'Product Solution'}
                      </h3>
                      <div className="mt-auto text-center">
                        <Link
                          to={`/products`}
                          className="inline-block px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider rounded-lg"
                        >
                          Discover More
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted">No products available.</div>
            )}
          </div>
        </section>

        {/* VISION & PROTECTION SECTION */}
        <section className="py-24 bg-white border-t border-border-light">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedElement direction="left">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                    Why Choose Soprani?
                  </h2>
                  <h3 className="text-xl text-accent font-semibold mb-8">
                    Decades of Expertise & Innovation
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed mb-8">
                    With our comprehensive range of metal packaging solutions, we help manufacturers worldwide optimize their production processes. From cutting-edge machinery to reliable spare parts and expert technical support, we deliver the quality and reliability you need to stay competitive.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-4">✓</span>
                      <span className="text-text-muted">Global network of subsidiaries and partners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-4">✓</span>
                      <span className="text-text-muted">24/7 technical support and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-4">✓</span>
                      <span className="text-text-muted">Genuine spare parts and materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-4">✓</span>
                      <span className="text-text-muted">Custom solutions for your specific needs</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate('/about')}
                    className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Learn More About Us
                  </button>
                </div>
              </AnimatedElement>

              <AnimatedElement direction="right" delay={200} className="hidden lg:block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl group border border-border-light">
                   <Image
                     src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop"
                     alt="Industrial Excellence"
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* MPH HIGHLIGHTS SECTION */}
        <section className="py-20 md:py-32 bg-gradient-dark text-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <AnimatedElement direction="left">
                <div>
                  <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                    Introducing MPH
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                    Metal Packaging Hub
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    A dedicated platform for the global metal packaging industry. One stop. The entire supply chain. Machinery, spare parts, and materials worldwide.
                  </p>
                </div>
              </AnimatedElement>

              {/* Right Content - Cards */}
              <div className="space-y-6">
                {[
                  {
                    title: 'Peak & Complete Machinery',
                    description: 'Industry-leading equipment and complete packaging machinery from global suppliers'
                  },
                  {
                    title: 'Source Quality Parts & Spares',
                    description: 'Genuine replacement parts and spare components for all major packaging equipment'
                  },
                  {
                    title: 'Trade Materials & Aluminum',
                    description: 'Premium raw materials and aluminum sourcing for metal packaging production'
                  }
                ].map((item, idx) => (
                  <AnimatedElement key={idx} direction="right" delay={100 + (idx * 100)}>
                    <div className="flex gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent text-primary font-bold text-lg md:text-xl">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg md:text-xl font-heading font-bold mb-2 text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <AnimatedElement delay={400} className="mt-12 md:mt-16">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/mph"
                  className="px-8 py-4 bg-accent text-primary font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:scale-105 text-center text-sm md:text-base"
                >
                  Explore MPH
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-white hover:text-primary transition-all duration-300 text-center text-sm md:text-base"
                >
                  Request Quote
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
