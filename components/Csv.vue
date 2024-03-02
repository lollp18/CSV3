<script setup>
import { UseMainStore } from "../stores/MainStore.js"
import { nextTick, onMounted, onBeforeMount, onUpdated, onUnmounted } from "vue"

// Compnents
import ConfirmationWindow from "./ConfirmationWindow.vue"
import NewTable from "./NewTable.vue"
import Bearbeiten from "./Bearbeiten.vue"
import Header from "./Header.vue"
import Table from "./Table.vue"
import NoTable from "./NoTable.vue"
import Footer from "./Footer.vue"

const store = UseMainStore()

onBeforeMount(async () => {
  await store.CheckLogin()
  await store.SetApiUrlUserTables()
  await store.GetTables()
})

onUpdated(() => {
  nextTick(() => {
    store.SaveTables()
    store.InitSeitenBerechnen()
    store.SetCurrentSeiteFirst()
  })
})

onMounted(() => {
  nextTick(() => {
    store.InitSeitenBerechnen()
    store.SetCurrentSeiteFirst()

    window.addEventListener("resize", () => {
      store.ResizeWindow()
    })
  })
})

onUnmounted(() => {
  window.removeEventListener("resize")
})
</script>

<template>
  <ConfirmationWindow v-if="store.ConfirmationWindow.ConfirmationWindowOpen" />
  <Bearbeiten v-if="store.TableBearbeitenOpen" />
  <NewTable v-if="store.NewTableIsOpen" />

  <Header />
  <NoTable v-if="store.CurrentTables.length == 0" />

  <Table v-if="store.CurrentTables.length >= 1" />
  <Footer v-if="store.CurrentTables.length >= 1" />
</template>

<style scoped lang="sass">

@import "../Style.sass"
</style>
