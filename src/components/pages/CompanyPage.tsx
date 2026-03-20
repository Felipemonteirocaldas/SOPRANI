import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { Subsidiaries } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Building2, Globe, Calendar, Zap } from 'lucide-react';
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

// Technical Diagram Component with Parallax
const TechnicalDiagram: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full h-96 flex items-center justify-center"
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
                stroke="#00ff88"
                strokeWidth="3"
                opacity="0.8"
              />
            );
          })}
          {/* Main circle */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.6" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.4" />
          <circle cx="0" cy="0" r="15" fill="#00ff88" opacity="0.3" />
        </g>

        {/* Production Line Elements */}
        <g>
          {/* Left press */}
          <rect x="20" y="120" width="40" height="60" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.7" />
          <line x1="30" y1="120" x2="30" y2="100" stroke="#00ff88" strokeWidth="1.5" opacity="0.5" />
          <line x1="50" y1="120" x2="50" y2="100" stroke="#00ff88" strokeWidth="1.5" opacity="0.5" />

          {/* Connection lines */}
          <line x1="60" y1="150" x2="110" y2="150" stroke="#00ff88" strokeWidth="1" opacity="0.4" strokeDasharray="5,5" />
          <line x1="190" y1="150" x2="240" y2="150" stroke="#00ff88" strokeWidth="1" opacity="0.4" strokeDasharray="5,5" />

          {/* Right component */}
          <rect x="240" y="130" width="35" height="40" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.7" />
          <circle cx="257.5" cy="150" r="8" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Performance indicators */}
        <g>
          {/* Efficiency bar */}
          <rect x="20" y="30" width="80" height="6" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.4" />
          <rect x="20" y="30" width="64" height="6" fill="#00ff88" opacity="0.5" />
          <text x="20" y="20" fontSize="10" fill="#00ff88" opacity="0.7">EFFICIENCY</text>

          {/* Accuracy bar */}
          <rect x="200" y="30" width="80" height="6" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.4" />
          <rect x="200" y="30" width="76" height="6" fill="#00ff88" opacity="0.5" />
          <text x="200" y="20" fontSize="10" fill="#00ff88" opacity="0.7">ACCURACY</text>
        </g>
      </svg>

      {/* Pulsing radar effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-32 h-32 rounded-full border border-[#00ff88] opacity-20 animate-pulse" />
        <div className="absolute w-48 h-48 rounded-full border border-[#00ff88] opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

// Performance Indicator Component
const PerformanceIndicator: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 rounded-full border-2 border-[#00ff88]/30 flex items-center justify-center">
        <svg className="absolute w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
            strokeDasharray={`${(value / 100) * 276} 276`}
            opacity="0.8"
          />
        </svg>
        <span className="text-lg font-bold text-[#00ff88]">{value}%</span>
      </div>
      <span className="text-xs font-mono text-[#00ff88]/70 uppercase">{label}</span>
    </div>
  );
};

export default function CompanyPage() {
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Italian Flag Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-white to-red-600" />

      {/* Command Center Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0a192f' }}>
        {/* Animated Radar/Technical Mesh Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" style={{ animation: 'pulse 8s ease-in-out infinite' }}>
            <defs>
              <pattern id="radar" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(0,255,136,0.2)" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(0,255,136,0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radar)" />
          </svg>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.15; }
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 10px rgba(0,255,136,0.5); }
            50% { text-shadow: 0 0 20px rgba(0,255,136,0.8); }
          }
        `}</style>

        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Status Badge */}
              <AnimatedElement>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/50 bg-[#00ff88]/5">
                  <Zap size={16} className="text-[#00ff88] animate-pulse" />
                  <span className="text-sm font-mono text-[#00ff88] uppercase tracking-wider">
                    SOPRANI_ENGINEERING: ACTIVE_GLOBAL_SUPPORT
                  </span>
                </div>
              </AnimatedElement>

              {/* Main Title */}
              <AnimatedElement delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                  <span className="text-white">Precision Engineering for the</span>
                  <br />
                  <span className="text-[#00ff88]" style={{ animation: 'glow 3s ease-in-out infinite' }}>
                    Global Metal Packaging
                  </span>
                  <br />
                  <span className="text-white">Industry</span>
                </h1>
              </AnimatedElement>

              {/* Supporting Text */}
              <AnimatedElement delay={200}>
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                  From machinery sourcing and revamping projects to high-precision spare parts and technical assistance, we provide the industrial expertise to keep your production lines at peak performance.
                </p>
              </AnimatedElement>

              {/* Action Buttons */}
              <AnimatedElement delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="px-8 py-3 bg-[#00ff88] text-[#0a192f] font-bold rounded-lg hover:bg-[#00ff88]/90 transition-all duration-300 uppercase tracking-wider text-sm">
                    Consult Our Engineers
                  </button>
                  <button className="px-8 py-3 border-2 border-[#00ff88] text-[#00ff88] font-bold rounded-lg hover:bg-[#00ff88]/10 transition-all duration-300 uppercase tracking-wider text-sm group relative overflow-hidden">
                    <span className="relative z-10">Request Technical Quote</span>
                    <div className="absolute inset-0 bg-[#00ff88]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </AnimatedElement>
            </div>

            {/* Right Technical Diagram */}
            <AnimatedElement delay={400}>
              <TechnicalDiagram />
            </AnimatedElement>
          </div>

          {/* Performance Indicators */}
          <AnimatedElement delay={500}>
            <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-[#00ff88]/20">
              <PerformanceIndicator label="EFFICIENCY_INDEX" value={98} />
              <PerformanceIndicator label="GLOBAL_LOGISTICS" value={95} />
              <PerformanceIndicator label="TECHNICAL_ACCURACY" value={99} />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 text-center">
                Our Legacy
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Koenig & Bauer focuses on advanced printing solutions and aims to empower clients with innovative technology. With over 30+ years in the printing industry, we offer a broad product range and are key suppliers to the global media sector.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Recent achievements include more than doubling operating EBIT and maintaining positive cash flow in a volatile environment. We continue to push the boundaries of printing technology, developing and manufacturing technologically innovative yet cost-effective printing systems and peripherals.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Key Achievements
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-5xl font-heading font-bold text-accent mb-4">30+</div>
                <p className="text-gray-700 font-medium">Years of Innovation</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-5xl font-heading font-bold text-accent mb-4">2x</div>
                <p className="text-gray-700 font-medium">Operating EBIT Growth</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={300}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-5xl font-heading font-bold text-accent mb-4">Global</div>
                <p className="text-gray-700 font-medium">Market Leader</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-5xl font-heading font-bold text-accent mb-4">Broadest</div>
                <p className="text-gray-700 font-medium">Product Range</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 text-center">
              Our Subsidiaries
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              A global network of specialized companies delivering excellence in printing technology
            </p>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoading ? null : subsidiaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subsidiaries.map((subsidiary, index) => (
                  <AnimatedElement key={subsidiary._id} delay={index * 50}>
                    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      {subsidiary.logo && (
                        <div className="mb-4 h-16 flex items-center">
                          <Image 
                            src={subsidiary.logo} 
                            alt={subsidiary.subsidiaryName || 'Subsidiary logo'}
                            className="max-h-full w-auto object-contain"
                            width={200}
                          />
                        </div>
                      )}
                      
                      <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {subsidiary.subsidiaryName}
                      </h3>
                      
                      {subsidiary.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Globe size={16} />
                          <span className="text-sm">{subsidiary.location}</span>
                        </div>
                      )}
                      
                      {subsidiary.foundingYear && (
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <Calendar size={16} />
                          <span className="text-sm">Founded {subsidiary.foundingYear}</span>
                        </div>
                      )}
                      
                      {subsidiary.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {subsidiary.description}
                        </p>
                      )}
                      
                      {subsidiary.websiteLink && (
                        <a
                          href={subsidiary.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                        >
                          Visit Website
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No subsidiaries information available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 text-center">
              Our Commitment
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Continuously developing cutting-edge printing technology for over two centuries
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">Global Reach</h3>
                <p className="text-gray-600">
                  Serving the worldwide media industry with comprehensive solutions
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={300}>
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">Excellence</h3>
                <p className="text-gray-600">
                  Delivering quality and reliability in every printing solution we create
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
