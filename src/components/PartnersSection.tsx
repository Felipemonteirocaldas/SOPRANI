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
];

export default function PartnersSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,#003B8F_0%,transparent_40%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#002355_0%,transparent_40%)]" />
      </div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-heading font-semibold text-accent uppercase tracking-widest">
                {t('partners.label')}
              </span>
              <div className="w-8 h-0.5 bg-accent" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
              {t('partners.title')}
              <span className="block text-accent">{t('partners.titleHighlight')}</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-paragraph font-normal">
              {t('partners.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-full"
            >
              <div className="relative bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500 hover:bg-white/8 overflow-hidden h-full flex flex-col">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-700" />

                {/* Logo Area — fixed height so both cards align */}
                <div
                  className="flex items-center justify-center px-6 sm:px-10 h-20 sm:h-24 flex-shrink-0"
                  style={{ backgroundColor: partner.logoBg }}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-10 object-contain"
                    style={{ maxWidth: '220px' }}
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                    <span className="text-[10px] font-heading font-bold text-accent uppercase tracking-[0.2em]">
                      {t(partner.badgeKey)}
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <h3 className="text-xl md:text-2xl font-heading font-black text-white mb-1 leading-tight">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-heading font-semibold mb-5">
                    {t(partner.tagline)}
                  </p>

                  {/* Specialty tag */}
                  <div className="inline-block px-3 py-1 border border-accent bg-accent/5 text-accent text-[10px] font-bold uppercase tracking-wider mb-5">
                    {t(partner.specialtyKey)}
                  </div>

                  {/* Description */}
                  <p className="text-slate-200 text-sm leading-relaxed font-paragraph font-normal mb-8">
                    {t(partner.descKey)}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" strokeWidth={1.5} style={{ color: '#D4AF37' }} />
                      <span className="text-[10px] uppercase tracking-wider font-heading font-semibold" style={{ color: '#D4AF37' }}>
                        {t('partners.officialPartner')}
                      </span>
                    </div>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-heading font-bold text-blue-300 hover:text-white uppercase tracking-wider transition-colors duration-300 group/link"
                    >
                      {t('partners.visitWebsite')}
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-300 text-sm font-paragraph font-normal">
            {t('partners.cta')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

