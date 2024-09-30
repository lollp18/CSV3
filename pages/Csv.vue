<script setup>
definePageMeta({
  middleware: "auth",
})

onBeforeMount(async () => {
  await nextTick(async () => {})
  await MainStore.SetApiUrlUserTables()
})

onUpdated(() => {
  nextTick(() => {
    MainStore.InitSeitenBerechnen()
    MainStore.SetCurrentSeiteFirst()
  })
})

onMounted(() => {
  nextTick(() => {
    MainStore.InitSeitenBerechnen()
    MainStore.SetCurrentSeiteFirst()
  })

  window.addEventListener("resize", () => {
    MainStore.ResizeWindow()
  })
})

onUnmounted(() => {
  window.removeEventListener("resize")
})
</script>

<template>
  <Bearbeiten v-if="MainStore.TableBearbeitenOpen" />
  <NewTable v-if="MainStore.NewTableIsOpen" />

  <Header />
  <NoTable v-if="MainStore.CurrentTablesSize === 0" />

  <Table v-if="MainStore.CurrentTablesSize >= 1" />
  <Footer v-if="MainStore.CurrentTablesSize >= 1" />
</template>

<style scoped lang="sass">

@import "../assets/style/main.sass"
</style>
