// plugins/right-click-directive.js
import { defineNuxtPlugin } from "#app"
import RightClickDirective from "~/directives/v-right-click"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("rightClick", RightClickDirective)
})
