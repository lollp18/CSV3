const store = UseMainStore()

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/Csv") {
    if (store.AbmeldenStatus == 202) {
      return navigateTo("/")
    } else if (store.AbmeldenStatus == 201) {
      return navigateTo("/Csv")
    }
  }
})
