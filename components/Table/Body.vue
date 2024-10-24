<script setup></script>
<template>
  <td class="flex-col">
    <template
      v-for="[ColumnKey, Cell] in MainStore.CurrentTableTableData"
      :key="ColumnKey">
      <div
        class="flex"
        v-if="ColumnKey != 1">
        <template
          v-for="[CellKey, { CellContent, Active }] in Cell"
          :key="CellKey">
          <TableCell
            :Varient="Active ? 'CellActive' : 'Cell'"
            @click="MainStore.UpdateCell(ColumnKey, CellKey, CellContent)"
            v-if="PageStore.GetPageDimension(CellKey)">
            {{ CellContent }}
          </TableCell>
        </template>
      </div>
    </template>
  </td>
</template>
