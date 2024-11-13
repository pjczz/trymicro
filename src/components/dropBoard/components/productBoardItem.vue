<template>
  <div class="flex flex-col w-[720px] mt-[20px]">
    <div class="font-bold mb-[10px] top-title">{{ props.data.name }}</div>
    <div class="w-full main-flex">
      <div
        class="catagoryList flex flex-col flex-nowrap mb-[20px]"
        v-for="item in currentProductList"
        :key="item.categoryId"
      >
        <div class="font-bold mb-[10px]">{{ item.name }}</div>
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
  catagoryData: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const currentProductList: Ref<catagoryType[]> = ref([])
// 生成subCatagoryList
const getSubCatagoryList = () => {
  const subCatagoryList: catagoryType[] = []
  // 获取subCatagoryList
  props.catagoryData.categories.forEach((element: catagoryType) => {
    if (element.parentId === props.data.categoryId) {
      subCatagoryList.push(element)
    }
  })
  currentProductList.value = subCatagoryList
}
// 将product详情挂载到subCatagory中
const getProductList = () => {
  if (props.catagoryData && props.catagoryData.products) {
    currentProductList.value.forEach((subCatagory: catagoryType) => {
      subCatagory.productsList = []
      subCatagory.products.forEach((productName) => {
        ;(props.catagoryData as catagoryDataType).products?.forEach((product) => {
          if (productName === product.productId) {
            subCatagory.productsList.push(product)
          }
        })
      })
    })
  }
}
const emit = defineEmits(['show', 'offShow'])
watchEffect(() => {
  if (props.catagoryData && props.catagoryData.products && props.catagoryData.categories) {
    // 整理出sublist
    getSubCatagoryList()
    // 新增productlist属性到每个subcatagory中，代表当前subcatagory下的所有product
    getProductList()
  }
})
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
}
.top-title::after {
  content: '';
  position: absolute;
  right: 0;
  background-color: #e2e2e2;
  top: 7.5px;
  width: calc(600px - 100%);
}
</style>
