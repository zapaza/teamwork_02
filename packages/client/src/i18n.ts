import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '@/locales/ru/ru';
import en from '@/locales/en/en';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next)
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: { ...en },
			},
			ru: {
				translation: { ...ru },
			},
		},
		debug: process.env.NODE_ENV === 'development',
		fallbackLng: 'ru',
		// interpolation: {
		// 	escapeValue: false, // not needed for react as it escapes by default
		// },
		// react: {
		// 	useSuspense: true,
		// },
		lng: 'ru',
	});

export default i18n;
