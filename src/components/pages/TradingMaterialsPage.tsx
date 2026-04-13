import React from 'react';
import { Boxes, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

export default function TradingMaterialsPage() {
  const { t } = useTranslation();
  
  const materials = [
    {
      title: t('tradingPage.m1T'),
      description: t('tradingPage.m1D')
    },
    {
      title: t('tradingPage.m2T'),
      description: t('tradingPage.m2D')
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: t('tradingPage.b1T'),
      description: t('tradingPage.b1D')
    },
    {
      icon: TrendingUp,
      title: t('tradingPage.b2T'),
      description: t('tradingPage.b2D')
    },
    {
      icon: CheckCircle,
      title: t('tradingPage.b3T'),
      description: t('tradingPage.b3D')
    },
    {
      icon: Boxes,
      title: t('tradingPage.b4T'),
      description: t('tradingPage.b4D')
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white pt-24 sm:pt-28 pb-20 md:pb-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {t('tradingPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('tradingPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {t('tradingPage.introTitle')}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t('tradingPage.introP1')}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('tradingPage.introP2')}
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-xl">
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
              {t('tradingPage.matTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {materials.map((material, idx) => (
                <div key={idx} className="bg-white p-8 rounded-none shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">{material.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{material.description}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{t('tradingPage.matFeature1')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{t('tradingPage.matFeature2')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{t('tradingPage.matFeature3')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{t('tradingPage.matFeature4')}</span>
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
              {t('tradingPage.whyTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="bg-gray-50 p-8 rounded-none text-center">
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
              {t('tradingPage.svcTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: t('tradingPage.s1T'),
                  description: t('tradingPage.s1D')
                },
                {
                  title: t('tradingPage.s2T'),
                  description: t('tradingPage.s2D')
                },
                {
                  title: t('tradingPage.s3T'),
                  description: t('tradingPage.s3D')
                },
                {
                  title: t('tradingPage.s4T'),
                  description: t('tradingPage.s4D')
                },
                {
                  title: t('tradingPage.s5T'),
                  description: t('tradingPage.s5D')
                },
                {
                  title: t('tradingPage.s6T'),
                  description: t('tradingPage.s6D')
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-none shadow-sm">
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
              {t('tradingPage.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('tradingPage.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('tradingPage.ctaBtn1')}
              </a>
              <a
                href="/request-quotation"
                className="px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('tradingPage.ctaBtn2')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
