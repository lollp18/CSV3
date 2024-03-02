<script setup>
import { UseMainStore } from "../stores/MainStore.js"
const store = UseMainStore()
</script>

<template>
  <div class="FormWrapper">
    <form>
      <span class="error-message">
        {{ store.AnmeldenCheck }}
      </span>
      <input
        class="new-Table-input"
        v-model="store.Anmelden.Email"
        placeholder="Email" />
      <input
        class="new-Table-input"
        v-model="store.Anmelden.Passwort"
        placeholder="Passwort" />

      <button
        @click.prevent="store.mAnmelden()"
        class="btn font">
        Anmelden
      </button>

      <router-link
        :to="{ name: 'Registrieren' }"
        class="router-link btn">
        Registrieren
      </router-link>

      <input
        class="checkbox"
        v-model="store.AngemedetBleiben"
        type="checkbox" />
    </form>
  </div>
</template>

<style scoped lang="sass">
@import "../Style.sass"

.FormWrapper
  @include Center()
  width: 100%
  height: 100%

form
  @include Center()
  @include DreiD()
  flex-direction: column
  background-color: $MainColor
  gap: 3rem
  padding: 4rem 4rem
  height: 40rem
  width: 50rem
  border-radius: 10px
  font-size: 1.8rem

.error-message
  display: flex
  justify-content: center
  font-size: 1.6rem
  color: red




button,.router-link,input
  @include Button()

  font-size: 1.8rem
  text-decoration: none

.checkbox
  width: 2rem
</style>
