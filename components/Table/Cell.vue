<script setup lang="ts">
const Props = defineProps<{
  Varient: "Cell" | "CellActive" | "CellPlaceholder" | "CellNumber"
}>()

const Varient = computed(() => Props.Varient)
</script>
<template>
  <div :class="Varient">
    <slot></slot>
  </div>
</template>
<style scoped lang="sass">
@import "../assets/style/main.sass"
.Cell
  @include Cell()
  &:hover
    border: 1px solid $SecondaryColor
.CellActive
  @include Cell()
  border: 1.9px solid $SecondaryColor

.CellPlaceholder
  @include Cell()
  background-color: $CellPlaceholderBackgroundColor

.CellNumber
  @include Cell()
  text-align: center
</style>
