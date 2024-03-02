<script setup>
import { UseMainStore } from "../stores/MainStore.js"
const store = UseMainStore()
</script>

<template>
  <footer>
    <div class="auswahl-container">
      <div
        class="auswahl-containerItem"
        v-for="({ TableName }, TableIndex) in store.CurrentTables"
        :key="TableIndex">
        <button @click="store.GetSelectTabel(TableIndex)">
          {{ TableName }}
        </button>
        <button
          class="BtnDeletTable"
          @click="store.DeleteTable(TableIndex)">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <a
          class="BtnDownload"
          @click="store.mDownlodFile(TableIndex)"
          :href="store.DownloadFile.Href"
          :download="TableName">
          <ion-icon name="download-outline"></ion-icon>
        </a>
      </div>
      <button
        class="btn"
        @click="store.NewTableIsOpen = true">
        <ion-icon name="add-outline"></ion-icon>
      </button>
    </div>
    <div class="seiten-rapper">
      <button
        v-if="store.SeitenVerwenden.CurrentSeite.Zahl > 1"
        class="btn-seiten-FL"
        @click="store.SeiteFirst()">
        First
      </button>
      <button
        v-if="store.SeitenVerwenden.CurrentSeite.Zahl > 1"
        class="btn-seiten"
        @click="store.SeiteZurück()">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      <button class="zahl">
        {{ store.SeitenVerwenden.CurrentSeite.Zahl }}
      </button>
      <button
        v-if="
          store.SeitenVerwenden.CurrentSeite.Zahl <=
          store.SeitenVerwenden.CurrentSeiten.length - 1
        "
        @click="store.SeiteVor()">
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
      <button
        v-if="
          store.SeitenVerwenden.CurrentSeite.Zahl <=
          store.SeitenVerwenden.CurrentSeiten.length - 1
        "
        @click="store.SeiteLast()">
        Last
      </button>
    </div>
  </footer>
</template>
<style scoped lang="sass">

@import "../Style.sass"

footer
  display: flex
  align-items: center
  height: 7%
  width: 100%
  background-color: $MainColor
  @include Border


ion-icon
  font-size: 20px


[name="download-outline"]
  color: #22c55e

a
  @include Button()



.auswahl-container
  gap: 1rem
  display: flex
  margin-left: 1rem
  background-color: $MainColor
  align-items: center
  width: 90%


.auswahl-containerItem
  @include Button()
  gap: 1rem
  padding: .5rem




/* --- Seiten Wechseln --- */

.seiten-rapper
  display: flex
  justify-content: flex-end
  gap: 0.5rem



.zahl
  @include Center()
  font-size: 1.8rem
</style>
