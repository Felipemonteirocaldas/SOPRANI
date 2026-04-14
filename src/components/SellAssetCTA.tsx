import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export default function SellAssetCTA() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Globe,
      title: "Global Network",
      ptTitle: "Alcance Global",
      desc: "Direct access to industrial hubs across Europe, Asia, and the Americas.",
      ptDesc: "Acesso direto a polos industriais na Europa, Ásia e Américas."
    },
    {
      icon: BarChart3,
      title: "Strategic Valuation",
      ptTitle: "Avaliação Estratégica",
      desc: "Technical analysis optimized for maximum market yield.",
      ptDesc: "Análise técnica otimizada para o máximo rendimento de mercado."
    },
    {
      icon: ShieldCheck,
      title: "Seamless Transition",
      ptTitle: "Transição Ágil",
      desc: "Full logistics and legal coordination handled by our elite team.",
      ptDesc: "Coordenação logística e legal integral por nossa equipe de elite."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#000]"
    >
      {/* Immersive Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        <img
          src="/images/asset-acquisition-bg.png"
          alt="Industrial Sourcing"
          className="w-full h-full object-cover opacity-60 scale-110"
        />
      </motion.div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-24 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent">
                {t('header.opportunities')}
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-8 leading-[1.1] tracking-tight">
              {t('premiumCta.industrialLiquidityTitle')}
            </h2>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-xl">
              {t('premiumCta.industrialLiquidityDesc')}
            </p>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-6 px-10 py-5 bg-accent text-white font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent-dark hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/40"
            >
              <span className="relative z-10">
                {t('header.sellMachinery')}
              </span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-all duration-500" />
            </Link>
          </motion.div>

          {/* Feature Cards Area */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/40 transition-all duration-500 cursor-default"
              >
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                      {i18n.language === 'pt' ? feature.ptTitle : feature.title}
                    </h4>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {i18n.language === 'pt' ? feature.ptDesc : feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-[0.03] z-10" />
    </section>
  );
}
