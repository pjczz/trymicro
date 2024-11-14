<template>
  <div class="flex flex-col w-[720px] mt-[20px]">
    <div class="flex font-bold mb-[10px] top-title text-[14px]">{{ props.data.name }}</div>
    <div class="w-full main-flex">
      <div
        class="catagoryList flex flex-col flex-nowrap mb-[20px]"
        v-for="(item, index) in props.currentProductList.filter(
          (product) =>
            product.parentId === props.data.categoryId ||
            product.categoryId === props.data.categoryId,
        )"
        :key="index"
      >
        <div class="font-bold mb-[10px] text-[12px]">{{ item.name }}</div>
        <div class="">
          <div class="catagory flex-nowrap">
            <div
              :key="index"
              v-for="(ele, index) in item.productsList"
              class="catagory-item py[8px]"
            >
              <a :href="ele.link">{{ ele.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { catagoryDataType, catagoryType } from '@/type/mock'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    },
  },
  currentProductList: {
    type: Array,
    default: () => {
      return []
    },
  },
  searchText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['show', 'offShow'])
</script>
<style scoped>
.main-flex {
  columns: 200px 3;
  column-gap: 12px;
  row-gap: 20px;
}
.search {
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
}
.catagory {
  break-inside: avoid;
}
.catagoryList {
  break-inside: avoid;
}
.catagory-item {
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  a {
    color: #666;
    width: 100%;
    height: 100%;
    display: block;
  }
  a:hover {
    color: #000000;
  }
}
.catagory-item:hover {
  background-color: #f4f6f7;
  a {
    color: #000000;
  }
}
.top-title {
  position: relative;
  gap: 10px;
}
.top-title::after {
  content: '';
  display: flex;
  margin-top: 7.5px;
  height: 1px;
  background-color: #e2e2e2;
  flex: 1;
}
</style>
