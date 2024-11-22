<template>
  <a-spin :spinning="spinning" :tip="tip">
    <div class="layout">
      <Header v-if="isShowHeader" />
      <div class="layout-main" :style="{ height: isShowHeader ? 'calc(100vh - 60px)' : '100vh' }">
        <RouterView />
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Header from '@/components/header/index.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { whiteList } from '@/permission'
import { useUserStore } from '@/stores/modules/user'
import { defineComponent } from 'vue'
const useStore = useUserStore()
defineComponent({ name: 'layoutComponent' })
const spinning = computed(() => {
  return useStore.getGlobalLoading.loading
})
const tip = computed(() => {
  return useStore.getGlobalLoading.tip
})
const route = useRoute()
const isShowHeader = computed(() => !whiteList.includes(route.path))
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
