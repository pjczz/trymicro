<template>
  <div class="home-board">
    <baseBoard :isAnimate="true" @offShow="handleClose" :width="props.width" :height="props.height" :show="props.show">
      <div class="flex h-full">
        <div class="left-board h-full w-[240px]">
          <a-menu
            v-model:selectedKeys="state.selectedKeys"
            style="width: 100%"
            mode="inline"
            :open-keys="state.openKeys"
            :items="items"
            @openChange="onOpenChange"
          ></a-menu>
        </div>
        <div class="right-board w-[790px]">
          <productBoard
            :recentList="props.recentList"
            :catagoryData="props.catagoryData"
            :currentSelect="state.selectedKeys[0]"
          />
        </div>
      </div>
    </baseBoard>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import baseBoard from './components/baseBoard.vue'
import productBoard from './components/productBoard.vue'
import { reactive } from 'vue'
import type { ItemType } from 'ant-design-vue'
const emit = defineEmits(['offShow'])

const items: ItemType[] = reactive([
  {
    label: '产品与服务',
    key: 'sub1',
    children: [
      { key: 'all', label: '全部' },
      { key: 'computing', label: '计算' },
      { key: 'container', label: '容器' },
      { key: 'netcdn', label: '网络与CDN' },
      { key: 'security', label: '安全' },
      { key: 'middleware', label: '中间件' },
      { key: 'database', label: '数据库' },
      { key: 'analyticscomputing', label: '大数据计算' },
      { key: 'aiml', label: '人工智能与机器学习' },
      { key: 'mediaservices', label: '媒体服务' },
      { key: 'entcmc', label: '企业服务与云通信' },
      { key: 'iot', label: '物联网' },
      { key: 'developertools', label: '开发工具' },
      { key: 'migrationom', label: '迁移与运维管理' },
      { key: 'market', label: '云市场' },
      { key: 'spc', label: '支持与服务' },
    ],
  },
])

const state = reactive({
  rootSubmenuKeys: ['sub1'],
  openKeys: ['sub1'],
  selectedKeys: ['all'],
})

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
const handleClose = () => {
  emit('offShow')
}
const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '540px',
  },
  trigger: {
    type: String,
    default: 'hover', // hover click
  },
  title: {
    type: String,
    default: '',
  },
  catagoryData: {
    type: Object,
    default: () => {
      return {}
    },
  },
  recentList: {
    type: Array,
    default: () => {
      return []
    },
  },
  show: {
    type: Boolean,
    default: false,
  },
})
</script>
<style lang="scss" scoped>
.left-board {
  border-right: 1px solid #e2e2e2;
}
</style>
