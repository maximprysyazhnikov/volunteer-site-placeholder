import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from "../public/locales/en/translation.json"
import uk from "../public/locales/uk/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    uk: {
      translation: uk,
    },
  },

  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
