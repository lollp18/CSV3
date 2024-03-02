<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <div class="box">
    <h1>Spalte Tauschen</h1>
    <h2 style="color: red">{{ store.TableBearbeiten.Error }}</h2>
    <input
      v-model="store.TableBearbeiten.Tauschen.Spalten.Erste"
      placeholder="spalte eintragen"
      type="number" />
    <input
      v-model="store.TableBearbeiten.Tauschen.Spalten.Zweite"
      placeholder="spalte eintragen"
      type="number" />
    <button class="BtnAddBearbeiten" @click="store.SpaltenTauschen()">
      <ion-icon name="swap-horizontal-outline"></ion-icon>
    </button>
  </div>
</template>

