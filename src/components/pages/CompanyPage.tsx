import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { Subsidiaries } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Globe, Calendar, Building2, Crosshair, Award, Users2, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// ── Animated wrapper ───────────────────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

// ── Stat box ──────────────────────────────────────────────────────────────────
const StatBox = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <FadeUp delay={delay} className="p-6 md:p-10 text-center border-r border-gray-100 last:border-r-0 group hover:bg-gray-50 transition-colors duration-300">
    <div className="text-3xl md:text-5xl font-heading font-black text-accent mb-2 tracking-tighter">{value}</div>
    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 leading-relaxed">{label}</p>
  </FadeUp>
);

// ── Value pillar card ─────────────────────────────────────────────────────────
const ValuePillar = ({ icon: Icon, title, desc, delay = 0, border = '' }: { icon: any; title: string; desc: string; delay?: number; border?: string }) => (
  <FadeUp delay={delay} className={`p-10 md:p-14 group hover:bg-white/5 transition-all duration-500 ${border}`}>
    <div className="w-12 h-12 bg-white/10 border border-white/15 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
      <Icon size={20} className="text-white" />
    </div>
    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-4 group-hover:text-accent transition-colors duration-300">
      {title}
    </h3>
    <p className="text-slate-300 text-sm leading-relaxed font-paragraph font-normal">{desc}</p>
  </FadeUp>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function CompanyPage() {
  const { t } = useTranslation();
  const [subsidiaries, setSubsidiaries] = useState<Subsidiaries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BaseCrudService.getAll<Subsidiaries>('subsidiaries', [], { limit: 50 })
      .then(r => setSubsidiaries(r.items))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-accent selection:text-white">
      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#001F5F] pt-28 pb-36">
          {/* Background layers */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(196,18,48,0.12),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,255,255,0.03),transparent_45%)]" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left — text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-accent" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                    Corporate Legacy
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight mb-8">
                  {t('companyPage.heroTitle')}
                </h1>
                <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-xl font-paragraph font-medium mb-6">
                  {t('companyPage.p1')}
                </p>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl font-paragraph font-normal">
                  {t('companyPage.p2')}
                </p>
              </motion.div>

              {/* Right — key figures grid */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="grid grid-cols-2 gap-px bg-white/10 lg:mt-4"
              >
                {[
                  { value: '30+', label: t('companyPage.ach1A'), icon: Calendar },
                  { value: '350+', label: t('companyPage.ach2A'), icon: Users2 },
                  { value: t('companyPage.ach3V'), label: t('companyPage.ach3A'), icon: Globe },
                  { value: t('companyPage.ach4V'), label: t('companyPage.ach4A'), icon: Award },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm px-6 py-8 flex flex-col gap-2 hover:bg-white/10 transition-colors duration-300">
                    <item.icon size={16} className="text-accent mb-1" />
                    <span className="text-3xl font-heading font-black text-white tracking-tight">{item.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Angled cut to white */}
          <div className="absolute -bottom-px left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        </section>

        {/* ── ABOUT / HISTORY ──────────────────────────────────────────────── */}
        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8">

            {/* — Block 1: Company history — */}
            <FadeUp className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 md:mb-28">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
                    {t('companyPage.aboutEyebrow')}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-[#001F5F] tracking-tight leading-tight mb-8">
                  {t('companyPage.aboutTitle')}
                </h2>
                <p className="text-slate-800 text-base md:text-lg leading-relaxed mb-6 font-paragraph font-medium">
                  {t('companyPage.aboutP1')}
                </p>
                <p className="text-slate-700 text-base leading-relaxed font-paragraph">
                  {t('companyPage.aboutP2')}
                </p>
              </div>

              {/* Right — founding callout */}
              <div className="flex flex-col gap-4">
                {/* Year card */}
                <div className="bg-[#001F5F] p-8 md:p-10 flex-1">
                  <span className="text-7xl md:text-8xl font-heading font-black text-white/10 leading-none block mb-4 select-none">
                    1984
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-2">Founded</p>
                  <p className="text-white text-sm font-paragraph leading-relaxed">
                    Eng. Sergio Soprani · Milan, Italy
                  </p>
                </div>
                {/* Today card */}
                <div className="bg-slate-50 border border-slate-100 p-8 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-2">Today</p>
                  <p className="text-[#001F5F] font-heading font-black text-lg mb-1">Matteo Soprani</p>
                  <p className="text-slate-700 text-sm font-paragraph leading-relaxed">
                    Leading international expansion with 40+ years of accumulated technical expertise.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* — Block 2: Global + Infrastructure — */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100">
              {/* Global operations */}
              <FadeUp className="bg-white p-8 md:p-12" delay={0}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-5">
                  Global Operations
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-[#001F5F] tracking-tight leading-tight mb-6">
                  {t('companyPage.aboutGlobalTitle')}
                </h3>
                <p className="text-slate-800 text-base leading-relaxed font-paragraph font-medium">
                  {t('companyPage.aboutGlobalP')}
                </p>
                {/* Region tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Europe', 'Middle East', 'North Africa', 'Asia', 'Americas'].map(r => (
                    <span key={r} className="px-3 py-1.5 border border-slate-300 text-[10px] font-bold uppercase tracking-widest text-slate-700 bg-white">
                      {r}
                    </span>
                  ))}
                </div>
              </FadeUp>

              {/* Infrastructure */}
              <FadeUp className="bg-slate-50 p-8 md:p-12" delay={100}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-5">
                  Infrastructure
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-[#001F5F] tracking-tight leading-tight mb-8">
                  {t('companyPage.aboutInfraTitle')}
                </h3>
                <div className="space-y-6">
                  {[
                    { titleKey: 'companyPage.aboutInfra1T', descKey: 'companyPage.aboutInfra1D', icon: Building2 },
                    { titleKey: 'companyPage.aboutInfra2T', descKey: 'companyPage.aboutInfra2D', icon: Crosshair },
                    { titleKey: 'companyPage.aboutInfra3T', descKey: 'companyPage.aboutInfra3D', icon: Award },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#001F5F] flex items-center justify-center mt-0.5">
                        <item.icon size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-heading font-black text-[#001F5F] text-sm mb-1">{t(item.titleKey)}</p>
                        <p className="text-slate-700 text-sm leading-relaxed font-paragraph">{t(item.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* — Block 3: Commitment — */}
            <FadeUp className="mt-px bg-[#001F5F] p-10 md:p-16" delay={50}>
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70">
                    {t('companyPage.aboutCommitTitle')}
                  </span>
                  <div className="w-8 h-px bg-accent" />
                </div>
                <p className="text-white text-base md:text-lg leading-relaxed font-paragraph font-medium">
                  {t('companyPage.aboutCommitP')}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SUBSIDIARIES ─────────────────────────────────────────────────── */}
        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            {/* Header */}
            <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Organizational Map</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#001F5F] tracking-tight leading-none mb-5">
                  {t('companyPage.subTitle')}
                </h2>
                <div className="w-16 h-1 bg-accent" />
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed max-w-xs font-paragraph font-medium">
                {t('companyPage.subDesc')}
              </p>
            </FadeUp>

            {/* Cards */}
            {!isLoading && subsidiaries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
                {subsidiaries.map((sub, i) => (
                  <FadeUp key={sub._id} delay={i * 60} className="bg-white group hover:bg-[#001F5F] transition-all duration-500 p-8 md:p-10">
                    {sub.logo && (
                      <div className="mb-8 h-10 flex items-center grayscale group-hover:grayscale-0 group-hover:brightness-0 group-hover:invert transition-all duration-500">
                        <Image src={sub.logo} alt={sub.subsidiaryName || ''} className="max-h-full w-auto object-contain" />
                      </div>
                    )}
                    <h3 className="text-lg font-heading font-black text-primary group-hover:text-white uppercase tracking-tight mb-4 transition-colors duration-300">
                      {sub.subsidiaryName}
                    </h3>
                    <div className="space-y-2 mb-6">
                      {sub.location && (
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <Globe size={12} className="text-accent" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{sub.location}</span>
                        </div>
                      )}
                      {sub.foundingYear && (
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors">
                          <Calendar size={12} className="text-accent" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{t('companyPage.subFounded')} {sub.foundingYear}</span>
                        </div>
                      )}
                    </div>
                    {sub.description && (
                      <p className="text-slate-700 group-hover:text-slate-300 text-sm mb-8 line-clamp-3 leading-relaxed transition-colors duration-300">
                        {sub.description}
                      </p>
                    )}
                    {sub.websiteLink && (
                      <a href={sub.websiteLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-white transition-colors duration-300">
                        {t('companyPage.subVisit')} <ArrowRight size={11} />
                      </a>
                    )}
                  </FadeUp>
                ))}
              </div>
            ) : !isLoading ? (
              /* Global Presence Grid — shown when no subsidiaries in DB */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
                {[
                  {
                    region: 'Europe',
                    flag: '🇮🇹',
                    hq: 'Milan, Italy',
                    desc: 'Headquarters and primary technical operations hub. Base for engineering, logistics and strategic partnerships.',
                    markets: ['Italy', 'Germany', 'France', 'Spain', 'UK'],
                  },
                  {
                    region: 'Americas',
                    flag: '🌎',
                    hq: 'North & South America',
                    desc: 'Regional support for machinery sourcing and technical assistance for metal packaging producers.',
                    markets: ['Brazil', 'Mexico', 'USA', 'Argentina'],
                  },
                  {
                    region: 'Asia',
                    flag: '🌏',
                    hq: 'Southeast Asia',
                    desc: 'Growing presence in industrial equipment supply and spare parts for canning and packaging lines.',
                    markets: ['China', 'Thailand', 'Vietnam', 'India'],
                  },
                  {
                    region: 'MENA',
                    flag: '🌍',
                    hq: 'Middle East & Africa',
                    desc: 'Technical consulting and machinery brokerage serving the metal packaging and food processing sectors.',
                    markets: ['UAE', 'Saudi Arabia', 'Morocco', 'Egypt'],
                  },
                ].map((reg, i) => (
                  <FadeUp key={reg.region} delay={i * 80} className="bg-white group hover:bg-[#001F5F] transition-all duration-500 p-8 md:p-10 flex flex-col">
                    {/* Flag + region */}
                    <div className="mb-6">
                      <span className="text-3xl mb-3 block">{reg.flag}</span>
                      <h3 className="text-lg font-heading font-black text-primary group-hover:text-white uppercase tracking-tight transition-colors duration-300">
                        {reg.region}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent mt-1">{reg.hq}</p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed mb-6 flex-1 transition-colors duration-300">
                      {reg.desc}
                    </p>

                    {/* Markets */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {reg.markets.map(m => (
                        <span key={m} className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 border border-slate-200 group-hover:border-white/20 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {m}
                        </span>
                      ))}
                    </div>
                  </FadeUp>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* ── VALUES / COMMITMENTS ─────────────────────────────────────────── */}
        <section className="relative bg-[#001F5F] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(196,18,48,0.08),transparent_60%)]" />
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            {/* Heading */}
            <FadeUp className="max-w-2xl mb-20 md:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70">Our Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none">
                {t('companyPage.comTitle')}
              </h2>
            </FadeUp>

            {/* Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
              <ValuePillar icon={Building2} title={t('companyPage.com1T')} desc={t('companyPage.com1D')} delay={100} />
              <ValuePillar icon={Globe} title={t('companyPage.com2T')} desc={t('companyPage.com2D')} delay={200} border="md:border-x md:border-white/10" />
              <ValuePillar icon={Crosshair} title={t('companyPage.com3T')} desc={t('companyPage.com3D')} delay={300} />
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="bg-white border-t border-slate-100 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-8">
            <FadeUp className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">Get In Touch</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-[#001F5F] tracking-tight leading-tight max-w-md">
                  {t('servicesPage.ctaTitle')}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#001F5F] text-white font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnContact')}
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-4 border border-[#001F5F] text-[#001F5F] font-bold uppercase tracking-widest text-sm hover:bg-[#001F5F] hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnQuote')}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
