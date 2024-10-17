<script setup></script>
<template>
  <div class="ChooseBox">
    <div
      class="ChooseBoxItem"
      v-for="([i, { TableName }], TableIndex) in MainStore.CurrentTables"
      :key="TableIndex">
      <button @click="MainStore.GetSelectTable(TableIndex)">
        {{ TableName }}
      </button>
      <button
        class="BtnDeletTable"
        @click="MainStore.DeleteTable(TableIndex)">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <a
        class="BtnDownload"
        @click="MainStore.DownlodFile(TableIndex)"
        :href="MainStore.DownloadFileHref"
        :download="TableName">
        <ion-icon name="download-outline"></ion-icon>
      </a>
    </div>
    <button
      class="btn"
      @click="MainStore.NewTableIsOpen = true">
      <ion-icon name="add-outline"></ion-icon>
    </button>
  </div>
</template>
<style lang="sass" scoped>
[name="download-outline"]
  color: #22c55e

a
  @include Button()



.ChooseBox
  gap: 1rem
  display: flex
  margin-left: 1rem
  background-color: $MainColor
  align-items: center
  width: 90%


.ChooseBoxItem
  @include Button()
  gap: 1rem
  padding: .5rem
</style>
