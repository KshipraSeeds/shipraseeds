// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// For Next.js App Router, it's common to place locale files directly in the project root
// or within a 'public/locales' directory as before.
// We'll stick to defining them here for simplicity in this config,
// but for production, consider fetching them or using a backend.
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our application!",
      home_page: "Home Page",
      about_us: "About Us",
      contact_us: "Contact Us",
      change_language: "Change Language:",
      greeting: "Hello, {{name}}!",
      product_count: {
        one: "You have {{count}} product.",
        other: "You have {{count}} products."
      },
      footer_text: "© 2025 My App. All rights reserved."
    }
  },
  es: {
    translation: {
      welcome: "¡Bienvenido a nuestra aplicación!",
      home_page: "Página Principal",
      about_us: "Acerca de Nosotros",
      contact_us: "Contáctenos",
      change_language: "Cambiar Idioma:",
      greeting: "¡Hola, {{name}}!",
      product_count: {
        one: "Tienes {{count}} producto.",
        other: "Tienes {{count}} productos."
      },
      footer_text: "© 2025 Mi Aplicación. Todos los derechos reservados."
    }
  },
  hi: {
    translation: {
      welcome: "हमारे आवेदन में आपका स्वागत है!",
      home_page: "मुखपृष्ठ",
      about_us: "हमारे बारे में",
      contact_us: "हमसे संपर्क करें",
      change_language: "भाषा बदलें:",
      greeting: "नमस्ते, {{name}}!",
      product_count: {
        one: "आपके पास {{count}} उत्पाद है।",
        other: "आपके पास {{count}} उत्पाद हैं।"
      },
      footer_text: "© 2025 मेरा ऐप। सभी अधिकार सुरक्षित।"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development', // Only debug in development
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
    defaultNS: 'translation',
    ns: ['translation'],
    react: {
      useSuspense: false,
    }
  });

export default i18n;