<script setup></script>

<template>
  <TableColumn>
    <TableCell Varient="CellNumber">1</TableCell>

    <TableCell
      :Varient="MainStore.FirstCellActive ? 'CellActive' : 'Cell'"
      @click="MainStore.UpdateCell(1, 1, MainStore.FirstCellCellContent)">
      {{ MainStore.FirstCellCellContent }}
    </TableCell>

    <template
      v-for="[CellIndex, { CellContent, Active }] in MainStore.FirstColumn"
      :key="CellIndex">
      <TableCell
        v-if="PageStore.GetPageDimension(CellIndex)"
        :Varient="Active ? 'CellActive' : 'Cell'"
        @click="MainStore.UpdateCell(1, CellIndex, CellContent)">
        {{ CellContent }}
      </TableCell>
    </template>
  </TableColumn>
</template>
