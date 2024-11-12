<template>
  <div class="home-board">
    <div class="board-title" @click="handleShowClick" @mouseover="handleShowHover" @handleLeave="show = false">{{ title }}
    </div>
    <baseBoard :show="show">
      <div class="board-left"></div>
      <div class="board-right"></div>
    </baseBoard>

  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import baseBoard from './components/baseBoard'
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'calc(100%-50px)'
  },
  trigger: {
    type: String,
    default: 'hover' // hover click
  },
  title: {
    type: String,
    default: ''
  },
  dataList: {
    type: Array,
    default: []
  },
})
const show = ref(false)
const handleShowHover = () => {

  props.trigger === 'hover' && (show.value = true)
  console.log('hover',show.value)
}
const handleShowClick = () => {
  props.trigger === 'click' && (show.value = true)
}
</script>
<style lang="scss" scoped></style>