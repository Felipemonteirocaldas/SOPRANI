import { Link } from 'react-router-dom';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

export default function MachineryPage() {
  const { t } = useTranslation();
  const machineryCategories = [
    {
      title: t('machineryPage.weldingT'),
      description: t('machineryPage.weldingD')
    },
    {
      title: t('machineryPage.canT'),
      description: t('machineryPage.canD')
    },
    {
      title: t('machineryPage.pressesT'),
      description: t('machineryPage.pressesD')
    },
    {
      title: t('machineryPage.decoratingT'),
      description: t('machineryPage.decoratingD')
    },
    {
      title: t('machineryPage.coatingT'),
      description: t('machineryPage.coatingD')
    },
    {
      title: t('machineryPage.handlingT'),
      description: t('machineryPage.handlingD')
    },
    {
      title: t('machineryPage.inspectionT'),
      description: t('machineryPage.inspectionD')
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
              {t('machineryPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('machineryPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {t('machineryPage.introTitle')}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t('machineryPage.introP1')}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('machineryPage.introP2')}
                </p>
                <Link to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
                >
                  {t('machineryPage.introBtn')} <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-xl">
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
              {t('machineryPage.categoriesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {machineryCategories.map((category, idx) => (
                <div key={idx} className="bg-white p-8 rounded-none shadow-sm hover:shadow-lg transition-shadow">
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
              {t('machineryPage.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('machineryPage.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('machineryPage.ctaBtn1')}
              </Link>
              <Link to="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('machineryPage.ctaBtn2')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
