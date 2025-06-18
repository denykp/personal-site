// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Deny Kristianto Pamuji",
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-icon", "nuxt-aos"],
  future: {
    compatibilityVersion: 4,
  },
});
