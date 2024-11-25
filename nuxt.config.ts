// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "nuxt-lodash",
    "@primevue/nuxt-module",
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-file-storage",
    "@nuxtjs/strapi",
    "@nuxt/devtools",
  ],
  ssr: false,
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"],
      ["kebabCase", "stringToKebab"],
      ["isDate", "isLodashDate"],
    ],
  },
  strapi: {
    url: process.env.STRAPI_URL ?? "http://localhost:1337",
    prefix: "/api",
    admin: "/admin",
  },
  fileStorage: {
    mount: process.env.mount,
  },
  icon: {
    provider: "server",
    customCollections: [
      {
        prefix: "icons",
        dir: "./assets/icons",
      },
    ],
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },
    provider: "google",
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
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
        icon: "icons:english",
        file: "en.json",
      },
      {
        code: "vi",
        iso: "vi-VN",
        name: "Vietnamese",
        icon: "icons:vietnam",
        file: "vi.json",
      },
      {
        code: "cn",
        iso: "zh-CN",
        name: "Chinese",
        icon: "icons:china",
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
