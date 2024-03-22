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
    '@pinia/nuxt',
    '@nuxtjs/seo'
  ],

  plugins: ["~/plugins/flowbiteInjection.ts"],

  runtimeConfig: {
    public: {
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
      APP_URL: process.env.WEBSITE_URL,
    },
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  site: {
    url: process.env.WEBSITE_URL,
    name: "Louvor JA Community",
    description: "LJA Community é um projeto independente criado para facilitar o compartilhamento de coletâneas personalizadas do Louvor JA.",
    defaultLocale: "pt-BR",
    ogImage: `${process.env.WEBSITE_URL}/images/seo/card-light.jpg`,
    ogImageAlt: 'Louvor JA Community',
    ogUrl: process.env.WEBSITE_URL,
  },

});
