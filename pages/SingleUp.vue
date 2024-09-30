<script setup>
onBeforeMount(async () => {
  await MainStore.SetCurrentURL(MainStore.ApiURLs.BaseUrlLocl)
})
</script>

<template>
  <AuthForm>
    <template #error> {{ AuthStore.SingleUpCheck }}</template>
    <template #main>
      <input
        v-model="AuthStore.SingleUpData.Username"
        placeholder="Username" />
      <input
        v-model="AuthStore.SingleUpData.Email"
        placeholder="Email" />
      <input
        v-model="AuthStore.SingleUpData.Password"
        placeholder="Password" />
      <input
        v-model="AuthStore.SingleUpData.PasswordRepeat"
        placeholder="Password Repeat" />
      <router-link
        to="/Csv"
        class="router-link">
        Singleup
      </router-link>
      <router-link
        to="/"
        class="router-link">
        Login
      </router-link>
    </template>
  </AuthForm>
</template>
