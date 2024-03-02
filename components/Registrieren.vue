<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>

<template>
  <div class="FormRapper">
    <form>
      <div
        style="
          display: flex;
          justify-content: center;
          font-size: medium;
          color: red;
        ">
        {{ store.RegistrierenCheck }}
      </div>
      <input
        class="new-Tabel-input"
        v-model="store.Registrieren.Username"
        placeholder="Username" />
      <input
        class="new-Tabel-input"
        v-model="store.Registrieren.Email"
        placeholder="Email" />
      <input
        class="new-Tabel-input"
        v-model="store.Registrieren.Passwort"
        placeholder="Passwort" />
      <input
        class="new-Tabel-input"
        v-model="store.Registrieren.PasswortWiederholen"
        placeholder="Passwort wiederholen" />

      <button
        @click="store.mRegistrieren"
        class="btn font">
        Registrieren
      </button>

      <router-link
        :to="{ name: 'Login' }"
        class="router-link">
        Login
      </router-link>
    </form>
  </div>
</template>
<style scoped lang="sass">

@import "../Style.sass"
.FormRapper
  @include Center()
  width: 100%
  height: 100%
input
  font-size: 1.8rem
button
  font-size: 1.8rem

form
  @include Center()
  @include DreiD()
  flex-direction: column
  background-color: $MainColor

  gap: 3rem
  padding: 4rem 4rem
  height: 50rem
  width: 50rem
  border-radius: 10px
  font-size: 1.8rem
.router-link
  @include Button()
  text-decoration: none
.checkbox
  width: 2rem
</style>
