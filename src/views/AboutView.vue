<template>
  <div class="about">
    <micro-app name="Vben Admin Antd" :url="url" baseroute="/about" iframe></micro-app>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const url = ref(import.meta.env.VITE_VBEN_API_URL)
</script>
