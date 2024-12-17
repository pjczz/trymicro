<template>
  <div class="change-avatar">
    <CropperAvatar
      ref="cropperRef"
      :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
      :showBtn="false"
      :value="img"
      width="120px"
      @change="handelUpload"
    />
  </div>
</template>
<script lang="ts" setup>
import { uploadAvatar } from '@/api/system/user/profile'
import { CropperAvatar } from '@/components/Cropper'
import { useUserStore } from '@/stores/modules/user'

defineOptions({ name: 'UserAvatar' })

defineProps({
  img: { type: String, default: '' },
})

const userStore = useUserStore()

const cropperRef = ref()
const handelUpload = async ({ data }) => {
  const res = await uploadAvatar({ avatarFile: data })
  cropperRef.value.close()
  userStore.setUserAvatarAction(res.data)
}
</script>

<style lang="scss" scoped>
.change-avatar {
  img {
    display: block;
    margin-bottom: 15px;
    border-radius: 50%;
  }
}
</style>
