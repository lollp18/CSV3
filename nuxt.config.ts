// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "createPinia"] }],
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  imports: {
    dirs: ["./stores", "./helper"],
  },

  hooks: {
    "pages:extend"(pages) {
      // add a route
      pages.push({
        name: "Login",
        path: "/",
        file: "~/pages/Login.vue",
      })
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  css: ["~/assets/style/main.sass"],
  googleFonts: {
    families: {
      Roboto: [400, 500, 700], // Specify the weights you need
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-08-12",
})
