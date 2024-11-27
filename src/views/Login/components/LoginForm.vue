<template>
  <a-form
    v-show="getShow"
    ref="formLogin"
    :model="loginData.loginForm"
    :rules="LoginRules"
    class="login-form"
    label-position="top"
    label-width="120px"
    size="large"
  >
    <a-form-item v-if="loginData.tenantEnable === 'true' && false" name="tenantName">
      <div class="mt-[20px]">
        <a-input
          v-model:value="loginData.loginForm.tenantName"
          :placeholder="t('login.tenantNamePlaceholder')"
          link
          type="primary"
        />
      </div>
    </a-form-item>

    <a-form-item name="username">
      <div class="deep-input w-full mb-[20px]">
        <a-input
          class="input-class-round"
          v-model:value="loginData.loginForm.username"
          :placeholder="t('login.usernamePlaceholder')"
        />
      </div>
    </a-form-item>

    <a-form-item name="password">
      <div class="deep-input w-full mb-[10px]">
        <a-input
          class="input-class-round"
          v-model:value="loginData.loginForm.password"
          :placeholder="t('login.passwordPlaceholder')"
          show-password
          type="password"
          @keyup.enter="getCode()"
        />
      </div>
    </a-form-item>

    <div class="w-full flex justify-end text-right text-[12px] mr-[14px] text-[#4D73CA] bold">
      <div class="w-[60px] cursor-pointer" @click="goForget">忘记密码</div>
    </div>
    <!-- <el-col
        :span="24"
        style="padding-right: 10px; padding-left: 10px; margin-top: -20px; margin-bottom: -20px"
      >
        <a-form-item>
          <el-row justify="space-between" style="width: 100%">
            <el-col :span="6">
              <el-checkbox v-model:value="loginData.loginForm.rememberMe">
                {{ t('login.remember') }}
              </el-checkbox>
            </el-col>
            <el-col :offset="6" :span="12">
              <el-link style="float: right" type="primary">{{ t('login.forgetPassword') }}</el-link>
            </el-col>
          </el-row>
        </a-form-item>
      </el-col> -->
    <a-form-item>
      <a-button
        :loading="loginLoading"
        class="w-[100%] login-button mt-[10px]"
        type="primary"
        color="var(--login-button-color)"
        :round="true"
        @click="getCode()"
        >{{ t('login.login') }}</a-button
      >
    </a-form-item>

    <Verify
      ref="verify"
      :captchaType="captchaType"
      :imgSize="{ width: '400px', height: '200px' }"
      mode="pop"
      @success="handleLogin"
    />
  </a-form>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { computed, ref, reactive, defineProps, watch, onMounted, unref } from 'vue'
import { Verify } from '@/components/Verifition/index'
const props = defineProps({
  agreeCheck: {
    type: Boolean,
    default: false,
  },
})

import * as authUtil from '@/utils/auth'
import * as LoginApi from '@/api/login'
import { LoginStateEnum, useFormValid, useLoginState } from './useLogin'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'
import { useSpin } from '@/hooks/web/useSpin'
defineOptions({ name: 'LoginForm' })

const { t } = useI18n()
const formLogin = ref()
const { validForm } = useFormValid(formLogin)
const { getLoginState } = useLoginState()
const { currentRoute, push } = useRouter()
const redirect = ref<string>('')
const loginLoading = ref(false)
const verify = ref()
const { showLoading, closeLoading } = useSpin()
const captchaType = ref('blockPuzzle') // blockPuzzle 滑块 clickWord 点击文字
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
const useTrack = window.$useTrack

const LoginRules: Record<string, Rule[]> = {
  tenantName: [
    {
      required: true,
      message: '请输入租户名',
    },
  ],
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}
const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  tenantEnable: import.meta.env.VITE_APP_TENANT_ENABLE,
  loginForm: {
    tenantName: import.meta.env.VITE_APP_DEFAULT_LOGIN_TENANT || '',
    username: import.meta.env.VITE_APP_DEFAULT_LOGIN_USERNAME || '',
    password: import.meta.env.VITE_APP_DEFAULT_LOGIN_PASSWORD || '',
    captchaVerification: '',
    rememberMe: true, // 默认记录我。如果不需要，可手动修改
  },
})
const goForget = () => {
  const currentUrl = window.location.href

  // 将 "/login" 替换为 "/forget"
  const newUrl = currentUrl.replace('/login', '/forget')

  // 在新标签页中打开替换后的 URL
  window.open(newUrl, '_blank')
}
// 获取验证码
const getCode = async () => {
  if (!props.agreeCheck) {
    message.error(t('login.agreeUserAgreement'))
    return
  }
  // 情况一，未开启：则直接登录
  if (loginData.captchaEnable === 'false') {
    await handleLogin({})
  } else {
    // 情况二，已开启：则展示验证码；只有完成验证码的情况，才进行登录
    // 弹出验证码
    verify.value.show()
  }
}
// 获取租户 ID
const getTenantId = async () => {
  if (loginData.tenantEnable === 'true') {
    const res = await LoginApi.getTenantIdByName(loginData.loginForm.tenantName)

    useTrack.setParams({ tenantId: res })
    authUtil.setTenantId(res)
  }
}
// 记住我
const getLoginFormCache = () => {
  const loginForm = authUtil.getLoginForm()
  if (loginForm) {
    loginData.loginForm = {
      ...loginData.loginForm,
      username: loginForm.username ? loginForm.username : loginData.loginForm.username,
      password: loginForm.password ? loginForm.password : loginData.loginForm.password,
      rememberMe: loginForm.rememberMe,
      tenantName: loginForm.tenantName ? loginForm.tenantName : loginData.loginForm.tenantName,
    }
  }
}
// 根据域名，获得租户信息
const getTenantByWebsite = async () => {
  const website = location.host
  const res = await LoginApi.getTenantByWebsite(website)
  if (res) {
    loginData.loginForm.tenantName = res.name
    authUtil.setTenantId(res.id)
  }
}
// 登录
const handleLogin = async (params) => {
  loginLoading.value = true
  try {
    await getTenantId()
    const data = await validForm()
    if (!data) {
      return
    }
    const loginDataLoginForm = { ...loginData.loginForm }
    loginDataLoginForm.captchaVerification = params.captchaVerification
    const res = await LoginApi.login(loginDataLoginForm)
    if (!res) {
      return
    }
    showLoading({ text: '正在加载系统中...' })
    if (loginDataLoginForm.rememberMe) {
      authUtil.setLoginForm(loginDataLoginForm)
    } else {
      authUtil.removeLoginForm()
    }
    authUtil.setToken(res)
    if (!redirect.value) {
      redirect.value = '/'
    }
    // 判断是否为SSO登录
    if (redirect.value.indexOf('sso') !== -1) {
      window.location.href = window.location.href.replace('/login?redirect=', '')
    } else {
      push({ path: redirect.value })
    }
  } finally {
    loginLoading.value = false
    closeLoading()
  }
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
onMounted(() => {
  getLoginFormCache()
  getTenantByWebsite()
})
</script>

<style lang="scss" scoped>
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

.login-code {
  float: right;
  width: 100%;
  height: 38px;

  img {
    width: 100%;
    max-width: 100px;
    height: auto;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
/* 自定义复选框颜色和圆角 */
.custom-checkbox .el-checkbox__input {
  /* 如果需要改变选中时的背景色 */
  border-color: #fff;

  /* 自定义颜色 */
  border-radius: 10px;

  /* 圆角大小 */
}

/* 自定义复选框为选中状态时的颜色 */
.custom-checkbox .el-checkbox__input .el-checkbox__inner:hover {
  background-color: var(--login-button-color);
  border-color: var(--login-button-color);
}

/* 自定义复选框为选中状态时的对勾颜色 */
.custom-checkbox .el-checkbox__input .el-checkbox__inner::after {
  background-color: var(--login-button-color);
  border-color: #fff;

  /* 对勾颜色 */
}

.custom-checkbox .el-checkbox__input .el-checkbox__inner {
  background-color: #fff;
  border: 1px solid;
  border-radius: 100%;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: var(--login-button-color);
  border-color: var(--login-button-color);
}

.deep-input {
  background-color: rgb(238 240 248);
  border-radius: 100%;
}

.input-class-round {
  display: flex;
  align-items: center;
}

.input-class-round .a-input-group__prepend {
  border: 0;
  border-radius: 16px;
  box-shadow: 0 0 0 0;
}

.input-class-round .a-input__inner {
  padding-left: 20px;
}

.input-class-round .a-input__wrapper {
  background: #eef0f8;
  border: 0;
  border-radius: 16px;
  box-shadow: 0 0 0 0;
}

.input-class-round .a-input-group__append {
  border: 0;
  border-radius: 30px;
  box-shadow: 0 0 0 0;
}

.login-button {
  background: var(--login-button-color);
}
</style>
