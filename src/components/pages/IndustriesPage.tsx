import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Food Packaging',
      description: 'Comprehensive solutions for food packaging manufacturers including cans for various food products.'
    },
    {
      title: 'Tomato Cans',
      description: 'Specialized machinery and materials for tomato paste and tomato product packaging.'
    },
    {
      title: 'Tuna Cans',
      description: 'Equipment and solutions specifically designed for tuna and seafood packaging production.'
    },
    {
      title: 'Powdered Milk Containers',
      description: 'Specialized containers and machinery for powdered milk and dairy product packaging.'
    },
    {
      title: 'Industrial Cans',
      description: 'Robust packaging solutions for industrial products and chemicals in metal containers.'
    },
    {
      title: 'Closures and Lids',
      description: 'Production equipment and materials for metal closures and lids for various container types.'
    },
    {
      title: 'Decorated Metal Packaging',
      description: 'Advanced decorating and printing solutions for branded and decorated metal packaging.'
    },
    {
      title: 'Beverage Cans',
      description: 'Complete solutions for beverage can production including aluminum and tinplate options.'
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
              Industries We Serve
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Comprehensive solutions for metal packaging manufacturers across diverse industries
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Serving Global Metal Packaging Industries
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Soprani Engineering serves a diverse range of metal packaging industries worldwide. Our expertise spans from food and beverage packaging to industrial containers, with specialized knowledge in each sector's unique requirements.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're producing food cans, beverage containers, or specialized industrial packaging, we have the machinery, spare parts, and technical expertise to support your operations.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_f08f2dc238c742ea8773ab0f4e5fd930~mv2.png?originWidth=896&originHeight=640"
                  alt="Metal packaging industries"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Industries We Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry, idx) => (
                <div key={idx} className="bg-white p-8 rounded-none shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-heading font-bold mb-4 text-primary">{industry.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Our Industry Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Food & Beverage',
                  items: [
                    'Tomato paste and sauce cans',
                    'Tuna and seafood packaging',
                    'Powdered milk containers',
                    'Beverage cans (aluminum and tinplate)',
                    'General food packaging solutions'
                  ]
                },
                {
                  title: 'Specialized Packaging',
                  items: [
                    'Industrial containers',
                    'Chemical packaging',
                    'Closures and lids production',
                    'Decorated metal packaging',
                    'Custom container solutions'
                  ]
                },
                {
                  title: 'Production Support',
                  items: [
                    'Machinery sourcing and supply',
                    'Spare parts identification',
                    'Technical assistance',
                    'Equipment revamping',
                    'Material trading'
                  ]
                },
                {
                  title: 'Geographic Coverage',
                  items: [
                    'Europe',
                    'Middle East',
                    'North Africa',
                    'Asia',
                    'Americas'
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
              Let's Discuss Your Industry Needs
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us to discuss how Soprani Engineering can support your metal packaging operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                Contact Us
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                Request Information
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
