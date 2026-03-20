import { Briefcase, Wrench, Clipboard, RotateCw, ShoppingCart } from 'lucide-react';

export default function OurServicesSection() {
  const services = [
    {
      number: '01',
      title: 'Used Machinery',
      description: 'Global inventory of used can making machines, welding lines, presses and decorating equipment. Verified, negotiated and delivered — faster than new-machine lead times.',
      icon: Briefcase,
    },
    {
      number: '02',
      title: 'Spare Parts',
      description: 'Downtime is not an option. We identify and supply spare parts for can making machines — including obsolete and hard-to-source components — with speed and precision.',
      icon: Wrench,
    },
    {
      number: '03',
      title: 'Technical Assistance',
      description: 'Expert troubleshooting, machine evaluation and production audits. On-site or remote support — diagnose fast, resolve faster, minimal disruption to output.',
      icon: Clipboard,
    },
    {
      number: '04',
      title: 'Revamping',
      description: 'Extend the productive life of your equipment. We design and manage upgrade programmes for existing lines — improving output and compliance without full replacement cost.',
      icon: RotateCw,
    },
    {
      number: '05',
      title: 'Trading Materials — Tinplate & Aluminum',
      description: 'Strategic tinplate and aluminum trading for metal packaging producers worldwide. Competitive sourcing, flexible volumes, reliable delivery — matched to your production schedule. We connect buyers and sellers across our global network to create genuine commercial value.',
      icon: ShoppingCart,
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
                What We Do
              </span>
            </div>

            {/* Main Title and Subtitle */}
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary">
                Our Services
              </h2>
              <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text-muted">
                Five Areas. One Partner.
              </p>
            </div>
          </div>

          {/* Right Side - Button */}
          <button className="px-6 py-3 border border-accent text-accent font-heading font-semibold hover:bg-accent hover:text-white transition-colors duration-200 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
            All Services
            <span>→</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isLastColumn = (index + 1) % 3 === 0;
              const isLastRow = index >= 3;
              const isLastCard = index === services.length - 1;
              const isSmallScreen = true; // Mobile-first approach

              return (
                <div
                  key={service.number}
                  className={`p-6 sm:p-8 lg:p-10 border-b border-[#EAEAEA] ${
                    !isLastColumn && !isLastCard ? 'lg:border-r' : ''
                  } ${
                    isLastRow && index % 3 !== 2 ? 'sm:border-b' : ''
                  } ${
                    isLastCard ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Number */}
                  <div className="text-xs font-heading text-[#D1D5DB] font-semibold mb-6 sm:mb-8">
                    {service.number}
                  </div>

                  {/* Icon Box */}
                  <div className="w-12 h-12 border border-[#D1D5DB] flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-heading font-bold text-primary mb-3 sm:mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-paragraph text-text-muted leading-relaxed">
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
