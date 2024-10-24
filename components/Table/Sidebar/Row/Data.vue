<script setup></script>
<template>
  <td>
    <template
      v-for="[ColumnKey, Cell] in MainStore.CurrentTableTableData"
      :key="ColumnKey">
      <template v-if="ColumnKey != 1">
        <template
          v-for="[CellKey, { CellContent, Active }] in Cell"
          :key="CellKey">
          <TableCell
            v-if="CellKey < 2"
            :Varient="Active ? 'CellActive' : 'Cell'"
            @click="MainStore.UpdateCell(ColumnKey, CellKey, CellContent)">
            {{ CellContent }}
          </TableCell>
        </template>
      </template>
    </template>
  </td>
</template>
