<template>
  <a-spin :spinning="loading">
    <a-form ref="formRef" :model="formData" :labelWidth="200" :rules="rules" :schema="schema">
      <a-form-item name="nickname" label="昵称">
        <a-input class="w-[200px]" v-model:value="formData['nickname']" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item name="mobile" label="手机号">
        <a-input class="w-[200px]" v-model:value="formData['mobile']" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item name="email" label="邮箱号">
        <a-input class="w-[200px]" v-model:value="formData['email']" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item name="sex" label="性别">
        <a-radio-group v-model:value="formData['sex']">
          <a-radio :value="1">{{ t('profile.user.man') }}</a-radio>
          <a-radio :value="2">{{ t('profile.user.woman') }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div style="text-align: center">
      <a-button type="primary" @click="submit()">{{ t('common.save') }}</a-button>
      <a-button type="danger" @click="init()">{{ t('common.reset') }}</a-button>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
import { getUserProfile, updateUserProfile, UserProfileUpdateReqVO } from '@/api/system/user/profile'
import { useUserStore } from '@/stores/modules/user'
import { useMessage } from '@/hooks/web/useMessage'
defineOptions({ name: 'BasicInfo' })

const { t } = useI18n()
const message = useMessage() // 消息弹窗
const userStore = useUserStore()
const formData = reactive({
  nickname: '',
  email: '',
  mobile: '',
  sex: 0,
})
const loading = ref(true)
// 表单校验
const rules = reactive<any>({
  nickname: [{ required: true, message: t('profile.rules.nickname'), trigger: 'blur' }],
  email: [
    { required: true, message: t('profile.rules.mail'), trigger: 'blur' },
    {
      type: 'email',
      message: t('profile.rules.truemail'),
      trigger: ['blur', 'change'],
    },
  ],
  mobile: [
    { required: true, message: t('profile.rules.phone'), trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: t('profile.rules.truephone'),
      trigger: 'blur',
    },
  ],
})
const schema = reactive<any[]>([
  {
    field: 'nickname',
    label: t('profile.user.nickname'),
    component: 'a-input',
  },
  {
    field: 'mobile',
    label: t('profile.user.mobile'),
    component: 'a-input',
  },
  {
    field: 'email',
    label: t('profile.user.email'),
    component: 'a-input',
  },
  {
    field: 'sex',
    label: t('profile.user.sex'),
    component: 'InputNumber',
    value: 0,
  },
])
const formRef = ref<any>() // 表单 Ref
const submit = () => {
  console.log(toRaw(formData), 'toRaw(formData)')
  if (!formRef.value) return
  formRef.value.validate().then(async () => {
    const data = toRaw(formData) as UserProfileUpdateReqVO
    await updateUserProfile(data)
    message.success(t('common.updateSuccess'))
    const profile = await init()
    userStore.setUserNicknameAction(profile.nickname)
  })
}
const init = async () => {
  const res = await getUserProfile()
  res.nickname && (formData.nickname = res.nickname)
  res.mobile && (formData.mobile = res.mobile)
  res.email && (formData.email = res.email)
  res.sex && (formData.sex = res.sex)
  loading.value = false
  // formRef?.value?.setValues(res)
  return res
}
onMounted(async () => {
  await init()
})
</script>
