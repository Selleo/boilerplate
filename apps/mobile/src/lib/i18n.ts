import i18next, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";

const options: InitOptions = {
  resources: {
    en: {
      translation: en,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
};

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init(options);
}

export default i18next;
