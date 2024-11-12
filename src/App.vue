<template>
  <Header />
  <router-view />
</template>
<script setup>
import Header from "@/components/header";
</script>
<style lang="scss">
@import "./index.scss";
body {
  margin: 0;
}
</style>
