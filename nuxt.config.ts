// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@ant-design-vue/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "nuxt-lodash",
    "@ant-design-vue/nuxt",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      unstyled: false,
    },
  },
  i18n: {
    lazy: true,
    langDir: "lang",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        icon: "/images/english.svg",
        file: "en.json",
      },
      {
        code: "vi",
        iso: "vi-VN",
        name: "Vietnamese",
        icon: "/images/vietnam.svg",
        file: "vi.json",
      },
      {
        code: "cn",
        iso: "zh-CN",
        name: "Chinese",
        icon: "/images/china.svg",
        file: "cn.json",
      },
    ],
    customRoutes: "config",
    pages: {
      dashboard: {
        en: "/",
        vn: "/",
        cn: "/",
      },
      customers: {
        en: "/customers",
        vn: "/khach-hang",
        cn: "/ke-hu",
      },
      product: {
        en: "/product",
        vn: "/san-pham",
        cn: "/chan-pin",
      },
      setting: {
        en: "/setting",
        vn: "/cai-dat",
        cn: "/she-zhi",
      },
      source: {
        en: "/source",
        vn: "/ma-nguon",
        cn: "/yuan-ma",
      },
      users: {
        en: "/users",
        vn: "/nguoi-dung",
        cn: "/yong-hu",
      },
      posts: {
        en: "/posts",
        vn: "/bai-viet",
        cn: "/tie-zi",
      },
    },
  },
});
