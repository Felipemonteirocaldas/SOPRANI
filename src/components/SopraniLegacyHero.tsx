import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function SopraniLegacyHero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  // Using an array ref for the cards to stagger them easily
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    // gsap.context handles appropriate cleanup of animations in React strict mode/hot reloads
    const ctx = gsap.context(() => {
      // 1. Initial Load Animation (Counter from 0 to 40)
      if (countRef.current) {
        gsap.to(countRef.current, {
          innerHTML: 40,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 }, // Ensures integers only during tweening
        });
      }

      // 2. Scrollytelling Animation (Pinned section)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", 
          pin: true,
          scrub: 1, // Smooth scrubbing linking to scrollbar
        }
      });

      // Scrub Animation Sequence
      tl.to(heroContentRef.current, {
        y: () => -window.innerHeight, // Fly completely off screen to bypass opacity/backdrop-filter bug
        duration: 1,
        ease: "power2.inOut"
      })
      // Clip-path shifts the video to the right, showing the dark background underneath
      .to(videoWrapperRef.current, {
        clipPath: "inset(15% 5% 15% 55% round 16px)", 
        duration: 2,
        ease: "power2.inOut"
      }, "<") // Start at the same time as the previous animation
      // Parallax stagger entrance for product cards on the left
      .to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out"
      }, "<0.6"); // Start slightly after the video starts shifting

    }, containerRef); // Scope GSAP selection to containerRef

    // Cleanup: revert all animations triggered in this context when component unmounts
    return () => ctx.revert(); 
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-slate-50 overflow-hidden font-paragraph flex items-center justify-center z-10"
    >
      {/* 
        Background Video Wrapper 
      */}
      <div 
        ref={videoWrapperRef} 
        className="absolute inset-0 z-0 origin-center will-change-[clip-path]"
        style={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      >
        <video 
          className="w-full h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="/images/hero-bg.png"
          preload="auto"
          src="/video/videohero.mp4" 
        />
        {/* Overlays to ensure dark logo legibility without buggy blur filters */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/90 via-white/50 to-transparent opacity-80" />
      </div>

      {/* Center Hero Content (Title & Badge) */}
      <div 
        ref={heroContentRef} 
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-center"
      >
        <img 
          src="/images/logo.png" 
          alt="Soprani" 
          className="w-[80vw] max-w-[450px] mb-8 object-contain drop-shadow-2xl" 
        />
        
        {/* Responsive Badge */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-8 py-3 md:px-10 md:py-4 flex items-center shadow-xl">
          <span className="text-lg md:text-xl font-bold font-heading text-[#001F5F] tracking-[0.2em] uppercase">
            + <span ref={countRef}>0</span>{t('heroLegacy.badge').split('40')[1]}
          </span>
        </div>
      </div>

      {/* Left Product Cards (Revealed on Scroll) */}
      <div className="absolute left-0 top-0 bottom-0 w-full md:w-[45%] lg:w-[40%] p-6 md:p-12 xl:p-16 flex flex-col justify-center gap-6 md:gap-10 z-10 pointer-events-none">
        
        {/* Card 1 */}
        <div 
          ref={addToCardsRef} 
          className="product-card opacity-0 translate-y-32 pointer-events-auto flex flex-col gap-4 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 rounded-xl hover:border-slate-300 transition-colors"
        >
          <div>
            <span className="text-[#C41230] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
              {t('heroLegacy.card1.label')}
            </span>
            <h3 className="text-3xl md:text-4xl font-heading font-black text-[#001F5F] tracking-tight mb-4">{t('heroLegacy.card1.title')}</h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {t('heroLegacy.card1.desc')}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          ref={addToCardsRef} 
          className="product-card opacity-0 translate-y-32 pointer-events-auto flex flex-col gap-4 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 rounded-xl hover:border-slate-300 transition-colors"
        >
          <div>
             <span className="text-[#C41230] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
              {t('heroLegacy.card2.label')}
            </span>
            <h3 className="text-3xl md:text-4xl font-heading font-black text-[#001F5F] tracking-tight mb-4">{t('heroLegacy.card2.title')}</h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {t('heroLegacy.card2.desc')}
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
