<template>
  <div class="FormRapper">
    <form>
      <ErrorBox><slot name="error"></slot></ErrorBox>
      <slot name="main"></slot>
    </form>
  </div>
</template>
<style lang="sass">
@import "../assets/style/main.sass"
.FormRapper
  @include Center()
  width: 100%
  height: 100%

form
  @include Center()
  @include threeD()
  flex-direction: column
  background-color: $MainColor
  gap: 3rem
  padding: 4rem 4rem

  border-radius: 10px
  font-size: 1.8rem

.router-link,input
  @include Button()
  font-size: 1.8rem
  text-decoration: none

</style>
