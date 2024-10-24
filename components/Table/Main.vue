<script setup></script>

<template>
  <table class="flex flex-col border-collapse h-5/6">
    <TableHeaderMain />

    <tr class="flex h-full overflow-y-scroll overflow-x-hidden border-0">
      <TableSidebarMain />

      <TableBody />
    </tr>
  </table>
</template>
<style scoped lang="sass">
@import "../assets/style/main.sass"

table
  border-top: 1px solid $MainBorderColor
  font-size:11pt
</style>
