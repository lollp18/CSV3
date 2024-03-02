<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>

<template>
  <header>
    <nav>
      <input
        class="file-upload"
        type="file"
        @change="store.GetFileData"
        accept=".csv" />
      <button
        v-if="store.CurrentTables.length >= 1"
        @click="store.TableBearbeitenOpen = true">
        <ion-icon name="pencil-outline"></ion-icon>
      </button>

      <button
        v-show="store.ShowLogoutBTN"
        @click="store.Abmelden">
        Abmelden
      </button>
    </nav>

    <div
      class="tabel-info"
      v-if="store.CurrentTables.length >= 1">
      <input
        @input="store.SetCurrentTabelName()"
        class="tabel-name"
        placeholder="Tablename"
        v-model="store.CurrentTable.TableName" />
      <input
        class="zellen-inhalt"
        placeholder="Zelleninhalt"
        type="text"
        @input="store.SetZellenValue()"
        v-model="store.CurrentTable.CurrentZelle.ZellenInhalt" />

      <input placeholder="" />
    </div>
  </header>
</template>
<style scoped lang="sass">

@import "../Style.sass"
header
  display: flex
  flex-direction: column
  height: 12%

nav
  padding: 1.5rem
  display: flex
  gap: 1rem

.file-upload
  padding: 0
  font-size: none
  border-radius: none
  border: none
  box-shadow: none
  border: none

.add-tabellEL
  height: 100%


.btn:link
  text-decoration: none

::-webkit-file-upload-button
  background-color: $MainColor
  padding: 1rem

  border-radius: 10px

  box-shadow: 0 0 15px 4px $boxShadowColor
  border: 1px solid $draggableBorderColor


/* Tabel Header */

.tabel-info
  display: flex
  gap: 1rem

.tabel-name
  width: 10%

.zellen-inhalt
  width: 90%
</style>
