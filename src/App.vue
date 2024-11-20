<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header/index.vue'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style lang="scss">
@import url('./index.scss');

body {
  margin: 0;
}
</style>
