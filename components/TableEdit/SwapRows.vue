<script setup></script>
<template>
  <TableEditSectionForm
    SectionTitle="Swap Rows"
    @FormAction="TableEditStore.InitRowsSwap">
    <input
      v-model="TableEditStore.Swap.Rows.First"
      min="1"
      placeholder="Row Number"
      type="number" />
    <input
      v-model="TableEditStore.Swap.Rows.Second"
      min="1"
      placeholder="Row Number"
      type="number" />
  </TableEditSectionForm>
</template>
