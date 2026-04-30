import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  tagline: string;
  descKey: string;
  logo: string;
  logoBg: string;
  logoFilter?: string;
  website: string;
  badgeKey: string;
  specialtyKey: string;
}

const partners: Partner[] = [
  {
    id: 'koenig-bauer',
    name: 'Koenig & Bauer Metal Print',
    tagline: 'partners.kbTagline',
    descKey: 'partners.kbDesc',
    logo: '/logos/koenig-bauer-metalprint.svg',
    logoBg: '#ffffff',
    website: 'https://metalprint.koenig-bauer.com/',
    badgeKey: 'partners.certifiedPartner',
    specialtyKey: 'partners.kbSpecialty',
  },
  {
    id: 'soudronic',
    name: 'Soudronic',
    tagline: 'partners.soudronicTagline',
    descKey: 'partners.soudronicDesc',
    logo: '/logos/soudronic-dark.svg',
    logoBg: '#ffffff',
    website: 'https://www.soudronic.com',
    badgeKey: 'partners.certifiedPartner',
    specialtyKey: 'partners.soudronicSpecialty',
  },
  {
    id: 'lanico',
    name: 'Lanico Maschinenbau',
    tagline: 'partners.lanicoTagline',
    descKey: 'partners.lanicoDesc',
    logo: '/logos/Lanico_logo.png',
    logoBg: '#ffffff',
    website: 'https://www.lanico.de/',
    badgeKey: 'partners.certifiedPartner',
    specialtyKey: 'partners.lanicoSpecialty',
  },
];

export default function PartnersSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#00153D] py-20 md:py-32 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(0,59,143,0.15)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_90%,rgba(196,18,48,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', size: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-accent/50" />
              <span className="text-[10px] md:text-xs font-heading font-bold text-accent uppercase tracking-[0.4em]">
                {t('partners.label')}
              </span>
              <div className="w-10 h-[1px] bg-accent/50" />
            </div>

            <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-8 leading-[1.1] tracking-tight">
              {t('partners.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-400">
                {t('partners.titleHighlight')}
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-paragraph font-light text-balance">
              {t('partners.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.45, 0.32, 0.9] }}
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-2 shadow-2xl"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Logo Showcase */}
                <div className="relative p-10 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div className="relative z-10 w-full aspect-[3/1] bg-white rounded-2xl p-6 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  {/* Glowing background behind logo */}
                  <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Card Body */}
                <div className="px-8 pb-10 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-1.5 rounded-md bg-accent/10 border border-accent/20">
                      <ShieldCheck className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-[10px] font-heading font-bold text-accent/80 uppercase tracking-[0.2em]">
                      {t(partner.badgeKey)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading font-black text-white mb-2 leading-tight">
                    {partner.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-heading font-bold mb-6">
                    {t(partner.tagline)}
                  </p>

                  <div className="h-px w-12 bg-white/10 mb-6 group-hover:w-full transition-all duration-700" />

                  <p className="text-slate-300 text-sm leading-relaxed font-paragraph font-light mb-8 flex-1">
                    {t(partner.descKey)}
                  </p>

                  {/* Specialty Tag */}
                  <div className="inline-flex items-center gap-2 mb-8">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full group-hover:border-accent/30 group-hover:text-accent transition-colors duration-500">
                      {t(partner.specialtyKey)}
                    </span>
                  </div>

                  {/* Interaction Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span className="text-[10px] uppercase tracking-wider font-heading font-bold text-[#D4AF37]">
                        {t('partners.officialPartner')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-heading font-bold text-white/40 group-hover:text-white transition-colors duration-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Strategic Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 py-8 px-10 rounded-3xl bg-white/[0.02] border border-white/5 text-center max-w-4xl mx-auto"
        >
          <p className="text-slate-400 text-sm md:text-base font-paragraph font-light italic">
            "{t('partners.cta')}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
