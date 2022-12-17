<template>
  <div class="container">
    <md-editor class="mgb20" v-model="text" @on-upload-img="onUploadImg" />
    <el-button type="primary" class="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts" name="md">
import { ref } from "vue";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";

const text = ref("Hello markDown!");
const onUploadImg = (files: any) => {
  console.log(files);
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 30px;
  padding: 10px 30px;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  height: 760px;
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
