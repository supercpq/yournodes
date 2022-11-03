<template>
  <div class="mt-4">
    <el-input
      v-model="inputSearch"
      placeholder="Enter your search term"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 115px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
const inputSearch = ref("");
const select = ref("https://www.google.com/search?q=");
const value = ref("https://www.google.com/search?q=");
const lable = ref("Google");
const options = [
  {
    value: "https://www.google.com/search?q=",
    label: "Google",
  },
  {
    value: "https://www.bing.com/search?q=",
    label: "bing",
  },
  {
    value: "https://github.com/search?q=",
    label: "Github",
  },
  {
    value: "https://www.baidu.com/s?wd=",
    label: "Baidu",
  },
  {
    value: "https://www.npmjs.com/search?q=",
    label: "npm",
  },
  {
    value: "https://stackoverflow.com/search?q=",
    label: "stackoverflow",
  },
  {
    value: "",
    label: "站内文章",
  },
];
watch(select, (newV, oldV) => {
  localStorage.setItem("searchSelect", newV);
});

onMounted(() => {
  select.value =
    localStorage.getItem("searchSelect") || "https://www.google.com/search?q=";
});
</script>

<style scoped>
:deep(.input-with-select) {
  padding: auto;
  padding-top: 5px;
}
</style>
