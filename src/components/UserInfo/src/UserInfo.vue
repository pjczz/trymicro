<script lang="ts" setup>
import { Dropdown, Modal, Menu, MenuItem, Avatar } from 'ant-design-vue'

import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import avatarImg from '@/assets/imgs/avatar.gif'
import { useUserStore } from '@/stores/modules/user'

defineOptions({ name: 'UserInfo' })

const { t } = useI18n()

const { wsCache } = useCache()

const { push, replace } = useRouter()

const userStore = useUserStore()

const user = wsCache.get(CACHE_KEY.USER)

const avatar = user.user.avatar ? user.user.avatar : avatarImg

const userName = user.user.nickname ? user.user.nickname : 'Admin'

const loginOut = () => {
  Modal.confirm({
    content: t('common.loginOutMessage'),
    title: t('common.reminder'),
    okText: t('common.ok'),
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
      <Avatar :size="40" :src="avatar" alt="" class="w-[calc(var(--logo-height)-25px)] rounded-[50%]" />
      <span class="pl-[5px] text-14px text-[var(--top-header-text-color)] <lg:hidden">
        {{ userName }}
      </span>
    </div>
    <template #overlay>
      <Menu>
        <MenuItem>
          <div @click="toProfile">{{ t('common.profile') }}</div>
        </MenuItem>
        <!-- <MenuItem>
					<Icon icon="ep:menu" />
					<div @click="toDocument">{{ t('common.document') }}</div>
				</MenuItem> -->
        <MenuItem divided @click="loginOut">
          <div>{{ t('common.loginOut') }}</div>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
