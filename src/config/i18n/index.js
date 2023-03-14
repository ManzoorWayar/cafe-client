import i18n from "i18next"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { URL } from "../HTTPRequests"

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "en",
		backend: {
			loadPath: `${URL}/locals/{{lng}}/{{ns}}.json`
		},
		fallbackLng: "en",
		debug: false,
		keySeparator: false,
		react: {
			useSuspense: true,
		},
		interpolation: {
			escapeValue: true,
			formatSeparator: ",",
		},
		ns: [
			"general",
			"validations",
			"messages",
			"emails",
		],
		defaultNS: ["general"],
	})

export default i18n
