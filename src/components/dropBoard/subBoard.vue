<template>
  <div class="home-board">
    <baseBoard :isAnimate="true" :width="props.width" :height="props.height" v-show="props.show">
      <div class="flex h-full">kong</div>
    </baseBoard>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import baseBoard from './components/baseBoard.vue'
import waterfallBoard from './components/waterfallBoard.vue'
import tileWaterfallBoard from './components/tileWaterfallBoard.vue'
const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '540px',
  },
  trigger: {
    type: String,
    default: 'hover', // hover click
  },
  title: {
    type: String,
    default: '',
  },
  dataList: {
    type: Array,
    default: [],
  },
  info: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      link: '',
    }),
  },
  show: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped></style>
