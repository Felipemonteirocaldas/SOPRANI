import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Youtube, Linkedin } from 'lucide-react';
import ConversionButton from '@/components/ui/ConversionButton';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[95vw] lg:max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-12 xs:py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 md:gap-12 mb-12 sm:mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-8">
              <Link to="/" className="inline-block hover:opacity-80 transition-opacity duration-300">
                <img
                  src="/images/logo.png"
                  alt="Soprani Engineering"
                  className="w-[280px] sm:w-[320px] h-auto brightness-0 invert"
                />
              </Link>
            </div>
            <p className="text-sm xs:text-base text-slate-100 leading-relaxed font-normal">
              {t('footer.shortDesc')}
            </p>
            <div className="mt-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 block mb-4">
                {t('footer.followUs')}
              </span>
              <div className="flex gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 group"
                  aria-label={t('footer.youtube')}
                  id="footer-social-youtube"
                >
                  <Youtube size={18} className="text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/matteo-soprani-a4809769/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 group"
                  aria-label="LinkedIn de Matteo Soprani"
                  id="footer-social-linkedin"
                >
                  <Linkedin size={18} className="text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block">
            <h4 className="text-base xs:text-lg font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.services')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/machinery" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.machinery')}
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.spareParts')}
                </Link>
              </li>
              <li>
                <Link to="/technical-assistance" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.technicalAssistance')}
                </Link>
              </li>
              <li>
                <Link to="/trading-materials" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.tradingMaterials')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="hidden sm:block">
            <h4 className="text-base xs:text-lg font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.company')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/about" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('footer.companyInfo')}
                </Link>
              </li>
              <li>
                <Link to="/news?tab=events" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.events')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-base xs:text-lg font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.contact')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/contact" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('footer.getInTouch')}
                </Link>
              </li>
              <li>
                <Link to="/request-quotation" className="text-sm xs:text-base text-slate-200 hover:text-accent font-medium transition-colors duration-200">
                  {t('header.requestQuotation')}
                </Link>
              </li>
            </ul>

            {/* ✦ Conversion CTA in footer */}
            <div className="mt-6 pt-6 flex">
              <div className="max-w-full overflow-hidden">
                <ConversionButton
                  to="/request-quotation"
                  variant="primary"
                  shimmer={true}
                  magnetic={true}
                  id="footer-cta-request-quotation"
                  aria-label={t('footer.ariaQuote')}
                  className="text-[10px] sm:text-[11px] px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap"
                >
                  {t('header.requestQuotation')}
                </ConversionButton>
              </div>
            </div>
          </div>
        </div>



        {/* Separator */}
        <div className="border-t border-white/15 my-12" />

        {/* Bottom Bar */}
        <div className="pt-0 pb-24 sm:pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              © 2026 Soprani Engineering. {t('footer.allRightsReserved')}
            </p>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-[9px] text-slate-500 font-medium tracking-wide text-center md:text-right max-w-md">
                SOPRANI ENGINEERING SAS DI MATTEO SOPRANI E C. | P.IVA/CF: 07196970151 | REA: MI-1144273 | Via Melchiorre Gioia 194, 20125 Milano (MI), Italy
              </p>
              <div className="flex gap-8 mt-2">
                <Link to="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors duration-300">
                  {t('footer.privacyPolicy')}
                </Link>
                <Link to="/terms" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors duration-300">
                  {t('footer.termsOfService')}
                </Link>
                <Link to="/cookie-policy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors duration-300">
                  {t('footer.cookies')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
