// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [["@pinia/nuxt", { autoImports: ["defineStore", "createPinia"] }]],
 
  imports: {
    dirs: ["./stores", "./helper"],
  },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ['~/assets/scss/main.scss'],

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
