export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],
  
  supabase: {
    url: 'https://api-supabase-lja-community.ingriduzeda.com',
    key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MjM5OTQ2MCwiZXhwIjo0OTI4MDczMDYwLCJyb2xlIjoiYW5vbiJ9.1LBWDKgohjdLzHtU7LM5Rla0htbI1BRXDShfLtbMBIA',
    redirect: false,
  },

  runtimeConfig: {
    public: {
      supabaseUrl: 'https://api-supabase-lja-community.ingriduzeda.com',
      supabaseKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MjM5OTQ2MCwiZXhwIjo0OTI4MDczMDYwLCJyb2xlIjoiYW5vbiJ9.1LBWDKgohjdLzHtU7LM5Rla0htbI1BRXDShfLtbMBIA',
    }
  }
})
