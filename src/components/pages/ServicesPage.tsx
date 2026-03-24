import React from 'react';
import { Wrench, Package, Zap, RefreshCw, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const services = [
    {
      icon: Wrench,
      title: 'Used Machinery Support',
      description: 'Expert sourcing and support for industrial machinery used in metal packaging production. We help you find the right equipment for your specific manufacturing needs.',
      details: [
        'Machinery identification and sourcing',
        'Equipment evaluation and assessment',
        'Installation support and commissioning',
        'Competitive pricing and flexible terms'
      ]
    },
    {
      icon: Package,
      title: 'Spare Parts',
      description: 'Comprehensive identification and supply of spare parts for machinery. Minimize production downtime with our reliable spare parts sourcing network.',
      details: [
        'Parts identification and sourcing',
        'Difficult component sourcing',
        'Quality assurance and verification',
        'Fast delivery and logistics support'
      ]
    },
    {
      icon: Zap,
      title: 'Technical Assistance',
      description: 'Professional technical support including troubleshooting, machine evaluation, and maintenance coordination for optimal production performance.',
      details: [
        'Machine troubleshooting and diagnostics',
        'Equipment evaluation and optimization',
        'Maintenance coordination',
        'Performance improvement recommendations'
      ]
    },
    {
      icon: RefreshCw,
      title: 'Revamping',
      description: 'Equipment improvement and upgrading services to enhance your production capabilities and extend machinery lifespan.',
      details: [
        'Equipment modernization',
        'Performance enhancement',
        'Capacity improvement',
        'Cost-effective upgrades'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Trading Materials',
      description: 'Trading opportunities in tinplate and aluminum materials used in metal packaging production. Direct access to quality materials at competitive prices.',
      details: [
        'Tinplate supply and trading',
        'Aluminum material sourcing',
        'Quality material verification',
        'Flexible order quantities'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-white py-20 md:py-32 bg-primary">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Comprehensive solutions for metal packaging manufacturers worldwide
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-6 md:gap-12">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={idx} 
                    className="w-full py-6 md:py-12 md:pb-12 md:border-b md:border-gray-100 md:last:border-0 md:last:pb-0 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-start md:items-center">
                      <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-4">
                          <Icon className="w-8 md:w-10 h-8 md:h-10 text-accent flex-shrink-0 mt-0.5" />
                          <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold leading-snug md:leading-normal hyphens-none break-words">
                            {service.title}
                          </h2>
                        </div>
                        <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2 md:space-y-3">
                          {service.details.map((detail, didx) => (
                            <li key={didx} className="flex items-start gap-3">
                              <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm md:text-base text-gray-600 leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg w-full">
                          <Image
                            src={idx === 1 ? "https://static.wixstatic.com/media/9bbed2_533f9b5dfec8440094d221e0017e77b2~mv2.png" : "https://static.wixstatic.com/media/9bbed2_de826db4f57b45ceab4bd63871418080~mv2.png?originWidth=768&originHeight=576"}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Optimize Your Operations?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how our services can support your metal packaging business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                Contact Us
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                Request a Quotation
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
