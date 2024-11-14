<template>
  <div
    class="drop-board max-h-[calc(100vh-50px)] min-h-[540px)]"
    :style="{
      width: props.width,
      height: props.height,
      transform: props.isAnimate ? 'scaleX(0)' : 'none',
      display: props.isAnimate ? 'flex' : props.show ? 'flex' : 'none',
    }"
    :class="{
      open: props.isAnimate && props.show,
      closed: props.isAnimate && !props.show,
    }"
  >
    <slot></slot>
  </div>
  <div
    @click="onClose"
    v-if="props.isAnimate && props.show"
    class="mask w-full"
    :style="{ height: props.height }"
  ></div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
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
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['show', 'offShow'])
const onClose = () => {
  emit('offShow')
}
</script>
<style scoped>
.mask {
  position: fixed;
  top: 50px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 100vw;
}
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

  transform-origin: left center; /* 动画起点在右边 */
  z-index: 100;
}
.open {
  box-shadow: none;
  animation: slideIn 0.5s forwards; /* 设置动画 */
}
@keyframes slideIn {
  0% {
    transform: scaleX(0); /* 关闭状态 */
  }
  100% {
    transform: scaleX(1); /* 打开状态 */
  }
}

.closed {
  transform-origin: left center; /* 动画起点在右边 */
  transform: scaleX(1); /* 初始状态 */
  animation: slideOut 0.5s forwards; /* 收缩动画 */
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
