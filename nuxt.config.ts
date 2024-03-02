// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  imports: {
    
    dirs: ["./stores", "./helper"],
  },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/Style.sass"],
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
