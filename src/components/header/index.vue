<template>
  <div class="header w-full h-50px bg-[#ffffff] z-50 fixed top-0 left-0 flex items-center relative">
    <div class="bg-[#ff6a00]" v-if="isSubMenu">
      <button
        @click="handleShowClick"
        @mouseenter="handleHover"
        aria-label="展开产品面板"
        class="expand-btn"
        :class="{ 'expand-btn-active': siderShow }"
      >
        <span class="sub-line"></span><span class="sub-line"></span><span class="sub-line"></span>
      </button>
    </div>
    <div class="mx-[24px]">
      <img src="@/assets/logo.png" class="w-[40px] h-[40px]" alt="" />
    </div>
    <div class="flex items-center h-full" @mouseleave="handleMouseLeave">
      <homeBoard
        v-if="!isSubMenu"
        :height="headerList[tempHoverIndex].height"
        :info="headerList[tempHoverIndex]"
        :data-list="headerList[tempHoverIndex].dataList"
        :show="show"
      />
      <subBoard
        @offShow="siderShow = false"
        v-else
        width="1030px"
        :catagoryData="catagoryData"
        :recentList="recentList"
        height="calc(100vh - 50px)"
        :show="siderShow"
      />
      <template v-if="!isSubMenu">
        <div
          class="p-[10px] left-item flex justify-center relative cursor-pointer select-none"
          :class="{ active: item.active }"
          @mouseover="handleShowHover(index)"
          v-for="(item, index) in headerList"
          :key="index"
        >
          <div class="board-title">
            {{ item.name }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="mx-[12px]">
          <a
            href=""
            class="text-[#666666] text-[12px] bg-[#f4f6f7] leading-[30px] px-[12px] py-[8px]"
            >工作台</a
          >
        </div>
      </template>
    </div>
    <div class="ml-auto flex">
      <div class="w-[500px]">
        <a-input v-model:value="search" :placeholder="placeholder">
          <template #prefix> 搜索图标 </template>
        </a-input>
      </div>
      <div>云市场</div>
      <div>云市场</div>
      <div>云市场</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import {
  headerList as stHeaderList,
  catagoryData as slCatagoryData,
  recentList as slRecentList,
} from './mock.js'
import homeBoard from '@/components/dropBoard/homeBoard.vue'
import subBoard from '@/components/dropBoard/subBoard.vue'
import { useUserStore } from '@/stores/user'
const store = useUserStore()
const headerList = ref(stHeaderList)
const tempHoverIndex = ref(0)
const show = ref(false)
const siderShow = ref(false)
const search = ref()
const catagoryData = ref(slCatagoryData)
const placeholder = ref('搜索共享租车')

const isSubMenu = computed(() => {
  return store.isSubMenu
})
const recentList = ref(slRecentList)
watchEffect(() => console.log(siderShow.value, 'ssidershow change'))
const handleMouseLeave = () => {
  if (!isSubMenu.value) {
    show.value = false
  }
  console.log(!isSubMenu.value, show.value)
}
const handleShowHover = (index: number) => {
  tempHoverIndex.value = index
  show.value = true
  console.log(show.value, 'handleShowHover')
}
const handleHover = () => {
  siderShow.value = true
}
const handleShowClick = () => {
  siderShow.value = !siderShow.value
}
</script>
<style lang="scss" scoped>
.left-item:hover {
  color: rgb(19, 102, 236);
  opacity: 1;
  /* 悬停时显示内容 */
}

.left-item:hover::after {
  opacity: 1;
  /* 悬停时显示内容 */
}

.left-item::after {
  content: '^';
  position: absolute;
  scale: 0.6;
  bottom: -8px;
  opacity: 0;
}

.active {
  color: rgb(19, 102, 236);
}
.expand-btn {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 0px;
  border: 1px solid transparent;
  box-sizing: border-box;
  outline: none;
  background: none;
  line-height: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: 0.3s ease-out;

  .sub-line span {
    left: 18px;
  }
  .sub-line {
    display: block;
    position: absolute;
    left: 15px;
    background-color: rgb(255, 255, 255);
    width: 20px;
    height: 2px;
    transition: 0.3s ease-out;
  }
  .sub-line:first-child {
    top: 17px;
    transform: rotate(0deg);
    transform-origin: left center;
  }
  .sub-line:nth-child(3) {
    top: 31px;
    transform: rotate(0deg);
    transform-origin: left center;
  }
  .sub-line:nth-child(2) {
    top: 24px;
  }
}
.expand-btn-active span:first-child {
  transform: rotate(45deg) !important;
}
.expand-btn-active span:nth-child(2) {
  opacity: 0;
}
.expand-btn-active span:nth-child(3) {
  transform: rotate(-45deg) !important;
}
</style>
