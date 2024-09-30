<script setup></script>

<template>
  <footer>
    <div class="auswahl-container">
      <div
        class="auswahl-containerItem"
        v-for="([i, { TableName }], TableIndex) in MainStore.CurrentTables"
        :key="TableIndex">
        <button @click="MainStore.GetSelectTabel(TableIndex)">
          {{ TableName }}
        </button>
        <button
          class="BtnDeletTable"
          @click="MainStore.DeleteTable(TableIndex)">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <a
          class="BtnDownload"
          @click="MainStore.mDownlodFile(TableIndex)"
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
    <div class="seiten-rapper">
      <button
        v-if="MainStore.SeitenVerwenden.CurrentSeite.Zahl > 1"
        class="btn-seiten-FL"
        @click="MainStore.SeiteFirst()">
        First
      </button>
      <button
        v-if="MainStore.SeitenVerwenden.CurrentSeite.Zahl > 1"
        class="btn-seiten"
        @click="MainStore.SeiteZurück()">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      <button class="zahl">
        {{ MainStore.SeitenVerwenden.CurrentSeite.Zahl }}
      </button>
      <button
        v-if="
          MainStore.SeitenVerwenden.CurrentSeite.Zahl <=
          MainStore.SeitenVerwenden.CurrentSeiten.length - 1
        "
        @click="MainStore.SeiteVor()">
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
      <button
        v-if="
          MainStore.SeitenVerwenden.CurrentSeite.Zahl <=
          MainStore.SeitenVerwenden.CurrentSeiten.length - 1
        "
        @click="MainStore.SeiteLast()">
        Last
      </button>
    </div>
  </footer>
</template>
<style scoped lang="sass">

@import "../assets/style/main.sass"

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
