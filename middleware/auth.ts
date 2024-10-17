export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.path === "/" && to.path === "/Csv") {
    const status = await AuthStore.Login()

    return status === 202
      ? await navigateTo("/")
      : status === 201
      ? await navigateTo("/CSV")
      : await navigateTo("/")
  }
  if (from.path === "/SingleUp" && to.path === "/Csv") {
    const status = await AuthStore.SignUp()

    return status === 202
      ? await navigateTo("/SignUp")
      : status === 201
      ? navigateTo("/CSV")
      : await navigateTo("/SignUp")
  }
})
