<script lang="ts" setup>
import { formatDate } from '@/utils/formatTime'
import * as NotifyMessageApi from '@/api/system/notify/message'
import { Button, Badge, TabPane, Tabs, Dropdown } from 'ant-design-vue'
import { APPLICATION } from '@/assets/son/index'
import { setRouteByPath } from '@/utils/micro/index'
defineOptions({ name: 'MessageModule' })

const { push } = useRouter()
const activeName = ref('notice')
const unreadCount = ref(10) // 未读消息数量
const list = ref<any[]>([]) // 消息列表

// 获得消息列表
const getList = async () => {
  list.value = (await NotifyMessageApi.getUnreadNotifyMessageList()) as any[]
  // 强制设置 unreadCount 为 0，避免小红点因为轮询太慢，不消除
  unreadCount.value = 0
}

// 获得未读消息数
const getUnreadCount = async () => {
  NotifyMessageApi.getUnreadNotifyMessageCount().then((data) => {
    unreadCount.value = data as number
  })
}

// 跳转我的站内信
const goMyList = () => {
  setRouteByPath(APPLICATION.HOME, '/user/notify-message')
  push({
    name: 'MyNotifyMessage',
  })
}

// ========== 初始化 =========
onMounted(() => {
  // 首次加载小红点
  getUnreadCount()
  // 轮询刷新小红点
  setInterval(
    () => {
      // getUnreadCount()
    },
    1000 * 60 * 2,
  )
})
</script>
<template>
  <div class="message">
    <Dropdown placement="bottom" trigger="click">
      <Badge :count="unreadCount" class="item flex">
        <div @click="getList"><img alt="" class="message-icon w-[16px]" src="@/assets/imgs/message.svg" /></div>
      </Badge>
      <template #overlay>
        <div class="w-[400px] flex flex-col bg-white p-[20px]">
          <div class="h-[400px]">
            <Tabs v-model="activeName">
              <TabPane key="1" tab="我的站内信" name="notice">
                <template v-for="item in list" :key="item.id">
                  <div class="message-item w-[500px]">
                    <img alt="" src="@/assets/imgs/avatar.gif" />
                    <div class="message-content">
                      <span class="message-title"> {{ item.templateNickname }}：{{ item.templateContent }} </span>
                      <span class="message-date">
                        {{ formatDate(item.createTime) }}
                      </span>
                    </div>
                  </div>
                </template>
                <div style="margin-top: 10px; text-align: right"></div>
              </TabPane>
            </Tabs>
          </div>
          <div class="flex ml-auto">
            <Button preIcon="ep:view" title="查看全部" type="primary" @click="goMyList">查看全部</Button>
          </div>
        </div>
      </template>
      <!-- 更多 -->
    </Dropdown>
  </div>
</template>
<style lang="scss" scoped>
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
}

.message-list {
  display: flex;
  flex-direction: column;
  height: 400px;

  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);

    &:last-child {
      border: none;
    }

    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }

    .message-content {
      display: flex;
      flex-direction: column;

      .message-title {
        margin-bottom: 5px;
      }

      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
