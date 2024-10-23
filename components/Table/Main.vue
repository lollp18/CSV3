<script setup></script>

<template>
  <table>
    <TableHeaderMain />
    <!-- Tabel Seitenleiste -->
    <tr class="t-ab-raper">
      <!-- Tabel Seitenleiste Rown Number -->
      <div>
        <div
          class="rapperSide-btnDelet"
          v-for="NumberTableData in MainStore.CurrentTableLength"
          :key="NumberTableData">
          <TableCell
            Varient="CellNumber"
            v-if="NumberTableData != 1">
            {{ NumberTableData }}
          </TableCell>
        </div>
      </div>
      <!-- Tabel Seitenleiste    Data-->
      <td>
        <div
          v-for="[RownKey, Cell] in MainStore.CurrentTableTableData"
          :key="RownKey">
          <div v-if="RownKey != 1">
            <div
              v-for="[CellKey, { CellContent, Active }] in Cell"
              :key="CellKey">
              <div v-if="CellKey < 2">
                <TableCell
                  :Varient="Active ? 'CellActive' : 'Cell'"
                  @click="MainStore.UpdateCell(RownKey, CellKey, CellContent)">
                  {{ CellContent }}
                </TableCell>
              </div>
            </div>
          </div>
        </div>
      </td>
      <!-- Tabel Body Data -->
      <td class="t-body">
        <div
          v-for="[RownKey, Cell] in MainStore.CurrentTableTableData"
          :key="RownKey">
          <div
            class="Row"
            v-if="RownKey != 1">
            <div
              v-for="[CellKey, { CellContent, Active }] in Cell"
              :key="CellKey">
              <TableCell
                :Varient="Active ? 'CellActive' : 'Cell'"
                @click="MainStore.UpdateCell(RownKey, CellKey, CellContent)"
                v-if="
                  CellKey > 1 &&
                  CellKey >= PageStore.CurrentPageStart &&
                  CellKey <= PageStore.CurrentPageEnd
                ">
                {{ CellContent }}
              </TableCell>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>
<style scoped lang="sass">
@import "../assets/style/main.sass"

table
  @include FelxColum()
  border-top: 1px solid $MainBorderColor

  border-collapse: collapse
  height:82%
  font: 11pt Roboto, Arial, sans-serif


.t-header
  display: flex
  overflow: hidden

.header-Row
  overflow: hidden
  text-align: center
  height: 2.5rem
  width: 7.9rem

.t-ab-raper
  display: flex
  height: 100%
  overflow-y: scroll
  overflow-x: hidden
  border: none

.t-aside
  @include FelxColum()
  width: 7.9rem
  height: 100%

.t-body
  @include FelxColum()

.Row
  display: flex
</style>
