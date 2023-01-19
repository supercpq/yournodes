<template>
  <div class="outside">
    <noExist />
    <div>
      <!-- <p>404</p> -->
      <p>抱歉，你访问的页面不存在</p>
      <el-button type="primary" @click="gotitle()"> 返回首页 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import noExist from "../assets/404.svg?component";
function gotitle() {
  location.replace("/");
}
</script>
<style scoped>
.outside {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
