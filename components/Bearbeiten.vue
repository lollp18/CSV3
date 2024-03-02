<script setup>
const store = UseMainStore()
</script>
<script>
export default {
  name: "draggableContainer",

  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    }
  },

  methods: {
    dragMouseDown(event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag(event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px"
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px"
    },
    closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    },
  },
}
</script>
<template>
  <div
    ref="draggableContainer"
    class="draggable-container">
    <div class="draggable-header">
      <slot
        name="header"
        class="draggable-header">
        <div>
          <button @mousedown="dragMouseDown">
            <ion-icon name="hand-right-outline"></ion-icon>
          </button>
          <button @click="store.OpenAside()">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </button>
        </div>

        <button
          class="btnclose"
          @click="store.TableBearbeitenOpen = false">
          <ion-icon name="close-outline"></ion-icon></button
      ></slot>
    </div>
    <slot name="main">
      <div class="menü-rapper">
        <aside v-if="store.TableBearbeiten.Sections.Aside">
          <button @click="store.ZeilenEinfügenAufrufen()">
            Zeilen Einfügen
          </button>
          <button @click="store.SpaltenEinfügenAufrufen()">
            Spalten Einfügen
          </button>
          <button @click="store.ZeilenTauschenAufrufen()">
            Zeilen Tauschen
          </button>
          <button @click="store.SpaltenTauschenAufrufen()">
            Spalte Tauschen
          </button>
          <button @click="store.ZellenTauschenAufrufen()">
            Zellen Tauschen
          </button>
        </aside>

        <SpaltenEinfügen v-if="store.TableBearbeiten.Sections.SpalteEinfügen" />
        <SpalteTauschen v-if="store.TableBearbeiten.Sections.SpalteTauschen" />
        <ZeilenEinfügen v-if="store.TableBearbeiten.Sections.ZeileEinfügen" />
        <ZeilenTauschen v-if="store.TableBearbeiten.Sections.ZeileTauschen" />
        <ZellenTauschen v-if="store.TableBearbeiten.Sections.ZellenTauschen" />
      </div>
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="sass">
@import "../Style.sass"
.draggable-container
  @include DreiD()
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  display: flex
  flex-direction: column
  width: 30rem
  gap: 1rem
  z-index: 99
  border-radius: 10px
  background-color: $MainColor

.menürapper
  position: relative

aside
  @include FelxColum()
  gap: 1.5rem
  padding: 1rem
  position: absolute

.draggable-header
  display: flex
  justify-content: end
  width: 100%
  gap: 15rem
  padding: .5rem
  border-top-right-radius: 10px
  border-top-left-radius: 10px
  border-bottom: 1px solid $draggableBorderColor
  div
   display: flex
   gap: 1rem
</style>
