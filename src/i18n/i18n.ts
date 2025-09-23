import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import de from '../locales/de/translation.json';
import sr from '../locales/sr/translation.json';
import srLatn from '../locales/sr-Latn/translation.json';

const savedLang = localStorage.getItem('i18nextLng');
const initialLang = savedLang || 'en';

export const resources = {
  en: { translation: en },
  de: { translation: de },
  sr: { translation: sr },
  'sr-Latn': { translation: srLatn },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
