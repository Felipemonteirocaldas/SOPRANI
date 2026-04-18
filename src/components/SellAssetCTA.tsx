import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import ConversionButton from '@/components/ui/ConversionButton';

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
      title: t('premiumCta.feature1Title'),
      desc: t('premiumCta.feature1Desc')
    },
    {
      icon: BarChart3,
      title: t('premiumCta.feature2Title'),
      desc: t('premiumCta.feature2Desc')
    },
    {
      icon: ShieldCheck,
      title: t('premiumCta.feature3Title'),
      desc: t('premiumCta.feature3Desc')
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-primary"
    >
      {/* Immersive Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40 z-10" />
        <img
          src="/images/asset-acquisition-bg.png"
          alt="Industrial Sourcing"
          className="w-full h-full object-cover opacity-50 scale-105 filter greyscale brightness-50 contrast-125"
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-xs font-heading font-semibold text-accent uppercase tracking-[0.3em]">
                {t('header.opportunities')}
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-heading font-bold text-white mb-8 leading-[1.05] tracking-tight">
              {t('premiumCta.industrialLiquidityTitle')}
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-paragraph font-light max-w-2xl">
              {t('premiumCta.industrialLiquidityDesc')}
            </p>

            {/* ✦ Primary CTA — ghost-dark ConversionButton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ConversionButton
                to="/contact"
                variant="primary"
                shimmer={true}
                magnetic={true}
                id="sell-asset-contact-btn"
                aria-label="Sell your machinery to Soprani Engineering"
              >
                {t('header.sellMachinery')}
              </ConversionButton>
              <ConversionButton
                to="/request-quotation"
                variant="ghost-dark"
                shimmer={false}
                magnetic={true}
                id="sell-asset-quote-btn"
                aria-label="Request a machinery valuation"
              >
                {t('premiumCta.btnConsult')}
              </ConversionButton>
            </div>
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
                className="group p-10 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-accent/40 transition-all duration-500 cursor-default"
              >
                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.1] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                    <feature.icon size={26} strokeWidth={1} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-heading font-bold text-white mb-3 uppercase tracking-wide">
                      {feature.title}
                    </h4>
                    <p className="text-base text-slate-400 font-paragraph font-light leading-relaxed">
                      {feature.desc}
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
