<template>
  <div
    class="board-left bg-[#F8FAFF] w-[270px] h-full flex flex-col items-center pt-[40px]"
  >
    <a
      v-if="props.info.link"
      :href="props.info.link"
      class="text-[22px] font-bold"
      >{{ props.info.name }}&nbsp;></a
    >
    <span class="text-[22px] font-bold" v-else>{{ props.info.name }}</span>
    <div class="text-[14px] mt-[30px] text-[#999999] w-[170px] leading-[20px]">
      {{ props.info.description.value ? props.info.description.value.zh_CN : props.info.description }}
    </div>
  </div>
  <div
    class="board-right w-[calc(100%-270px)] h-full px-[30px] pt-[40px] flex flex-col flex-wrap"
  >
    <div class="flex flex-col w-[23%] pb-[38px]" v-for="item in props.info.dataList">
      <a
        v-if="item.link"
        :href="item.link"
        class="text-[18px] font-bold mb-[20px]"
        >{{ item.title }}&nbsp;></a
      >
      <span class="text-[18px] font-bold mb-[16px]" v-else>{{
        item.title
      }}</span>
      <a
        class="mb-[16px] text-[13px] leading-[20px]"
        :href="ele.link"
        v-for="ele in item.children"
        >{{ ele.title }}</a
      >
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      link: "",
    }),
  },
});
</script>
<style scoped></style>
