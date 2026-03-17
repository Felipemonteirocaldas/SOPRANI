// WI-HPI
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NewsandUpdates, IndustryEvents, ProductSolutions } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        willChange: 'opacity, transform'
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
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-primary flex items-center">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#001b44] via-primary to-[#003377] opacity-90" />
            {/* Simulated 3D waves/shapes using CSS gradients and blurs */}
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[300px] bg-blue-400/20 rounded-[100%] blur-3xl transform -rotate-12" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-400/10 rounded-[100%] blur-3xl transform rotate-12" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            
            {/* Placeholder for the actual 3D render from screenshot */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
          </div>

          {/* Hero Content Box */}
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimatedElement direction="left" className="max-w-xl">
              <div className="bg-[#001b44]/95 backdrop-blur-sm p-8 md:p-10 border-l-4 border-accent shadow-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-2 tracking-tight">
                  Industrial Solutions for the Metal Packaging Industry
                </h1>
                <h2 className="text-accent text-lg md:text-xl font-medium mb-6">
                  Machinery – Spare Parts – Technical Assistance – Trading
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Your trusted partner for metal packaging machinery, spare parts, technical support, and material trading worldwide.
                </p>
              </div>
            </AnimatedElement>
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

        {/* SERVICES OVERVIEW SECTION */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
                Our Services
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { title: 'Machinery', icon: '⚙️' },
                { title: 'Spare Parts', icon: '🔧' },
                { title: 'Technical Assistance', icon: '🛠️' },
                { title: 'Revamping', icon: '🔄' },
                { title: 'Trading Materials', icon: '📦' }
              ].map((service, idx) => (
                <AnimatedElement key={idx} direction="up" delay={idx * 50}>
                  <a href={`/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="group bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors">{service.title}</h3>
                  </a>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
                Industries We Serve
              </h2>
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
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                    <p className="font-heading font-bold text-primary">{industry}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Partner with Soprani Engineering?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your metal packaging machinery, spare parts, or material trading needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-3 bg-white text-primary hover:bg-gray-100 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-sm"
                >
                  Contact Us
                </a>
                <a
                  href="/request-quotation"
                  className="px-8 py-3 border border-white text-white hover:bg-white/10 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-sm"
                >
                  Request a Quotation
                </a>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* LATEST NEWS SECTION */}
        <section className="py-20 bg-[#f4f6f9]">
          <div className="container mx-auto px-4 md:px-8">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12">
                Latest News
              </h2>
            </AnimatedElement>

            {isLoadingNews ? (
              <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Featured News (Left) */}
                <div className="lg:col-span-7">
                  <AnimatedElement direction="up" delay={100} className="h-full">
                    <Link to={`/news`} className="group block h-full bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
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
                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                          {news[0].content}
                        </p>
                        <span className="text-accent text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                          Read more <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedElement>
                </div>

                {/* News List (Right) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {news.slice(1, 5).map((item, idx) => (
                    <AnimatedElement key={item._id} direction="up" delay={200 + (idx * 100)}>
                      <Link to={`/news`} className="group flex bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[120px]">
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
                          <span className="text-accent text-xs font-medium mt-auto inline-flex items-center">
                            Read more
                          </span>
                        </div>
                      </Link>
                    </AnimatedElement>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No news available.</div>
            )}

            <AnimatedElement delay={400} className="mt-12 flex justify-center">
              <button 
                onClick={() => navigate('/news')}
                className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
              >
                more
              </button>
            </AnimatedElement>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="bg-white">
          {/* Dark Blue Header Strip */}
          <div className="bg-primary py-6">
            <div className="container mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                Events
              </h2>
            </div>
          </div>

          {/* Events Content */}
          <div className="container mx-auto px-4 md:px-8 py-16">
            {isLoadingEvents ? (
              <div className="flex justify-center py-12"><LoadingSpinner /></div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Events List */}
                <div className="space-y-8">
                  {events.map((event, idx) => (
                    <AnimatedElement key={event._id} direction="left" delay={idx * 100}>
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-b border-gray-100 pb-8 last:border-0">
                        <div className="md:w-32 flex-shrink-0">
                          <p className="text-accent font-bold text-lg">
                            {formatDate(event.eventDate)}
                          </p>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {event.eventName}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4 flex items-center">
                            <MapPin size={14} className="mr-1" /> {event.location}
                          </p>
                          <Link 
                            to={`/events`}
                            className="inline-block px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 text-xs font-medium uppercase tracking-wider"
                          >
                            more
                          </Link>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>

                {/* Featured Event Image */}
                <AnimatedElement direction="right" delay={200} className="h-full hidden lg:block">
                  <div className="relative h-full min-h-[400px] rounded-sm overflow-hidden shadow-lg group">
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
              <div className="text-center py-12 text-gray-500">No upcoming events.</div>
            )}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Our Products – Sorted by Technology
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Whatever kind of printing press you&apos;re after, we&apos;ve got the right solution and technology for you. We offer a wide range of options to make sure you find the perfect machine for your specific needs.
              </p>
            </AnimatedElement>

            {isLoadingProducts ? (
              <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((product, idx) => (
                  <AnimatedElement key={product._id} direction="up" delay={idx * 50}>
                    <div className="group flex flex-col h-full">
                      <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                        {product.solutionImage ? (
                          <Image 
                            src={product.solutionImage} 
                            alt={product.solutionName || 'Product'}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">Img</div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors">
                        {product.solutionName || product.category || 'Printing Solution'}
                      </h3>
                      <div className="mt-auto text-center">
                        <Link 
                          to={`/products`}
                          className="inline-block px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 text-xs font-medium uppercase tracking-wider"
                        >
                          Discover more
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No products available.</div>
            )}
          </div>
        </section>

        {/* VISION & PROTECTION SECTION */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedElement direction="left">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  Vision & Protection
                </h2>
                <h3 className="text-xl text-gray-600 mb-8 font-medium">
                  The Next Level of Authentication
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                  With our next-level authentication solutions, we help you to develop a new understanding of the dimensions of security. Improve the customer experience of your packaging with us, protect your products or link physical objects with the digital world. Our authentication solutions go beyond an optical quality check and together we will develop your concept to maximise the security of your products.
                </p>
                <button 
                  onClick={() => navigate('/products')}
                  className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
                >
                  Protect Your Products
                </button>
              </AnimatedElement>
              
              <AnimatedElement direction="right" delay={200} className="hidden lg:block">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl group">
                   <Image 
                      src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop" 
                      alt="Vision and Protection"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}