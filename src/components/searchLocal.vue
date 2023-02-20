<template>
  <div class="mt-4">
    <el-input
      v-model="inputStore.inputSearch"
      placeholder="Enter your search term"
      :clearable="isclearable"
      class="input-with-select"
      maxlength="200"
      @keyup.enter="hellogit(inputStore.inputSearch, select)"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="getSuggestion(inputStore.inputSearch)"
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
    <transition name="fade">
      <ul
        v-show="
          inputSuggestion.length &&
          autoComp &&
          inputStore.inputSearch &&
          isFocus
        "
        class="autoInput"
      >
        <li
          class="autoIn"
          v-for="(item, index) in inputSuggestion"
          :key="index"
          @click="
            {
              inputStore.inputSearch = item.label;
              hellogit(inputStore.inputSearch, select);
            }
          "
        >
          <el-icon class="autoicon"><Search /></el-icon>
          <span class="autolabel">
            {{ item.label }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { searchInputStore } from "../store/modules/searchInputPinia";
import _ from "lodash";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
const props = defineProps({
  isSelf: { type: Boolean, required: true },
  autoComp: { type: Boolean },
});
interface suggestion {
  label: string;
}
const isFocus = ref(false);
const inputSearch = ref("");
const isclearable = true;
const select = ref("https://www.google.com/search?q=");
// const value = ref("https://www.google.com/search?q=");
// const lable = ref("Google");
const inputSuggestion = ref<suggestion[]>([]);
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
    value: "https://search.bilibili.com/all?keyword=",
    label: "bilibili",
  },
  {
    value: " ",
    label: "this site(站内文章)",
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
function setFocus(focus: boolean) {
  console.log(" setFocus", focus);
  isFocus.value = focus;
}
const getSuggestion = _.debounce(
  (input: string) => {
    // bing的输入建议
    axios.get(`/api/inputsuggestion?input=${input}`).then(
      (res) => {
        inputSuggestion.value.length = 0;
        if (res.data.status === 0) {
          inputSuggestion.value = res.data.suggest;
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
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

.autoInput {
  z-index: 100;
  position: absolute;
  min-width: 300px;
  max-width: 600px;
  left: 30%;
  background-color: rgba(255, 255, 255, 0);
  padding: 5px;
}

.autoIn {
  background-color: white;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: left;
  line-height: 30px;
  display: flex;
  gap: 0 10px;
  align-items: center;
}
.autoIn:hover {
  background-color: rgb(255, 255, 255);
}

.autolabel {
  padding: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.autoicon {
  padding: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
