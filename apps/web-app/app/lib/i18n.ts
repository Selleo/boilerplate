import i18next, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/locales/en.json";
import pl from "~/locales/pl.json";

export const SUPPORTED_LANGUAGES = ["en", "pl"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
const LANGUAGE_STORAGE_KEY = "boilerplate-language";

export const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

export const getSavedLanguage = (): SupportedLanguage | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const language = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (language && isSupportedLanguage(language)) {
    return language;
  }

  return null;
};

export const setLanguage = (language: SupportedLanguage) => {
  void i18next.changeLanguage(language);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }
};

const options: InitOptions = {
  resources: {
    en: {
      translation: en
    },
    pl: {
      translation: pl
    }
  },
  lng: "en",
  fallbackLng: "en",
  supportedLngs: [...SUPPORTED_LANGUAGES],
  defaultNS: "translation",
  interpolation: {
    escapeValue: false
  },
  initImmediate: false
};

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init(options);
}

export default i18next;
