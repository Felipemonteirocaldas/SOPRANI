import React, { useRef } from 'react';
import { Wrench, Package, Zap, RefreshCw, TrendingUp, Hammer, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const SERVICES = (t: (k: string) => string) => [
  {
    number: '01',
    icon: Wrench,
    titleKey: 'servicesPage.usedMachT',
    descKey: 'servicesPage.usedMachD',
    bullets: ['servicesPage.usedP1', 'servicesPage.usedP2', 'servicesPage.usedP3', 'servicesPage.usedP4'],
    tag: 'Machinery',
  },
  {
    number: '02',
    icon: Package,
    titleKey: 'servicesPage.sparePartsT',
    descKey: 'servicesPage.sparePartsD',
    bullets: ['servicesPage.spP1', 'servicesPage.spP2', 'servicesPage.spP3', 'servicesPage.spP4'],
    tag: 'Parts',
  },
  {
    number: '03',
    icon: Zap,
    titleKey: 'servicesPage.techAssistanceT',
    descKey: 'servicesPage.techAssistanceD',
    bullets: ['servicesPage.ta1', 'servicesPage.ta2', 'servicesPage.ta3', 'servicesPage.ta4'],
    tag: 'Support',
  },
  {
    number: '04',
    icon: RefreshCw,
    titleKey: 'servicesPage.revampingT',
    descKey: 'servicesPage.revampingD',
    bullets: ['servicesPage.rv1', 'servicesPage.rv2', 'servicesPage.rv3', 'servicesPage.rv4'],
    tag: 'Upgrade',
  },
  {
    number: '05',
    icon: TrendingUp,
    titleKey: 'servicesPage.tradingT',
    descKey: 'servicesPage.tradingD',
    bullets: ['servicesPage.tr1', 'servicesPage.tr2', 'servicesPage.tr3', 'servicesPage.tr4'],
    tag: 'Trading',
  },
  {
    number: '06',
    icon: Hammer,
    titleKey: 'servicesPage.assetMarketT',
    descKey: 'servicesPage.assetMarketD',
    bullets: ['servicesPage.am1', 'servicesPage.am2', 'servicesPage.am3', 'servicesPage.am4'],
    tag: 'Asset Market',
  },
];

interface Service {
  number: string;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  bullets: string[];
  tag: string;
}

const ServiceRow = ({ service, index, t }: { service: Service; index: number; t: (k: string) => string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      id={`service-${service.number}`}
      className="relative group scroll-mt-24 md:scroll-mt-32"
    >
      {/* Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-0 border-b border-slate-200 last:border-b-0 py-12 lg:py-16">

        {/* Left — Number + Tag */}
        <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 mb-6 lg:mb-0 lg:pr-8">
          <span
            className="text-6xl lg:text-8xl font-heading font-black leading-none select-none"
            style={{ color: '#001F5F', opacity: 0.15 }}
          >
            {service.number}
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
              <span className="w-3 h-px bg-accent inline-block" />
              {service.tag}
            </span>
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ background: '#001F5F' }}
            >
              <Icon size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* Center — Title + Description */}
        <div className="lg:pr-16 lg:border-r border-slate-200 mb-8 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-black text-[#001F5F] mb-4 leading-tight tracking-tight group-hover:text-accent transition-colors duration-300">
            {t(service.titleKey)}
          </h2>
          <p className="text-slate-800 text-base leading-relaxed font-paragraph font-medium max-w-sm">
            {t(service.descKey)}
          </p>
          <Link
            to="/request-quotation"
            className="inline-flex items-center gap-2 mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-accent group/btn hover:gap-3 transition-all duration-300"
          >
            Request Quote
            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right — Bullets */}
        <div className="lg:pl-16">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-5">
            Key Capabilities
          </p>
          <ul className="space-y-3.5">
            {service.bullets.map((bKey, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check size={11} className="text-accent" strokeWidth={3} />
                </div>
                <span className="text-sm text-slate-700 leading-relaxed font-paragraph font-medium">
                  {t(bKey)}
                </span>
              </li>
            ))}
          </ul>
        </div>
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
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#001F5F] pt-28 pb-32">
          {/* Background decorations */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(196,18,48,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.03),transparent_50%)]" />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-px bg-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                  Industrial Services
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.0] tracking-tight mb-8">
                {t('servicesSection.ourServices')}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-medium">
                {t('servicesPage.heroSub')}
              </p>

              {/* Service index pills */}
              <div className="flex flex-wrap gap-2 mt-10">
                {services.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      const el = document.getElementById(`service-${s.number}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-3 py-1.5 border border-white/15 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:border-accent/60 hover:text-accent hover:bg-white/5 transition-all duration-300 active:scale-95"
                  >
                    {s.number} · {t(s.titleKey)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom angled cut */}
          <div className="absolute -bottom-px left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        </section>

        {/* ── SERVICES LIST ──────────────────────────────────── */}
        <section className="bg-white">
          <div className="container mx-auto px-4 md:px-8">
            {services.map((service, i) => (
              <ServiceRow key={i} service={service} index={i} t={t} />
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="relative bg-[#001F5F] py-24 md:py-32 overflow-hidden">
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                  Work With Us
                </span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight tracking-tight max-w-2xl mx-auto">
                {t('servicesPage.ctaTitle')}
              </h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-paragraph font-medium">
                {t('servicesPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest text-sm hover:bg-accent/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnContact')}
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#001F5F] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnQuote')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
