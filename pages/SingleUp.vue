<script setup>
onBeforeMount(async () => {
  await ApiStore.SetCurrentURL(ApiStore.BaseUrlLocl)
})
</script>

<template>
  <AuthForm>
    <template #error> {{ AuthStore.SignUpCheck }}</template>
    <template #main>
      <input
        v-model="AuthStore.SignUpData.Username"
        placeholder="Username" />
      <input
        v-model="AuthStore.SignUpData.Email"
        placeholder="Email" />
      <input
        v-model="AuthStore.SignUpData.Password"
        placeholder="Password" />
      <input
        v-model="AuthStore.SignUpData.PasswordRepeat"
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
