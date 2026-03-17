import React from 'react';
import { CheckCircle, Clock, Search, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function SparePartsPage() {
  const benefits = [
    {
      icon: Search,
      title: 'Expert Identification',
      description: 'Precise identification of spare parts for all machinery types and manufacturers.'
    },
    {
      icon: Clock,
      title: 'Minimize Downtime',
      description: 'Fast sourcing and delivery to keep your production running without interruption.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Verified parts that meet industry standards and specifications.'
    },
    {
      icon: Truck,
      title: 'Reliable Logistics',
      description: 'Efficient delivery and logistics support worldwide.'
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
              Spare Parts Supply
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Comprehensive spare parts sourcing and supply for metal packaging machinery
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Keep Your Production Running
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Production downtime is costly. Our comprehensive spare parts sourcing and supply service ensures your machinery stays operational. We specialize in identifying and sourcing both common and difficult-to-find components for metal packaging machinery.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  With our global network and technical expertise, we can locate and deliver the exact parts you need, when you need them. Whether you're looking for standard components or specialized parts, we have the resources to help.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_5deb68287d3f44a58ef9ec0320d1a8ed~mv2.png?originWidth=896&originHeight=640"
                  alt="Spare parts for can making machines"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Our Spare Parts Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Why Choose Soprani Engineering for Spare Parts?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Parts Identification',
                  description: 'Expert identification of spare parts for all machinery types, brands, and models used in metal packaging production.'
                },
                {
                  title: 'Difficult Component Sourcing',
                  description: 'Specialized sourcing of hard-to-find and obsolete parts through our extensive global network.'
                },
                {
                  title: 'Quality Verification',
                  description: 'All parts are verified for quality and compatibility before delivery to ensure optimal performance.'
                },
                {
                  title: 'Fast Delivery',
                  description: 'Efficient logistics and delivery systems to minimize production downtime and keep your operations running.'
                },
                {
                  title: 'Competitive Pricing',
                  description: 'Competitive pricing on spare parts without compromising on quality or reliability.'
                },
                {
                  title: 'Technical Support',
                  description: 'Expert technical guidance to ensure you get the right parts for your specific machinery and needs.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-6">
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
              Need Spare Parts?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today with your spare parts requirements. Our team will help you find the exact components you need.
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
                className="px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
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
