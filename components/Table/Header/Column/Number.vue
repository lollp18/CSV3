<script setup></script>
<template>
  <TableColumn>
    <TableCell Varient="CellPlaceholder" />

    <TableCell Varient="CellNumber">1</TableCell>
    <div
      v-for="NumberFirstRow in MainStore.FirstRowLength"
      :key="NumberFirstRow">
      <TableCell
        v-if="
          NumberFirstRow > 1 &&
          NumberFirstRow >= PageStore.CurrentPageStart &&
          NumberFirstRow <= PageStore.CurrentPageEnd
        "
        Varient="CellNumber">
        {{ NumberFirstRow }}
      </TableCell>
    </div>
  </TableColumn>
</template>
