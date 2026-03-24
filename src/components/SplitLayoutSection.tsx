import { Image } from '@/components/ui/image';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export default function SplitLayoutSection() {
  const features = [
    {
      icon: Zap,
      title: 'Technical Competence',
      description: 'Deep expertise in packaging automation and machinery across all major markets.'
    },
    {
      icon: Shield,
      title: 'Global Network',
      description: 'Partnerships with certified manufacturers and leaders across five continents.'
    },
    {
      icon: TrendingUp,
      title: 'Responsive Solutions',
      description: 'Agile support tailored to emerging market demands and evolving client needs.'
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-[600px]">
        {/* Left Side - Navy Background with Blueprint Image */}
        <div className="bg-primary relative overflow-hidden flex items-center justify-center p-8 lg:p-0">
          {/* Blueprint overlay image with low opacity */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://static.wixstatic.com/media/9bbed2_faa35e28edaf43dbaa4b80a14918bb82~mv2.jpeg"
              className="w-full h-full object-cover"
              width={500}
              originWidth={1600}
              originHeight={1200} />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 text-center text-white max-w-sm">
            <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4">Laminating Machine</h3>
            <div className="space-y-2 text-sm font-paragraph opacity-90">
              <p>Dimensions: 2500 x 1800 x 1600 mm</p>
              <p>Capacity: 120 cycles/minute</p>
              <p>Power: 15 kW</p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="bg-background p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
          {/* WHO WE ARE Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-accent"></div>
            <span className="font-heading text-xs font-bold tracking-widest text-accent uppercase">
              Who We Are
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
            Technical Depth. Commercial Flexibility.
          </h2>

          {/* Body Text */}
          <div className="space-y-4 mb-8 max-w-lg">
            <p className="font-paragraph text-base text-text-muted leading-relaxed">
              SOPRANI represents decades of industrial expertise and international commercial acumen. We support clients across Europe, the Middle East, North Africa, and Asia.
            </p>
            <p className="font-paragraph text-base text-text-muted leading-relaxed">
              We understand the pressures of modern manufacturing. Seamless, bold moves are unfolding, and sourcing critical equipment in under-resourced markets demands a reliable partner with real networks.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-0">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[40px_1fr] gap-4 py-5 ${
                    index !== features.length - 1 ? 'border-b border-border-light' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className="flex items-start justify-center pt-0.5">
                    <IconComponent className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-start">
                    <h3 className="font-heading text-sm font-bold text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-sm text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
