<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header/index.vue'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style lang="scss" scoped>
@import './index.scss';
body {
  margin: 0;
}
</style>
