import React from 'react';
import { Boxes, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function TradingMaterialsPage() {
  const materials = [
    {
      title: 'Tinplate',
      description: 'High-quality tinplate materials for metal packaging production. Available in various gauges and specifications for food and beverage containers.'
    },
    {
      title: 'Aluminum',
      description: 'Premium aluminum materials for lightweight and durable metal packaging solutions. Ideal for beverage cans and specialty containers.'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Supply',
      description: 'Access to quality materials from reliable suppliers worldwide.'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Pricing',
      description: 'Competitive rates on bulk orders with flexible payment terms.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'All materials verified for quality and specifications.'
    },
    {
      icon: Boxes,
      title: 'Flexible Orders',
      description: 'Flexible order quantities to match your production needs.'
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
              Trading Materials
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Tinplate and aluminum trading for metal packaging production
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Quality Materials for Metal Packaging
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We provide direct access to quality tinplate and aluminum materials used in metal packaging production. Our trading operations connect manufacturers with reliable suppliers, ensuring consistent supply of materials that meet industry standards.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you need tinplate for food and beverage cans or aluminum for lightweight packaging solutions, we offer competitive pricing and flexible order quantities to support your production needs.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_ac665dcfa3f44e65887a6f85e57da040~mv2.png?originWidth=1152&originHeight=896"
                  alt="Tinplate and aluminum trading"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Materials We Trade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {materials.map((material, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">{material.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{material.description}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Various gauges and specifications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Quality verified materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Flexible order quantities</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Why Choose Soprani Engineering for Materials Trading?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="bg-gray-50 p-8 rounded-lg text-center">
                    <Icon className="w-10 h-10 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Our Trading Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Material Sourcing',
                  description: 'Direct sourcing of tinplate and aluminum from reliable suppliers with quality assurance.'
                },
                {
                  title: 'Specification Matching',
                  description: 'Precise matching of materials to your specific production requirements and standards.'
                },
                {
                  title: 'Bulk Orders',
                  description: 'Competitive pricing on bulk orders with flexible payment and delivery terms.'
                },
                {
                  title: 'Logistics Support',
                  description: 'Efficient logistics and delivery coordination to ensure timely material arrival.'
                },
                {
                  title: 'Quality Verification',
                  description: 'All materials undergo quality verification before delivery to ensure compliance.'
                },
                {
                  title: 'Technical Consultation',
                  description: 'Expert guidance on material selection and specifications for your production needs.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Looking for Quality Materials?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us for tinplate and aluminum trading opportunities. We'll help you find the right materials at competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-100 transition-all duration-300 text-sm font-medium uppercase tracking-wider rounded-sm hover:shadow-lg hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 bg-accent text-white hover:bg-accent-dark transition-all duration-300 text-sm font-medium uppercase tracking-wider rounded-sm hover:shadow-lg hover:scale-105"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
