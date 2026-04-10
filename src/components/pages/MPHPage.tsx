import React from 'react';
import { Zap, Globe, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

export default function MPHPage() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Globe,
      title: t('mphPage.f1T'),
      description: t('mphPage.f1D')
    },
    {
      icon: Users,
      title: t('mphPage.f2T'),
      description: t('mphPage.f2D')
    },
    {
      icon: TrendingUp,
      title: t('mphPage.f3T'),
      description: t('mphPage.f3D')
    },
    {
      icon: Zap,
      title: t('mphPage.f4T'),
      description: t('mphPage.f4D')
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
              {t('mphPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('mphPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-accent/10 border-2 border-accent p-12 rounded-lg mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {t('mphPage.csTitle')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('mphPage.csDesc')}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    {t('mphPage.whatTitle')}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {t('mphPage.whatP1')}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {t('mphPage.whatP2')}
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
              {t('mphPage.fTitle')}
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
              {t('mphPage.capTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: t('mphPage.c1T'),
                  description: t('mphPage.c1D')
                },
                {
                  title: t('mphPage.c2T'),
                  description: t('mphPage.c2D')
                },
                {
                  title: t('mphPage.c3T'),
                  description: t('mphPage.c3D')
                },
                {
                  title: t('mphPage.c4T'),
                  description: t('mphPage.c4D')
                },
                {
                  title: t('mphPage.c5T'),
                  description: t('mphPage.c5D')
                },
                {
                  title: t('mphPage.c6T'),
                  description: t('mphPage.c6D')
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
              {t('mphPage.whyTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('mphPage.w1T'),
                  description: t('mphPage.w1D')
                },
                {
                  title: t('mphPage.w2T'),
                  description: t('mphPage.w2D')
                },
                {
                  title: t('mphPage.w3T'),
                  description: t('mphPage.w3D')
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
              {t('mphPage.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('mphPage.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('mphPage.ctaBtn1')}
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('mphPage.ctaBtn2')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
