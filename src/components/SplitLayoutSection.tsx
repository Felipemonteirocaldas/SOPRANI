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
        {/* ✦ Left Side — Dynamic Steel Gradient */}
        <div
          className="relative overflow-hidden flex items-center justify-center p-8 lg:p-0"
          style={{
            background: 'linear-gradient(135deg, #001F5F 0%, #011244 55%, #020D30 100%)',
          }}
        >
          {/* Blueprint overlay image */}
          <div className="absolute inset-0 opacity-15">
            <Image
              src="https://static.wixstatic.com/media/9bbed2_faa35e28edaf43dbaa4b80a14918bb82~mv2.jpeg"
              className="w-full h-full object-cover"
              width={500}
              originWidth={1600}
              originHeight={1200}
            />
          </div>

          {/* Steel shimmer streak */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, rgba(148,163,184,0.06) 50%, transparent 70%)',
            }}
          />

          {/* Grid texture */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

          {/* Content overlay */}
          <div className="relative z-10 text-center text-white max-w-sm px-6">
            <div
              className="inline-flex items-center justify-center w-14 h-14 mb-6 mx-auto"
              style={{
                background: 'rgba(196,18,48,0.12)',
                border: '1px solid rgba(196,18,48,0.35)',
                boxShadow: '0 0 24px rgba(196,18,48,0.2)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4">
              {t('splitLayout.blueprintTitle')}
            </h3>
            <div className="space-y-2 text-sm font-paragraph" style={{ color: 'rgba(255,255,255,0.7)' }}>
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

          {/* ✦ Features List — Glassmorphism rows */}
          <div className="space-y-0">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[44px_1fr] gap-4 py-5 group transition-all duration-300 ${index !== features.length - 1 ? 'border-b border-border-light' : ''}`}
                >
                  {/* ✦ Icon with glow */}
                  <div className="flex items-start justify-center pt-0.5">
                    <div
                      className="w-9 h-9 flex items-center justify-center transition-all duration-400"
                      style={{
                        background: 'rgba(0,31,95,0.05)',
                        border: '1px solid rgba(0,31,95,0.1)',
                      }}
                    >
                      <IconComponent
                        className="w-4 h-4 text-primary group-hover:text-accent transition-colors duration-300 flex-shrink-0"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-start">
                    <h3 className="font-heading text-sm font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
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
