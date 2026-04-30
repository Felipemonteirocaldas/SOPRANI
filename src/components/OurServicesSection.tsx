import { Briefcase, Wrench, Clipboard, RotateCw, ShoppingCart, Hammer, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ConversionButton from '@/components/ui/ConversionButton';

// ─────────────────────────────────────────────
// 🔵 SERVICE CARD — with Industrial Glow
// ─────────────────────────────────────────────
function ServiceCard({
  service,
  isLastColumn,
  isLastCard,
}: {
  service: { number: string; title: string; description: string; icon: LucideIcon };
  isLastColumn: boolean;
  isLastCard: boolean;
}) {
  const IconComponent = service.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/services"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative p-6 sm:p-8 lg:p-14
        border-b border-slate-100/60
        group overflow-hidden
        transition-all duration-500
        ${!isLastColumn && !isLastCard ? 'lg:border-r lg:border-r-slate-100/60' : ''}
      `}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #001F5F 0%, #011244 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #F8FAFC 60%, #F1F5F9 100%)',
        transition: 'background 0.5s ease',
      }}
    >
      {/* Steel reflection shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, rgba(148,163,184,0.06) 50%, transparent 70%)',
        }}
      />


      {/* ✦ Icon Box — with Industrial Glow */}
      <div
        className="w-16 h-16 flex items-center justify-center mb-8 relative z-10 transition-all duration-500"
        style={{
          background: hovered
            ? 'rgba(255,255,255,0.08)'
            : '#ffffff',
          border: hovered ? '1px solid rgba(196,18,48,0.5)' : '1px solid #e2e8f0',
          boxShadow: hovered
            ? '0 0 20px rgba(196,18,48,0.35), 0 0 40px rgba(196,18,48,0.15), inset 0 0 12px rgba(196,18,48,0.08)'
            : '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <IconComponent
          className="w-7 h-7 transition-colors duration-500"
          style={{ color: hovered ? '#C41230' : '#001F5F' }}
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h3
        className="text-xl sm:text-2xl font-heading font-bold mb-4 relative z-10 transition-colors duration-500"
        style={{ color: hovered ? '#ffffff' : '#001F5F' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-base sm:text-lg font-paragraph leading-relaxed relative z-10 font-normal transition-colors duration-500"
        style={{ color: hovered ? 'rgba(255,255,255,0.75)' : '#334155' }}
      >
        {service.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%' }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────
// 🏭 MAIN SECTION
// ─────────────────────────────────────────────
export default function OurServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      number: '01',
      title: t('servicesSection.usedMachineryTitle'),
      description: t('servicesSection.usedMachineryDesc'),
      icon: Briefcase,
    },
    {
      number: '02',
      title: t('header.spareParts'),
      description: t('servicesSection.sparePartsDesc'),
      icon: Wrench,
    },
    {
      number: '03',
      title: t('header.technicalAssistance'),
      description: t('servicesSection.techAssistanceDesc'),
      icon: Clipboard,
    },
    {
      number: '04',
      title: t('servicesSection.revampingTitle'),
      description: t('servicesSection.revampingDesc'),
      icon: RotateCw,
    },
    {
      number: '05',
      title: t('servicesSection.tradingTitle'),
      description: t('servicesSection.tradingDesc'),
      icon: ShoppingCart,
    },
    {
      number: '06',
      title: t('servicesSection.assetMarketTitle'),
      description: t('servicesSection.assetMarketDesc'),
      icon: Hammer,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-dark overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0 mb-8 md:mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-heading font-semibold text-accent uppercase tracking-widest">
                {t('servicesSection.whatWeDo')}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white">
              {t('servicesSection.ourServices')}
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white/70 mt-2">
              {t('servicesSection.sixAreas')}
            </p>
          </div>

          {/* ✦ View All Services — ConversionButton with shimmer */}
          <ConversionButton
            to="/services"
            variant="outline"
            shimmer={true}
            magnetic={true}
            id="services-view-all-btn"
            aria-label="View All Services"
            className="w-full md:w-auto justify-center md:justify-start"
          >
            {t('servicesSection.allServicesBtn')}
          </ConversionButton>
        </div>

        {/* ✦ Services Grid — Dynamic Gradient Cards */}
        <div
          className="shadow-2xl shadow-slate-300/40 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #F8FAFC 100%)',
            border: '1px solid rgba(226,232,240,0.8)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {services.map((service, index) => {
              const isLastColumn = (index + 1) % 3 === 0;
              const isLastCard = index === services.length - 1;
              return (
                <ServiceCard
                  key={service.number}
                  service={service}
                  isLastColumn={isLastColumn}
                  isLastCard={isLastCard}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
