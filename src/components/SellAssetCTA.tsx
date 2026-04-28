import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import ConversionButton from '@/components/ui/ConversionButton';
import ThreeProductionLine from '@/components/ThreeProductionLine';

export default function SellAssetCTA() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
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
        className="absolute inset-x-0 top-[-10%] h-[120%] z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40 z-10" />
        <img
          src="/images/asset-acquisition-bg.png"
          alt="Industrial Sourcing"
          className="w-full h-full object-cover opacity-40 scale-110 filter grayscale brightness-[0.4] contrast-125"
        />
      </motion.div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 relative z-20 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="mb-10">
              <span className="tag-shimmer inline-block px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em]">
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

          {/* 3D Production Line Area */}
          <div className="lg:col-span-5 w-full h-[400px] lg:h-[600px]">
            <ThreeProductionLine />
          </div>

        </div>
      </div>

      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-[0.03] z-10" />
    </section>
  );
}
