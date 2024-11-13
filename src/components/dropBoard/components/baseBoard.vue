<template>
  <div
    class="drop-board max-h-[calc(100vh-50px)] min-h-[540px)]"
    @mouseleave="handleLeave"
    :style="{ width: props.width, height: props.height, transform: isAnimate ? 'scaleX(0)' : '' }"
    :class="{ open: isAnimate ? true : false }"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  width: {
    type: String,
    default: '100vw',
  },
  height: {
    type: String,
    default: '540px',
  },
  isAnimate: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['show', 'offShow'])
const onShow = () => {
  emit('show')
}
const handleLeave = () => {
  emit('offShow')
}
</script>
<style scoped>
.drop-board {
  position: absolute;
  top: 50px;
  left: 0;
  padding: 4px;
  background-color: #ffffff;
  background-clip: padding-box;
  border-radius: 0 0 8 8px;
  outline: none;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
  animation: slideIn 1s forwards; /* 设置动画 */
  transform-origin: left center; /* 动画起点在右边 */
}
@keyframes slideIn {
  0% {
    transform: scaleX(0); /* 关闭状态 */
  }
  100% {
    transform: scaleX(1); /* 打开状态 */
  }
}

.panel.closed {
  transform-origin: right center; /* 动画起点在右边 */
  transform: scaleX(1); /* 初始状态 */
  animation: slideOut 1s forwards; /* 收缩动画 */
}

@keyframes slideOut {
  0% {
    transform: scaleX(1); /* 打开状态 */
  }
  100% {
    transform: scaleX(0); /* 关闭状态 */
  }
}
</style>
