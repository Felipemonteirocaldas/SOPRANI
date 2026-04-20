import { Link } from 'react-router-dom';
import React from 'react';
import { Wrench, Zap, Settings, TrendingUp } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';

export default function TechnicalAssistancePage() {
  const { t } = useTranslation();
  const services = [
    {
      icon: Wrench,
      title: t('techPage.s1T'),
      description: t('techPage.s1D')
    },
    {
      icon: Settings,
      title: t('techPage.s2T'),
      description: t('techPage.s2D')
    },
    {
      icon: Zap,
      title: t('techPage.s3T'),
      description: t('techPage.s3D')
    },
    {
      icon: TrendingUp,
      title: t('techPage.s4T'),
      description: t('techPage.s4D')
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white pt-24 sm:pt-28 pb-20 md:pb-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {t('techPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('techPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {t('techPage.introTitle')}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t('techPage.introP1')}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t('techPage.introP2')}
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_bb527cba8c2b4e2dbc7e494ccfff2925~mv2.png?originWidth=896&originHeight=640"
                  alt="Metal packaging technical service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">
              {t('techPage.svcTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-none shadow-sm hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              {t('techPage.detailsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: t('techPage.t1T'),
                  items: [
                    t('techPage.t1L1'),
                    t('techPage.t1L2'),
                    t('techPage.t1L3'),
                    t('techPage.t1L4')
                  ]
                },
                {
                  title: t('techPage.t2T'),
                  items: [
                    t('techPage.t2L1'),
                    t('techPage.t2L2'),
                    t('techPage.t2L3'),
                    t('techPage.t2L4')
                  ]
                },
                {
                  title: t('techPage.t3T'),
                  items: [
                    t('techPage.t3L1'),
                    t('techPage.t3L2'),
                    t('techPage.t3L3'),
                    t('techPage.t3L4')
                  ]
                },
                {
                  title: t('techPage.t4T'),
                  items: [
                    t('techPage.t4L1'),
                    t('techPage.t4L2'),
                    t('techPage.t4L3'),
                    t('techPage.t4L4')
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
              {t('techPage.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('techPage.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="px-8 py-3 bg-white text-primary hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('techPage.ctaBtn1')}
              </Link>
              <Link to="/request-quotation"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
              >
                {t('techPage.ctaBtn2')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
