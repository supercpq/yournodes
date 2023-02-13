<template>
  <div class="container">
    <md-editor
      class="mgb20"
      v-model="text"
      :previewTheme="mdEditorStore.getPreviewTheme"
      :theme="mdEditorStore.getTheme"
      @input="onSubmit(isPublish)"
      @on-upload-img="onUploadImg"
      @onSave="onSubmit(isPublish)"
      :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
    >
      <template #defFooters>
        <time-now />
      </template>
    </md-editor>
    <div class="setting">
      <el-button type="primary" class="submit" @click="onSubmit(true)">{{
        $t("submit")
      }}</el-button>
      <editor-theme />
    </div>
  </div>
</template>

<script setup lang="ts" name="md">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";
import { getDraft, updataArContent } from "../api/creator";
import _ from "lodash";
import axios from "axios";
import TimeNow from "./timeNow.vue";
import { mdStore } from "../store/modules/mdEditorPinia";
import editorTheme from "./editorTheme.vue";
const mdEditorStore = mdStore();
const $route = useRoute();
const text = ref("");
const id = ref("");
const isPublish = ref(false);
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);
        axios
          .post("/api/img/upload", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  callback(res.map((item) => item.data.url));
};
const onSubmit = _.debounce((pub: boolean) => {
  if (id.value === "-1") return;
  // console.log("updata");
  isPublish.value = pub;
  /* 
  content: 文章内容
  arid: 文章id，如果是新建草稿则为""，然后第一次提交草稿后，
  由服务器返回id，如果有id，就取参数里的即可
  isPublic: 是否已经发表
  */
  updataArContent({
    content: text.value,
    arid: id.value,
    isPublish: isPublish.value,
  }).then(
    (res: any) => {
      let ar = res.arid.toString();
      if (typeof ar === "string") {
        id.value = ar;
      }
      isPublish.value = res.isPublish;
    },
    (err) => {
      console.log(err.message);
    }
  );
}, 1000);

onBeforeMount(() => {
  // 获取文章id发过去，然后axios拦截器添加token，后端根据用户来判断是否返回草稿内容
  if ($route.query.arid) {
    getDraft({ arid: $route.query.arid }).then(
      (res: any) => {
        text.value = res.text;
        isPublish.value = res.isPublish;
        if (res.status === 1) {
          window.location.replace("write");
        } else if (typeof $route.query.arid === "string") {
          id.value = $route.query.arid;
        }
      },
      (err) => {
        text.value = "## Hello markDown!";
        console.log(err.message);
      }
    );
  } else {
    text.value = "## Hello markDown!";
  }
});
</script>

<style scoped lang="scss">
.container {
  margin-top: 30px;
  padding: 10px 30px;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  height: 800px;
}
.md-editor {
  height: 700px;
}

.setting {
  display: flex;
  justify-items: auto;
  margin: 10px;
}
.submit {
  position: relative;
  left: 0px;
  top: 30px;
}
</style>
