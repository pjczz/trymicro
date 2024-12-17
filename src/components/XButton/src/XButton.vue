<script lang="ts" setup>
import { Button } from 'ant-design-vue'
defineOptions({ name: 'XButton' })

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  preIcon: {
    type: String,
    default: '',
  },
  postIcon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'primary', 'success', 'warning', 'danger', 'info'].includes(value),
  },
  link: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: null,
  },
  color: {
    type: String,
    default: '',
  },
})
const getBindValue = computed(() => {
  const delArr: string[] = ['title', 'preIcon', 'postIcon', 'onClick']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})
</script>

<template>
  <Button class="xbutton" v-bind="getBindValue" @click="onClick" :color="color">
    <!-- <Icon v-if="preIcon" :icon="preIcon" class="mr-1px" /> -->
    <img v-if="preIcon" :src="preIcon" alt="" class="w-[20px] mr-1px text-white" />
    {{ title ? title : '' }}
    <!-- <Icon v-if="postIcon" :icon="postIcon" class="mr-1px" /> -->
    <img v-if="postIcon" :src="postIcon" alt="" class="w-[20px] mr-1px" />
  </Button>
</template>
<style lang="scss" scoped>
.xbutton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  padding: 5px;
  padding: 0;
}

:deep(.ant-btn.is-text) {
  padding: 8px 4px;
  margin-left: 0;
}

:deep(.ant-btn.is-link) {
  padding: 8px 4px;
  margin-left: 0;
}
</style>
