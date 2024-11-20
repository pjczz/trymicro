<template>
  <div class="board-left bg-[#F8FAFF] w-[270px] flex flex-col items-center pt-[40px]">
    <a v-if="props.info.link" :href="props.info.link" class="text-[22px] font-bold">{{ props.info.name }}&nbsp;></a>
    <span class="text-[22px] font-bold" v-else>{{ props.info.name }}</span>
    <div class="text-[14px] mt-[30px] text-[#999999] w-[170px] leading-[20px]">
      {{ props.info.description.value ? props.info.description.value.zh_CN : props.info.description }}
    </div>
  </div>
  <div class="board-right w-[calc(100%-270px)] h-[500px] px-[30px] pt-[40px] flex flex-wrap">
    <div class="flex flex-col flex-1">
      <div class="flex flex-col pb-[38px]" :key="index" v-for="(item, index) in props.info.dataList.slice(0, 3)">
        <a v-if="item.link" :href="item.link" class="text-[18px] font-bold mb-[20px]">{{ item.title }}></a>
        <span class="text-[18px] font-bold mb-[16px]" v-else>{{ item.title }}</span>
        <span class="mb-[16px] text-[13px] text-[#999999] leading-[20px]">{{ item.description }}</span>
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <div class="flex flex-col pb-[38px]" :key="index" v-for="(item, index) in props.info.dataList.slice(3, 5)">
        <a v-if="item.link" :href="item.link" class="text-[18px] font-bold mb-[20px]">{{ item.title }}></a>
        <span class="text-[18px] font-bold mb-[16px]" v-else>{{ item.title }}</span>
        <span class="mb-[16px] text-[13px] text-[#999999] leading-[20px]">{{ item.description }}</span>
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <div class="flex flex-col pb-[38px]" :key="index" v-for="(item, index) in props.info.dataList.slice(5, 7)">
        <a v-if="item.link" :href="item.link" class="text-[18px] font-bold mb-[20px]">{{ item.title }}></a>
        <span class="text-[18px] font-bold mb-[16px]" v-else>{{ item.title }}</span>
        <span class="mb-[16px] text-[13px] text-[#999999] leading-[20px]">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      link: '',
    }),
  },
})
</script>
<style scoped></style>
