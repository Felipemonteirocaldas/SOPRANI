import { Image } from '@/components/ui/image';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SplitLayoutSection() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Zap,
      title: t('splitLayout.f1_title'),
      description: t('splitLayout.f1_desc')
    },
    {
      icon: Shield,
      title: t('splitLayout.f2_title'),
      description: t('splitLayout.f2_desc')
    },
    {
      icon: TrendingUp,
      title: t('splitLayout.f3_title'),
      description: t('splitLayout.f3_desc')
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[600px]">
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
            <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4">{t('splitLayout.blueprintTitle')}</h3>
            <div className="space-y-2 text-sm font-paragraph opacity-90">
              <p>{t('splitLayout.blueprintL1')}</p>
              <p>{t('splitLayout.blueprintL2')}</p>
              <p>{t('splitLayout.blueprintL3')}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="bg-background p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
          {/* WHO WE ARE Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-accent"></div>
            <span className="font-heading text-xs font-bold tracking-widest text-accent uppercase">
              {t('splitLayout.who')}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6 leading-tight">
            {t('splitLayout.title')}
          </h2>

          {/* Body Text */}
          <div className="space-y-4 mb-8 max-w-lg">
            <p className="font-paragraph text-base text-slate-700 leading-relaxed font-normal">
              {t('splitLayout.desc1')}
            </p>
            <p className="font-paragraph text-base text-slate-700 leading-relaxed font-normal">
              {t('splitLayout.desc2')}
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-0">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[40px_1fr] gap-4 py-5 ${index !== features.length - 1 ? 'border-b border-border-light' : ''
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
                    <p className="font-paragraph text-sm text-slate-600 leading-relaxed font-normal">
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
