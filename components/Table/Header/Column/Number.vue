<script setup></script>
<template>
  <TableColumn>
    <TableCell Varient="CellPlaceholder" />

    <TableCell Varient="CellNumber">1</TableCell>
    <template
      v-for="NumberFirstColumn in MainStore.FirstColumnLength"
      :key="NumberFirstColumn">
      <TableCell
        v-if="PageStore.GetPageDimension(NumberFirstColumn)"
        Varient="CellNumber">
        {{ NumberFirstColumn }}
      </TableCell>
    </template>
  </TableColumn>
</template>
