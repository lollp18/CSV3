<script setup></script>
<template>
  <TableEditSectionForm SectionTitle=" Swap Columns" @FormAction="TableEditStore.InitSwapColumns" >
    <input
      v-model="TableEditStore.Swap.Columns.First"
      placeholder="Column Number"
      min="1"
      type="number" />
    <input
      v-model="TableEditStore.Swap.Columns.Second"
      placeholder="Column Number"
      min="1"
      type="number" />
  </TableEditSectionForm>
</template>
