// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "Deny Kristianto Pamuji | %s",
      // title: "Deny Kristianto Pamuji",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
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
    firebase: {
      projectId: "",
      clientEmail: "",
      privateKey: "",
    },
    cloudinary: {
      cloudName: "",
      apiKey: "",
      apiSecret: "",
    },
    secretKey: "",
  },
  sitemap: {
    exclude: ["/admin/**"],
  },
  // 🚀 Hybrid Rendering for Performance
  routeRules: {
    // Pre-render homepage at build time
    "/": { prerender: true },

    // ISR for portfolio - regenerate every hour
    "/portfolio": { isr: 3600 },

    // ISR for tech stack - regenerate every hour
    "/tech-stack": { isr: 3600 },

    // Keep admin dynamic (SSR with authentication)
    "/admin/**": { ssr: true },

    // API routes
    "/api/**": { cors: true },
  },
  ogImage: {
    enabled: false,
  },
});
