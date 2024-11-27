<template>
  <div
    class="header w-full h-50px bg-[#ffffff] fixed top-0 left-0 flex items-center z-10000"
  >
    <div class="mx-[24px]">
      <img src="@/assets/logo.png" class="w-[40px] h-[40px] ml-10px" alt="" />
    </div>
    <div class="flex items-center h-full" @mouseleave="handleMouseLeave">
      <homeBoard
        height="694px"
        :info="headerList[tempHoverIndex]"
        :data-list="headerList[tempHoverIndex].dataList"
        :show="show"
      />
      <div
        class="p-[10px] left-item flex justify-center relative cursor-pointer select-none"
        :class="{ active: item.active }"
        v-for="(item, index) in headerList"
        @click="handleClick"
      >
        <div class="board-title" @mouseover="handleShowHover(index)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="ml-auto flex">
      <div class="w-[500px]">
        <a-input v-model:value="search" :placeholder="placeholder">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </div>
      <div>云市场</div>
      <div>云市场</div>
      <div>云市场</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { headerList as stHeaderList } from "./mock.js";
import homeBoard from "@/components/dropBoard/homeBoard";
import microApp from "@micro-zoe/micro-app";

const headerList = ref(stHeaderList);
const tempHoverIndex = ref(0);
const show = ref(false);
const search = ref();
const placeholder = ref("搜索共享租车");
const info = ref({
  title: "文档与社区",
  description:
    "提供官方的技术文档、丰富的开发工具和资源；支持开发者技术交流和能力成长，与千万开发者共同探索云上创新",
  link: "http://en.tbit.com.cn/",
});
const handleMouseEnter = (item) => {
  item.isHover = true;
};
const handleMouseLeave = (e) => {
  show.value = false;
};
const handleShowHover = (index) => {
  tempHoverIndex.value = index;
  show.value = true;
};
const handleShowClick = () => {
  show.value = true;
};
const handleClick = () => {
  microApp.router.push({ name: "Vben Admin Antd", path: "/about/workspace" });
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
  content: "^";
  position: absolute;
  scale: 0.6;
  bottom: -8px;
  opacity: 0;
}

.active {
  color: rgb(19, 102, 236);
}
</style>
