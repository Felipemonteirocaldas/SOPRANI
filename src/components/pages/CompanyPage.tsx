import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';

import { Image } from '@/components/ui/image';
import { Globe, Calendar, Building2, Crosshair, Award, Users2 } from 'lucide-react';
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

// ── Timeline Video component ──────────────────────────────────────────────────
const TimelineVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for browsers that block immediate autoplay
        const playOnInteraction = () => {
          videoRef.current?.play();
          window.removeEventListener('scroll', playOnInteraction);
          window.removeEventListener('touchstart', playOnInteraction);
        };
        window.addEventListener('scroll', playOnInteraction);
        window.addEventListener('touchstart', playOnInteraction);
      });
    }
  }, [src]);

  return (
    <div className={`relative w-full h-full bg-slate-900 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className="w-full h-full object-cover saturate-[1.3] contrast-[1.1]"
      />
    </div>
  );
};

// ── Value pillar card ─────────────────────────────────────────────────────────
const ValuePillar = ({ icon: Icon, title, desc, delay = 0, border = '' }: { icon: any; title: string; desc: string; delay?: number; border?: string }) => (
  <FadeUp delay={delay} className={`p-6 md:p-14 group hover:bg-white/5 transition-all duration-500 ${border}`}>
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

  return (
    <div className="min-h-screen bg-white font-paragraph text-primary selection:bg-accent selection:text-white">
      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#00153D] pt-36 sm:pt-44 md:pt-52 pb-36">
          {/* Background layers */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(196,18,48,0.12),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,255,255,0.03),transparent_45%)]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Background Video */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover opacity-30"
              poster="/hero-fallback.jpg"
            >
              <source src="/video/SERGIOSENIOR.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#00153D] via-transparent to-[#00153D]/80" />
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
                    {t('companyPage.heroEyebrow')}
                  </span>
                </div>
                <FadeUp delay={600}>
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 tracking-tight leading-[1.1]">
                    {t('companyPage.heroTitle')}
                  </h1>
                </FadeUp>
                <FadeUp delay={800}>
                  <p className="text-base md:text-xl text-white/80 max-w-2xl font-paragraph font-light leading-relaxed mb-12">
                    {t('companyPage.p1')}
                  </p>
                </FadeUp>
              </motion.div>

              {/* Right — key figures grid */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="grid grid-cols-2 gap-px bg-white/10 lg:mt-4"
              >
                {[
                  { value: '40+', label: t('companyPage.ach1A'), icon: Calendar },
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

          {/* Angled cut to slate-50 */}
          <div className="absolute -bottom-1 left-0 right-0 h-20 bg-slate-50 origin-bottom scale-y-110" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        </section>

        {/* ── LEGACY & VISION ──────────────────────────────────────────────── */}
        <section className="relative z-10 -mt-px bg-slate-50 py-24 md:py-32 overflow-hidden border-b border-slate-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
                    {t('companyPage.legacyEyebrow')}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#00153D] mb-6 md:mb-8 tracking-tighter uppercase leading-none">
                  {t('companyPage.legacyTitle')}
                </h2>
                <div className="w-20 h-1.5 bg-accent mb-8" />
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-light italic border-l-4 border-slate-200 pl-6">
                  {t('companyPage.legacyText')}
                </p>
              </div>

              <div className="order-1 lg:order-2 relative py-10">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

                <div className="relative flex items-center justify-center">
                  {/* Senior Sergio - Legacy (Main focus) */}
                  <div className="relative z-20 w-[75%] md:w-[70%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:-rotate-2 hover:rotate-0 hover:z-50 focus-within:z-50 transition-all duration-500 group">
                    <img
                      src="/images/sergio-soprani-senior.png"
                      alt="Sergio Soprani - Founder"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <p className="text-white text-lg font-black tracking-widest uppercase">Sergio Soprani</p>
                      <p className="text-white/70 text-[10px] tracking-widest uppercase">{t('companyPage.founderTitle')}</p>
                    </div>
                  </div>

                  {/* Young Sergio - Foundation (Legacy look) */}
                  <div className="absolute -bottom-6 -left-4 md:-bottom-12 md:-left-12 z-10 w-[55%] md:w-[50%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-6 hover:rotate-0 hover:z-50 active:z-50 focus:z-50 transition-all duration-500 group cursor-pointer" tabIndex={0}>
                    <img
                      src="/images/sergio-soprani-young.png"
                      alt="Sergio Soprani - The Early Years"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE TIMELINE ────────────────────────────────────────── */}
        <section className="bg-white py-24 md:py-40 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-accent" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">{t('companyPage.journeyEyebrow')}</span>
                <div className="w-10 h-px bg-accent" />
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-[#00153D] tracking-tighter uppercase mb-6">
                {t('companyPage.journeyTitle')} <span className="text-accent">{t('companyPage.journeyTitleHighlight')}</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl font-paragraph font-light">
                {t('companyPage.journeyDesc')}
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-100 md:-translate-x-1/2 z-0">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full bg-accent"
                />
              </div>

              {/* Milestones */}
              <div className="space-y-32 relative z-10">
                {/* 1984 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative pl-16 md:pl-0">
                  <div className="flex-1 md:text-right md:pr-20 order-2 md:order-1">
                    <FadeUp delay={100}>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-[#00153D] mb-2 md:mb-4">1984</h3>
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-widest text-accent mb-4">{t('companyPage.timeline1984Title')}</h4>
                      <p 
                        className="text-slate-600 leading-relaxed font-paragraph font-medium text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: t('companyPage.timeline1984Desc') }}
                      />
                    </FadeUp>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-accent z-20 flex items-center justify-center shrink-0 absolute left-3 md:relative md:left-auto order-1 md:order-2 top-0 md:top-auto">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1 md:pl-20 order-3">
                    <FadeUp delay={300}>
                      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-100 group relative">
                        <TimelineVideo src="/video/MILAO.mp4" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </div>
                    </FadeUp>
                  </div>
                </div>

                {/* 1989 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative pl-16 md:pl-0">
                  <div className="flex-1 md:pr-20 order-3 md:order-1">
                    <FadeUp delay={300}>
                      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-100 group relative">
                        <TimelineVideo src="/video/EVOLUCAO.mp4" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </div>
                    </FadeUp>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-accent z-20 flex items-center justify-center shrink-0 absolute left-3 md:relative md:left-auto order-1 md:order-2 top-0 md:top-auto">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1 md:pl-20 order-2 md:order-3">
                    <FadeUp delay={100}>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-[#00153D] mb-2 md:mb-4">1989</h3>
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-widest text-accent mb-4">{t('companyPage.timeline1989Title')}</h4>
                      <p 
                        className="text-slate-600 leading-relaxed font-paragraph font-medium text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: t('companyPage.timeline1989Desc') }}
                      />
                    </FadeUp>
                  </div>
                </div>

                {/* 2026 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative pl-16 md:pl-0">
                  <div className="flex-1 md:text-right md:pr-20 order-2 md:order-1">
                    <FadeUp delay={100}>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-[#00153D] mb-2 md:mb-4">2026</h3>
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-widest text-accent mb-4">{t('companyPage.timeline2026Title')}</h4>
                      <p 
                        className="text-slate-600 leading-relaxed font-paragraph font-medium text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: t('companyPage.timeline2026Desc') }}
                      />
                    </FadeUp>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-accent z-20 flex items-center justify-center shrink-0 absolute left-3 md:relative md:left-auto order-1 md:order-2 top-0 md:top-auto">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                  <div className="flex-1 md:pl-20 order-3">
                    <FadeUp delay={300}>
                      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-100 group relative">
                        <TimelineVideo src="/video/ExpansionMap.mp4" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </div>
                    </FadeUp>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOBAL PRESENCE & INFRASTRUCTURE ────────────────────────────── */}
        <section className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">
                  {t('companyPage.infraEyebrow')}
                </span>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-[#00153D] tracking-tight leading-tight">
                {t('companyPage.infraTitleMain')}
              </h2>
            </div>

            <div className="relative mb-24 md:mb-32">
              <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl relative group">
                <Image src="https://static.wixstatic.com/media/9bbed2_29774577884742f689f41065796a6042~mv2.jpg?originWidth=3000&originHeight=2000" alt="Production Facility" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00153D]/60 via-transparent to-transparent" />
                
                {/* Floating detail photo */}
                <div className="absolute top-[10%] -left-4 w-1/2 md:w-3/4 aspect-video shadow-2xl z-20 border-4 md:border-8 border-white overflow-hidden">
                  <Image src="https://static.wixstatic.com/media/9bbed2_fe43fe59bc1d4d7ca944f544cd2c69bd~mv2.png?originWidth=896&originHeight=640" alt="Detail" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* — Block 2: Global + Infrastructure — */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100">
              {/* Global operations */}
              <FadeUp className="bg-white p-8 md:p-12" delay={0}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-5">
                  {t('companyPage.globalOpsTitle')}
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-[#00153D] tracking-tight leading-tight mb-6">
                  {t('companyPage.aboutGlobalTitle')}
                </h3>
                <p className="text-slate-800 text-base leading-relaxed font-paragraph font-medium">
                  {t('companyPage.aboutGlobalP')}
                </p>
                {/* Region tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Europe', 'Middle East', 'North Africa', 'Asia', 'Americas'].map(r => (
                    <span key={r} className="px-3 py-1.5 border border-slate-300 text-[10px] font-bold uppercase tracking-widest text-slate-700 bg-white">
                      {t(`regions.${r.toLowerCase().replace(/\s+/g, '')}`)}
                    </span>
                  ))}
                </div>
              </FadeUp>

              {/* Infrastructure */}
              <FadeUp className="bg-slate-50 p-8 md:p-12" delay={100}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-5">
                  {t('companyPage.infraTitle')}
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-[#00153D] tracking-tight leading-tight mb-8">
                  {t('companyPage.aboutInfraTitle')}
                </h3>
                <div className="space-y-6">
                  {[
                    { titleKey: 'companyPage.aboutInfra1T', descKey: 'companyPage.aboutInfra1D', icon: Building2 },
                    { titleKey: 'companyPage.aboutInfra2T', descKey: 'companyPage.aboutInfra2D', icon: Crosshair },
                    { titleKey: 'companyPage.aboutInfra3T', descKey: 'companyPage.aboutInfra3D', icon: Award },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#00153D] flex items-center justify-center mt-0.5">
                        <item.icon size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-heading font-black text-[#00153D] text-sm mb-1">{t(item.titleKey)}</p>
                        <p className="text-slate-700 text-sm leading-relaxed font-paragraph">{t(item.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* — Block 3: Commitment — */}
            <FadeUp className="mt-px bg-[#00153D] p-10 md:p-16" delay={50}>
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

        {/* ── VALUES / COMMITMENTS ─────────────────────────────────────────── */}
        <section className="relative bg-[#00153D] py-16 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(196,18,48,0.08),transparent_60%)]" />
          <div className="relative z-10 container mx-auto px-4 md:px-8">
            {/* Heading */}
            <FadeUp className="max-w-2xl mb-12 md:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70">{t('companyPage.comEyebrow')}</span>
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
                  <span className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">{t('companyPage.ctaEyebrow')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-[#00153D] tracking-tight leading-tight max-w-md">
                  {t('servicesPage.ctaTitle')}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#00153D] text-white font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnContact')}
                </Link>
                <Link
                  to="/request-quotation"
                  className="px-8 py-4 border border-[#00153D] text-[#00153D] font-bold uppercase tracking-widest text-sm hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  {t('servicesPage.btnQuote')}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </div>
  );
}
