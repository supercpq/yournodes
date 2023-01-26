<template>
  <div class="outside">
    <noExist />
    <div>
      <!-- <p>404</p> -->
      <p>{{ $t("error404") }}</p>
      <el-button type="primary" @click="gotitle()">
        {{ $t("backToHome") }}
      </el-button>
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
