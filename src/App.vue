<script setup lang="ts">
import mainView from "./components/mainView.vue";
import searchGithub from "./components/searchGithub.vue";
import searchLocal from "./components/searchLocal.vue";
</script>

<template>
  <div class="wrapper">
    <div class="one">
      <mainView />
    </div>
    <div class="zero"></div>
    <div class="two">
      <searchGithub />
    </div>
    <div class="three"></div>
    <div class="four"></div>
    <!-- <searchLocal /> -->
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: 5% 5% 90%;
  grid-gap: 10px;
  grid-template-columns: 33% 34% 33%;
}
.zero {
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 4;
}
.one {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: 4;
}
.two {
  grid-row-start: 3;
  grid-column-start: 1;
  /* margin-left: 20px; */
}
.three {
  grid-row-start: 3;
  grid-column-start: 2;
}
.four {
  grid-row-start: 3;
  grid-column-start: 3;
}
</style>
