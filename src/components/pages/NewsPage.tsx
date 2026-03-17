import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { NewsandUpdates } from '@/entities';
import { Image } from '@/components/ui/image';
import { Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        transitionProperty: 'opacity, transform',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsandUpdates[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const result = await BaseCrudService.getAll<NewsandUpdates>('news', [], { limit: 50 });
      setNews(result.items);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              News & Updates
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Stay informed about our latest achievements, innovations, and industry insights
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[600px]">
            {isLoading ? null : news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, index) => (
                  <AnimatedElement key={item._id} delay={index * 50}>
                    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                      {item.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image 
                            src={item.coverImage} 
                            alt={item.headline || 'News image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={600}
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          {item.publicationDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {new Date(item.publicationDate).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          )}
                          {item.author && (
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{item.author}</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors flex-grow">
                          {item.headline}
                        </h3>
                        
                        {item.content && (
                          <p className="text-gray-600 line-clamp-3 mb-4">
                            {item.content}
                          </p>
                        )}
                        
                        <button className="text-accent font-medium text-sm hover:text-accent/80 transition-colors self-start">
                          Read more →
                        </button>
                      </div>
                    </article>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No news available at the moment.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to receive the latest news and updates from Koenig & Bauer
              </p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Newsletter subscription feature coming soon!');
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 hover:scale-105 transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
