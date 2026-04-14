import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-12 xs:py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12 mb-8 xs:mb-10 sm:mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img
                src="/images/logo.png"
                alt="Soprani Engineering"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm xs:text-base text-slate-100 leading-relaxed font-normal">
              {t('footer.companyDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
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
              <li>
                <a href="#" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-xs xs:text-sm text-slate-200 hover:text-accent transition-colors duration-200">
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 xs:pt-8">
          <div className="flex justify-center items-center">
            <p className="text-xs text-gray-400 text-center">
              © 2026 Soprani Engineering. {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
