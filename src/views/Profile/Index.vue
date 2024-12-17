<template>
  <div
    class="flex bg-[#F5F7F9] w-full overflow-hidden h-[calc(100vh-var(--top-header-header-height))] justify-center pt-[20px]"
  >
    <Card :title="t('profile.user.title')" class="user w-[550px] h-600px" shadow="hover">
      <ProfileUser />
    </Card>
    <Card :title="t('profile.info.title')" class="user ml-3 w-2/3 h-600px" shadow="hover">
      <div>
        <Tabs v-model="activeName" class="profile-tabs" style="height: 400px" tab-position="top">
          <TabPane :tab="t('profile.info.basicInfo')" key="basicInfo">
            <BasicInfo />
          </TabPane>
          <TabPane :tab="t('profile.info.resetPwd')" key="resetPwd">
            <ResetPwd />
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { BasicInfo, ProfileUser, ResetPwd } from './components'
import { Card, TabPane, Tabs } from 'ant-design-vue'
const { t } = useI18n()
defineOptions({ name: 'UserProfile' })
const activeName = ref('basicInfo')
</script>
<style lang="scss" scoped>
.user {
  max-height: 960px;
  padding: 15px 20px 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.Card .Card__header, .Card .Card__body) {
  padding: 15px !important;
}

.profile-tabs > .el-tabs__content {
  padding: 32px;
  font-weight: 600;
  color: #6b778c;
}

.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
