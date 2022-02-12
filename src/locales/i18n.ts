import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en/translation.json';
import de from 'locales/de/translation.json';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

export const availableLanguages = Object.keys(resources);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug:
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
    interpolation: {
      /** react already safes from xss =>
       *   https://www.i18next.com/translation-function/interpolation#unescape
       */
      escapeValue: false,
    },
  });
