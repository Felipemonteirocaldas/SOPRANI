import React from 'react';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Droplets,
  Fish,
  Milk,
  Factory,
  Disc,
  Palette,
  Zap,
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Globe2,
  Settings2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─────────────────────────────────────────────
// 🧩 TYPES
// ─────────────────────────────────────────────
interface Industry {
  title: string;
  description: string;
  icon: React.ElementType;
  tag?: string;
  highlight?: boolean;
}

// ─────────────────────────────────────────────
// 🃏 INDUSTRY CARD
// ─────────────────────────────────────────────
const IndustryCard = ({ industry, index }: { industry: Industry; index: number }) => {
  const IconComponent = industry.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,31,95,0.1)] hover:-translate-y-2 flex flex-col h-full overflow-hidden"
    >
      {/* Decorative Background Icon */}
      <IconComponent className="absolute -right-10 -bottom-10 w-48 h-48 text-slate-50 group-hover:text-slate-100 transition-colors duration-500 rotate-12" />

      <div className="relative z-10 flex-grow">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#001F5F] mb-8 group-hover:scale-110 group-hover:bg-accent transition-all duration-500 shadow-lg shadow-[#001F5F]/20 group-hover:shadow-accent/30">
          <IconComponent
            className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12"
            strokeWidth={1.5}
          />
        </div>

        {industry.tag && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-accent" />
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">
              {industry.tag}
            </span>
          </div>
        )}

        <h3 className="text-2xl font-heading font-black text-[#001F5F] mb-4 tracking-tight group-hover:text-accent transition-colors">
          {industry.title}
        </h3>
        <p className="text-slate-500 leading-relaxed font-medium">
          {industry.description}
        </p>
      </div>

      {/* Footer / Interaction */}
      <div className="relative z-10 mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-black text-[#001F5F]/40 uppercase tracking-widest group-hover:text-accent transition-colors">{t('industriesPage.cardSector')}</span>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 🏭 INDUSTRIES PAGE
// ─────────────────────────────────────────────
export default function IndustriesPage() {
  const { t } = useTranslation();

  const industries: Industry[] = [
    {
      title: t('industriesPage.sector1Title'),
      description: t('industriesPage.sector1Desc'),
      icon: Package,
      tag: t('industriesPage.sector1Tag'),
      highlight: true,
    },
    {
      title: t('industriesPage.sector2Title'),
      description: t('industriesPage.sector2Desc'),
      icon: Droplets,
    },
    {
      title: t('industriesPage.sector3Title'),
      description: t('industriesPage.sector3Desc'),
      icon: Fish,
    },
    {
      title: t('industriesPage.sector4Title'),
      description: t('industriesPage.sector4Desc'),
      icon: Zap,
      tag: t('industriesPage.sector4Tag'),
    },
    {
      title: t('industriesPage.sector5Title'),
      description: t('industriesPage.sector5Desc'),
      icon: Milk,
    },
    {
      title: t('industriesPage.sector6Title'),
      description: t('industriesPage.sector6Desc'),
      icon: Factory,
    },
    {
      title: t('industriesPage.sector7Title'),
      description: t('industriesPage.sector7Desc'),
      icon: Disc,
    },
    {
      title: t('industriesPage.sector8Title'),
      description: t('industriesPage.sector8Desc'),
      icon: Palette,
      tag: t('industriesPage.sector8Tag'),
    },
    {
      title: t('industriesPage.sector9Title'),
      description: t('industriesPage.sector9Desc'),
      icon: FlaskConical,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-paragraph selection:bg-accent/20 selection:text-[#001F5F]">
      <main>
        {/* 🏔 HERO SECTION */}
        <section className="relative min-h-[70vh] flex items-center bg-[#001F5F] overflow-hidden pt-32 pb-20">
          {/* Industrial Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-[2px] bg-accent" />
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">{t('industriesPage.heroEyebrow')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 leading-[0.9] tracking-tighter"
              >
                {t('industriesPage.heroTitle')}<br />
                <span className="text-accent italic">{t('industriesPage.heroTitleAccent')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-2xl text-slate-300 max-w-2xl font-medium leading-relaxed mb-12"
              >
                {t('industriesPage.heroSub')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="px-10 py-5 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_10px_30px_rgba(196,18,48,0.3)] hover:-translate-y-1">
                  {t('industriesPage.heroBtn1')}
                </Link>
                <a href="#grid" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black uppercase tracking-widest text-[11px] transition-all duration-300 hover:bg-white hover:text-[#001F5F]">
                  {t('industriesPage.heroBtn2')}
                </a>
              </motion.div>
            </div>
          </div>

          {/* Diagonal Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        </section>

        {/* 📊 GRID SECTION */}
        <section id="grid" className="py-24 md:py-40 bg-white relative z-10 -mt-px">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-10 h-[2px] bg-accent" />
                  <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">{t('industriesPage.gridEyebrow')}</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-[#001F5F] leading-tight tracking-tighter">
                  {t('industriesPage.gridTitle')}<br />{t('industriesPage.gridTitleAccent')}
                </h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-md text-slate-500 text-lg font-medium leading-relaxed pt-4"
              >
                {t('industriesPage.gridDesc')}
              </motion.p>
            </div>

            {/* THE RESPONSIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, idx) => (
                <IndustryCard key={idx} industry={industry} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* 🎓 CORPORATE EXPERTISE */}
        <section className="py-24 md:py-40 bg-[#f8f9fb] relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,31,95,0.15)]">
                  <Image
                    src="https://static.wixstatic.com/media/9bbed2_f08f2dc238c742ea8773ab0f4e5fd930~mv2.png"
                    alt="Industrial Excellence"
                    className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F5F]/60 via-transparent to-transparent opacity-60" />

                  {/* Floating Stat */}
                  <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <div className="text-white text-3xl font-black font-heading mb-1">40+</div>
                    <div className="text-white/70 text-[10px] font-black uppercase tracking-widest leading-none">{t('stats.sublabel2')}</div>
                  </div>
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6 block">{t('industriesPage.expertiseEyebrow')}</span>
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-[#001F5F] mb-8 tracking-tighter leading-tight">
                    {t('industriesPage.expertiseTitle')}
                  </h3>
                  <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium italic border-l-4 border-accent pl-8">
                    {t('industriesPage.expertiseQuote')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { label: t('industriesPage.feat1Title'), desc: t('industriesPage.feat1Desc'), icon: Globe2 },
                      { label: t('industriesPage.feat2Title'), desc: t('industriesPage.feat2Desc'), icon: Settings2 },
                      { label: t('industriesPage.feat3Title'), desc: t('industriesPage.feat3Desc'), icon: Zap },
                      { label: t('industriesPage.feat4Title'), desc: t('industriesPage.feat4Desc'), icon: ShieldCheck },
                    ].map((feat, i) => {
                      const Icon = feat.icon;
                      return (
                        <div key={i} className="flex gap-5 group/feat">
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover/feat:bg-accent group-hover/feat:border-accent transition-all duration-500">
                            <Icon className="w-5 h-5 text-accent group-hover/feat:text-white transition-colors" />
                          </div>
                          <div>
                            <h4 className="font-black text-[#001F5F] mb-1 uppercase tracking-wider text-xs">{feat.label}</h4>
                            <p className="text-sm text-slate-400 font-medium">{feat.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 📣 CTA SECTION */}
        <section className="relative bg-[#001F5F] py-24 md:py-40 overflow-hidden -mt-px">
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{t('industriesPage.ctaEyebrow')}</span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 leading-tight tracking-tighter max-w-3xl mx-auto">
                {t('industriesPage.ctaTitle')}
              </h2>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                {t('industriesPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/request-quotation"
                  className="group flex items-center justify-center gap-3 px-12 py-5 bg-accent text-white font-black uppercase tracking-widest text-[11px] transition-all duration-500 hover:bg-accent-dark hover:shadow-[0_20px_40px_rgba(196,18,48,0.3)] hover:-translate-y-1"
                >
                  {t('industriesPage.ctaBtn1')}
                </Link>
                <Link
                  to="/contact"
                  className="px-12 py-5 border-2 border-white/20 text-white font-black uppercase tracking-widest text-[11px] transition-all duration-500 hover:bg-white hover:text-[#001F5F] hover:-translate-y-1"
                >
                  {t('industriesPage.ctaBtn2')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
