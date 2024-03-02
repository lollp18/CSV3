<script setup>
import { UseMainStore } from "../stores/MainStore.js"
const store = UseMainStore()
</script>

<template>
  <Transition>
    <div class="new-Tabel-bg">
      <div class="new-Tabel">
        <h1>{{ store.ConfirmationWindow.Text }}</h1>
        <div class="new-Tabel-btnRapper">
          <div>
            <button @click="store.ConfirmationWindowClose()">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
          <div v-html="store.ConfirmationWindow.Temlate"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>


<style lang="sass" scoped>

@import "../Style.sass"

.new-Tabel-bg
  @include Center
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)

.new-Tabel
  @include DreiD
  @include Center
  @include FelxColum

  position: relative

  z-index: 3

  background-color: $MainColor

  gap: 3rem
  padding: 4rem 4rem

  border-radius: 10px




.new-Tabel-btnRapper
  display: flex
  gap: 1.5rem
</style>
