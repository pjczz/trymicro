<template>
  <div class="header w-full h-50px bg-[#ffffff] z-50 fixed top-0 left-0 flex items-center relative">
    <div class="mx-[24px]">
      <img src="@/assets/logo.png" class="w-[40px] h-[40px] ml-10px" alt="" />
    </div>
    <div class="p-[10px] left-item flex justify-center relative cursor-pointer select-none" :class="{ active: item.active }"
      v-for="item in headerList">
      <homeBoard :title="item.title" /></div>
    <div class="ml-auto flex">
      <div class="w-[500px]"><a-input v-model:value="search" :placeholder="placeholder">
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input></div>
    <div>云市场</div>
    <div>云市场</div>
    <div>云市场</div>
    </div>

  </div>
</template>
<script setup>
import { ref } from "vue";
import {SearchOutlined} from '@ant-design/icons-vue'
import homeBoard from '@/components/dropBoard/homeBoard'
const headerList = ref([
  {
    title: "产品",
    link: "",
    active: true,
    isHover: false,
  },
  {
    title: "解决方案",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "文档与社区",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "权益中心",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "定价",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "云市场",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "合作伙伴",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "支持与服务",
    link: "",
    active: false,
    isHover: false,
  },
  {
    title: "了解55公斤云",
    link: "",
    active: false,
    isHover: false,
  }
]);
const search = ref()
const placeholder = ref('搜索共享租车')
const handleMouseEnter = (item) => {
  item.isHover = true;
};
const handleMouseLeave = (item) => {
  item.isHover = false;
};
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
</style>
