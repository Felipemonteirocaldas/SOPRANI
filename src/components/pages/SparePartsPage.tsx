import { Link } from 'react-router-dom';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { CheckCircle, Clock, Search, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

const ThreeDViewer = lazy(() => import('@/components/ThreeDViewer'));

export default function SparePartsPage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const benefits = [
    {
      icon: Search,
      title: t('sparePartsPage.b1T'),
      description: t('sparePartsPage.b1D')
    },
    {
      icon: Clock,
      title: t('sparePartsPage.b2T'),
      description: t('sparePartsPage.b2D')
    },
    {
      icon: CheckCircle,
      title: t('sparePartsPage.b3T'),
      description: t('sparePartsPage.b3D')
    },
    {
      icon: Truck,
      title: t('sparePartsPage.b4T'),
      description: t('sparePartsPage.b4D')
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
              {t('sparePartsPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('sparePartsPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {t('sparePartsPage.introTitle')}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t('sparePartsPage.introP1')}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('sparePartsPage.introP2')}
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-xl">
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
              {t('sparePartsPage.svcsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-none shadow-sm hover:shadow-lg transition-shadow">
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
              {t('sparePartsPage.whyChooseTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: t('sparePartsPage.f1T'),
                  description: t('sparePartsPage.f1D')
                },
                {
                  title: t('sparePartsPage.f2T'),
                  description: t('sparePartsPage.f2D')
                },
                {
                  title: t('sparePartsPage.f3T'),
                  description: t('sparePartsPage.f3D')
                },
                {
                  title: t('sparePartsPage.f4T'),
                  description: t('sparePartsPage.f4D')
                },
                {
                  title: t('sparePartsPage.f5T'),
                  description: t('sparePartsPage.f5D')
                },
                {
                  title: t('sparePartsPage.f6T'),
                  description: t('sparePartsPage.f6D')
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

        {/* Interactive 3D Demonstration */}
        <section className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary">
                Interactive 3D Parts Demonstration
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore our machinery and components with immersive 3D technology.
                Rotate and zoom to inspect industrial parts in high detail without leaving the browser.
              </p>
            </div>

            <div className="max-w-5xl mx-auto bg-white p-2 md:p-4 rounded-none shadow-xl border border-gray-200">
              {isMounted ? (
                <Suspense fallback={<div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-50 rounded-xl"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>}>
                  <ThreeDViewer />
                </Suspense>
              ) : (
                <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-50 rounded-none">
                  <span className="text-gray-400">Loading 3D Engine...</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {t('sparePartsPage.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('sparePartsPage.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('sparePartsPage.ctaBtn1')}
              </Link>
              <Link to="/request-quotation"
                className="px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('sparePartsPage.ctaBtn2')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
