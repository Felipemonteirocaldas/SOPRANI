import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';
import itTranslation from './locales/it/translation.json';
import esTranslation from './locales/es/translation.json';

const resources = {
  en: { translation: enTranslation },
  pt: { translation: ptTranslation },
  it: { translation: itTranslation },
  es: { translation: esTranslation }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Provide English as fallback language if detection fails
    fallbackLng: 'en',
    
    // Explicitly set English as default (or rely on browser detector)
    // You can set standard default to 'en' strictly if preferred:
    // lng: 'en', 

    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
