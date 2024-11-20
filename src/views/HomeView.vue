<template>
  <div class="home">
    <!--  -->
    <micro-app
      name="yudao-ui-admin-vue3"
      @created="created"
      @beforemount="beforemount"
      @mounted="mounted"
      @unmount="unmount"
      @error="error"
      :url="url"
      baseroute="/home"
      iframe
    ></micro-app>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 首先路由拦截  查询当前的meta 如果这个路由是子路由的 代表进入子系统  保存到stage isSubSystem中
// computed 判断使用什么组件  一个是homeBoard 一个是subBoard
const url = ref(import.meta.env.VITE_YUDAO_API_URL)
console.log(url.value, 'url.value')
const created = () => {
  console.log('micro-app元素被创建')
}
const beforemount = () => {
  console.log('即将渲染')
}
const mounted = () => {
  console.log('已经渲染完成')
  // micro.router.replace({
  //   name: "yudao-ui-admin-vue3",
  //   path: "http://localhost:3000/page1",
  // });
}
const unmount = () => {
  console.log('已经卸载')
}
const error = () => {
  console.log('加载出错')
}
</script>
<style lang="scss">
.home {
  padding: 0;
  margin: 0;
}
</style>
