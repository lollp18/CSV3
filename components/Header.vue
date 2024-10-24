<script setup></script>

<template>
  <header>
    <nav>
      <input
        class="file-upload"
        type="file"
        @change="MainStore.GetFileData"
        accept=".csv" />
      <button
        v-if="MainStore.CurrentTablesSize >= 1"
        @click="TableEditStore.IsOpen = true">
        <ion-icon name="pencil-outline"></ion-icon>
      </button>
    </nav>

    <div
      class="flex gap-6"
      v-if="MainStore.CurrentTablesSize >= 1">
      <input
        class="w-11/12"
        placeholder="Cell content"
        type="text"
        @input="MainStore.SetCellValue()"
        v-model="MainStore.CurrentTable.CurrentCell.CellContent" />
      <input
        type="search"
        placeholder="Search" />
    </div>
  </header>
</template>
<style scoped lang="sass">

@import "../assets/style/main.sass"
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
</style>
