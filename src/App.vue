<template>
  <div id="app">
    <div class="flex-center position-ref full-height">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <div class="top-right links">
        <router-link to="/home">首页</router-link>
        <router-link to="/qiniu">七牛云上传实例</router-link>
        <router-link to="/vote">实时投票</router-link>
      </div>

      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
</style>
