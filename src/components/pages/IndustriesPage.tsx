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
} from 'lucide-react';

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
      className={`group relative p-8 bg-white border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col h-full`}
    >
      {/* Accent Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Banner for Highlighted Items */}
      {industry.highlight && (
        <div className="absolute top-0 right-0 p-3">
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent text-white">
            Premium Solution
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
        <IconComponent
          className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500"
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        {industry.tag && (
          <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest mb-2 block">
            {industry.tag}
          </span>
        )}
        <h3 className="text-xl font-heading font-bold text-primary mb-3 leading-tight">
          {industry.title}
        </h3>
        <p className="text-sm font-paragraph text-slate-500 leading-relaxed">
          {industry.description}
        </p>
      </div>

      {/* Footer / Interaction */}
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">Explore Details</span>
        <ArrowRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 🏭 INDUSTRIES PAGE
// ─────────────────────────────────────────────
export default function IndustriesPage() {
  const industries: Industry[] = [
    {
      title: 'Food Packaging',
      description: 'Comprehensive machinery and materials for various food products. From tomato paste to fruit preserves — we supply the core technology for global giants.',
      icon: Package,
      tag: 'Core Market',
      highlight: true,
    },
    {
      title: 'Tomato Cans',
      description: 'Specialized high-speed machinery and materials specifically optimized for tomato paste and related derivatives at industrial scale.',
      icon: Droplets,
    },
    {
      title: 'Tuna & Seafood',
      description: 'Hermetic sealing and specialized coating solutions for seafood packaging, ensuring maximum shelf life and product safety.',
      icon: Fish,
    },
    {
      title: 'Beverage Cans',
      description: 'Integrated production lines for beverage cans, supporting both aluminum and tinplate technologies for global distribution.',
      icon: Zap,
      tag: 'High Velocity',
    },
    {
      title: 'Powdered Milk',
      description: 'Advanced containers and assembly machinery providing moisture-resistant solutions for sensitive dairy product exports.',
      icon: Milk,
    },
    {
      title: 'Industrial Chemicals',
      description: 'Robust, impact-resistant metal packaging designed specifically for industrial materials, chemicals, and hazardous goods.',
      icon: Factory,
    },
    {
      title: 'Closures & Lids',
      description: 'High-precision production of easy-open ends, twist-off caps, and traditional metal closures with custom lithography options.',
      icon: Disc,
    },
    {
      title: 'Decorated Metal',
      description: 'Premium branding via high-definition metal printing and specialized lithography for luxury and branded consumer segments.',
      icon: Palette,
      tag: 'Marketing Focus',
    },
    {
      title: 'Chemical Products',
      description: 'Specialized chemical-resistant linings and robust external finishes for transport containers and retail chemical packaging.',
      icon: FlaskConical,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph selection:bg-accent selection:text-white">
      <main>
        {/* 🏔 HERO SECTION */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-primary overflow-x-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold font-heading">
                  Global Markets
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-8 leading-[1.1]"
              >
                Industries We<br />
                <span className="text-accent underline decoration-white/10 decoration-8 underline-offset-8 italic">Revolutionize</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/70 max-w-2xl font-paragraph leading-relaxed mb-10"
              >
                At Soprani Engineering, we deliver tailored industrial solutions across the entire spectrum of metal packaging, powering the world's most demanding production lines.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-accent text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-dark transition-all duration-300 transform hover:-translate-y-1"
                >
                  Discuss Your Needs
                </Link>
                <a
                  href="#grid"
                  className="px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
                >
                  View All Sectors
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 📊 GRID SECTION */}
        <section id="grid" className="py-24 md:py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-accent" />
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">Our Reach</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight">
                  Tailored Solutions for<br />Every Market Segment
                </h2>
              </div>
              <p className="max-w-xs text-slate-500 text-sm font-paragraph">
                Our legacy is built on identifying specific challenges in diverse industries and providing precise engineering to solve them.
              </p>
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
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/9bbed2_f08f2dc238c742ea8773ab0f4e5fd930~mv2.png"
                    alt="Industrial Excellence"
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 border-l-[12px] border-b-[12px] border-primary"
                  />
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent opacity-20 -z-10" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary opacity-20 -z-10" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-primary mb-8 underline decoration-accent/20 decoration-4 underline-offset-8">
                  Engineering Precision Across Borders
                </h3>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed italic">
                  "We don't just provide machines; we provide the competitive edge required to dominate in today's global metal packaging landscape."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Strategic Sourcing', desc: 'Direct access to global machinery networks.' },
                    { label: 'Technical Audits', desc: 'In-depth analysis of existing production lines.' },
                    { label: 'Rapid Prototype', desc: 'Quick turnaround on custom metal components.' },
                    { label: 'Quality Assurance', desc: 'Strict adherence to ISO industrial standards.' },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">{feat.label}</h4>
                        <p className="text-xs text-slate-400">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📣 CTA SECTION */}
        <section className="bg-primary py-24 md:py-32 relative group overflow-hidden">
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(196,18,48,0.1),transparent)] group-hover:bg-[radial-gradient(circle_at_center,rgba(196,18,48,0.2),transparent)] transition-all duration-1000" />

          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8">
              Ready to Optimize Your Industry Capacity?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-paragraph italic">
              Connect with our senior consultants for a confidential analysis of your production requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/request-quotation"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-primary font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500 hover:shadow-2xl"
              >
                Request Quotation
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:border-accent hover:bg-accent/10 transition-all duration-500"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
