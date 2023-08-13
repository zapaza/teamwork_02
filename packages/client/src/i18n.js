import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    saveMissing: true,
    saveMissingTo: 'all',
    updateMissing: true,
    backend: {
      projectId: 'bdb93413-8b62-4cc8-8282-f4d15a13af5f',
      apiKey: 'eaa09e66-e0fe-4227-9e3d-6fc0295e1d47',
      allowedAddOrUpdateHosts: ['127.0.0.1'],

    }
  }).then();


export default i18n;
