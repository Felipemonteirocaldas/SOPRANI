import React from 'react';
import { Zap, Globe, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function MPHPage() {
  const features = [
    {
      icon: Globe,
      title: 'Global Marketplace',
      description: 'Connect with machinery suppliers, spare parts vendors, and trading partners worldwide.'
    },
    {
      icon: Users,
      title: 'Industry Network',
      description: 'Access a comprehensive network of metal packaging manufacturers and suppliers.'
    },
    {
      icon: TrendingUp,
      title: 'Business Opportunities',
      description: 'Discover new trading opportunities and partnerships in the metal packaging sector.'
    },
    {
      icon: Zap,
      title: 'Efficient Solutions',
      description: 'Streamlined processes for sourcing machinery, parts, and materials.'
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
              Metal Packaging Hub (MPH)
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              The future platform connecting machinery, spare parts, suppliers, and trading opportunities
            </p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-accent/10 border-2 border-accent p-12 rounded-lg mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Coming Soon
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The Metal Packaging Hub (MPH) is under development and will soon revolutionize how the metal packaging industry connects and conducts business.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    What is MPH?
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    The Metal Packaging Hub (MPH) is an innovative platform designed to connect all stakeholders in the metal packaging industry. It will serve as a centralized marketplace for machinery, spare parts, suppliers, and trading opportunities.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    MPH will enable manufacturers, suppliers, and traders to connect, collaborate, and conduct business more efficiently than ever before.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://static.wixstatic.com/media/9bbed2_095d1e1a9b9a462badc2a0ddd3cc28a8~mv2.png?originWidth=768&originHeight=576"
                    alt="Metal Packaging Hub"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              What MPH Will Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-lg font-heading font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Platform Capabilities */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Planned Platform Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Machinery Marketplace',
                  description: 'Browse and list machinery for sale or lease. Connect with machinery suppliers and buyers worldwide.'
                },
                {
                  title: 'Spare Parts Directory',
                  description: 'Comprehensive database of spare parts for metal packaging machinery. Easy identification and sourcing.'
                },
                {
                  title: 'Supplier Network',
                  description: 'Connect with verified suppliers of machinery, parts, and materials. Build long-term business relationships.'
                },
                {
                  title: 'Trading Platform',
                  description: 'Trade tinplate, aluminum, and other materials used in metal packaging production.'
                },
                {
                  title: 'Industry Resources',
                  description: 'Access technical documentation, industry standards, and best practices.'
                },
                {
                  title: 'Business Opportunities',
                  description: 'Discover partnerships, joint ventures, and business opportunities in the metal packaging sector.'
                }
              ].map((capability, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-6">
                  <h3 className="text-xl font-heading font-bold mb-3">{capability.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why MPH Matters */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Why the Metal Packaging Hub Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Efficiency',
                  description: 'Streamline sourcing, trading, and business operations in one centralized platform.'
                },
                {
                  title: 'Connectivity',
                  description: 'Connect with industry partners, suppliers, and buyers from around the world.'
                },
                {
                  title: 'Opportunity',
                  description: 'Discover new business opportunities and partnerships in the metal packaging sector.'
                }
              ].map((reason, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-xl font-heading font-bold mb-4">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Stay Updated on MPH Launch
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              The Metal Packaging Hub is coming soon. Contact us to learn more about this exciting new platform and how it will transform the metal packaging industry.
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
                Get More Information
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
