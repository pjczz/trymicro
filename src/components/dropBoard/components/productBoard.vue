<template>
  <div class="pl-[16px] flex flex-col w-[760px]">
    <template v-if="props.currentSelect === 'all'">
      <div class="flex leading-[48px] h-[48px]">
        <div class="font-bold">产品与服务</div>
        <div class="ml-auto cursor-pointer" @click="emit('offShow')">X</div>
      </div>
      <div class="search">
        <div class="w-[300px]">
          <a-input v-model:value="searchText" placeholder="Basic usage" />
        </div>
      </div>
    </template>
    <div class="overflow-y-scroll h-[calc(100vh-170px)] overflow-x-hidden">
      <template v-if="props.currentSelect === 'all'">
        <div class="font-bold mb-[10px]">最近访问</div>
        <div class="catagory">
          <div :key="index" v-for="(item, index) in recentList" class="catagory-item py[8px]">
            <a :href="item.link">{{ item.name }}</a>
          </div>
        </div>
      </template>
      <!-- .filter((ele) => ele.parentId !== '') -->
      <productBoardItem
        :key="item.categoryId"
        v-for="item in props.catagoryData.categories.filter(
          (ele) =>
            ele.parentId === '' &&
            (props.currentSelect === 'all' || ele.categoryId === props.currentSelect),
        )"
        :catagory-data="catagoryNewData"
        :data="item"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed, watchEffect } from 'vue'
import { recentList as slRecentList } from '@/components/header/mock.js'
import productBoardItem from './productBoardItem.vue'
import { deepClone } from '@/utils/utils'
const searchText = ref('')
const props = defineProps({
  catagoryData: {
    type: Object,
    default: () => {
      return {}
    },
  },
  currentSelect: {
    type: String,
    default: 'all',
  },
})
const emit = defineEmits(['show', 'offShow'])
const recentList = ref(slRecentList)

const catagoryNewData = ref({})
watchEffect(() => {
  if (props.catagoryData && props.currentSelect) {
    catagoryNewData.value = deepClone(props.catagoryData)
    catagoryNewData.value.products = catagoryNewData.value.products.filter((item) => {
      if (!searchText.value || item.keywords.indexOf(searchText.value)) {
        return true
      }
    })
    catagoryNewData.value.categories = catagoryNewData.value.categories.filter((item) => {
      if (
        props.currentSelect === 'all' ||
        item.productId === props.currentSelect ||
        item.parentId === props.currentSelect
      ) {
        return true
      }
    })
    console.log(catagoryNewData.value, 'catagoryNewData.value')
  }
})
</script>
<style scoped>
.search {
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
}
.catagory {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 设置 3 列 */
  column-gap: 12px;
  font-size: 12px;
}
.catagory-item {
  border-radius: 5px;
  cursor: pointer;
  a {
    color: #666;
    width: 100%;
    height: 100%;
    display: block;
    font-size: 12px;
  }
  a:hover {
    color: #000000;
  }
}
.catagory-item:hover {
  background-color: #f4f6f7;
}
</style>
