import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@pinia/nuxt', '@nuxt/eslint', 'pinia-plugin-persistedstate/nuxt'],

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  experimental: {
    appManifest: false,
  },
  compatibilityDate: '2024-11-01',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
