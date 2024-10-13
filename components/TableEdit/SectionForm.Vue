<script setup lang="ts">
const { SectionTitle } = defineProps<{
  SectionTitle: string
}>()
</script>
<template>
  <div class="Box">
    <h1>{{ SectionTitle }}</h1>
    <ErrorBox>{{ TableEditStore.Error }}</ErrorBox>
    <slot></slot>
    <button
      class="BtnAddBearbeiten"
      @click="$emit('FormAction')">
      <ion-icon name="add-outline"></ion-icon>
    </button>
  </div>
</template>
