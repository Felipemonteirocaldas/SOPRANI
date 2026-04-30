import { useEffect, useState, useRef } from 'react';
import { Image } from '@/components/ui/image';
import { Calendar, User, MapPin, ExternalLink, Newspaper, CalendarDays, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useNewsPosts, useEvents } from '@/hooks/useSanity';
import { urlFor } from '@/lib/sanityClient';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
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
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'events' ? 'events' : 'news';

  const { data: news, loading: newsLoading } = useNewsPosts();
  const { data: events, loading: eventsLoading } = useEvents();
  const isLoading = newsLoading || eventsLoading;

  const setTab = (tab: 'news' | 'events') => {
    if (tab === 'news') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('tab');
      setSearchParams(newParams);
    } else {
      setSearchParams({ tab });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-44 md:pt-52 pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 uppercase tracking-tight">
              {activeTab === 'news' ? t('newsPage.heroTitle') : t('eventsPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light">
              {activeTab === 'news' ? t('newsPage.heroSub') : t('eventsPage.heroSub')}
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="bg-white border-b border-gray-100 relative z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 -mb-px">
            <button
              onClick={() => setTab('news')}
              className={cn(
                "flex items-center gap-2 py-6 px-4 text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2",
                activeTab === 'news'
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-400 hover:text-primary hover:border-gray-200"
              )}
            >
              <Newspaper size={16} />
              {t('header.news')}
            </button>
            <button
              onClick={() => setTab('events')}
              className={cn(
                "flex items-center gap-2 py-6 px-4 text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2",
                activeTab === 'events'
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-400 hover:text-primary hover:border-gray-200"
              )}
            >
              <CalendarDays size={16} />
              {t('header.events')}
            </button>
          </div>
        </div>
      </section>
      {/* News Grid - Bento Box Layout */}
      <section className="py-24 relative overflow-hidden">
        {/* Deep Parallax Background Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: -100 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" 
          />
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: 100 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" 
          />
          {/* Engineering Schematics Parallax */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-150">
              <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
              <path d="M100 400H700M400 100V700" stroke="currentColor" strokeWidth="0.5" />
              <rect x="250" y="250" width="300" height="300" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : activeTab === 'news' ? (
            news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 lg:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
                {news.map((item, index) => {
                  // Bento Grid Logic
                  const isLarge = index === 0;
                  const isWide = index === 3;
                  const isTall = index === 1;
                  
                  return (
                    <AnimatedElement 
                      key={item._id} 
                      delay={index * 50}
                      className={cn(
                        "h-full",
                        isLarge ? "md:col-span-2 md:row-span-2" : 
                        isWide ? "md:col-span-2 md:row-span-1" : 
                        isTall ? "md:col-span-1 md:row-span-2" : 
                        "md:col-span-1 md:row-span-1"
                      )}
                    >
                      <article className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full border border-gray-100">
                        {item.mainImage && (
                          <div className={cn(
                            "relative overflow-hidden",
                            isLarge || isTall ? "h-full" : "h-48"
                          )}>
                            <Image
                              src={urlFor(item.mainImage).url()}
                              alt={item.title || 'News image'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                              width={isLarge ? 1200 : 600}
                            />
                            {/* Gradient Overlay for integrated text */}
                            {(isLarge || isTall) && (
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                            )}
                          </div>
                        )}

                        <div className={cn(
                          "flex flex-col p-6 md:p-8",
                          (isLarge || isTall) ? "absolute bottom-0 left-0 right-0" : "flex-grow"
                        )}>
                          <div className={cn(
                            "flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] mb-3",
                            (isLarge || isTall) ? "text-accent/90" : "text-gray-400"
                          )}>
                            {item.publishedAt && (
                              <div className="flex items-center gap-1.5">
                                <Calendar size={10} />
                                <span>
                                  {new Date(item.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                          </div>

                          <h3 className={cn(
                            "font-heading font-black leading-tight transition-colors mb-3",
                            isLarge ? "text-2xl md:text-3xl lg:text-4xl text-white" : 
                            isTall ? "text-xl text-white" : 
                            "text-lg text-primary group-hover:text-accent"
                          )}>
                            {item.title}
                          </h3>

                          {(isLarge || isWide) && item.excerpt && (
                            <p className={cn(
                              "text-sm leading-relaxed line-clamp-2 mb-6 font-light",
                              isLarge ? "text-white/80 max-w-xl" : "text-gray-500"
                            )}>
                              {item.excerpt}
                            </p>
                          )}

                          <button className={cn(
                            "inline-flex items-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 group/btn mt-auto",
                            (isLarge || isTall) ? "text-accent hover:text-white" : "text-accent hover:text-primary"
                          )}>
                            {t('newsPage.readMore')}
                            <ArrowRight size={12} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </button>
                        </div>
                      </article>
                    </AnimatedElement>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{t('newsPage.emptyTitle')}</p>
                <p className="text-gray-400 text-xs mt-2">{t('newsPage.emptySub')}</p>
              </div>
            )
          ) : (
            // EVENTS RENDER
            events.length > 0 ? (
              <div className="max-w-5xl mx-auto space-y-8">
                {events.map((event, index) => (
                  <AnimatedElement key={event._id} delay={index * 100}>
                    <a
                      href={event.registrationUrl || '#'}
                      target={event.registrationUrl ? "_blank" : undefined}
                      rel={event.registrationUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => { if (!event.registrationUrl) e.preventDefault(); }}
                      className={`group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row h-full ${event.registrationUrl ? 'cursor-pointer' : ''}`}
                    >
                      {/* Image Section */}
                      {event.mainImage && (
                        <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-gray-100">
                          <Image
                            src={urlFor(event.mainImage).url()}
                            alt={event.title || 'Event image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            width={500}
                          />
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          {event.date && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest">
                              <Calendar size={12} />
                              <span>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                              <MapPin size={12} className="text-accent" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-heading font-black text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                          {event.title}
                        </h3>

                        {/* Booth Details removed as it's not in the basic schema but can be added back if needed */}

                        {event.description && (
                          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-light line-clamp-3">
                            {event.description}
                          </p>
                        )}

                        {event.registrationUrl && (
                          <div
                            className="inline-flex items-center gap-2 text-accent text-[11px] font-black uppercase tracking-widest hover:text-primary transition-all duration-300 self-start group/btn mt-auto"
                          >
                            {t('eventsPage.btnLearnMore')}
                            <ExternalLink size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </div>
                        )}
                      </div>
                    </a>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200">
                <CalendarDays size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{t('eventsPage.emptyTitle')}</p>
                <p className="text-gray-400 text-xs mt-2">{t('eventsPage.emptySub')}</p>
              </div>
            )
          )}
        </div>
      </section>
      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center bg-white rounded-none p-12 shadow-lg border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                {t('newsPage.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('newsPage.ctaDesc')}
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
                  placeholder={t('newsPage.placeholderEmail')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-white font-medium hover:bg-accent/90 hover:scale-105 transition-all duration-200 rounded-none"
                >
                  {t('newsPage.btnSubscribe')}
                </button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
