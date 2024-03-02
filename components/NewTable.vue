<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <Transition>
    <div class="new-Tabel-bg">
      <div class="new-Tabel">
        <div class="new-Tabel-Input-rapper">
          <h1>Neue Tabelle Generiren</h1>
          <h2 style="color: red">{{ store.NewTable.Error }}</h2>
          <input
            v-model="store.NewTable.TableName"
            placeholder="Tabllen Name" />
          <input
            v-model="store.NewTable.AnzahlZeilen"
            placeholder="Anzahl der Zeilen" />
          <input
            v-model="store.NewTable.AnzahlSpalten"
            placeholder="Anzahl der Spalten" />
        </div>
        <div class="new-Tabel-btnRapper">
          <button @click="store.CreateNewTable()">
            <ion-icon name="duplicate-outline"></ion-icon>
          </button>
          <button @click="store.NewTableIsOpen = false">
            <ion-icon name="close-outline"></ion-icon>
          </button>
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


.new-Tabel-Input-rapper
  display: flex
  flex-direction: column
  gap: 1.5rem


.new-Tabel-btnRapper
  display: flex
  gap: 1.5rem
</style>
