simport React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

// ─────────────────────────────────────────────
// 🎛 BENTO CARD VARIANTS
// ─────────────────────────────────────────────
type BentoSize = 'large' | 'wide' | 'tall' | 'small';

interface Industry {
  title: string;
  description: string;
  icon: React.ElementType;
  size: BentoSize;
  accent?: boolean;
  image?: string;
  tag?: string;
}

// ─────────────────────────────────────────────
//  BENTO CARD COMPONENT
// ─────────────────────────────────────────────
function BentoCard({ industry }: { industry: Industry }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = industry.icon;

  const sizeClasses: Record<BentoSize, string> = {
    large: 'md:col-span-2 md:row-span-2',
    wide: 'md:col-span-2 md:row-span-1',
    tall: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  const isDark = industry.accent;

  return (
    <div
      className={`relative overflow-hidden group cursor-default ${sizeClasses[industry.size]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minHeight: industry.size === 'small' ? '180px' : industry.size === 'wide' ? '200px' : '260px',
        background: isDark
          ? 'linear-gradient(135deg, #001F5F 0%, #011244 60%, #0A1A3A 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #F8FAFC 60%, #EEF2F7 100%)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(226,232,240,0.9)',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? isDark
            ? '0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(196,18,48,0.12)'
            : '0 20px 50px rgba(0,31,95,0.15)'
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Background image for large card */}
      {industry.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,31,95,0.88) 0%, rgba(1,18,68,0.75) 60%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* Steel reflection shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(115deg, transparent 30%, ${isDark ? 'rgba(148,163,184,0.04)' : 'rgba(148,163,184,0.08)'} 50%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
        <div>
          {/* Tag */}
          {industry.tag && (
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] mb-4 px-2 py-1"
              style={{
                color: isDark ? 'rgba(196,18,48,0.9)' : '#C41230',
                background: isDark ? 'rgba(196,18,48,0.12)' : 'rgba(196,18,48,0.08)',
                border: isDark ? '1px solid rgba(196,18,48,0.25)' : '1px solid rgba(196,18,48,0.15)',
              }}
            >
              {industry.tag}
            </span>
          )}

          {/* ✦ Icon with Industrial Glow */}
          <div
            className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-500"
            style={{
              background: isDark
                ? hovered ? 'rgba(196,18,48,0.15)' : 'rgba(255,255,255,0.06)'
                : hovered ? 'rgba(0,31,95,0.08)' : 'rgba(0,31,95,0.05)',
              border: isDark
                ? hovered ? '1px solid rgba(196,18,48,0.5)' : '1px solid rgba(255,255,255,0.1)'
                : hovered ? '1px solid rgba(196,18,48,0.35)' : '1px solid rgba(0,31,95,0.12)',
              boxShadow: hovered
                ? isDark
                  ? '0 0 18px rgba(196,18,48,0.35), 0 0 35px rgba(196,18,48,0.12)'
                  : '0 0 14px rgba(196,18,48,0.2)'
                : 'none',
            }}
          >
            <IconComponent
              size={20}
              strokeWidth={1.2}
              style={{
                color: isDark
                  ? hovered ? '#C41230' : 'rgba(255,255,255,0.85)'
                  : hovered ? '#C41230' : '#001F5F',
                transition: 'color 0.4s ease',
              }}
            />
          </div>

          {/* Title */}
          <h3
            className="font-heading font-bold mb-2 leading-tight transition-colors duration-400"
            style={{
              fontSize: industry.size === 'large' ? '1.5rem' : industry.size === 'wide' ? '1.25rem' : '1.1rem',
              color: isDark ? '#ffffff' : '#001F5F',
            }}
          >
            {industry.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed font-normal transition-colors duration-400"
            style={{
              color: isDark ? 'rgba(255,255,255,0.65)' : '#475569',
              display: industry.size === 'small' ? '-webkit-box' : 'block',
              WebkitLineClamp: industry.size === 'small' ? 2 : undefined,
              WebkitBoxOrient: industry.size === 'small' ? 'vertical' as any : undefined,
              overflow: industry.size === 'small' ? 'hidden' : 'visible',
            }}
          >
            {industry.description}
          </p>
        </div>

        {/* Bottom arrow — visible on large/wide */}
        {(industry.size === 'large' || industry.size === 'wide') && (
          <div
            className="flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            style={{
              color: isDark ? 'rgba(196,18,48,0.9)' : '#C41230',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            Learn more <ArrowRight size={12} />
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 🏭 INDUSTRIES PAGE
// ─────────────────────────────────────────────
export default function IndustriesPage() {
  const industries: Industry[] = [
    {
      title: 'Food Packaging',
      description: 'Comprehensive solutions for food packaging manufacturers including cans for various food products. From tomato paste to fruit preserves — we supply machinery, spare parts, and expertise.',
      icon: Package,
      size: 'large',
      accent: true,
      image: 'https://static.wixstatic.com/media/9bbed2_f08f2dc238c742ea8773ab0f4e5fd930~mv2.png',
      tag: 'Core Market',
    },
    {
      title: 'Tomato Cans',
      description: 'Specialized machinery and materials for tomato paste and tomato product packaging at scale.',
      icon: Droplets,
      size: 'small',
      accent: false,
    },
    {
      title: 'Tuna & Seafood',
      description: 'Equipment and solutions specifically designed for tuna and seafood packaging production lines.',
      icon: Fish,
      size: 'small',
      accent: false,
    },
    {
      title: 'Beverage Cans',
      description: 'Complete solutions for beverage can production including aluminum and tinplate options for global markets.',
      icon: Zap,
      size: 'wide',
      accent: true,
      tag: 'High Demand',
    },
    {
      title: 'Powdered Milk Containers',
      description: 'Specialized containers and machinery for powdered milk and dairy product packaging.',
      icon: Milk,
      size: 'tall',
      accent: false,
    },
    {
      title: 'Industrial Cans',
      description: 'Robust packaging solutions for industrial products and chemicals in metal containers.',
      icon: Factory,
      size: 'small',
      accent: false,
    },
    {
      title: 'Closures & Lids',
      description: 'Production equipment and materials for metal closures and lids for various container types.',
      icon: Disc,
      size: 'small',
      accent: false,
    },
    {
      title: 'Decorated Metal Packaging',
      description: 'Advanced decorating and printing solutions for branded and decorated metal packaging with precision.',
      icon: Palette,
      size: 'wide',
      accent: true,
      tag: 'Premium',
    },
  ];

  return (
    <div className="min-h-screen font-paragraph text-primary" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)' }}>
      <Header />
      <main className="flex-grow">

        {/* ══ HERO ══ */}
        <section
          className="text-white pt-24 sm:pt-28 pb-20 md:pb-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #001F5F 0%, #011244 60%, #0A1A3A 100%)' }}
        >
          {/* Grid texture */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          {/* Steel shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(148,163,184,0.05) 50%, transparent 65%)' }}
          />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Our Markets</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Industries<br />
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>We Serve</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Comprehensive solutions for metal packaging manufacturers across diverse industries worldwide.
            </p>
          </div>
        </section>

        {/* ══ BENTO GRID SECTION ══ */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Our Expertise</span>
                <div className="w-8 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
                Industries We Support
              </h2>
              <p className="text-text-muted max-w-xl mx-auto">
                From food packaging to industrial containers — Soprani covers every segment of global metal packaging.
              </p>
            </div>

            {/* ✦ BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
              {industries.map((industry, idx) => (
                <BentoCard key={idx} industry={industry} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXPERTISE SPLIT ══ */}
        <section
          className="py-20 md:py-28"
          style={{ background: 'linear-gradient(135deg, #001F5F 0%, #011244 100%)' }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-white text-center">
              Our Industry Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Food & Beverage',
                  items: [
                    'Tomato paste and sauce cans',
                    'Tuna and seafood packaging',
                    'Powdered milk containers',
                    'Beverage cans (aluminum and tinplate)',
                    'General food packaging solutions',
                  ],
                },
                {
                  title: 'Specialized Packaging',
                  items: [
                    'Industrial containers',
                    'Chemical packaging',
                    'Closures and lids production',
                    'Decorated metal packaging',
                    'Custom container solutions',
                  ],
                },
                {
                  title: 'Production Support',
                  items: [
                    'Machinery sourcing and supply',
                    'Spare parts identification',
                    'Technical assistance',
                    'Equipment revamping',
                    'Material trading',
                  ],
                },
                {
                  title: 'Geographic Coverage',
                  items: ['Europe', 'Middle East', 'North Africa', 'Asia', 'Americas'],
                },
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-accent" />
                    <h3 className="text-lg font-heading font-bold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-center gap-3">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section
          className="py-20 md:py-28 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #C41230 0%, #A10F27 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)' }}
          />
          <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Let's Discuss Your Industry Needs
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Contact us to discuss how Soprani Engineering can support your metal packaging operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm font-bold uppercase tracking-wider"
              >
                Contact Us
              </Link>
              <Link
                to="/request-quotation"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm font-bold uppercase tracking-wider"
              >
                Request Information
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
