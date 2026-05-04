import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cookie, ShieldCheck, Settings, Info, ChevronRight, ExternalLink } from 'lucide-react';

export default function CookiePolicyPage() {
  const { t } = useTranslation();

  const cookieTypes = [
    {
      icon: ShieldCheck,
      title: t('cookiePolicy.technicalTitle'),
      description: t('cookiePolicy.technicalDesc'),
      duration: t('cookiePolicy.sessionPermanent'),
      necessity: t('cookiePolicy.strictlyNecessary')
    },
    {
      icon: Settings,
      title: t('cookiePolicy.functionalTitle'),
      description: t('cookiePolicy.functionalDesc'),
      duration: t('cookiePolicy.permanent'),
      necessity: t('cookiePolicy.optional')
    },
    {
      icon: Info,
      title: t('cookiePolicy.analyticalTitle'),
      description: t('cookiePolicy.analyticalDesc'),
      duration: t('cookiePolicy.permanent'),
      necessity: t('cookiePolicy.optional')
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative py-24 bg-[#001F5F] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,#C41230_0%,transparent_50%)]" />
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 bg-[#C41230] text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              {t('cookiePolicy.heroEyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight leading-tight">
              {t('cookiePolicy.heroTitle').split(' ')[0]} <span className="text-[#C41230]">{t('cookiePolicy.heroTitle').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-paragraph leading-relaxed">
              {t('cookiePolicy.heroSub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-[100rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Prose */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate prose-lg max-w-none font-paragraph text-slate-600 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#001F5F] mb-8 uppercase tracking-tight border-l-4 border-[#C41230] pl-6 leading-tight">
                {t('cookiePolicy.introTitle')}
              </h2>
              <p className="mb-12">
                {t('cookiePolicy.introText')}
              </p>

              <div className="space-y-8 my-16">
                {cookieTypes.map((type, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-slate-50 border border-slate-100 hover:border-[#C41230]/20 transition-all flex flex-col md:flex-row gap-8 items-start"
                  >
                    <div className="p-4 bg-white shadow-sm border border-slate-100">
                      <type.icon className="w-8 h-8 text-[#C41230]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-lg font-heading font-black text-[#001F5F] uppercase tracking-wide">
                          {type.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'bg-[#001F5F] text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {type.necessity}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-500 mb-4">
                        {type.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#C41230] uppercase tracking-widest">
                        <Cookie size={12} /> {t('cookiePolicy.durationLabel')}: {type.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#001F5F] mt-16 mb-6 uppercase tracking-tight">
                {t('cookiePolicy.manageTitle')}
              </h2>
              <p className="text-sm sm:text-base mb-8">
                {t('cookiePolicy.manageText')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 text-sm font-bold text-[#001F5F] hover:border-[#C41230] hover:text-[#C41230] transition-all group">
                  Google Chrome <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                </a>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 text-sm font-bold text-[#001F5F] hover:border-[#C41230] hover:text-[#C41230] transition-all group">
                  Safari <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                </a>
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 text-sm font-bold text-[#001F5F] hover:border-[#C41230] hover:text-[#C41230] transition-all group">
                  Firefox <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                </a>
                <a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 text-sm font-bold text-[#001F5F] hover:border-[#C41230] hover:text-[#C41230] transition-all group">
                  Microsoft Edge <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                </a>
              </div>

              <div className="p-8 bg-[#001F5F] text-white border-l-4 border-[#C41230] shadow-xl">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#C41230] mb-4">
                  {t('cookiePolicy.updatesTitle')}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('cookiePolicy.updatesText')}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-8">
              <div className="p-8 border border-slate-100 bg-slate-50/50">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{t('header.resources')}</h4>
                <nav className="flex flex-col space-y-4">
                  <a href="/privacy" className="text-sm font-bold text-[#001F5F] hover:text-[#C41230] transition-colors flex items-center justify-between group">
                    {t('footer.privacyPolicy')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/terms" className="text-sm font-bold text-[#001F5F] hover:text-[#C41230] transition-colors flex items-center justify-between group">
                    {t('footer.termsOfService')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </nav>
              </div>

              <div className="p-8 bg-[#C41230] text-white">
                <h4 className="text-lg font-heading font-bold mb-2 uppercase tracking-tight">{t('privacyPage.lastUpdated').split(':')[0]}</h4>
                <p className="text-white/70 text-sm font-medium">April 22, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
