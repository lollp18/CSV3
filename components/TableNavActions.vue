<script setup></script>
<template>
  <div class="ChooseBox">
    <button
      class="btn"
      @click="NewTableStore.IsOpen = true">
      <ion-icon name="add-outline"></ion-icon>
    </button>
    <div
      class="ChooseBoxItem"
      v-for="[TableIndex, { TableName }] in MainStore.CurrentTables"
      :key="TableIndex">
      <input
        v-if="MainStore.TableNameEdit"
        @input="MainStore.SetCurrentTableName()"
        v-model="MainStore.CurrentTable.TableName" />
      <button
        v-rightClick="(MainStore.TableNameEdit = true)"
        v-if="!MainStore.TableNameEdit"
        @click="MainStore.GetSelectTable(TableIndex)">
        {{ TableName }}
      </button>
      <button
        class="BtnDeletTable"
        @click="ApiStore.DeleteTable(TableIndex)">
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
  </div>
</template>
<style lang="sass" scoped>
@import "../assets/style/main.sass"
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
