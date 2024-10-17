<script setup></script>
<template>
  <div class="PageRapper">
    <button
      v-if="PageStore.CurrentPage.Number > 1"
      class="btn-seiten-FL"
      @click="PageStore.PageNav('GoFirst')">
      First
    </button>
    <button
      v-if="PageStore.CurrentPage.Number > 1"
      class="btn-seiten"
      @click="PageStore.PageNav('GoBack')">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </button>
    <button class="PageNumber">
      {{ PageStore.CurrentPage.Number }}
    </button>
    <button
      v-if="PageStore.CurrentPage.Number <= PageStore.CurrentPages.length - 1"
      @click="PageStore.PageNav('GoForward')">
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </button>
    <button
      v-if="PageStore.CurrentPage.Number <= PageStore.CurrentPages.length - 1"
      @click="PageStore.PageNav('GoLast')">
      Last
    </button>
  </div>
</template>
<style scoped lang="sass">
@import "../assets/style/main.sass"

.PageRapper
  display: flex
  justify-content: flex-end
  gap: 0.5rem



.PageNumber
  @include Center()
  font-size: 1.8rem
</style>
