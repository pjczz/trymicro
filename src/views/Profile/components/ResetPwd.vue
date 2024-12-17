<template>
  <div class="w-400px">
    <Form ref="formRef" :labelCol="{ style: { width: '90px' } }" labelAlign="left" :model="password" :rules="rules">
      <FormItem :label="t('profile.password.oldPassword')" name="oldPassword">
        <InputPassword v-model="password.oldPassword" @update:modelValue="handleOldPassword" />
      </FormItem>
      <FormItem :label="t('profile.password.newPassword')" name="newPassword">
        <InputPassword v-model="password.newPassword" strength @update:modelValue="handleNewPassword" />
      </FormItem>
      <FormItem :label="t('profile.password.confirmPassword')" name="confirmPassword">
        <InputPassword v-model="password.confirmPassword" strength @update:modelValue="handleConfirmPassword" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit()">{{ t('common.save') }}</Button>
        <Button type="danger" @click="reset()">{{ t('common.reset') }}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { InputPassword } from '@/components/InputPassword'
import { updateUserPassword } from '@/api/system/user/profile'
import { useMessage } from '@/hooks/web/useMessage'
import { Button, Form, FormItem } from 'ant-design-vue'
defineOptions({ name: 'ResetPwd' })
const { t } = useI18n()
const message = useMessage()
const formRef = ref()
const password = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 表单校验
const equalToPassword = (_rule, value, callback) => {
  if (password.newPassword !== value) {
    callback(new Error(t('profile.password.diffPwd')))
  } else {
    callback()
  }
}

const rules = reactive<any>({
  oldPassword: [
    { required: true, message: t('profile.password.oldPwdMsg'), trigger: 'blur' },
    { min: 6, max: 20, message: t('profile.password.pwdRules'), trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: t('profile.password.newPwdMsg'), trigger: 'blur' },
    { min: 6, max: 20, message: t('profile.password.pwdRules'), trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: t('profile.password.cfPwdMsg'), trigger: 'blur' },
    { required: true, validator: equalToPassword, trigger: 'blur' },
  ],
})

const submit = () => {
  if (!formRef.value) return
  formRef.value.validate().then(async () => {
    await updateUserPassword(password.oldPassword, password.newPassword)
    message.success(t('common.updateSuccess'))
  })
}

const reset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
const handleOldPassword = (val: string) => {
  password.oldPassword = val
}
const handleNewPassword = (val: string) => {
  password.newPassword = val
}
const handleConfirmPassword = (val: string) => {
  password.confirmPassword = val
}
</script>
