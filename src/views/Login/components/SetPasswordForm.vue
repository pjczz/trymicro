<template>
  <a-form
    ref="formForget"
    :model="forgetForm"
    :rules="rules"
    class="login-form w-[480px]"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <a-form-item>
      <!-- <LoginFormTitle style="width: 100%" /> -->
      <div class="enter-x mb-[44px] text-[40px] text-center w-full font-bold">{{ t('login.fiftyFivekgCloud') }}</div>
    </a-form-item>
    <div class="enter-x text-[28px] text-[#244C5E] mb-[50px]">{{ t('login.setNewPassword') }}</div>

    <!-- 租户名 -->
    <!-- <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <a-form-item>
          <span class="enter-x mb-3 text-center text-2xl font-bold xl:text-center xl:text-3xl">{{ t('login.loginOrRegister') }}</span>
        </a-form-item>
      </el-col> -->
    <!-- 手机号 -->
    <!-- 验证码 -->
    <a-form-item name="password">
      <div class="deep-input w-full mb-[10px]">
        <a-input
          class="input-class-round"
          v-model:value="forgetForm.password"
          :placeholder="t('login.passwordPlaceholder')"
          show-password
          type="password"
        />
      </div>
    </a-form-item>
    <!-- 登录按钮 / 返回按钮 -->
    <div class="text-[#333333] text-[14px] mb-[20px] ml-[10px]">8-20位字符，至少包含字母，数字、特珠字符中的两种</div>
    <a-form-item>
      <a-button
        :loading="loginLoading"
        :round="true"
        class="forget-btn w-[100%] bg-[--login-button-color] text-white"
        @click="signIn()"
        >{{ t('login.done') }}</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { defineEmits, watch, ref, reactive } from 'vue'
import { validatePassword } from '@/utils/validate'
import { useI18n } from '@/hooks/web/useI18n'
import { reqResetPassword } from '@/api/login'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
defineOptions({ name: 'MobileForm' })

const { t } = useI18n()
const { currentRoute } = useRouter()
const formForget = ref()
const loginLoading = ref(false)
const emit = defineEmits(['afterSetPassword'])
const forgetForm = reactive({
  password: '',
})
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('login.pleaseInputPassword')))
  } else if (!validatePassword(value)) {
    callback(new Error(t('login.pleaseInputCorrectPassword')))
  } else {
    callback()
  }
}
const rules = {
  password: [
    { required: true, message: t('login.pleaseInputPassword') },
    { validator: validatePass, trigger: 'blur' },
  ],
}
const redirect = ref<string>('')
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true,
  },
)

// 下一步
const signIn = async () => {
  emit('afterSetPassword')
  reqResetPassword({ password: forgetForm.password }).then((res) => {
    if (res.code == 200) {
      // 请求修改密码
      emit('afterSetPassword')
      message.success('密码修改成功')
    }
  })
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}

.active {
  color: var(--login-button-color);
}

.active::after {
  position: absolute;
  bottom: 0;
  left: 3%;
  width: 96%;
  height: 2px;
  content: '';
  background-color: var(--login-button-color);
}

:deep(.a-input) {
  .a-input-group__append {
    background-color: var(--login-button-color);
  }
}

.smsbtn {
  margin-top: 33px;
}
</style>
