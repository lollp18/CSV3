<script setup></script>
<template>
  <TableEditSectionForm
    SectionTitle="Swap Cells"
    @FormAction="TableEditStore.InitCellsSwap">
    <h2>First Cell</h2>
    <input
      v-model="TableEditStore.SwapCells.FirstCell.Row"
      type="number"
      min="1"
      placeholder="Row Number" />
    <input
      v-model="TableEditStore.SwapCells.FirstCell.Column"
      type="number"
      min="1"
      placeholder="Column Number" />
    <h2>Second Cell</h2>
    <input
      v-model="TableEditStore.SwapCells.SecondCell.Row"
      type="number"
      min="1"
      placeholder="Row Number" />
    <input
      v-model="TableEditStore.SwapCells.SecondCell.Column"
      type="number"
      min="1"
      placeholder="Column Number" />
  </TableEditSectionForm>
</template>
