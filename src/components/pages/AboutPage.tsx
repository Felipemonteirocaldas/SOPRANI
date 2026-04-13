import React from 'react';
import { Globe, Award, Users, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white pt-24 sm:pt-28 pb-16 md:pb-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
              {t('aboutPage.heroTitle')}
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-2xl">
              {t('aboutPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4 md:mb-6">
                  {t('aboutPage.intExcTitle')}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                  {t('aboutPage.intExcP1')}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                  {t('aboutPage.intExcP2')}
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('aboutPage.intExcP3')}
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
              {t('aboutPage.coreValuesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: Award,
                  title: t('aboutPage.cv1T'),
                  description: t('aboutPage.cv1D')
                },
                {
                  icon: Globe,
                  title: t('aboutPage.cv2T'),
                  description: t('aboutPage.cv2D')
                },
                {
                  icon: Zap,
                  title: t('aboutPage.cv3T'),
                  description: t('aboutPage.cv3D')
                },
                {
                  icon: Users,
                  title: t('aboutPage.cv4T'),
                  description: t('aboutPage.cv4D')
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
              {t('aboutPage.expertiseTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {[
                {
                  title: t('aboutPage.ex1T'),
                  description: t('aboutPage.ex1D')
                },
                {
                  title: t('aboutPage.ex2T'),
                  description: t('aboutPage.ex2D')
                },
                {
                  title: t('aboutPage.ex3T'),
                  description: t('aboutPage.ex3D')
                },
                {
                  title: t('aboutPage.ex4T'),
                  description: t('aboutPage.ex4D')
                },
                {
                  title: t('aboutPage.ex5T'),
                  description: t('aboutPage.ex5D')
                },
                {
                  title: t('aboutPage.ex6T'),
                  description: t('aboutPage.ex6D')
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
              {t('aboutPage.reachTitle')}
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
