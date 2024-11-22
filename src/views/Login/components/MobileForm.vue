<template>
  <a-form
    v-show="getShow"
    ref="formSmsLogin"
    :model="loginData.loginForm"
    :rules="rules"
    class="login-form"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <!-- 租户名 -->
    <!-- <el-col :span="24" style="padding-right: 10px; padding-left: 10px">
        <a-form-item>
          <span class="enter-x mb-3 text-center text-2xl font-bold xl:text-center xl:text-3xl">{{ t('login.loginOrRegister') }}</span>
        </a-form-item>
      </el-col> -->
    <a-form-item v-if="loginData.tenantEnable === 'true' && false" name="tenantName">
      <a-input
        v-model:value="loginData.loginForm.tenantName"
        :placeholder="t('login.tenantNamePlaceholder')"
        type="primary"
        class="mb-[20px]"
        link
      />
    </a-form-item>

    <!-- 手机号 -->

    <a-form-item name="mobileNumber">
      <div class="deep-input w-full mb-[20px]">
        <a-input
          class="input-class-round"
          v-model:value="loginData.loginForm.mobileNumber"
          :placeholder="t('login.mobileNumberPlaceholder')"
        />
      </div>
    </a-form-item>

    <!-- 验证码 -->

    <a-form-item name="code">
      <div class="flex h-full justify-between mb-[40px]">
        <div class="deep-input w-[74%]">
          <a-input
            class="input-class-round"
            v-model:value="loginData.loginForm.code"
            :placeholder="t('login.codePlaceholder')"
          >
            <!-- <el-button class="w-[100%]"> -->
          </a-input>
        </div>

        <!-- </el-button> -->

        <div class="bg-[var(--login-button-color)] leading-[40px] h-[40px] w-[24%] text-center rounded-[16px]">
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
      <a-button :round="true" class="w-[100%] bg-[var(--login-button-color)] text-white" @click="signIn()">{{
        t('login.login')
      }}</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRouter } from 'vue-router'
import { defineProps, watch, ref, computed, reactive, unref } from 'vue'
import { setTenantId, setToken } from '@/utils/auth'
import { getTenantIdByName, sendSmsCode, smsLogin } from '@/api/login'
import { LoginStateEnum, useFormValid, useLoginState } from './useLogin'
import { message } from 'ant-design-vue'
import { useSpin } from '@/hooks/web/useSpin'
const { showLoading, hideLoading } = useSpin()
import { useI18n } from '@/hooks/web/useI18n'
const props = defineProps({
  agreeCheck: {
    type: Boolean,
    default: false,
  },
})

defineOptions({ name: 'MobileForm' })

const { t } = useI18n()
const { currentRoute, push } = useRouter()
const formSmsLogin = ref()
const loginLoading = ref(false)
const { validForm } = useFormValid(formSmsLogin)
const { getLoginState } = useLoginState()
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)
const rules = {
  tenantName: [{ required: true, message: '请输入租户名' }],
  mobileNumber: [{ required: true, message: '请输入手机号' }],
  code: [{ required: true, message: '请输入验证码' }],
}
const loginData = reactive({
  codeImg: '',
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  token: '',
  loading: {
    signIn: false,
  },
  loginForm: {
    uuid: '',
    tenantName: '芋道源码',
    mobileNumber: '',
    code: '',
  },
})
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
  if (!props.agreeCheck) {
    message.error(t('login.agreeUserAgreement'))
    return
  }
  await getTenantId()
  smsVO.smsCode.mobile = loginData.loginForm.mobileNumber
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
// 获取租户 ID
const getTenantId = async () => {
  if (loginData.tenantEnable === 'true') {
    const res = await getTenantIdByName(loginData.loginForm.tenantName)
    setTenantId(res)
  }
}
// 登录
const signIn = async () => {
  if (!props.agreeCheck) {
    message.error(t('login.agreeUserAgreement'))
    return
  }
  await getTenantId()
  const data = await validForm()
  if (!data) return
  loginLoading.value = true
  smsVO.loginSms.mobile = loginData.loginForm.mobileNumber
  smsVO.loginSms.code = loginData.loginForm.code
  await smsLogin(smsVO.loginSms)
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
        showLoading({ text: '登录中...' })
        hideLoading()
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
