import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { IndustryEvents } from '@/entities';
import { Image } from '@/components/ui/image';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

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

export default function EventsPage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<IndustryEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await BaseCrudService.getAll<IndustryEvents>('events', [], { limit: 50 });
      setEvents(result.items);
    } catch (error) {
      console.error('Failed to load events:', error);
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
              {t('eventsPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t('eventsPage.heroSub')}
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[600px]">
            {isLoading ? null : events.length > 0 ? (
              <div className="max-w-5xl mx-auto space-y-8">
                {events.map((event, index) => (
                  <AnimatedElement key={event._id} delay={index * 100}>
                    <div className="group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Image Section */}
                        {event.eventImage && (
                          <div className="lg:col-span-1 aspect-video lg:aspect-auto overflow-hidden">
                            <Image 
                              src={event.eventImage} 
                              alt={event.eventName || 'Event image'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                            />
                          </div>
                        )}
                        
                        {/* Content Section */}
                        <div className={`${event.eventImage ? 'lg:col-span-2' : 'lg:col-span-3'} p-8`}>
                          {event.eventDate && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-none mb-4">
                              <Calendar size={16} />
                              <span className="text-sm font-medium">
                                {new Date(event.eventDate).toLocaleDateString('en-US', { 
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                            {event.eventName}
                          </h3>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <MapPin size={18} />
                              <span className="font-medium">{event.location}</span>
                            </div>
                          )}
                          
                          {event.boothDetails && (
                            <div className="bg-gray-50 rounded-none p-4 mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-1">{t('eventsPage.boothDetails')}</p>
                              <p className="text-gray-600">{event.boothDetails}</p>
                            </div>
                          )}
                          
                          {event.description && (
                            <p className="text-gray-600 mb-6 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                          
                          {event.eventUrl && (
                            <a
                              href={event.eventUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 bg-accent text-white font-medium rounded-none hover:bg-accent/90 hover:scale-105 transition-all duration-200"
                            >
                              {t('eventsPage.btnLearnMore')}
                              <ExternalLink size={18} className="ml-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">{t('eventsPage.emptyTitle')}</p>
                <p className="text-gray-400 text-sm mt-2">{t('eventsPage.emptySub')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center bg-primary rounded-none p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {t('eventsPage.ctaTitle')}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {t('eventsPage.ctaDesc')}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-medium rounded-none hover:bg-accent/90 hover:scale-105 transition-all duration-200"
              >
                {t('eventsPage.ctaBtn')}
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
