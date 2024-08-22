export default defineI18nConfig(() => ({
  locale: "en",
  setLocaleCookie: true,
  getLocaleCookie: true,
  legacy: false,
  messages: {
    en: {
      welcome: "Welcome",
    },
    fr: {
      welcome: "Bienvenue",
    },
  },
}));
