<script setup>
definePageMeta({
  middleware: "auth",
})

onBeforeMount(async () => {
  await nextTick(async () => {})
  await ApiStore.SetApiUrlUserTables()
})

onUpdated(() => {
  nextTick(() => {
    PageStore.InitSeitenBerechnen()
    PageStore.PageNav("GoFirst")
  })
})

onMounted(() => {
  nextTick(() => {
    PageStore.InitSeitenBerechnen()
    PageStore.PageNav("GoFirst")
  })

  window.addEventListener("resize", () => {
    PageStore.ResizeWindow()
  })
})

onUnmounted(() => {
  window.removeEventListener("resize")
})
</script>

<template>
  <Header />
  <TableEditMain v-if="MainStore.TableBearbeitenOpen" />
  <NewTable v-if="MainStore.NewTableIsOpen" />

  <NoTable v-if="MainStore.CurrentTablesSize === 0" />

  <Table v-if="MainStore.CurrentTablesSize >= 1" />
  <Footer v-if="MainStore.CurrentTablesSize >= 1" />
</template>

<style scoped lang="sass">

@import "../assets/style/main.sass"
</style>
