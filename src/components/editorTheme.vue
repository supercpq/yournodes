<template>
  <div class="theme-contain">
    <div class="langOptionsItem">
      <span>
        <div class="transoptions">
          <el-select
            v-model="thvalue"
            class="m-2"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </span>
    </div>
    <div class="langOptionsItem">
      <span>
        <div class="transoptions">
          <el-select
            v-model="prvalue"
            class="m-2"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { mdStore } from "../store/modules/mdEditorPinia";
type Theme = "light" | "dark";

const mdEditorStore = mdStore();
const thvalue = ref<Theme>("light");
const prvalue = ref("cyanosis");
const options = [
  {
    value: "light" as Theme,
    label: "light",
  },
  {
    value: "dark" as Theme,
    label: "dark",
  },
];
const themeOptions = [
  {
    value: "default",
    label: "default",
  },
  {
    value: "github",
    label: "github",
  },
  {
    value: "vuepress",
    label: "vuepress",
  },
  {
    value: "mk-cute",
    label: "mk-cute",
  },
  {
    value: "smart-blue",
    label: "smart-blue",
  },
  {
    value: "cyanosis",
    label: "cyanosis",
  },
];
watch(thvalue, (newValue, oldValue) => {
  mdEditorStore.setTheme(newValue);
});
watch(prvalue, (newValue, oldValue) => {
  mdEditorStore.setPreviewTheme(newValue);
});
onMounted(() => {
  thvalue.value = mdEditorStore.getTheme;
  prvalue.value = mdEditorStore.getPreviewTheme;
});
</script>
<style scoped>
::v-deep transoptions {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000000;
}
.langOptionsItem {
  width: 100px;
  height: 15px;
  margin: 10px;
}
</style>
