<script lang="ts" setup>
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import { APPPATH } from '@/assets/son'

defineOptions({ name: 'SearchInfo' })

const resList = ref([])

const searchText = ref('')
const openSearch = ref(false)

const { wsCache } = useCache()

const route = useRoute()

const name = ref(String(route.name))
let path = APPPATH[name.value] || route.path
console.log(path, name.value, 'value', route)
watch(
  () => route.name,
  (newPath) => {
    name.value = String(newPath)
    path = APPPATH[name.value] || route.path
  },
)
const user = wsCache.get(CACHE_KEY.USER)
const routers = user.menus // 路由对象
const handleSearch = (val) => {
  resList.value = []
  getSearchList(routers, val)
  console.log(resList.value)
}
const getSearchList = (list: { name: string; children: [] | null; component: string }[], val: string) => {
  console.log(path, name.value, 'route')
  list.forEach((item) => {
    if (item.children) {
      getSearchList(item.children, val)
    } else if (item.name && item.name.includes(val)) {
      console.log(item, val)
      resList.value.push({
        label: item.name + item.component,
        value: path + '/' + item.component.replace('/index', ''),
      })
    }
  })
}
const handleChange = (val) => {
  // 父让子跳转
  console.log(val, 'val')
  useMicro().setRouteByPath(name.value, val)
}
</script>

<template>
  <div class="custom-hover py-[10px] flex" @click="openSearch = true">
    <div class="flex items-center">
      <img style="width: 15px; height: 15px" src="@/assets/img/search.svg" alt="" />
    </div>
    <div class="w-0 overflow-hidden search-board" :class="{ searchActive: openSearch }">
      <a-select
        v-model:value="searchText"
        show-search
        placeholder="input search text"
        style="width: 200px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="resList"
        @blur="(openSearch = false), (searchText = ''), (resList = [])"
        @search="handleSearch"
        @change="handleChange"
      ></a-select>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-board {
  transition: all 0.8s;

  :deep(.ant-input:focus) {
    border-color: #f6f6f6;
  }

  :deep(.ant-input:hover) {
    border-color: #f6f6f6;
  }
}

.searchActive {
  width: 210px;
  margin-left: 10px;
  background-color: #f6f6f6;
}
</style>
