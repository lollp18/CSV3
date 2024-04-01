// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "createPinia"] }],
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
  css: ["~/assets/style/main.sass"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: true },
})
