import { Link } from 'react-router-dom';
import React from 'react';
import { Wrench, Zap, Settings, TrendingUp } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">{t('techPage.heroEyebrow')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-8 leading-tight tracking-tight max-w-4xl">
                {t('techPage.heroTitle')}
              </h1>
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-bold">
                {t('techPage.heroSub')}
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
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{t('techPage.introEyebrow')}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] mb-8 leading-tight tracking-tight">
                  {t('techPage.introTitle')}
                </h2>
                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed font-paragraph">
                    {t('techPage.introP1')}
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed font-paragraph">
                    {t('techPage.introP2')}
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
                  src="https://static.wixstatic.com/media/9bbed2_bb527cba8c2b4e2dbc7e494ccfff2925~mv2.png?originWidth=896&originHeight=640"
                  alt="Metal packaging technical service"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F5F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32 bg-[#f8f9fb] -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">{t('techPage.svcEyebrow')}</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001F5F] tracking-tight">
                {t('techPage.svcTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
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
                    <h3 className="text-2xl font-heading font-black text-[#001F5F] mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-paragraph font-medium">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-24 md:py-32 bg-white -mt-px relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4 px-4 py-1.5 bg-accent/5 rounded-full border border-accent/10">{t('techPage.detailsEyebrow')}</span>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-[#001F5F] tracking-tighter mb-6">
                {t('techPage.detailsTitle')}
              </h2>
              <div className="w-20 h-1.5 bg-accent rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  number: "01",
                  title: t('techPage.t1T'),
                  icon: "Search",
                  items: [t('techPage.t1L1'), t('techPage.t1L2'), t('techPage.t1L3'), t('techPage.t1L4')]
                },
                {
                  number: "02",
                  title: t('techPage.t2T'),
                  icon: "Cpu",
                  items: [t('techPage.t2L1'), t('techPage.t2L2'), t('techPage.t2L3'), t('techPage.t2L4')]
                },
                {
                  number: "03",
                  title: t('techPage.t3T'),
                  icon: "Settings",
                  items: [t('techPage.t3L1'), t('techPage.t3L2'), t('techPage.t3L3'), t('techPage.t3L4')]
                },
                {
                  number: "04",
                  title: t('techPage.t4T'),
                  icon: "BarChart",
                  items: [t('techPage.t4L1'), t('techPage.t4L2'), t('techPage.t4L3'), t('techPage.t4L4')]
                }
              ].map((section, idx) => {
                const IconName = section.icon;
                // Simple mapping for Lucide icons
                const IconComponent = IconName === "Search" ? () => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                ) : IconName === "Cpu" ? () => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
                ) : IconName === "Settings" ? () => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : () => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
                );

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative z-10 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,31,95,0.05)] border border-slate-100 group-hover:border-accent/20 transition-all duration-500 overflow-hidden h-full">
                      {/* Step Badge */}
                      <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300 group-hover:border-accent/20 group-hover:text-accent transition-all duration-500">
                        {section.number}
                      </div>

                      {/* Accent corner */}
                      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-transparent -translate-x-12 -translate-y-12 rotate-45 group-hover:-translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />

                      <div className="flex items-center gap-5 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <IconComponent />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-[#001F5F] tracking-tight">{section.title}</h3>
                      </div>

                      <ul className="space-y-5">
                        {section.items.map((item, iidx) => (
                          <li key={iidx} className="flex items-start gap-4 group/item">
                            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center mt-0.5 group-hover/item:bg-accent/10 transition-colors duration-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-accent transition-all duration-300" />
                            </div>
                            <span className="text-slate-600 font-paragraph font-semibold leading-relaxed group-hover/item:text-[#001F5F] transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom line decorative */}
                      <div className="absolute bottom-0 left-10 right-10 h-1 bg-slate-50 group-hover:bg-accent/10 transition-colors overflow-hidden">
                        <motion.div
                          className="w-full h-full bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{t('techPage.ctaEyebrow')}</span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
                {t('techPage.ctaTitle')}
              </h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-paragraph font-medium">
                {t('techPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="px-10 py-4 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_10px_20px_rgba(196,18,48,0.3)] hover:-translate-y-1">
                  {t('techPage.ctaBtn1')}
                </Link>
                <Link to="/request-quotation" className="px-10 py-4 border-2 border-white/20 text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                  {t('techPage.ctaBtn2')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
