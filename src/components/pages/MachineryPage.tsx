import React from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function MachineryPage() {
  const machineryCategories = [
    {
      title: 'Welding Machines',
      description: 'Advanced welding equipment for metal packaging production with precision and reliability.'
    },
    {
      title: 'Can-Making Lines',
      description: 'Complete production lines for manufacturing cans with high efficiency and output.'
    },
    {
      title: 'Presses',
      description: 'Industrial presses for metal forming and shaping in packaging production.'
    },
    {
      title: 'Decorating Lines',
      description: 'Specialized equipment for decorating and printing on metal packaging.'
    },
    {
      title: 'Coating Systems',
      description: 'Advanced coating and finishing systems for metal packaging protection and aesthetics.'
    },
    {
      title: 'Handling Equipment',
      description: 'Material handling and conveyor systems for efficient production workflows.'
    },
    {
      title: 'Inspection Systems',
      description: 'Quality control and inspection equipment for packaging verification.'
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
              Metal Packaging Machinery
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Comprehensive machinery solutions for can making and metal packaging production
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Industrial Machinery for Metal Packaging
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We specialize in sourcing and supplying machinery used in metal packaging production. Whether you're looking for complete production lines or specific equipment, our extensive network and expertise ensure you find the right solution for your manufacturing needs.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our machinery portfolio covers all aspects of metal packaging production, from initial forming to final inspection and packaging.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-accent text-white hover:bg-accent/90 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-sm"
                >
                  Contact Us for Current Opportunities <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_f2b5dbf30b074ac7b31be1ac1e8e60db~mv2.png?originWidth=1152&originHeight=896"
                  alt="Metal packaging machinery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Machinery Categories */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Machinery Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {machineryCategories.map((category, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Looking for Specific Machinery?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us for current machinery opportunities and availability. Our team will help you find the perfect equipment for your production needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-100 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-sm"
              >
                Get in Touch
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white/10 transition-colors duration-300 text-sm font-medium uppercase tracking-wider rounded-sm"
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
