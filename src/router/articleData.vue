<template>
  <div class="wrapperT">
    <section class="ar-list">
      <searchLocal :isSelf="true" style="padding: 0 60px" />
      <showsearchInputVue :isSelf="true" />
    </section>
    <aside class="ar-data"></aside>
  </div>
</template>

<script setup lang="ts">
import searchLocal from "../components/searchLocal.vue";
import showsearchInputVue from "../components/showsearchInput.vue";
</script>

<style scoped>
.wrapperT {
  max-width: 1280px;
  display: grid;
  grid-template-columns: 61% 39%;
  grid-gap: 10px;
}

.ar-list {
  grid-column-start: 1;
  margin-top: 10px;
}
.ar-data {
  grid-column-start: 2;
}
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
