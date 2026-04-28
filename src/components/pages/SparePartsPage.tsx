import { Link } from 'react-router-dom';
import React from 'react';
import { CheckCircle, Clock, Search, Truck, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function SparePartsPage() {
  const { t } = useTranslation();
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#001F5F] pt-36 sm:pt-44 md:pt-52 pb-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Technical Components</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-8 leading-tight tracking-tight max-w-4xl">
                {t('sparePartsPage.heroTitle')}
              </h1>
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-bold">
                {t('sparePartsPage.heroSub')}
              </p>
            </motion.div>
          </div>

          {/* Diagonal Transition */}
          <div className="absolute -bottom-px left-0 right-0 h-16 bg-white"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          />
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-32 bg-white -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Inventory Management</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] mb-8 leading-tight tracking-tight">
                  {t('sparePartsPage.introTitle')}
                </h2>
                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed font-paragraph">
                    {t('sparePartsPage.introP1')}
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed font-paragraph">
                    {t('sparePartsPage.introP2')}
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,31,95,0.15)] group"
              >
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_5deb68287d3f44a58ef9ec0320d1a8ed~mv2.png?originWidth=896&originHeight=640"
                  alt="Spare parts for can making machines"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F5F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-24 md:py-32 bg-[#f8f9fb]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Core Logistics</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight">
                {t('sparePartsPage.svcsTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,31,95,0.04)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(0,31,95,0.1)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#001F5F] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-black text-[#001F5F] mb-4 group-hover:text-accent transition-colors">{benefit.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-paragraph font-medium">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-24 md:py-32 bg-white -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Quality Assurance</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight">
                {t('sparePartsPage.whyChooseTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: t('sparePartsPage.f1T'), description: t('sparePartsPage.f1D') },
                { title: t('sparePartsPage.f2T'), description: t('sparePartsPage.f2D') },
                { title: t('sparePartsPage.f3T'), description: t('sparePartsPage.f3D') },
                { title: t('sparePartsPage.f4T'), description: t('sparePartsPage.f4D') },
                { title: t('sparePartsPage.f5T'), description: t('sparePartsPage.f5D') },
                { title: t('sparePartsPage.f6T'), description: t('sparePartsPage.f6D') }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="p-8 border-l-2 border-slate-100 hover:border-accent transition-colors duration-300"
                >
                  <h3 className="text-lg font-heading font-black text-[#001F5F] mb-4">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-paragraph font-medium">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="relative bg-[#001F5F] py-24 md:py-32 overflow-hidden -mt-px">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(196,18,48,0.1),transparent_60%)]" />
          <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Technical Support</span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
                {t('sparePartsPage.ctaTitle')}
              </h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-paragraph font-medium">
                {t('sparePartsPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-10 py-4 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_10px_20px_rgba(196,18,48,0.3)] hover:-translate-y-1">
                  {t('sparePartsPage.ctaBtn1')}
                </Link>
                <Link to="/request-quotation" className="px-10 py-4 border-2 border-white/20 text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                  {t('sparePartsPage.ctaBtn2')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
