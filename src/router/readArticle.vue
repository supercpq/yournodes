<template>
  <div>
    <div class="pc">
      <!-- pc端页面-->
      <h1>pc端页面</h1>
    </div>
    <div class="pad">
      <!-- pad端页面-->
      <h1>pad端页面</h1>
    </div>
    <div class="mobile">
      <!-- 移动端页面-->
      <h1>移动端页面</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const $route = useRoute();
// props: [id];

// console.log(JSON.stringify($route.query));
console.log($route.params, $route.query);
</script>

<style lang="scss" scoped>
//pc端
@media only screen and (min-width: 1150px) {
  .pc {
    display: block !important;
  }
  .pad {
    display: none !important;
    touch-action: auto !important;
  }
  .mobile {
    display: none !important;
    touch-action: auto !important;
  }
}
//pad端
@media only screen and (min-width: 768px) and (max-width: 1150px) {
  .pc {
    display: none !important;
  }
  .mobile {
    display: none !important;
    touch-action: auto !important;
  }
  .pad {
    display: block !important;
    touch-action: auto !important;
  }
}
// 手机端
@media only screen and (max-width: 767px) {
  .pc {
    display: none !important;
  }
  .mobile {
    display: block !important;
    touch-action: auto !important;
  }
  .pad {
    display: none !important;
    touch-action: auto !important;
  }
}
</style>
