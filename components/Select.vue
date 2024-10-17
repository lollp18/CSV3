<script setup lang="ts">
const { Options } = defineProps<{
  Options: Array<{
    value: string
    label: string
  }>
}>()
</script>
<template>
  <select @change="$emit('ActionChange', $event)">
    <option
      v-for="option in Options"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
