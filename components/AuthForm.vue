<template>
  <Form>
    <template #error><slot name="error"></slot></template>
    <template #main>
      <slot name="main"></slot>
      <input
        v-model="AuthStore.StayConnected"
        type="checkbox" />
    </template>
  </Form>
</template>
