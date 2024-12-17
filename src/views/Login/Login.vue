<template>
  <div id="login" class="relative h-[100%] lt-md:px-10px lt-sm:px-10px">
    <div class="relative mx-auto h-full flex">
      <div
        :class="` flex-1 bg-gray-500 bg-opacity-20 2xl:w-[59%]  left-background relative lt-xl:hidden overflow-x-hidden overflow-y-auto`"
      >
        <!-- 左上角的 logo + 系统标题 -->
        <!-- 左边的背景图 + 欢迎语 -->
        <div class="h-[100%] flex items-center justify-center">
          <TransitionGroup appear enter-active-class="animate__animated animate__bounceInLeft" tag="div" />
        </div>
      </div>
      <div
        class="relative flex flex-col w-auto dark:bg-[var(--login-bg-color)] items-center 2xl:w-[41%] dark:bg-none lt-xl:w-full overflow-x-hidden overflow-y-auto"
      >
        <!-- 右上角的主题、语言选择 -->
        <div
          class="w-full flex p-l-10px p-r-10px items-center justify-between at-2xl:justify-end at-xl:justify-end"
          style="color: var(--el-text-color-primary)"
        >
          <!-- <div class="flex items-center at-2xl:hidden at-xl:hidden">
            <img alt="" class="mr-10px h-48px w-48px" src="@/assets/imgs/avatar.jpg" />
            <span class="text-20px font-bold" >{{ underlineToHump(appStore.getTitle) }}</span>
          </div> -->
          <div class="flex items-center justify-end space-x-10px h-48px">
            <ThemeSwitch />
            <LocaleDropdown />
          </div>
        </div>
        <!-- 右边的登录界面 -->
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div class="flex h-[calc(100vh-40px)] mt-[calc(50vh-337px)] max-w-[486px] flex-col">
            <img alt="" class="ml-12px h-100px w-100px" src="@/assets/imgs/logo.png" />
            <div class="enter-x mb-3 font-bold ml-[20px] text-[30px]">
              {{ t('login.fiftyFivekgCloud') }}
              <!-- {{ t('profile.password.oldPassword') }} -->
            </div>
            <div class="flex ml-[20px] my-[20px]">
              <div
                class="text-[16px] font-bold relative color-[#A3A4AC] mr-[20px] cursor-pointer"
                :class="{ active: getLoginState === LoginStateEnum.LOGIN }"
                @click="setLoginState(LoginStateEnum.LOGIN)"
              >
                {{ t('common.password') }}
              </div>
              <div
                class="text-[16px] font-bold relative color-[#A3A4AC] cursor-pointer"
                :class="{ active: getLoginState === LoginStateEnum.MOBILE }"
                @click="setLoginState(LoginStateEnum.MOBILE)"
              >
                {{ t('common.verifycode') }}
              </div>
            </div>
            <!-- 账号登录 -->
            <LoginForm :agreeCheck="agreeCheck" class="h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" />
            <!-- 手机登录 -->
            <MobileForm :agreeCheck="agreeCheck" class="h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" />
            <!-- 二维码登录 -->
            <QrCodeForm class="h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" />
            <!-- 注册 -->
            <RegisterForm class="h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" />
            <!-- 三方登录 -->
            <SSOLoginVue class="h-auto p-20px lt-xl:(rounded-3xl light:bg-white)" />
            <div class="custom-checkbox text-[12px] flex items-center font-bold p-l-[20px]">
              <a-checkbox class="border-[1px]" v-model:checked="agreeCheck" />
              <div class="ml-[10px] color-[#B7BCC3]">
                我已阅读并同意 <a href="#" class="color-[var(--login-button-color)]">《中国移动认证服务条款》</a>和
                <a href="#" class="color-[var(--login-button-color)]">《用户协议》</a>、
                <a href="#" class="color-[var(--login-button-color)]">《隐私政策》</a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoginStateEnum, useLoginState } from './components/useLogin'
const { setLoginState, getLoginState } = useLoginState()
import { LoginForm, MobileForm, QrCodeForm, RegisterForm, SSOLoginVue } from './components'
const { t } = useI18n()
import { ref, defineComponent } from 'vue'
defineComponent({ name: 'loginPage' })
const agreeCheck = ref(false)
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

#login {
  overflow: auto;

  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      background-image: url('@/assets/svgs/login-bg.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>

<style lang="scss">
.left-background {
  background: url('../../assets/imgs/login-left-background.png') no-repeat;
  background-size: 100% 100%;
}

.dark .login-form {
  .el-divider__text {
    background-color: var(--login-bg-color);
  }

  .el-card {
    background-color: var(--login-bg-color);
  }
}

.active {
  color: var(--login-button-color);
}

.active::after {
  position: absolute;
  bottom: -10px;
  left: 3%;
  width: 96%;
  height: 2px;
  content: '';
  background-color: var(--login-button-color);
}

.deep-input {
  background-color: black;

  .ant-input {
    background-color: rgb(238 240 248);
  }
}

.login-form {
  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-input:hover {
    border-color: transparent;
  }

  .ant-input:focus {
    border-color: transparent;
  }

  .ant-btn-primary:not(:disabled):hover {
    background-color: rgb(102 130 142);
  }

  .ant-btn-primary:not(:disabled):active {
    background-color: rgb(102 130 142);
  }
}

.custom-checkbox {
  a:hover {
    color: var(--login-button-color);
  }

  a {
    font-weight: bold;
  }

  .ant-checkbox {
    overflow: hidden;
    border-radius: 100%;
  }

  .ant-checkbox-inner {
    overflow: hidden;
    border-color: var(--login-button-color) !important;
    border-radius: 100%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    overflow: hidden;
    background-color: var(--login-button-color) !important;
    border-color: var(--login-button-color) !important;
  }

  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover .ant-checkbox-inner {
    background-color: var(--login-button-color) !important;
  }

  .ant-checkbox-checked::after {
    border-color: var(--login-button-color) !important;
  }
}
</style>
