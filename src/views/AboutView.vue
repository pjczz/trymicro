<template>
  <div class="about">
    <micro-app :name="baseName" :url="url" :baseroute="baseroute" iframe></micro-app>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const url = ref(import.meta.env.VITE_VBEN_API_URL)
import { APPLICATION } from '@/assets/son/index'
const baseroute = '/about'
const baseName = APPLICATION.ABOUT
</script>
