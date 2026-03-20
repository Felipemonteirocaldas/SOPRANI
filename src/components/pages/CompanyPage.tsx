import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { Subsidiaries } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Building2, Globe, Calendar } from 'lucide-react';
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

            <h1 className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">About SOPRANI ENGINEERING</h1>
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
