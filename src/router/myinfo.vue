<template>
  <div class="flex-info">
    <div class="basic-info">
      <basicInfo />
    </div>
    <div class="like-list">
      <userLikesListVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import userLikesListVue from "../components/userLikesList.vue";
import basicInfo from "../components/basicInfo.vue";
</script>

<style scoped>
.flex-info {
  height: 800px;
  display: grid;
  grid-template-rows: 45% 50%;
  grid-gap: 20px;
}
.basic-info {
  grid-row-start: 1;
  margin: auto;
}
.like-list {
  grid-row-start: 2;
  margin: auto;
}
</style>
