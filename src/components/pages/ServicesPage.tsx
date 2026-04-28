import React, { useRef, useState, useEffect } from 'react';
import { Wrench, Package, Zap, RefreshCw, TrendingUp, Hammer, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, PanInfo } from 'framer-motion';
import ConversionButton from '@/components/ui/ConversionButton';

const SERVICES = (t: (k: string) => string) => [
  { number: '01', icon: Wrench, titleKey: 'servicesPage.usedMachT', descKey: 'servicesPage.usedMachD', bullets: ['servicesPage.usedP1', 'servicesPage.usedP2', 'servicesPage.usedP3', 'servicesPage.usedP4'], tag: 'Machinery' },
  { number: '02', icon: Package, titleKey: 'servicesPage.sparePartsT', descKey: 'servicesPage.sparePartsD', bullets: ['servicesPage.spP1', 'servicesPage.spP2', 'servicesPage.spP3', 'servicesPage.spP4'], tag: 'Parts' },
  { number: '03', icon: Zap, titleKey: 'servicesPage.techAssistanceT', descKey: 'servicesPage.techAssistanceD', bullets: ['servicesPage.ta1', 'servicesPage.ta2', 'servicesPage.ta3', 'servicesPage.ta4'], tag: 'Support' },
  { number: '04', icon: RefreshCw, titleKey: 'servicesPage.revampingT', descKey: 'servicesPage.revampingD', bullets: ['servicesPage.rv1', 'servicesPage.rv2', 'servicesPage.rv3', 'servicesPage.rv4'], tag: 'Upgrade' },
  { number: '05', icon: TrendingUp, titleKey: 'servicesPage.tradingT', descKey: 'servicesPage.tradingD', bullets: ['servicesPage.tr1', 'servicesPage.tr2', 'servicesPage.tr3', 'servicesPage.tr4'], tag: 'Trading' },
  { number: '06', icon: Hammer, titleKey: 'servicesPage.assetMarketT', descKey: 'servicesPage.assetMarketD', bullets: ['servicesPage.am1', 'servicesPage.am2', 'servicesPage.am3', 'servicesPage.am4'], tag: 'Asset Market' },
];

interface Service {
  number: string; icon: React.ElementType; titleKey: string;
  descKey: string; bullets: string[]; tag: string;
}

// 💎💎 SCROLLYTELLING PANEL (mobile < md) 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
const ServiceScrollyPanel = ({ services, t }: { services: Service[]; t: (k: string) => string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollStart = window.scrollY + rect.top;
      const scrollTotal = rect.height - window.innerHeight;
      const currentProgress = (window.scrollY - scrollStart) / scrollTotal;
      const progress = Math.max(0, Math.min(1, currentProgress));
      const idx = Math.min(Math.floor(progress * services.length), services.length - 1);
      if (idx !== active) {
        setDirection(idx > active ? 1 : -1);
        setActive(idx);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active, services.length]);

  const goTo = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollStart = window.scrollY + rect.top;
    const scrollTotal = rect.height - window.innerHeight;
    const targetScroll = scrollStart + (idx / services.length) * scrollTotal + 10;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && active < services.length - 1) goTo(active + 1);
    else if (info.offset.x > threshold && active > 0) goTo(active - 1);
  };

  const service = services[active];
  const Icon = service.icon;
  const scrollHeight = `${services.length * 100}vh`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative bg-[#f8f9fb]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 md:px-10 pb-6 shrink-0">
          {services.map((s, i) => {
            const SIcon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 border-2 ${isActive ? 'bg-[#001F5F] text-white border-[#001F5F] shadow-lg scale-105' : 'bg-white text-slate-400 border-slate-100'
                  }`}
              >
                <SIcon size={12} />
                {s.tag}
              </button>
            );
          })}
        </div>
        <div className="px-4 md:px-10 flex flex-col items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_20px_80px_rgba(0,31,95,0.12)] overflow-hidden flex flex-col cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ minHeight: '460px' }}
            >
              <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: '#001F5F' }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent block mb-1">{service.tag}</span>
                    <h2 className="text-2xl font-heading font-black text-[#001F5F] leading-tight tracking-tight">{t(service.titleKey)}</h2>
                  </div>
                </div>
                <span className="text-6xl font-heading font-black opacity-[0.05]" style={{ color: '#001F5F' }}>{service.number}</span>
              </div>
              <div className="px-8 py-7 flex-1">
                <p className="text-slate-500 text-sm leading-relaxed font-paragraph mb-8">{t(service.descKey)}</p>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Core Capabilities</p>
                  <div className="grid gap-3">
                    {service.bullets.map((bKey, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={10} className="text-accent mt-1 shrink-0" strokeWidth={4} />
                        <span className="text-sm text-slate-600 leading-snug font-paragraph font-medium">{t(bKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 bg-slate-50/50 flex items-center justify-between">
                <Link to="/request-quotation" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-accent hover:gap-3 transition-all duration-300">
                  Request Quote <ArrowRight size={14} />
                </Link>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400">{service.number}</span>
                  <div className="w-8 h-px bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-400">{services.length}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-6 md:px-10 mt-10 w-full max-w-lg mx-auto">
          <div className="flex justify-center gap-3 mb-4">
            {services.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-[#001F5F]' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
      className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,31,95,0.06)] border border-slate-100 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#001F5F' }}>
          <Icon size={20} className="text-white" />
        </div>
        <span className="text-4xl font-heading font-black opacity-[0.05]" style={{ color: '#001F5F' }}>{service.number}</span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent mb-2">{service.tag}</span>
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
        Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
      className="group grid grid-cols-[160px_1fr_1fr] border-b border-slate-200 last:border-b-0 py-16 scroll-mt-24"
    >
      <div className="flex flex-col items-start gap-3 pr-8">
        <span className="text-8xl font-heading font-black leading-none select-none" style={{ color: '#001F5F', opacity: 0.13 }}>
          {service.number}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
          <span className="w-3 h-px bg-accent inline-block" />{service.tag}
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
          Request Quote <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="pl-14">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">Key Capabilities</p>
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
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Industrial Services</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.0] tracking-tight mb-8">
                {t('servicesSection.ourServices')}
              </h1>
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-bold">
                {t('servicesPage.heroSub')}
              </p>
            </motion.div>
          </div>
          <div className="absolute -bottom-px left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%,100% 100%,100% 0)' }} />
        </section>

        {/* MOBILE: Scrollytelling (< md) */}
        <section className="md:hidden bg-[#f8f9fb]">
          <ServiceScrollyPanel services={services} t={t} />
        </section>

        {/* TABLET: Grid (md to xl) */}
        <section className="hidden md:block xl:hidden bg-[#f8f9fb] py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, i) => (
                <ServiceTabletCard key={i} service={service} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* DESKTOP: Row list */}
        <section className="hidden xl:block bg-white">
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Work With Us</span>
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
