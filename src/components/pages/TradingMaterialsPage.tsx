import { Link } from 'react-router-dom';
import React from 'react';
import { Boxes, TrendingUp, Globe, CheckCircle, ArrowRight, ShieldCheck, Zap, BarChart3, Truck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function TradingMaterialsPage() {
  const { t } = useTranslation();

  const materials = [
    {
      title: t('tradingPage.m1T'),
      description: t('tradingPage.m1D'),
      icon: Boxes,
      features: [
        t('tradingPage.matFeature1'),
        t('tradingPage.matFeature2'),
        t('tradingPage.matFeature3'),
        t('tradingPage.matFeature4')
      ]
    },
    {
      title: t('tradingPage.m2T'),
      description: t('tradingPage.m2D'),
      icon: Zap,
      features: [
        t('tradingPage.matFeature1'),
        t('tradingPage.matFeature2'),
        t('tradingPage.matFeature3'),
        t('tradingPage.matFeature4')
      ]
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
      icon: ShieldCheck,
      title: t('tradingPage.b3T'),
      description: t('tradingPage.b3D')
    },
    {
      icon: Truck,
      title: t('tradingPage.b4T'),
      description: t('tradingPage.b4D')
    }
  ];

  const features = [
    { title: t('tradingPage.s1T'), description: t('tradingPage.s1D'), icon: ShieldCheck },
    { title: t('tradingPage.s2T'), description: t('tradingPage.s2D'), icon: BarChart3 },
    { title: t('tradingPage.s3T'), description: t('tradingPage.s3D'), icon: Zap },
    { title: t('tradingPage.s4T'), description: t('tradingPage.s4D'), icon: Truck },
    { title: t('tradingPage.s5T'), description: t('tradingPage.s5D'), icon: CheckCircle },
    { title: t('tradingPage.s6T'), description: t('tradingPage.s6D'), icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-accent/20">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-[#001F5F] overflow-hidden pt-32 pb-20">
          {/* Industrial Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-accent" />
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">{t('header.tradingMaterials')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-8 leading-[1.1] tracking-tighter">
                {t('tradingPage.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-medium">
                {t('tradingPage.heroSub')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/request-quotation" className="px-8 py-4 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_10px_20px_rgba(196,18,48,0.3)] hover:-translate-y-1">
                  {t('tradingPage.ctaBtn2')}
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-white hover:text-[#001F5F]">
                  {t('tradingPage.ctaBtn1')}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Diagonal Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 bg-white relative z-10 -mt-px">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 block">{t('tradingPage.introEyebrow')}</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight mb-8">
                  {t('tradingPage.introTitle')}
                </h2>
                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {t('tradingPage.introP1')}
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    {t('tradingPage.introP2')}
                  </p>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-heading font-black text-[#001F5F] mb-2">100%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('tradingPage.qualityTag')}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-black text-[#001F5F] mb-2">24/7</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('tradingPage.logisticsTag')}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,31,95,0.1)] group"
              >
                <Image
                  src="https://static.wixstatic.com/media/9bbed2_ac665dcfa3f44e65887a6f85e57da040~mv2.png?originWidth=1152&originHeight=896"
                  alt="Tinplate and aluminum trading"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F5F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Material Ecosystem Grid */}
        <section className="py-24 md:py-32 bg-[#f8f9fb] -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">{t('tradingPage.matEyebrow')}</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight">
                {t('tradingPage.matTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {materials.map((material, idx) => {
                const Icon = material.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,31,95,0.04)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(0,31,95,0.1)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                  >
                    {/* Decorative Background Icon */}
                    <Icon className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50 group-hover:text-slate-100/50 transition-colors duration-500 rotate-12" />

                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-[#001F5F] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#001F5F]/20">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-heading font-black text-[#001F5F] mb-6 group-hover:text-accent transition-colors">{material.title}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10 max-w-lg">{material.description}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {material.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-center gap-3 group/item">
                            <div className="w-2 h-2 rounded-full bg-accent group-hover/item:scale-125 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-wider text-[#001F5F]/70 group-hover/item:text-[#001F5F] transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Competitive Advantage (Benefits) */}
        <section className="py-24 md:py-32 bg-white -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">{t('tradingPage.whyEyebrow')}</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight">
                {t('tradingPage.whyTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-8 bg-[#f8f9fb] rounded-3xl border border-transparent hover:border-accent/20 hover:bg-white hover:shadow-xl transition-all duration-500 text-center group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-heading font-black text-[#001F5F] mb-4">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Trading Services */}
        <section className="py-24 md:py-32 bg-[#f8f9fb] -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 lg:sticky lg:top-32">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 block">{t('tradingPage.svcEyebrow')}</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tighter mb-6">
                  {t('tradingPage.svcTitle')}
                </h2>
                <div className="w-20 h-1.5 bg-accent rounded-full mb-8" />
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {t('tradingPage.svcDesc')}
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-[0.2em] text-[10px] hover:translate-x-2 transition-transform duration-300">
                  {t('tradingPage.svcBtn')}
                </Link>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-8 bg-white border border-slate-100 hover:border-accent/20 hover:shadow-xl transition-all duration-500 group"
                    >
                      <Icon className="w-8 h-8 text-accent/20 group-hover:text-accent mb-6 transition-colors duration-500" />
                      <h3 className="text-lg font-heading font-black text-[#001F5F] mb-4">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{t('tradingPage.ctaEyebrow')}</span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
                {t('tradingPage.ctaTitle')}
              </h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-paragraph font-medium">
                {t('tradingPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/request-quotation" className="px-10 py-4 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_10px_20px_rgba(196,18,48,0.3)] hover:-translate-y-1">
                  {t('tradingPage.ctaBtn2')}
                </Link>
                <Link to="/contact" className="px-10 py-4 border-2 border-white/20 text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                  {t('tradingPage.ctaBtn1')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
