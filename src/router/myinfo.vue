<template>
  <div class="flex-info">
    <header class="basic-info">
      <basicInfo />
    </header>
    <section class="like-list">
      <userLikesListVue />
    </section>
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
  grid-template-rows: 30% 50%;
  grid-gap: 20px;
}
.basic-info {
  grid-row-start: 1;
  padding-top: 50px;
  margin: auto;
}
.like-list {
  grid-row-start: 2;
  margin: auto;
}
</style>
