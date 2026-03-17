import React from 'react';
import { Wrench, Zap, Settings, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function TechnicalAssistancePage() {
  const services = [
    {
      icon: Wrench,
      title: 'Troubleshooting Support',
      description: 'Expert diagnosis and resolution of machinery issues to get your production back on track quickly.'
    },
    {
      icon: Settings,
      title: 'Machine Evaluation',
      description: 'Comprehensive assessment of your equipment condition, performance, and optimization opportunities.'
    },
    {
      icon: Zap,
      title: 'Maintenance Coordination',
      description: 'Professional maintenance planning and coordination to ensure optimal machinery performance.'
    },
    {
      icon: TrendingUp,
      title: 'Revamping Support',
      description: 'Technical guidance and support for equipment improvement and upgrading projects.'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Technical Assistance
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Expert technical support for metal packaging machinery optimization and maintenance
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Maximize Your Equipment Performance
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our technical assistance services are designed to help you optimize your metal packaging machinery and maintain peak production efficiency. Whether you're facing equipment challenges or planning upgrades, our experienced team provides comprehensive technical support.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We combine deep technical expertise with practical problem-solving to ensure your production runs smoothly and efficiently.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_bb527cba8c2b4e2dbc7e494ccfff2925~mv2.png?originWidth=896&originHeight=640"
                  alt="Metal packaging technical service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Our Technical Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Troubleshooting & Diagnostics',
                  items: [
                    'Equipment malfunction diagnosis',
                    'Root cause analysis',
                    'Quick resolution strategies',
                    'Preventive measures'
                  ]
                },
                {
                  title: 'Machine Evaluation',
                  items: [
                    'Performance assessment',
                    'Condition evaluation',
                    'Efficiency analysis',
                    'Upgrade recommendations'
                  ]
                },
                {
                  title: 'Maintenance Coordination',
                  items: [
                    'Maintenance planning',
                    'Schedule optimization',
                    'Parts coordination',
                    'Downtime minimization'
                  ]
                },
                {
                  title: 'Revamping Support',
                  items: [
                    'Equipment modernization',
                    'Capacity enhancement',
                    'Technology upgrades',
                    'Performance improvement'
                  ]
                }
              ].map((section, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-6">
                  <h3 className="text-xl font-heading font-bold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Need Technical Support?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact our technical team to discuss your machinery needs and how we can help optimize your production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
              >
                Contact Us
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
              >
                Request Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
