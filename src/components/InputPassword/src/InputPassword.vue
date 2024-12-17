<script lang="ts" setup>
import { useConfigGlobal } from '@/hooks/web/useConfigGlobal'
import type { ZxcvbnResult } from '@zxcvbn-ts/core'
import { zxcvbn } from '@zxcvbn-ts/core'
defineOptions({ name: 'InputPassword' })
import showPassword from '@/assets/img/showPassword.svg'
import hidePassword from '@/assets/img/hidePassword.svg'

const props = defineProps<{
  // 是否显示密码强度
  strength: boolean
  // 绑定值
  modelValue: string
}>()

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  },
)

const { configGlobal } = useConfigGlobal()

const emit = defineEmits(['update:modelValue'])

// 设置input的type属性
const textType = ref<'password' | 'text'>('password')

const changeTextType = () => {
  textType.value = unref(textType) === 'text' ? 'password' : 'text'
}

// 输入框的值
const valueRef = ref(props.modelValue)

// 监听
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  },
)

// 获取密码强度
const getPasswordStrength = computed(() => {
  const value = unref(valueRef)
  const zxcvbnRef = zxcvbn(unref(valueRef)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})
</script>

<template>
  <div :class="[`input-password`, `input-password--${configGlobal?.size}`]">
    <a-input v-model:value="valueRef" :type="textType" v-bind="$attrs">
      <template #suffix>
        <img
          v-if="textType === 'password'"
          @click="changeTextType"
          class="w-[20px] h-[20px]"
          :src="showPassword"
          alt=""
        />
        <img v-else @click="changeTextType" class="w-[20px] h-[20px]" :src="hidePassword" alt="" />
      </template>
    </a-input>
    <div v-if="strength" :class="`input-password__bar`" class="relative mb-6px ml-auto mr-auto mt-10px h-6px">
      <div :class="`input-password__bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-password {
  :deep(.input-password-input__clear) {
    margin-left: 5px;
  }

  &__bar {
    background-color: #999;
    border-radius: var(--el-border-radius-base);

    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      content: '';
      background-color: transparent;
      border-color: white;
      border-style: solid;
      border-width: 0 5px;
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition:
        width 0.5s ease-in-out,
        background 0.25s;

      &[data-score='0'] {
        width: 20%;
        background-color: rgb(245 108 108);
      }

      &[data-score='1'] {
        width: 40%;
        background-color: rgb(245 108 108);
      }

      &[data-score='2'] {
        width: 60%;
        background-color: rgb(230 162 60);
      }

      &[data-score='3'] {
        width: 80%;
        background-color: rgb(103 194 58);
      }

      &[data-score='4'] {
        width: 100%;
        background-color: rgb(103 194 58);
      }
    }
  }

  &--mini > &__bar {
    border-radius: var(--el-border-radius-small);
  }
}
</style>
