import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "./locales/de.json";
import sr_cyrillic from "./locales/sr-cyrillic.json";
import sr_latin from "./locales/sr-latin.json";
import it from "./locales/it.json";

const resources = {
  de: { translation: de },
  "sr-cyrillic": { translation: sr_cyrillic },
  "sr-latin": { translation: sr_latin },
  it: { translation: it },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "de",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
