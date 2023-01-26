<template>
  <div class="container">
    <md-editor
      class="mgb20"
      v-model="text"
      previewTheme="cyanosis"
      @input="onSubmit(isPublish)"
      @on-upload-img="onUploadImg"
      @onSave="onSubmit(isPublish)"
    />
    <el-button type="primary" class="submit" @click="onSubmit(true)">{{
      $t("submit")
    }}</el-button>
  </div>
</template>

<script setup lang="ts" name="md">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";
import { getDraft, updataArContent } from "../api/creator";
import _ from "lodash";

const $route = useRoute();
const text = ref("");
const id = ref("");
const isPublish = ref(false);
const onUploadImg = (files: any) => {
  console.log(files);
};
const onSubmit = _.debounce((pub: boolean) => {
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
      if (typeof res.arid === "string") {
        id.value = res.arid;
      }
      isPublish.value = res.isPublish;
    },
    (err) => {
      console.log(err.message);
    }
  );
}, 200);

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
.submit {
  position: relative;
  left: 0px;
  top: 30px;
}
</style>
