<script setup>
onBeforeMount(async () => {
  await MainStore.SetCurrentURL(MainStore.ApiURLs.BaseUrlLocl)
})
</script>

<template>
  <AuthForm>
    <template #error>{{ AuthStore.LoginCheck }}</template>
    <template #main>
      <input
        v-model="AuthStore.LoginData.Email"
        placeholder="Email" />
      <input
        v-model="AuthStore.LoginData.Password"
        placeholder="Passwort" />

      <NuxtLink
        to="/Csv"
        class="router-link">
        Login
      </NuxtLink>

      <NuxtLink
        to="/SingleUp"
        class="router-link">
        SingleUp
      </NuxtLink>
    </template>
  </AuthForm>
</template>
