import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Youtube, Linkedin } from 'lucide-react';
import ConversionButton from '@/components/ui/ConversionButton';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-12 xs:py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 md:gap-12 mb-12 sm:mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link to="/" className="inline-block hover:opacity-80 transition-opacity duration-300">
                <img
                  src="/images/logo.png"
                  alt="Soprani Engineering"
                  className="h-12 sm:h-14 w-auto brightness-0 invert"
                />
              </Link>
            </div>
            <p className="text-sm xs:text-base text-slate-100 leading-relaxed font-normal">
              {t('footer.companyDesc')}
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:bg-accent hover:border-accent transition-all duration-300 group"
                aria-label={t('footer.youtube')}
                id="footer-social-youtube"
              >
                <Youtube size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:bg-accent hover:border-accent transition-all duration-300 group"
                aria-label={t('footer.linkedin')}
                id="footer-social-linkedin"
              >
                <Linkedin size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block">
            <h4 className="text-base xs:text-lg font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.services')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/machinery" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('header.machinery')}
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('header.spareParts')}
                </Link>
              </li>
              <li>
                <Link to="/technical-assistance" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('header.technicalAssistance')}
                </Link>
              </li>
              <li>
                <Link to="/trading-materials" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
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
                <Link to="/about" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('footer.companyInfo')}
                </Link>
              </li>
              <li>
                <Link to="/news?tab=events" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('header.events')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
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
                <Link to="/contact" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('footer.getInTouch')}
                </Link>
              </li>
              <li>
                <Link to="/request-quotation" className="text-sm xs:text-base text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('header.requestQuotation')}
                </Link>
              </li>
            </ul>

            {/* ✦ Conversion CTA in footer */}
            <div className="mt-6 pt-6">
              <ConversionButton
                to="/request-quotation"
                variant="primary"
                shimmer={true}
                magnetic={true}
                id="footer-cta-request-quotation"
                aria-label="Request a Technical Quotation"
                className="text-[11px] px-5 py-3"
              >
                {t('header.requestQuotation')}
              </ConversionButton>
            </div>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="pt-8 pb-24 sm:pb-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              © 2026 Soprani Engineering. {t('footer.allRightsReserved')}
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors duration-300">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-colors duration-300">
                {t('footer.termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
