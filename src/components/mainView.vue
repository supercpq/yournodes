<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    style="background-color: rgba(255, 255, 255, 0.7)"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">个人中心</el-menu-item>
    <el-sub-menu index="3">
      <template #title
        ><el-icon><EditPen /></el-icon> <span>创作中心</span></template
      >
      <el-menu-item index="3-1">写文章</el-menu-item>
      <el-menu-item index="3-2">文章数据</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title
        ><el-icon><Switch /></el-icon> <span>lang</span></template
      >
      <el-menu-item index="4-1">简体中文</el-menu-item>
      <el-menu-item index="4-2">English</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style></style>
