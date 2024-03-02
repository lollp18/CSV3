<script setup>
import { UseMainStore } from "../stores/MainStore.js"

const store = UseMainStore()
</script>
<template>
  <div class="box">
    <h1>Zellen Tauschen</h1>
    <h2 style="color: red">{{ store.TableBearbeiten.Error }}</h2>
    <h2>Erste Zelle</h2>
    <input
      v-model="store.TableBearbeiten.ZellenTauschen.ErsteZelle.Zeile"
      type="number"
      placeholder="Zeilennummer" />
    <input
      v-model="store.TableBearbeiten.ZellenTauschen.ErsteZelle.Spalte"
      type="number"
      placeholder="Spaltennummer" />
    <h2>Zweite Zelle</h2>
    <input
      v-model="store.TableBearbeiten.ZellenTauschen.ZweiteZelle.Zeile"
      type="number"
      placeholder="Zeilennummer" />
    <input
      v-model="store.TableBearbeiten.ZellenTauschen.ZweiteZelle.Spalte"
      type="number"
      placeholder="Spaltenummer" />

    <button class="BtnAddBearbeiten" @click="store.ZellenTauschen()">
      <ion-icon name="swap-horizontal-outline"></ion-icon>
    </button>
  </div>
</template>
