<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    style="background-color: rgba(255, 255, 255, 0.7)"
    @select="handleSelect"
  >
    <el-menu-item index="">首页</el-menu-item>
    <el-menu-item index="myinfo">个人中心</el-menu-item>
    <el-sub-menu index="creator">
      <template #title
        ><el-icon><EditPen /></el-icon> <span>创作中心</span></template
      >
      <el-menu-item index="creator/write">写文章</el-menu-item>
      <el-menu-item index="creator/data">文章数据</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="lang">
      <template #title
        ><el-icon><Switch /></el-icon> <span>lang</span></template
      >
      <el-menu-item index="ZH">简体中文</el-menu-item>
      <el-menu-item index="EN">English</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { routerStore } from "../store/modules/routerPinia";
const routerPath = routerStore();
const activeIndex = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  if (routerPath.routerPath === "") {
    routerPath.routerPath = "/";
  }
  routerPath.routerPath = key;
};
onMounted(() => {
  var routerPaths = localStorage.getItem("router") || "";
  activeIndex.value = routerPaths;
});
</script>

<style></style>
