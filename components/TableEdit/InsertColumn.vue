<script setup></script>
<template>
  <TableEditSectionForm 
  
    SectionTitle="Insert Colume"
    @FormAction="TableEditStore.InitInsertColumns">
    <input
      min="1"
      v-model="TableEditStore.Insert.Columns.Column"
      placeholder="Enter Column"
      type="number" />
    <Select
      :Options="[
        { value: 'L', label: 'Left' },
        { value: 'R', label: 'Right' },
      ]"
      @ActionChange="TableEditStore.GetOptionValue($event, 'Columns')" />

    <input
      min="1"
      v-model="TableEditStore.Insert.Columns.Amount"
      placeholder="Amount"
      type="number" />
  </TableEditSectionForm>
</template>
