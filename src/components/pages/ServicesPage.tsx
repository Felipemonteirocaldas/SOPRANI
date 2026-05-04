import React, { useRef, useState, useEffect } from 'react';
import { Wrench, Package, Zap, RefreshCw, TrendingUp, Hammer, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, PanInfo } from 'framer-motion';
import ConversionButton from '@/components/ui/ConversionButton';

const SERVICES = (t: (k: string) => string) => [
  { number: '01', icon: Wrench, titleKey: 'servicesPage.usedMachT', descKey: 'servicesPage.usedMachD', bullets: ['servicesPage.usedP1', 'servicesPage.usedP2', 'servicesPage.usedP3', 'servicesPage.usedP4'], tagKey: 'servicesPage.tag1' },
  { number: '02', icon: Package, titleKey: 'servicesPage.sparePartsT', descKey: 'servicesPage.sparePartsD', bullets: ['servicesPage.spP1', 'servicesPage.spP2', 'servicesPage.spP3', 'servicesPage.spP4'], tagKey: 'servicesPage.tag2' },
  { number: '03', icon: Zap, titleKey: 'servicesPage.techAssistanceT', descKey: 'servicesPage.techAssistanceD', bullets: ['servicesPage.ta1', 'servicesPage.ta2', 'servicesPage.ta3', 'servicesPage.ta4'], tagKey: 'servicesPage.tag3' },
  { number: '04', icon: RefreshCw, titleKey: 'servicesPage.revampingT', descKey: 'servicesPage.revampingD', bullets: ['servicesPage.rv1', 'servicesPage.rv2', 'servicesPage.rv3', 'servicesPage.rv4'], tagKey: 'servicesPage.tag4' },
  { number: '05', icon: Hammer, titleKey: 'servicesPage.assetMarketT', descKey: 'servicesPage.assetMarketD', bullets: ['servicesPage.am1', 'servicesPage.am2', 'servicesPage.am3', 'servicesPage.am4'], tagKey: 'servicesPage.tag6' },
];

interface Service {
  number: string; icon: React.ElementType; titleKey: string;
  descKey: string; bullets: string[]; tagKey: string;
}


// 💎💎 TABLET CARD (md to xl) 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
const ServiceTabletCard = ({ service, t }: { service: Service; t: (k: string) => string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,31,95,0.06)] border border-slate-100 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#001F5F' }}>
          <Icon size={20} className="text-white" />
        </div>
        <span className="text-4xl font-heading font-black opacity-[0.05]" style={{ color: '#001F5F' }}>{service.number}</span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent mb-2">{t(service.tagKey)}</span>
      <h3 className="text-xl font-heading font-black text-[#001F5F] mb-4 leading-tight">{t(service.titleKey)}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{t(service.descKey)}</p>
      <ul className="space-y-3 mb-8">
        {service.bullets.slice(0, 3).map((bKey, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check size={12} className="text-accent mt-1 shrink-0" />
            <span className="text-[13px] text-slate-600 font-medium">{t(bKey)}</span>
          </li>
        ))}
      </ul>
      <Link to="/request-quotation" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent group">
        {t('servicesPage.details')} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

// 💎💎 DESKTOP ROW (💻 xl) 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
const ServiceDesktopRow = ({ service, t }: { service: Service; t: (k: string) => string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      id={`service-${service.number}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[220px_1fr_1fr] border-b border-slate-200 last:border-b-0 py-16 scroll-mt-24"
    >
      <div className="flex flex-col items-start gap-3 pr-8">
        <span className="text-8xl font-heading font-black leading-none select-none" style={{ color: '#001F5F', opacity: 0.13 }}>
          {service.number}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
          <span className="w-3 h-px bg-accent inline-block" />{t(service.tagKey)}
        </span>
        <div className="w-10 h-10 flex items-center justify-center" style={{ background: '#001F5F' }}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <div className="pr-14 border-r border-slate-200">
        <h2 className="text-3xl xl:text-4xl font-heading font-black text-[#001F5F] mb-4 leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
          {t(service.titleKey)}
        </h2>
        <p className="text-slate-600 text-base leading-relaxed font-paragraph font-medium max-w-sm">
          {t(service.descKey)}
        </p>
        <Link to="/request-quotation" className="inline-flex items-center gap-2 mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-accent group/btn hover:gap-3 transition-all duration-300">
          {t('servicesPage.btnQuote')} <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="pl-14">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">{t('servicesPage.capabilities')}</p>
        <ul className="space-y-3.5">
          {service.bullets.map((bKey, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-accent/10 flex items-center justify-center">
                <Check size={11} className="text-accent" strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-700 leading-relaxed font-paragraph font-medium">{t(bKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const { t } = useTranslation();
  const services = SERVICES(t);

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-accent selection:text-white">
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#001F5F] pt-36 sm:pt-44 md:pt-52 pb-32">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(196,18,48,0.12),transparent_55%)]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-px bg-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">{t('servicesPage.heroEyebrow')}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.0] tracking-tight mb-8">
                {t('servicesSection.ourServices')}
              </h1>
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-bold">
                {t('servicesPage.heroSub')}
              </p>
            </motion.div>
          </div>
          <div className="absolute -bottom-px left-0 right-0 h-16 bg-[#f8f9fb] xl:bg-white" style={{ clipPath: 'polygon(0 100%,100% 100%,100% 0)' }} />
        </section>

        {/* MOBILE: Vertical Cards (< md) */}
        <section className="md:hidden bg-[#f8f9fb] py-12 -mt-px relative z-10">
          <div className="px-3 sm:px-6 space-y-6">
            {services.map((service, i) => (
              <ServiceTabletCard key={i} service={service} t={t} />
            ))}
          </div>
        </section>

        {/* TABLET: Grid (md to xl) */}
        <section className="hidden md:block xl:hidden bg-[#f8f9fb] py-20 -mt-px relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, i) => (
                <ServiceTabletCard key={i} service={service} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* DESKTOP: Row list */}
        <section className="hidden xl:block bg-white -mt-px relative z-10">
          <div className="container mx-auto px-8">
            {services.map((service, i) => (
              <ServiceDesktopRow key={i} service={service} t={t} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-[#001F5F] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(196,18,48,0.1),transparent_60%)]" />
          <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{t('servicesPage.ctaEyebrow')}</span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
                {t('servicesPage.ctaTitle')}
              </h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-paragraph font-medium">
                {t('servicesPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ConversionButton to="/contact" variant="primary">{t('servicesPage.btnContact')}</ConversionButton>
                <ConversionButton to="/request-quotation" variant="ghost-dark">{t('servicesPage.btnQuote')}</ConversionButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
