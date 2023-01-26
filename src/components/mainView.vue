<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    style="background-color: rgba(255, 255, 255, 0.7)"
    @select="handleSelect"
  >
    <el-menu-item index="">{{ $t("menu[0]") }}</el-menu-item>
    <el-menu-item index="myinfo">{{ $t("menu[1]") }}</el-menu-item>
    <el-sub-menu index="creator">
      <template #title
        ><el-icon><EditPen /></el-icon>
        <span>{{ $t("menu[2]") }}</span></template
      >
      <el-menu-item index="creator/write">{{ $t("menu[3]") }}</el-menu-item>
      <el-menu-item index="creator/data">{{ $t("menu[4]") }}</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="lang">
      <template #title
        ><el-icon><Switch /></el-icon>
        <span>{{ $t("menu[5]") }}</span></template
      >
      <el-menu-item index="ZH">简体中文</el-menu-item>
      <el-menu-item index="EN">English</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { routerStore } from "../store/modules/routerPinia";
import { useI18n } from "vue3-i18n";
const i18n = useI18n();
const routerPath = routerStore();
const activeIndex = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  if (key === "ZH") {
    i18n.setLocale("zh");
  } else if (key === "EN") {
    i18n.setLocale("en");
  } else {
    if (routerPath.routerPath === "") {
      routerPath.routerPath = "/";
    }
    routerPath.routerPath = key;
  }
};
onMounted(() => {
  var routerPaths = localStorage.getItem("router") || "";
  activeIndex.value = routerPaths;
});
</script>

<style></style>
