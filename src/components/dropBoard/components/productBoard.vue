<template>
  <div class="pl-[16px] flex flex-col w-[760px]">
    <template v-if="props.currentSelect === 'all'">
      <div class="flex leading-[48px] h-[48px]">
        <div class="font-bold">产品与服务</div>
        <div class="ml-auto cursor-pointer" @click="emit('offShow')">X</div>
      </div>
      <div class="search">
        <div class="w-[300px]">
          <a-input @pressEnter="handleSearch" v-model:value="inputText" placeholder="Basic usage" />
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
        v-for="item in currentCategoryList"
        :currentProductList="currentProductList"
        :searchText="searchText"
        :data="item"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue'
import { recentList as slRecentList } from '@/components/header/mock.js'
import productBoardItem from './productBoardItem.vue'
import type { Ref } from 'vue'
import type { catagoryDataType, catagoryType } from '@/type/mock'
const searchText = ref('')
const inputText = ref('')
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
const currentProductList: Ref<catagoryType[]> = ref([])
const currentCategoryList: Ref<catagoryType[]> = ref([])
// 生成subCatagoryList
const getSubCatagoryList = () => {
  const subCatagoryList: catagoryType[] = []
  // 获取subCatagoryList
  props.catagoryData.categories.forEach((element: catagoryType) => {
    // 筛选出所有有产品的 作为二级 名为subCategorylist\
    // 如果选择的是all 直接进入
    // 如果选择不是all 做减法，必须该节点是，或者父节点是 我们选择的大类id （第一步保证每个都有产品products）
    if (
      element.products.length &&
      (props.currentSelect === 'all' ||
        element.categoryId === props.currentSelect ||
        element.parentId === props.currentSelect)
    ) {
      subCatagoryList.push(element)
    }
  })
  currentProductList.value = subCatagoryList
}
const handleSearch = () => {
  searchText.value = inputText.value
}
// 将product详情挂载到subCatagory中
const getProductList = () => {
  if (props.catagoryData && props.catagoryData.products) {
    currentProductList.value.forEach((subCatagory: catagoryType) => {
      subCatagory.productsList = []
      subCatagory.products.forEach((productName) => {
        ;(props.catagoryData as catagoryDataType).products?.forEach((product) => {
          // 找到product 如果不在all中 无需执行搜索 如果在all中 则需要搜索
          if (productName === product.productId) {
            if (props.currentSelect !== 'all') {
              subCatagory.productsList.push(product)
            } else if (!searchText.value || product.keywords.some((keyword) => keyword.includes(searchText.value)))
              subCatagory.productsList.push(product)
          }
        })
      })
    })
  }
  currentProductList.value = currentProductList.value.filter((item) => item.productsList.length)
}
const getCurrentCategoryList = () => {
  const tempNameList = []
  const res = []
  currentProductList.value.forEach((item) => {
    if (
      item.categoryId === props.currentSelect ||
      item.parentId === props.currentSelect ||
      props.currentSelect === 'all'
    ) {
      if (!tempNameList.some((id) => id === item.categoryId || id === item.parentId)) {
        tempNameList.push(item.parentId ? item.parentId : item.categoryId)
      }
    }
  })
  tempNameList.forEach((item) => {
    const tempItem = props.catagoryData.categories.find((ele) => ele.categoryId === item)
    if (tempItem) {
      res.push(tempItem)
    }
  })
  currentCategoryList.value = res
}
watchEffect(() => {
  if (props.catagoryData && props.catagoryData.products && props.catagoryData.categories) {
    // 整理出sublist
    getSubCatagoryList()
    // 新增productlist属性到每个subcatagory中，代表当前subcatagory下的所有product
    getProductList()
    getCurrentCategoryList()
  }
})
</script>
<style lang="scss" scoped>
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
  cursor: pointer;
  border-radius: 5px;

  a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #666;
  }

  a:hover {
    color: #000;
  }
}

.catagory-item:hover {
  background-color: #f4f6f7;
}
</style>
