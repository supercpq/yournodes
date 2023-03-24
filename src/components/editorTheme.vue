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
    <div class="langOptionsItem" v-if="props.isEdit">
      <span>
        <div class="transoptions">
          <el-switch
            v-model="local"
            class="ml-2"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-text="$t('localOff')"
            :inactive-text="$t('localOn')"
          />
        </div>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { mdStore } from "../store/modules/mdEditorPinia";
type Theme = "light" | "dark";
const local = ref(true);
const mdEditorStore = mdStore();
const thvalue = ref<Theme>("light");
const prvalue = ref("cyanosis");
const props = defineProps({
  flexDisplay: { type: String, required: true },
  isEdit: {
    type: Boolean,
    default: false,
  },
});
const isWrap = props.flexDisplay === "row" ? "nowrap" : "wrap";
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
watch(local, (newValue, oldValue) => {
  mdEditorStore.setLocal(newValue);
});
onMounted(() => {
  thvalue.value = mdEditorStore.getTheme;
  prvalue.value = mdEditorStore.getPreviewTheme;
});
</script>
<style scoped>
:deep(.transoptions) {
  /* background-color: rgba(255, 255, 255, 0.5); */
  color: #000000;
}
.theme-contain {
  display: flex;
  flex-flow: v-bind("props.flexDisplay");
  flex-wrap: v-bind("isWrap");
}
.langOptionsItem {
  width: 100px;
  height: 15px;
  margin: 6px;
}
</style>
