// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "Deny Kristianto Pamuji | %s",
      // title: "Deny Kristianto Pamuji",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preload", as: "font", type: "font/ttf", href: "/RobotoMono-VariableFont_wght.ttf", crossorigin: "anonymous" }
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  site: {
    url: "https://pamuji.id",
    name: "Deny Kristianto Pamuji",
    description: "Portfolio of Deny Kristianto Pamuji, a Frontend & Fullstack Node.js Engineer.",
    defaultLocale: "en",
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/icon",
    "nuxt-aos",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@vee-validate/nuxt",
    "nuxt-gtag",
    "@nuxt/content",
  ],
  compatibilityDate: "2025-08-06",
  components: [
    "~/components",
    {
      path: "~/components/Custom",
      prefix: "C",
    },
  ],
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
  runtimeConfig: {
    secretKey: "",
  },
  // 🚀 Full Static Site Generation
  routeRules: {
    // Prerender all routes
    "/**": { prerender: true },
  },
  ogImage: {
    enabled: false,
  },
  aos: {
    disable: "mobile",
    once: true,
  },
  gtag: {
    id: process.env.NODE_ENV === "production" && process.env.LIGHTHOUSE !== "true" ? "G-MMFGMEV646" : undefined,
    enabled: process.env.NODE_ENV === "production" && process.env.LIGHTHOUSE !== "true",
  },
});
