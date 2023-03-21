<template>
  <div class="link">
    <p class="title">{{ $t("link") }}</p>
    <p class="alink">{{ link }}</p>
    <div class="jump">
      <el-button
        type="primary"
        style="float: right; margin-right: 20px"
        @click="toTarget()"
        >{{ $t("commitLink") }}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const $route = useRoute();
const link = $route.query.target;
function toTarget() {
  if (typeof link === "string") {
    location.href = link;
  }
}
onBeforeMount(() => {
  if (!link) {
    location.href = window.location.protocol + "//" + window.location.host;
  }
});
</script>
<style scoped>
.link {
  position: absolute;
  min-width: 400px;
  min-height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.6);
  width: 50%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 18px;
  line-height: 24px;
}
.alink {
  opacity: 0.7;
  flex: 1 auto;
  font-size: 16px;
  margin: 0 auto;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  width: 90%;
}
.jump {
  margin-right: 20px;
  font-size: 14px;
  /* max-width: 120px; */
  width: 100%;
  padding: 10px;
}
</style>
