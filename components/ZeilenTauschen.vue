<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <div class="box">
    <h1>Zeilen Tauschen</h1>
    <h2 style="color: red">{{ store.TableBearbeiten.Error }}</h2>
    <input
      v-model="store.TableBearbeiten.Tauschen.Zeilen.Erste"
      placeholder="Zeilennummer"
      type="number" />
    <input
      v-model="store.TableBearbeiten.Tauschen.Zeilen.Zweite"
      placeholder="Zeilennumme"
      type="number" />
    <button
      class="BtnAddBearbeiten"
      @click="store.ZeilenTauschen()">
      <ion-icon name="swap-horizontal-outline"></ion-icon>
    </button>
  </div>
</template>
