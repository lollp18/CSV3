<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <div class="box">
    <h1>Spalten Einfügen</h1>
    <h2 style="color: red">{{ store.TableBearbeiten.Error }}</h2>
    <input
      v-model="store.TableBearbeiten.Einfügen.Spalten.Spalte"
      placeholder="Welche spalte"
      type="number" />
    <select @change="store.GetOptionSpalte">
      <option value="L">Links</option>
      <option value="R">Rechts</option>
    </select>
    <input
      v-model="store.TableBearbeiten.Einfügen.Spalten.Anzahl"
      placeholder="Anzahl"
      type="number" />
    <button
      class="BtnAddBearbeiten"
      @click="store.SpaltenEinfügen()">
      <ion-icon name="add-outline"></ion-icon>
    </button>
  </div>
</template>
