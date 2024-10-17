<script setup></script>

<template>
  <footer>
    <TableNavActions />
    <PageNav />
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
</style>
