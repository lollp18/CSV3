<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <div class="box">
    <h1>Zeilen Einfügen</h1>
    <h2 style="color: red">{{ store.TableBearbeiten.Error }}</h2>

    <input
      min="1"
      v-model="store.TableBearbeiten.Einfügen.Zeilen.Zeile"
      placeholder="Welche zeile"
      type="number" />
    <select @change="store.GetOptionZeile">
      <option value="Über">Über</option>
      <option value="Unter">Unter</option>
    </select>
    <input
      min="1"
      v-model="store.TableBearbeiten.Einfügen.Zeilen.Anzahl"
      placeholder="Anzahl"
      type="number" />
    <button class="BtnAddBearbeiten" @click="store.ZeilenEinfügen()">
      <ion-icon name="add-outline"></ion-icon>
    </button>
  </div>
</template>

