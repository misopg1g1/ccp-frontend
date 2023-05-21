import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import global_es from "../../src/transalations/es/global.json";
import global_en from "../../src/transalations/en/global.json";

i18n
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    debug: true,
    resources: {
      es: {
          global: global_es
      },
  },
  });

export default i18n;