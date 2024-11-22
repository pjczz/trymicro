<template>
  <a-form
    ref="formForget"
    :model="forgetForm"
    :rules="rules"
    class="login-form w-full"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <a-form-item>
      <!-- <LoginFormTitle style="width: 100%" /> -->
      <div class="enter-x mb-[44px] align-center text-[40px] text-center w-full font-bold">
        {{ t('login.fiftyFivekgCloud') }}
      </div>
    </a-form-item>

    <div class="enter-x text-[28px] text-[#244C5E] mb-[50px]">{{ t('login.findPassword') }}</div>
    <!-- 租户名 -->
    <!-- <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <a-form-item>
          <span class="enter-x mb-3 text-center text-2xl font-bold xl:text-center xl:text-3xl">{{ t('login.loginOrRegister') }}</span>
        </a-form-item>
      </el-col> -->
    <!-- 手机号 -->
    <a-form-item prop="mobileNumber">
      <div class="deep-input w-full mb-[20px]">
        <a-input
          class="input-class-round"
          v-model="forgetForm.phone"
          :placeholder="t('login.mobileNumberPlaceholder')"
        />
      </div>
    </a-form-item>
    <!-- 验证码 -->
    <a-form-item prop="code">
      <div class="flex h-[40px] justify-between mb-[40px]">
        <div class="deep-input w-full w-[74%]">
          <a-input class="input-class-round" v-model="forgetForm.code" :placeholder="t('login.codePlaceholder')">
            <!-- <el-button class="w-[100%]"> -->
          </a-input>
        </div>

        <!-- </el-button> -->

        <div class="bg-[var(--login-button-color)] leading-[40px] w-[24%] h-full text-center rounded-[16px]">
          <span
            v-if="mobileCodeTimer <= 0"
            class="getMobileCode color-white"
            style="cursor: pointer"
            @click="getSmsCode"
          >
            {{ t('login.getSmsCode') }}
          </span>
          <span v-if="mobileCodeTimer > 0" class="getMobileCode" style="cursor: pointer">
            {{ mobileCodeTimer }}秒后可重新获取
          </span>
        </div>
      </div>
    </a-form-item>
    <!-- 登录按钮 / 返回按钮 -->
    <a-form-item>
      <a-button
        :loading="loginLoading"
        color="var(--login-button-color)"
        :round="true"
        class="forget-btn w-[100%] bg-[--login-button-color] text-white"
        @click="signIn()"
      >
        {{ t('login.next') }}</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { watch, ref, reactive, defineEmits } from 'vue'
import { setToken } from '@/utils/auth'
import { useI18n } from '@/hooks/web/useI18n'
import { sendSmsCode, reqResetPasswordBySms } from '@/api/login'
import { useFormValid } from './useLogin'
import Spin from '@/hooks/web/useLoading'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

defineOptions({ name: 'MobileForm' })

const { t } = useI18n()
const { currentRoute, push } = useRouter()
const formForget = ref()
const loginLoading = ref(false)
const couldSetPassword = ref(false)
const { validForm } = useFormValid(formForget)
const emit = defineEmits(['forgetSuccess'])
const forgetForm = reactive({
  phone: '',
  code: '',
})
const rules = {
  tenantName: [
    {
      required: true,
      message: '请输入租户名',
    },
  ],
  mobileNumber: [
    {
      required: true,
      message: '请输入手机号',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
    },
  ],
}
const smsVO = reactive({
  smsCode: {
    mobile: '',
    scene: 21,
  },
  loginSms: {
    mobile: '',
    code: '',
  },
})
const mobileCodeTimer = ref(0)
const redirect = ref<string>('')
const getSmsCode = async () => {
  smsVO.smsCode.mobile = forgetForm.phone
  await sendSmsCode(smsVO.smsCode).then(async () => {
    message.success(t('login.SmsSendMsg'))
    // 设置倒计时
    mobileCodeTimer.value = 60
    const msgTimer = setInterval(() => {
      mobileCodeTimer.value = mobileCodeTimer.value - 1
      if (mobileCodeTimer.value <= 0) {
        clearInterval(msgTimer)
      }
    }, 1000)
  })
}
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
  couldSetPassword.value = true
  if (couldSetPassword.value) {
    emit('forgetSuccess')
    return
  }
  const data = await validForm()
  if (!data) return
  ElLoading.service({
    lock: true,
    text: '正在加载系统中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  loginLoading.value = true
  smsVO.loginSms.mobile = forgetForm.phone
  smsVO.loginSms.code = forgetForm.code
  await reqResetPasswordBySms(smsVO.loginSms)
    .then(async (res) => {
      setToken(res)
      if (!redirect.value) {
        redirect.value = '/'
      }
      push({ path: redirect.value })
    })
    .catch(() => {})
    .finally(() => {
      loginLoading.value = false
      setTimeout(() => {
        const loadingInstance = Spin.service()
        loadingInstance.close()
      }, 400)
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
