import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// locales/index.ts
import EN from "./lang/EN";
import CH from "./lang/CH";

const resources = {
  en: {
    translation: EN,
  },
  ch: {
    translation: CH,
  },
};

const langList = ["en", "ch"];

let lang = window.localStorage.getItem("lang") || "en";

if (!langList.includes(lang)) lang = "en";

i18n
  .use(initReactI18next) // 使用 react-i18next 初始化
  .init({
    resources,
    fallbackLng: lang, // 默认语言
    keySeparator: ".", // 禁用键分隔符，默认为'.'
    interpolation: {
      escapeValue: false, // 禁用值的转义
    },
  });

export default i18n;
