// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Deny Kristianto Pamuji",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/icon",
    "nuxt-aos",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
  ],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-27",
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
});
