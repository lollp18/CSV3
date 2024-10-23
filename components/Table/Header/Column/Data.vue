<script setup></script>

<template>
  <TableColumn>
    <TableCell Varient="CellNumber">1</TableCell>

    <TableCell
      :Varient="MainStore.FirstCellActive ? 'CellActive' : 'Cell'"
      @click="MainStore.UpdateCell(1, 1, MainStore.FirstCellCellContent)">
      {{ MainStore.FirstCellCellContent }}
    </TableCell>

    <div
      v-for="[CellIndex, { CellContent, Active }] in MainStore.FirstRow"
      :key="CellIndex">
      <TableCell
        v-if="
          CellIndex > 1 &&
          CellIndex >= PageStore.CurrentPageStart &&
          CellIndex <= PageStore.CurrentPageEnd
        "
        :Varient="Active ? 'CellActive' : 'Cell'"
        @click="MainStore.UpdateCell(1, CellIndex, CellContent)">
        {{ CellContent }}
      </TableCell>
    </div>
  </TableColumn>
</template>
