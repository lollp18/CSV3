<script setup></script>

<template>
  <table>
    <tr>
      <!-- Tabel Header BTN Delet -->
      <div class="rapperTop-btnDelet">
        <div class="zelle-placeholder"></div>
        <div class="zelle-placeholder"></div>
        <BtnDelet
          v-if="MainStore.FirstRowLength > 2"
          @click="MainStore.SpalteLöschen(1)" />
        <div
          v-else
          class="zelle-placeholder"></div>
        <div
          v-for="NummberFirstZeile in MainStore.FirstRowLength"
          :key="NummberFirstZeile">
          <BtnDelet
            @click="MainStore.SpalteLöschen(NummberFirstZeile)"
            v-if="
              MainStore.FirstZeileLength > 2 &&
              NummberFirstZeile > 1 &&
              NummberFirstZeile >= MainStore.CurrentSeiteStart &&
              NummberFirstZeile <= MainStore.CurrentSeiteEnde
            " />
        </div>
        <div
          v-if="MainStore.FirstZeileLength <= 2"
          class="zelle-placeholder"></div>
      </div>
      <!-- Tabel Header Spalten Nummern -->
      <div class="rapperTop-btnDelet">
        <div class="zelle-placeholder"></div>
        <div class="zelle-placeholder"></div>
        <div class="zelle-nummer">1</div>
        <div
          v-for="NummberFirstZeile in MainStore.FirstZeileLength"
          :key="NummberFirstZeile">
          <div
            class="zelle-nummer"
            v-if="
              NummberFirstZeile > 1 &&
              NummberFirstZeile >= MainStore.CurrentSeiteStart &&
              NummberFirstZeile <= MainStore.CurrentSeiteEnde
            ">
            {{ NummberFirstZeile }}
          </div>
        </div>
      </div>
      <!-- Tabel Header Data -->
      <td class="t-header">
        <btnDelet
          v-if="MainStore.CurrentTableLength > 2"
          @click="MainStore.ZeileLöschen(1)" />
        <div
          v-else
          class="zelle-placeholder"></div>
        <div class="zelle-nummer">1</div>
        <div class="t-header">
          <div
            ref="zelle"
            :class="MainStore.FirstCellActive ? 'zelle-activ' : 'zelle'"
            @click="
              MainStore.InitZelleBerarbeiten(
                1,
                1,
                MainStore.FirstZelleZellenInhalt
              )
            ">
            {{ MainStore.FirstZelleZellenInhalt }}
          </div>
          <div
            v-for="[
              ZellenIndex,
              { ZellenInhalt, Activ },
            ] in MainStore.FirstZeile"
            :key="ZellenIndex">
            <div
              v-if="
                ZellenIndex > 1 &&
                ZellenIndex >= MainStore.CurrentSeiteStart &&
                ZellenIndex <= MainStore.CurrentSeiteEnde
              "
              :class="Activ ? 'zelle-activ' : 'zelle'"
              @click="
                MainStore.InitZelleBerarbeiten(1, ZellenIndex, ZellenInhalt)
              ">
              {{ ZellenInhalt }}
            </div>
          </div>
        </div>
      </td>
    </tr>
    <!-- Tabel Seitenleiste -->
    <tr class="t-ab-raper">
      <!-- Tabel Seitenleiste BTN Delet -->
      <div class="rapperSide-btnDelet">
        <div
          v-for="NummernTableData in MainStore.CurrentTableLength"
          :key="NummernTableData">
          <btnDelet
            v-if="NummernTableData != 1 && MainStore.CurrentTableLength > 2"
            @click="MainStore.ZeileLöschen(NummernTableData)" />
        </div>
        <div
          v-if="MainStore.CurrentTableLength <= 2"
          class="zelle-placeholder"></div>
      </div>
      <!-- Tabel Seitenleiste Zeilen Nummern -->
      <div>
        <div
          class="rapperSide-btnDelet"
          v-for="NummernTableData in MainStore.CurrentTableLength"
          :key="NummernTableData">
          <div
            class="zelle-nummer"
            v-if="NummernTableData != 1">
            {{ NummernTableData }}
          </div>
        </div>
      </div>
      <!-- Tabel Seitenleiste  Data-->
      <td>
        <div
          v-for="[ZeilenKey, Zellen] in MainStore.CurrentTableTableData"
          :key="ZeilenKey">
          <div v-if="ZeilenKey != 1">
            <div
              v-for="[ZellenKey, { ZellenInhalt, Activ }] in Zellen"
              :key="ZellenKey">
              <div
                :class="Activ ? 'zelle-activ' : 'zelle'"
                @click="
                  MainStore.InitZelleBerarbeiten(
                    ZeilenKey,
                    ZellenKey,
                    ZellenInhalt
                  )
                "
                v-if="ZellenKey < 2">
                {{ ZellenInhalt }}
              </div>
            </div>
          </div>
        </div>
      </td>
      <!-- Tabel Body Data -->
      <td class="t-body">
        <div
          v-for="[ZeilenKey, Zellen] in MainStore.CurrentTableTableData"
          :key="ZeilenKey">
          <div
            class="zeile"
            v-if="ZeilenKey != 1">
            <div
              v-for="[ZellenKey, { ZellenInhalt, Activ }] in Zellen"
              :key="ZellenKey">
              <div
                :class="Activ ? 'zelle-activ' : 'zelle'"
                @click="
                  MainStore.InitZelleBerarbeiten(
                    ZeilenKey,
                    ZellenKey,
                    ZellenInhalt
                  )
                "
                v-if="
                  ZellenKey > 1 &&
                  ZellenKey >= MainStore.CurrentSeiteStart &&
                  ZellenKey <= MainStore.CurrentSeiteEnde
                ">
                {{ ZellenInhalt }}
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>
<style scoped lang="sass">
@import "../assets/style/main.sass"

.rapperTop-btnDelet
  display: flex
  overflow: hidden

.rapperSide-btnDelet
  @include FelxColum()

table
  @include FelxColum()
  border-top: 1px solid $MainBorderColor

  border-collapse: collapse
  height:82%
  font: 11pt Calibri, Segoe UI, Calibri, Thonburi, Arial, Verdana, sans-serif,Mongolian Baiti, Microsoft Yi Baiti, Javanese Text


.t-header
  display: flex
  overflow: hidden

.header-zeile
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

.zeile
  display: flex

.zelle
  @include Zelle()
  &:hover
    border: 1px solid $SecondaryColor
.zelle-activ
  @include Zelle()
  border: 1.9px solid $SecondaryColor

.zelle-placeholder
  @include Zelle()
  background-color: $ZellePlaceholderBackgroundColor

.zelle-nummer
  @include Zelle()
  text-align: center
</style>
