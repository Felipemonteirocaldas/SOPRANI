import { Briefcase, Wrench, Clipboard, RotateCw, ShoppingCart, Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      title: t('header.tradingMaterials') + ' — Tinplate',
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
    <section className="bg-[#F8F9FA] py-12 md:py-16">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0 mb-8 md:mb-12">
          {/* Left Side */}
          <div className="flex-1">
            {/* Pre-title with red line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-accent"></div>
              <span className="text-xs font-heading font-semibold text-accent uppercase tracking-widest">
                {t('servicesSection.whatWeDo')}
              </span>
            </div>

            {/* Main Title and Subtitle */}
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary">
                {t('servicesSection.ourServices')}
              </h2>
              <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text-muted">
                {t('servicesSection.sixAreas')}
              </p>
            </div>
          </div>

          {/* Right Side - Button */}
          <button className="px-6 py-3 border border-accent text-accent font-heading font-semibold hover:bg-accent hover:text-white transition-colors duration-200 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
            {t('servicesSection.allServicesBtn')}
          </button>
        </div>

        {/* Services Grid */}
        <div className="bg-white shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isLastColumn = (index + 1) % 3 === 0;
              const isLastCard = index === services.length - 1;

              return (
                <div
                  key={service.number}
                  className={`p-6 sm:p-8 lg:p-14 border-b border-slate-100 group hover:bg-slate-50 transition-all duration-500 relative overflow-hidden ${
                    !isLastColumn && !isLastCard ? 'lg:border-r' : ''
                  }`}
                >
                  {/* Number Overlay */}
                  <div className="hidden sm:block text-[5rem] font-heading text-slate-50 font-black absolute translate-y-[-2rem] translate-x-[-1rem] pointer-events-none group-hover:text-slate-100 transition-colors duration-500">
                    {service.number}
                  </div>

                  {/* Icon Box */}
                  <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center mb-8 relative z-10 shadow-sm group-hover:border-accent/30 group-hover:shadow-md transition-all duration-500">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-500" strokeWidth={1} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-4 relative z-10">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg font-paragraph text-slate-700 leading-relaxed relative z-10 font-normal">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
