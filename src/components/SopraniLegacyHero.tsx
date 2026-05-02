import React, { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SopraniLegacyHero() {
  const { t } = useTranslation();

  const scrollToContent = () => {
    const nextSection = document.getElementById('partners-section') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: 'smooth'
      });
    }
  };

  const headline = t('heroLegacy.headline');
  const words = useMemo(() => headline.split(' '), [headline]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%", rotate: 5, opacity: 0 },
    visible: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  return (
    <section
      className="relative w-full min-h-[110svh] lg:min-h-[105vh] bg-[#001F5F] overflow-hidden flex items-center justify-center z-10"
    >
      {/* 
        Video Background Overlay 
      */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          src="/video/videohero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-[90rem] mx-auto pt-40 sm:pt-56 pb-32">
        {/* Advanced Text Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVideoLoaded ? "visible" : "hidden"}
          className="w-full"
        >
          <h1 className="text-[1.8rem] xs:text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] font-heading font-black text-white leading-[1.1] sm:leading-[0.95] tracking-tighter mb-8 sm:mb-10 drop-shadow-2xl uppercase flex flex-wrap justify-center gap-x-[0.25em] gap-y-0 px-2 break-words">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pt-[0.2em] pb-[0.2em] px-[0.1em] -mt-[0.2em] -mb-[0.2em] -mx-[0.1em]">
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-transform"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subheadline Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4"
        >
          <p className="text-sm sm:text-lg md:text-xl font-light text-white/80 leading-relaxed tracking-tight drop-shadow-md mb-10 text-balance">
            {t('heroLegacy.subheadline')}
          </p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: "circOut" }}
            className="flex h-[4px] w-48 mx-auto rounded-full overflow-hidden shadow-[0_0_20px_rgba(196,18,48,0.3)]"
          >
            <div className="flex-1 bg-[#008C45]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#C41230]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors duration-300 z-20 group flex flex-col items-center gap-2"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll
        </span>
        <div className="relative">
          <ChevronDown
            size={32}
            className="animate-bounce group-hover:scale-110 transition-transform"
            strokeWidth={1.5}
          />
        </div>
      </motion.button>
    </section>
  );
}
