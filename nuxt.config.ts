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
    "@nuxtjs/supabase",
  ],

  plugins: ["~/plugins/flowbiteInjection.ts"],

  supabase:{
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/explore", "/collections", "/about", "/register"],
    },
  }
});
