<script setup></script>
<template>
  <TableEditSectionForm
    SectionTitle="Insert Colume"
    @FormAction="TableEditStore.InsertColumns">
    <input
      v-model="TableEditStore.Insert.Columns.Column"
      placeholder="Enter Column"
      type="number" />
    <select @change="store.GetOptionSpalte">
      <option value="L">Left</option>
      <option value="R">Right</option>
    </select>
    <input
      v-model="TableEditStore.Insert.Columns.Amount"
      placeholder="Amount"
      type="number" />
  </TableEditSectionForm>
</template>
