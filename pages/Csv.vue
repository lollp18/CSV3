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
    PageStore.InitPageCalculate()
    PageStore.PageNav("GoFirst")
  })
})

onMounted(() => {
  nextTick(() => {
    PageStore.InitPageCalculate()
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
  <TableEditMain v-if="TableEditStore.IsOpen" />
  <NewTable v-if="NewTableStore.IsOpen" />

  <NoTable v-if="MainStore.CurrentTablesSize === 0" />

  <TableMain v-if="MainStore.CurrentTablesSize >= 1" />
  <Footer v-if="MainStore.CurrentTablesSize >= 1" />
</template>

<style scoped lang="sass">

@import "../assets/style/main.sass"
</style>
