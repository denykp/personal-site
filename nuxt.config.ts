// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Deny Kristianto Pamuji",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
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
    "@vee-validate/nuxt",
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
});
