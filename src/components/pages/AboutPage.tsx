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
        <section className="bg-primary text-white py-16 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
              About Soprani
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-2xl">
              Your trusted partner in metal packaging solutions worldwide.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4 md:mb-6">
                  International Excellence
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                  Soprani Engineering is a premier partner in metal packaging, offering machinery sourcing, spare parts, technical assistance, and material trading.
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                  With decades of experience, we serve manufacturers globally across Europe, Middle East, North Africa, Asia, and the Americas.
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  We're committed to technical excellence, flexibility, and lasting partnerships.
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
        <section className="py-16 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-12 md:mb-16 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: Award,
                  title: 'Technical Competence',
                  description: 'Deep expertise in machinery and solutions'
                },
                {
                  icon: Globe,
                  title: 'Global Network',
                  description: 'International presence worldwide'
                },
                {
                  icon: Zap,
                  title: 'Flexibility',
                  description: 'Tailored solutions for your needs'
                },
                {
                  icon: Users,
                  title: 'Partnerships',
                  description: 'Lasting relationships with clients'
                }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-10 md:w-12 h-10 md:h-12 text-accent mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-heading font-bold mb-2 md:mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-16 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-12 md:mb-16 text-center">
              Our Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {[
                {
                  title: 'Machinery Sourcing',
                  description: 'Sourcing the right machinery for your production needs.'
                },
                {
                  title: 'Spare Parts Supply',
                  description: 'Comprehensive parts supply to minimize downtime.'
                },
                {
                  title: 'Technical Assistance',
                  description: 'Expert troubleshooting and maintenance coordination.'
                },
                {
                  title: 'Revamping Projects',
                  description: 'Equipment improvement and upgrading services.'
                },
                {
                  title: 'Material Trading',
                  description: 'Trading in tinplate and aluminum materials.'
                },
                {
                  title: 'Industrial Expertise',
                  description: 'Decades of experience in metal packaging sectors.'
                }
              ].map((item, idx) => (
                <div key={idx} className="border-l-4 border-accent pl-4 md:pl-6">
                  <h3 className="text-lg md:text-xl font-heading font-bold mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Geographic Reach */}
        <section className="py-16 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-10 md:mb-12 text-center">
              Global Reach
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 text-center">
              {['Europe', 'Middle East', 'North Africa', 'Asia', 'Americas'].map((region, idx) => (
                <div key={idx} className="bg-white/10 p-6 md:p-8 rounded-lg backdrop-blur-sm">
                  <p className="text-base md:text-xl font-heading font-bold">{region}</p>
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
