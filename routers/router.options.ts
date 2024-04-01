import type { RouterConfig } from "@nuxt/schema"
import Login from "~/pages/Login.vue"

export default <RouterConfig>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: "Login",
      path: "/",
      component: Login,
    },
  ],
}
