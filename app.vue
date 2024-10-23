<script setup>
useHead({
  title: "CSV3",
  htmlAttrs: {
    lang: "en",
  },
  script: [
    {
      type: "module",
      src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js",
    },
    {
      nomodule: true,
      src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js",
    },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
<style lang="sass">
/* --- Global Styls --- */
@import "./assets/style/main.sass"
.error-message
  display: flex
  justify-content: center
  font-size: 1.6rem
  color: red

[name="close-outline"]
  color: $InvalideCloseColor

ion-icon
  font-size: 20px

input
  @include Input()

button
  @include Button()

select
  @include Select()

h1
  font-size: 2rem
  font-weight: 600
  font-family: "Roboto", sans-serif
  color: #000
  text-transform: uppercase
  text-shadow: 1px 1px 1px rgba(16, 16, 16, 0.5)
  text-shadow: 1px 1px 1px rgba(16, 16, 16, 0.4)
  text-shadow: 1px 5px 10px rgba(16, 16, 16, 0.3)
  text-shadow: 1px 10px 10px rgba(16, 16, 16, 0.2)

.box
  @include FelxColum()
  @include Center()
  gap: 2rem

.BtnAddBearbeiten
  @include Button()
  margin-bottom: 2rem

#__nuxt
  display: flex
  flex-direction: column
  height: 100%
  margin: 0
  padding: 0
  overflow: hidden

html
  font-size: 62.5%
  overflow: hidden
  height: 100vh

*,
*::before,
*::after
  box-sizing: border-box
  margin: 0
  padding: 0


body
  padding: 0
  margin: 0
  height: 100%
  overflow: hidden
  color: $SecondaryColor
  background: $MainColor
  transition: color 0.5s, background-color 0.5s

  font-family: Roboto
  text-rendering: optimizeLegibility
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
