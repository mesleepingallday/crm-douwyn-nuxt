// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "nuxt-lodash",
    "@ant-design-vue/nuxt",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        icon: "/images/english.svg",
      },
      {
        code: "vn",
        name: "Vietnamese",
        icon: "/images/vietnam.svg",
      },
      {
        code: "cn",
        name: "Chinese",
        icon: "/images/china.svg",
      },
    ],
    strategy: "prefix_except_default",
  },
});
