<script setup lang="ts">
import { App, ConfigProvider } from 'ant-design-vue'
import Layout from '@/layout/index.vue'
</script>

<template>
  <!--   <ConfigProvider :locale="antdLocale" :theme="tokenTheme"> -->
  <ConfigProvider>
    <App>
      <Layout />
    </App>
  </ConfigProvider>
</template>

<style lang="scss">
@import url('./index.scss');

body {
  margin: 0;
}
</style>
