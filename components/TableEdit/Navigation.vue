<script setup></script>
<template>
  <aside v-if="TableEditStore.Navigation">
    <button
      @click="
        TableEditStore.SetCurrentSection(TableEditStore.Sections.InsertColumn)
      ">
      Insert Columns
    </button>
    <button
      @click="
        TableEditStore.SetCurrentSection(TableEditStore.Sections.SwapColumns)
      ">
      Swap Colums
    </button>
    <button
      @click="
        TableEditStore.SetCurrentSection(TableEditStore.Sections.InsertRow)
      ">
      Inserte Rows
    </button>
    <button
      @click="
        TableEditStore.SetCurrentSection(TableEditStore.Sections.SwapRows)
      ">
      Swap Rows
    </button>
    <button
      @click="
        TableEditStore.SetCurrentSection(TableEditStore.Sections.SwapCells)
      ">
      Swap Cells
    </button>
  </aside>
</template>
<style lang="sass">
@import "../assets/style/main.sass"
aside
  @include FelxColum()
  gap: 1.5rem
  padding: 1rem
  position: absolute
</style>
