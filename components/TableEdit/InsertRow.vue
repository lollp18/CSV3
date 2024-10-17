<script setup></script>
<template>
  <TableEditSectionForm
    SectionTitle="Insert Row"
    @FormAction="TableEditStore.InitInsertRow">
    <input
      min="1"
      v-model="TableEditStore.Insert.Rows.Row"
      placeholder="Enter Row"
      type="number" />
    <Select
      :Options="[
        { value: 'Above', label: 'Above' },
        { value: 'Below', label: 'Below' },
      ]"
      @ActionChange="TableEditStore.GetOptionValue($event, 'Rows')" />

    <input
      min="1"
      v-model="TableEditStore.Insert.Rows.Amount"
      placeholder="Amount"
      type="number" />
  </TableEditSectionForm>
</template>
