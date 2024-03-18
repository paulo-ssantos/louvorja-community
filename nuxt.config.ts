// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-swiper",
    "nuxt-typed-router",
    "@nuxtjs/tailwindcss",
  ],

  plugins: ["~/plugins/flowbiteInjection.ts"],

  runtimeConfig: {
    public: {
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
      APP_URL: process.env.VERCEL_URL,
    },
  },

});
