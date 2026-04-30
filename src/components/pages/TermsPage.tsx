import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Gavel, Scale, AlertCircle, ShieldCheck, Truck, FileCode, CreditCard, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Gavel,
      title: t('termsPage.agreementTitle'),
      content: t('termsPage.agreementText')
    },
    {
      icon: ShieldCheck,
      title: t('termsPage.servicesTitle'),
      content: t('termsPage.servicesText')
    },
    {
      icon: AlertCircle,
      title: t('termsPage.quotationsTitle'),
      content: t('termsPage.quotationsText')
    },
    {
      icon: CreditCard,
      title: t('termsPage.paymentTitle'),
      content: t('termsPage.paymentText')
    },
    {
      icon: Truck,
      title: t('termsPage.deliveryTitle'),
      content: t('termsPage.deliveryText')
    },
    {
      icon: FileCode,
      title: t('termsPage.intellectualTitle'),
      content: t('termsPage.intellectualText')
    },
    {
      icon: Scale,
      title: t('termsPage.liabilityTitle'),
      content: t('termsPage.liabilityText')
    },
    {
      icon: Gavel,
      title: t('termsPage.governingTitle'),
      content: t('termsPage.governingText')
    },
    {
      icon: ShieldCheck,
      title: t('termsPage.partnersTitle'),
      content: t('termsPage.partnersText')
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative py-24 bg-[#001F5F] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,#C41230_0%,transparent_50%)]" />
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 bg-[#C41230] text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              {t('termsPage.heroEyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight leading-tight">
              {t('termsPage.heroTitle').split(' ')[0]} <span className="text-[#C41230]">{t('termsPage.heroTitle').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-paragraph leading-relaxed">
              {t('termsPage.heroSub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-[100rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex gap-4 sm:gap-8 items-start">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#001F5F] group-hover:text-white transition-all duration-300">
                      <section.icon size={18} className="text-[#001F5F] group-hover:text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl font-heading font-black text-[#001F5F] mb-3 sm:mb-4 uppercase tracking-wider leading-tight">
                        {section.title}
                      </h2>
                      <p className="font-paragraph text-slate-600 leading-relaxed text-sm sm:text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legal Footer Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 p-8 sm:p-12 bg-[#001F5F] text-white relative overflow-hidden border-l-4 border-[#C41230] shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C41230] opacity-5 -mr-32 -mt-32 rotate-45"></div>
              
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#C41230] mb-10">
                {t('termsPage.legalEntityTitle')}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm font-paragraph">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.companyName')}</p>
                  <p className="text-lg font-heading font-bold text-white">SOPRANI ENGINEERING SAS DI MATTEO SOPRANI E C.</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.registeredAddress')}</p>
                  <p className="text-slate-200">Via Melchiorre Gioia 194, 20125 Milano (MI), Italy</p>
                </div>

                <div className="grid grid-cols-2 gap-8 md:contents">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.taxId')}</p>
                    <p className="font-bold text-white">07196970151</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.codiceFiscale')}</p>
                    <p className="font-bold text-white">07196970151</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 md:contents">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.europeanVat')}</p>
                    <p className="font-bold text-white">IT07196970151</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.reaNumber')}</p>
                    <p className="font-bold text-white">MI-1144273</p>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/10 mt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C41230]/70">{t('termsPage.legalEmail')}</p>
                    <a href="mailto:info@sopraniengineering.com" className="text-lg font-bold text-white hover:text-[#C41230] transition-all flex items-center gap-2">
                      info@sopraniengineering.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-8">
              <div className="p-8 border border-slate-100 bg-slate-50/50">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{t('termsPage.navigationTitle')}</h4>
                <nav className="flex flex-col space-y-4">
                  <a href="/privacy" className="text-sm font-bold text-[#001F5F] hover:text-[#C41230] transition-colors flex items-center justify-between group">
                    {t('termsPage.privacyPolicy')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/contact" className="text-sm font-bold text-[#001F5F] hover:text-[#C41230] transition-colors flex items-center justify-between group">
                    {t('termsPage.supportCenter')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </nav>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-100">
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  {t('termsPage.updateNotice')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
