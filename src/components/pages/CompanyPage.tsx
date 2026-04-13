import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { Subsidiaries } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Building2, Globe, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

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

// Technical Diagram Component with Parallax
const TechnicalDiagram: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full max-w-sm"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Gear - Main Component */}
        <g transform="translate(150, 150)">
          {/* Outer gear teeth */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = Math.cos(angle) * 60;
            const y1 = Math.sin(angle) * 60;
            const x2 = Math.cos(angle) * 80;
            const y2 = Math.sin(angle) * 80;
            return (
              <line
                key={`tooth-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#C41230"
                strokeWidth="3"
                opacity="0.8"
              />
            );
          })}
          {/* Main circle */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#C41230" strokeWidth="2" opacity="0.6" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#C41230" strokeWidth="1.5" opacity="0.4" />
          <circle cx="0" cy="0" r="15" fill="#C41230" opacity="0.3" />
        </g>

        {/* Production Line Elements */}
        <g>
          {/* Left press */}
          <rect x="20" y="120" width="40" height="60" fill="none" stroke="#C41230" strokeWidth="2" opacity="0.7" />
          <line x1="30" y1="120" x2="30" y2="100" stroke="#C41230" strokeWidth="1.5" opacity="0.5" />
          <line x1="50" y1="120" x2="50" y2="100" stroke="#C41230" strokeWidth="1.5" opacity="0.5" />

          {/* Connection lines */}
          <line x1="60" y1="150" x2="110" y2="150" stroke="#C41230" strokeWidth="1" opacity="0.4" strokeDasharray="5,5" />
          <line x1="190" y1="150" x2="240" y2="150" stroke="#C41230" strokeWidth="1" opacity="0.4" strokeDasharray="5,5" />

          {/* Right component */}
          <rect x="240" y="130" width="35" height="40" fill="none" stroke="#C41230" strokeWidth="2" opacity="0.7" />
          <circle cx="257.5" cy="150" r="8" fill="none" stroke="#C41230" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Performance indicators */}
        <g>
          {/* Efficiency bar */}
          <rect x="20" y="30" width="80" height="6" fill="none" stroke="#C41230" strokeWidth="1" opacity="0.4" />
          <rect x="20" y="30" width="64" height="6" fill="#C41230" opacity="0.5" />
          <text x="20" y="20" fontSize="10" fill="#C41230" opacity="0.7">{t('aboutPage.ex1T')}</text>

          {/* Accuracy bar */}
          <rect x="200" y="30" width="80" height="6" fill="none" stroke="#C41230" strokeWidth="1" opacity="0.4" />
          <rect x="200" y="30" width="76" height="6" fill="#C41230" opacity="0.5" />
          <text x="200" y="20" fontSize="10" fill="#C41230" opacity="0.7">{t('aboutPage.cv1T')}</text>
        </g>
      </svg>

      {/* Pulsing radar effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-32 h-32 rounded-full border border-accent opacity-20 animate-pulse" />
        <div className="absolute w-48 h-48 rounded-full border border-accent opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

// Performance Indicator Component
const PerformanceIndicator: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center">
        <svg className="absolute w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="#C41230"
            strokeWidth="2"
            strokeDasharray={`${(value / 100) * 276} 276`}
            opacity="0.8"
          />
        </svg>
        <span className="text-lg font-bold text-accent">{value}%</span>
      </div>
      <span className="text-xs font-mono text-accent/70 uppercase">{label}</span>
    </div>
  );
};

export default function CompanyPage() {
  const { t } = useTranslation();
  const [subsidiaries, setSubsidiaries] = useState<Subsidiaries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubsidiaries();
  }, []);

  const loadSubsidiaries = async () => {
    try {
      const result = await BaseCrudService.getAll<Subsidiaries>('subsidiaries', [], { limit: 50 });
      setSubsidiaries(result.items);
    } catch (error) {
      console.error('Failed to load subsidiaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-paragraph">
      <Header />
      {/* Italian Flag Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-white to-[#C41230]" />

      {/* Hero Section with Technical Diagram */}
      <section className="relative pt-32 pb-48 md:pt-40 md:pb-60 bg-[#001F5F] overflow-hidden text-left">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent blur-[160px] rounded-full opacity-20" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border border-accent/20">
                Corporate Legacy
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-8 tracking-tighter leading-[0.95]">
                {t('companyPage.heroTitle')}
              </h1>
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-blue-100 text-lg leading-relaxed mb-6">{t('companyPage.p1')}</p>
                <p className="text-blue-200 text-lg leading-relaxed">{t('companyPage.p2')}</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200} className="hidden lg:block">
              <TechnicalDiagram />
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="relative -mt-24 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 shadow-2xl bg-white border border-gray-100">
            <AchievementBox value="30+" label={t('companyPage.ach1A')} delay={100} />
            <AchievementBox value="350+" label={t('companyPage.ach2A')} delay={200} />
            <AchievementBox value={t('companyPage.ach3V')} label={t('companyPage.ach3A')} delay={300} />
            <AchievementBox value={t('companyPage.ach4V')} label={t('companyPage.ach4A')} delay={400} />
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 text-left">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-accent uppercase tracking-[0.3em] block mb-4">Organizational Map</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-primary uppercase tracking-tighter leading-none mb-6">
                {t('companyPage.subTitle')}
              </h2>
              <div className="h-1 w-24 bg-accent" />
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
              {t('companyPage.subDesc')}
            </p>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? null : subsidiaries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {subsidiaries.map((subsidiary, index) => (
                  <AnimatedElement key={subsidiary._id} delay={index * 50}>
                    <div className="group bg-gray-50 p-8 rounded-none border border-transparent hover:border-accent hover:bg-white transition-all duration-500 text-left">
                      {subsidiary.logo && (
                        <div className="mb-8 h-12 flex items-center grayscale group-hover:grayscale-0 transition-all duration-500">
                          <Image
                            src={subsidiary.logo}
                            alt={subsidiary.subsidiaryName || 'Subsidiary logo'}
                            className="max-h-full w-auto object-contain"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-heading font-black text-primary mb-4 uppercase tracking-tighter group-hover:text-accent transition-colors">
                        {subsidiary.subsidiaryName}
                      </h3>

                      <div className="space-y-3 mb-8">
                        {subsidiary.location && (
                          <div className="flex items-center gap-3 text-gray-400">
                            <Globe size={14} className="text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest">{subsidiary.location}</span>
                          </div>
                        )}

                        {subsidiary.foundingYear && (
                          <div className="flex items-center gap-3 text-gray-400">
                            <Calendar size={14} className="text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t('companyPage.subFounded')} {subsidiary.foundingYear}</span>
                          </div>
                        )}
                      </div>

                      {subsidiary.description && (
                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                          {subsidiary.description}
                        </p>
                      )}

                      {subsidiary.websiteLink && (
                        <a
                          href={subsidiary.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-accent transition-all"
                        >
                          {t('companyPage.subVisit')}
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-widest">
                {t('companyPage.subEmpty')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#001F5F] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter leading-none mb-8">
              {t('companyPage.comTitle')}
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            <ValueCard
              icon={Building2}
              title={t('companyPage.com1T')}
              desc={t('companyPage.com1D')}
              delay={100}
            />
            <ValueCard
              icon={Globe}
              title={t('companyPage.com2T')}
              desc={t('companyPage.com2D')}
              delay={200}
              className="border-y md:border-y-0 md:border-x border-white/10"
            />
            <ValueCard
              icon={Calendar}
              title={t('companyPage.com3T')}
              desc={t('companyPage.com3D')}
              delay={300}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const AchievementBox = ({ value, label, delay }: { value: string, label: string, delay: number }) => (
  <AnimatedElement delay={delay} className="p-10 text-center border-r border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-500">
    <div className="text-4xl md:text-5xl font-heading font-black text-accent mb-4 tracking-tighter uppercase">{value}</div>
    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 leading-relaxed">{label}</p>
  </AnimatedElement>
);

const ValueCard = ({ icon: Icon, title, desc, delay, className = "" }: { icon: any, title: string, desc: string, delay: number, className?: string }) => (
  <AnimatedElement delay={delay} className={`p-12 text-center group hover:bg-white/5 transition-all duration-500 ${className}`}>
    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon className="text-accent" size={32} />
    </div>
    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 group-hover:text-accent transition-colors">
      {title}
    </h3>
    <p className="text-blue-200 text-sm leading-relaxed font-medium">
      {desc}
    </p>
  </AnimatedElement>
);


