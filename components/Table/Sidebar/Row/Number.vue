<script setup></script>
<template>
  <div>
    <template
      v-for="NumberTableData in MainStore.CurrentTableLength"
      :key="NumberTableData">
      <TableCell
        Varient="CellNumber"
        v-if="NumberTableData != 1">
        {{ NumberTableData }}
      </TableCell>
    </template>
  </div>
</template>
