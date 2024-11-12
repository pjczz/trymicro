<template>
  <div
    v-show="props.show"
    class="drop-board"
    @mouseleave="handleLeave"
    :style="{ width: props.width, height: props.height }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  width: {
    type: String,
    default: "100vw",
  },
  height: {
    type: String,
    default: "calc(100vh - 50px)",
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const show = ref(false);
const emit = defineEmits(["show", "offShow"]);
const onShow = () => {
  emit("show");
};
const handleLeave = () => {
  emit("offShow");
};
</script>
<style lang="scss" scoped>
.drop-board {
  position: absolute;
  top: 38px;
  left: 0;
  padding: 4px;
  background-color: #ffffff;
  background-clip: padding-box;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
}
</style>
