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
});
