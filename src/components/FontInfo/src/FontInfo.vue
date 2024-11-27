<script lang="ts" setup>
import { Dropdown, Modal, Menu, MenuItem } from 'ant-design-vue'

import { useUserStore } from '@/stores/modules/user'

defineOptions({ name: 'UserInfo' })

const { t } = useI18n()

const { push, replace } = useRouter()

const userStore = useUserStore()

const loginOut = () => {
  Modal.warning({
    content: t('common.loginOutMessage'),
    title: t('common.reminder'),
    okText: t('login.ok'),
    cancelText: t('common.cancel'),
    onOk: async () => {
      await userStore.loginOut()
      replace('/login')
    },
  })
}
const toProfile = async () => {
  push('/user/profile')
}
</script>

<template>
  <Dropdown class="custom-hover py-[10px]" trigger="click">
    <div class="flex items-center">
      <img style="width: 18px; height: 18px" src="@/assets/img/font-size.svg" alt="" />
    </div>
    <template #overlay>
      <Menu>
        <MenuItem>
          <div @click="toProfile">{{ t('size.default') }}</div>
        </MenuItem>
        <MenuItem>
          <div @click="toProfile">{{ t('size.large') }}</div>
        </MenuItem>
        <!-- <MenuItem>
					<Icon icon="ep:menu" />
					<div @click="toDocument">{{ t('common.document') }}</div>
				</MenuItem> -->
        <MenuItem @click="loginOut">
          <div>{{ t('size.small') }}</div>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
