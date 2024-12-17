<template>
  <div
    class="header w-full h-[var(--top-header-header-height)] bg-[#ffffff] z-999 fixed top-0 left-0 flex items-center relative"
  >
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
          @click="setRouteByPath('vben', '/about/workspace')"
        >
          <div class="board-title">
            {{ item.name }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="mx-[12px]">
          <a href="" class="text-[#666666] text-[12px] bg-[#f4f6f7] leading-[30px] px-[12px] py-[8px]">工作台</a>
        </div>
      </template>
    </div>
    <div class="ml-auto flex h-full items-center cursor-pointer">
      <div @click="handleFullScreen" class="func-button flex items-center h-full px-[10px]">
        <img style="width: 18px; height: 18px" src="@/assets/img/fullscreen.svg" alt="" />
      </div>
      <Message />
      <SearchInfo />
      <FontInfo />
      <UserInfo />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { headerList as stHeaderList, catagoryData as slCatagoryData, recentList as slRecentList } from './mock.js'
import homeBoard from '@/components/dropBoard/homeBoard.vue'
import subBoard from '@/components/dropBoard/subBoard.vue'
import { Message } from '@/components/Message/index'
import { defineComponent } from 'vue'
import { UserInfo } from '../UserInfo/index'
import { FontInfo } from '../FontInfo/index'
import { SearchInfo } from '../SearchInfo/index.js'
import { setRouteByPath } from '@/utils/micro/index.js'

defineComponent({ name: 'headerComponent' })
const headerList = ref(stHeaderList)
const tempHoverIndex = ref(0)
const show = ref(false)
const siderShow = ref(false)
const catagoryData = ref(slCatagoryData)

// const isSubMenu = computed(() => {
//   return store.isSubMenu
// })
const isSubMenu = ref(false)
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
const handleFullScreen = () => {
  document.documentElement.requestFullscreen()
}
</script>
<style lang="scss" scoped>
.left-item:hover {
  color: rgb(19 102 236);
  opacity: 1;

  /* 悬停时显示内容 */
}

.left-item:hover::after {
  opacity: 1;

  /* 悬停时显示内容 */
}

.left-item::after {
  position: absolute;
  bottom: -8px;
  content: '^';
  opacity: 0;
  scale: 0.6;
}

.active {
  color: rgb(19 102 236);
}

.expand-btn {
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: 1px solid transparent;
  outline: none;
  transition: 0.3s ease-out;

  .sub-line span {
    left: 18px;
  }

  .sub-line {
    position: absolute;
    left: 15px;
    display: block;
    width: 20px;
    height: 2px;
    background-color: rgb(255 255 255);
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

.func-button:hover {
  background-color: #f6f6f6;
}
</style>
