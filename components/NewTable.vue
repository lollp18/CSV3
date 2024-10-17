<script setup></script>
<template>
  <Transition>
    <div class="new-Table-bg">
      <div class="new-Table">
        <div class="new-Table-Input-rapper">
          <h1>Generate New Table</h1>
          <ErrorBox> {{ NewTableStore.Error }}</ErrorBox>
          <input
            v-model="NewTableStore.TableName"
            placeholder="Table Name" />
          <input
            min="1"
            v-model="NewTableStore.NumberOfRows"
            placeholder="Number of Rows" />
          <input
            min="1"
            v-model="NewTableStore.NumberOfColumns"
            placeholder="Number of Columns" />
        </div>
        <div class="new-Table-btnRapper">
          <button @click="NewTableStore.CreateNewTable">
            <ion-icon name="duplicate-outline"></ion-icon>
          </button>
          <button @click="NewTableStore.IsOpen = false">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="sass" scoped>

@import "../assets/style/main.sass"

.new-Table-bg
  @include Center
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)

.new-Table
  @include DreiD
  @include Center
  @include FelxColum

  position: relative

  z-index: 3

  background-color: $MainColor

  gap: 3rem
  padding: 4rem 4rem

  border-radius: 10px


.new-Table-Input-rapper
  display: flex
  flex-direction: column
  gap: 1.5rem


.new-Table-btnRapper
  display: flex
  gap: 1.5rem
</style>
