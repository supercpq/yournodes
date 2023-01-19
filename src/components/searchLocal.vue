<template>
  <div class="mt-4">
    <el-input
      v-model="inputStore.inputSearch"
      placeholder="Enter your search term"
      :clearable="isclearable"
      class="input-with-select"
      @keyup.enter="hellogit(inputStore.inputSearch, select)"
    >
      <template #prepend>
        <el-select
          v-model="select"
          placeholder="Select"
          style="width: 115px"
          v-if="!props.isSelf"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #append>
        <el-button
          :icon="Search"
          @click="hellogit(inputStore.inputSearch, select)"
        />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { searchInputStore } from "../store/modules/searchInputPinia";
import _ from "lodash";
import { Search } from "@element-plus/icons-vue";
const props = defineProps({
  isSelf: { type: Boolean, required: true },
});
const inputSearch = ref("");
const isclearable = true;
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
    value: " ",
    label: "站内文章",
  },
];
const inputStore = searchInputStore();
inputStore.inputSearch = inputSearch.value;
const hellogit = _.debounce(
  (input: string, url: string) => {
    if (props.isSelf) {
      // TODO：获取自己写的文章的列表
      inputStore.list.length = 0;
      inputStore.searchSelf();
    } else {
      inputStore.searchInputOnce(input, url);
    }
  },
  200,
  {
    leading: true,
  }
);
watch(select, (newV, oldV) => {
  localStorage.setItem("searchSelect", newV);
});

onMounted(() => {
  select.value =
    localStorage.getItem("searchSelect") || "https://www.google.com/search?q=";
  if (!inputStore.show) {
    // hellogit(value.value, "");
    if (props.isSelf) {
      // TODO：获取自己写的文章的列表
      inputStore.searchSelf();
    } else {
      inputStore.searchdefaultOnce();
    }
  }
});
onBeforeUnmount(() => {
  inputStore.list.length = 0;
  inputStore.inputSearch = "";
});
</script>

<style scoped>
:deep(.input-with-select) {
  padding: auto;
  padding-top: 5px;
}
</style>
