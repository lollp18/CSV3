import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "../app.vue"

export function initStore() {
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)
}




