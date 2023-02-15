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
import { useI18n } from "vue-i18n";
import { mdStore } from "../store/modules/mdEditorPinia";
const mdEditorStore = mdStore();
const { locale } = useI18n();
const routerPath = routerStore();
const activeIndex = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
  if (key === "ZH") {
    locale.value = "zh";
    localStorage.setItem("lang-zh-en", "zh");
    mdEditorStore.setLang("zh-CN");
  } else if (key === "EN") {
    localStorage.setItem("lang-zh-en", "en");
    locale.value = "en";
    mdEditorStore.setLang("en-US");
  } else {
    if (routerPath.routerPath === "") {
      routerPath.routerPath = "/";
    }
    routerPath.routerPath = key;
  }
};
onMounted(() => {
  let routerPaths = localStorage.getItem("router") || "";
  activeIndex.value = routerPaths;
  let langSet = ["zh", "en"];
  let lang = localStorage.getItem("lang-zh-en") || "zh";
  if (langSet.indexOf(lang) === -1) {
    locale.value = "zh";
  } else {
    locale.value = lang;
  }
});
</script>

<style></style>
