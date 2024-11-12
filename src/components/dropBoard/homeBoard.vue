<template>
  <div class="home-board">
    <baseBoard :width="props.width" :height="props.height" v-show="true">
      <div class="flex h-full">
        <template v-if="props.info.displayStyle === 'waterfall' || !props.info.displayStyle">
          <waterfallBoard :info="props.info" />
        </template>
        <template v-if="props.info.displayStyle === 'tile'">
          <tileWaterfallBoard :info="props.info" />
        </template>
        <template v-if="props.info.displayStyle === 'product'"></template>
        <template v-if="props.info.displayStyle === 'side-menu'"></template>
      </div>
    </baseBoard>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import baseBoard from "./components/baseBoard";
import waterfallBoard from "./components/waterfallBoard";
import tileWaterfallBoard from "./components/tileWaterfallBoard"; 
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "540px",
  },
  trigger: {
    type: String,
    default: "hover", // hover click
  },
  title: {
    type: String,
    default: "",
  },
  dataList: {
    type: Array,
    default: [],
  },
  info: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      link: "",
    }),
  },
  show: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped></style>
