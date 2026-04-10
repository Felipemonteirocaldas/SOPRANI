import { Subsidiaries } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const [subsidiaries, setSubsidiaries] = useState<Subsidiaries[]>([]);

  useEffect(() => {
    loadSubsidiaries();
  }, []);

  const loadSubsidiaries = async () => {
    try {
      const result = await BaseCrudService.getAll<Subsidiaries>('subsidiaries', [], { limit: 8 });
      setSubsidiaries(result.items);
    } catch (error) {
      console.error('Failed to load subsidiaries:', error);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-12 xs:py-14 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12 mb-8 xs:mb-10 sm:mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-base xs:text-lg font-heading font-bold mb-3 xs:mb-4 text-white">Soprani Engineering</h3>
            <p className="text-xs xs:text-sm text-gray-300 leading-relaxed">
              {t('footer.companyDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs xs:text-sm font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.services')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/machinery" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.machinery')}
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.spareParts')}
                </Link>
              </li>
              <li>
                <Link to="/technical-assistance" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.technicalAssistance')}
                </Link>
              </li>
              <li>
                <Link to="/trading-materials" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.tradingMaterials')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs xs:text-sm font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.company')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/about" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.companyInfo')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.events')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs xs:text-sm font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('header.contact')}</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link to="/contact" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.getInTouch')}
                </Link>
              </li>
              <li>
                <Link to="/request-quotation" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('header.requestQuotation')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-xs xs:text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Subsidiaries Section */}
        {subsidiaries.length > 0 && (
          <div className="border-t border-gray-700 pt-8 xs:pt-10 sm:pt-12 mb-8 xs:mb-10 sm:mb-12">
            <h4 className="text-xs xs:text-sm font-heading font-bold mb-4 xs:mb-6 uppercase tracking-wider text-white">{t('footer.globalPresence')}</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4">
              {subsidiaries.map((subsidiary) => (
                <div key={subsidiary._id} className="text-xs xs:text-sm text-gray-300">
                  <p className="font-medium text-white mb-0.5 xs:mb-1">{subsidiary.subsidiaryName}</p>
                  <p className="text-xs text-gray-400">{subsidiary.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 xs:pt-8">
          <div className="flex flex-col xs:flex-row justify-between items-center gap-3 xs:gap-4">
            <p className="text-xs text-gray-400 text-center xs:text-left">
              © 2026 Soprani Engineering. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-4 xs:space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
