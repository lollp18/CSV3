<script setup>
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
  <Bearbeiten v-if="store.TableBearbeitenOpen" />
  <NewTable v-if="store.NewTableIsOpen" />

  <Header />
  <NoTable v-if="store.CurrentTables.length == 0" />

  <Table v-if="store.CurrentTables.length >= 1" />
  <Footer v-if="store.CurrentTables.length >= 1" />
</template>

<style scoped lang="sass">

@import "../assets/style/main.sass"
</style>
