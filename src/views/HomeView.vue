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
      url="http://localhost:7528"
      baseroute="/home"
      iframe
    ></micro-app>
  </div>
</template>

<script setup>
// @ is an alias to /src
import micro from "@micro-zoe/micro-app";

const created = () => {
  console.log("micro-app元素被创建");
};
const beforemount = () => {
  console.log("即将渲染");
};
const mounted = () => {
  console.log("已经渲染完成");
  // micro.router.replace({
  //   name: "yudao-ui-admin-vue3",
  //   path: "http://localhost:3000/page1",
  // });
};
const unmount = () => {
  console.log("已经卸载");
};
const error = () => {
  console.log("加载出错");
};
</script>
<style lang="scss">
.home {
  padding: 0;
  margin: 0;
}
</style>
