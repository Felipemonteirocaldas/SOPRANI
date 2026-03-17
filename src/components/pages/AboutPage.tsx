import React from 'react';
import { Globe, Award, Users, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About Soprani Engineering
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Your trusted partner in metal packaging machinery, spare parts, and technical solutions worldwide.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  International Excellence in Metal Packaging
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Soprani Engineering operates internationally in the metal packaging sector, supporting manufacturers with comprehensive solutions for machinery sourcing, spare parts supply, technical assistance, revamping projects, and trading of tinplate and aluminum materials.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  With decades of experience and a global network spanning Europe, Middle East, North Africa, Asia, and the Americas, we have established ourselves as a reliable partner for can-making factories, industrial buyers, and metal packaging manufacturers.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our commitment to technical competence, commercial flexibility, and long-term partnerships has made us the preferred choice for companies seeking to optimize their production capabilities.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_fe43fe59bc1d4d7ca944f544cd2c69bd~mv2.png?originWidth=896&originHeight=640"
                  alt="Metal packaging machinery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Technical Competence',
                  description: 'Deep expertise in metal packaging machinery and industrial solutions'
                },
                {
                  icon: Globe,
                  title: 'Global Network',
                  description: 'International presence across Europe, Middle East, North Africa, Asia, and Americas'
                },
                {
                  icon: Zap,
                  title: 'Commercial Flexibility',
                  description: 'Tailored solutions adapted to your specific business needs'
                },
                {
                  icon: Users,
                  title: 'Long-term Partnerships',
                  description: 'Committed to building lasting relationships with our clients'
                }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              Our Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Machinery Sourcing',
                  description: 'We identify and source the right machinery for your production needs, from welding machines to complete can-making lines.'
                },
                {
                  title: 'Spare Parts Supply',
                  description: 'Comprehensive spare parts identification and supply to minimize production downtime and keep your operations running smoothly.'
                },
                {
                  title: 'Technical Assistance',
                  description: 'Expert troubleshooting, machine evaluation, and maintenance coordination to optimize your production efficiency.'
                },
                {
                  title: 'Revamping Projects',
                  description: 'Equipment improvement and upgrading services to enhance your production capabilities and extend machinery lifespan.'
                },
                {
                  title: 'Material Trading',
                  description: 'Trading opportunities in tinplate and aluminum materials used in metal packaging production.'
                },
                {
                  title: 'Industrial Expertise',
                  description: 'Decades of experience serving food packaging, beverage cans, industrial containers, and specialized metal packaging sectors.'
                }
              ].map((item, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-6">
                  <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Geographic Reach */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Global Reach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
              {['Europe', 'Middle East', 'North Africa', 'Asia', 'Americas'].map((region, idx) => (
                <div key={idx} className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                  <p className="text-xl font-heading font-bold">{region}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
