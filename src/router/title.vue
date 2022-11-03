<template>
  <div class="wrapperT">
    <div class="searchInput">
      <searchLocal />
    </div>
    <div class="manyContents">
      <div class="two">
        <searchGithub />
      </div>
      <div class="three"></div>
      <div class="four"></div>
    </div>

    <!-- <searchLocal /> -->
  </div>
</template>

<script setup lang="ts">
import searchGithub from "../components/searchGithub.vue";
import searchLocal from "../components/searchLocal.vue";
</script>

<style scoped>
.wrapperT {
  display: grid;
  grid-template-rows: 5% 90%;
  grid-gap: 10px;
}

.searchInput {
  grid-row-start: 1;
  width: 70%;
  margin: auto;
}

.manyContents {
  display: grid;
  grid-gap: 10px;
  grid-row-start: 2;
  grid-template-columns: 33% 34% 33%;
}
.innerwrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 33% 34% 33%;
}

.two {
  /* grid-row-start: 3; */
  grid-column-start: 1;
  /* margin-left: 20px; */
}
.three {
  /* grid-row-start: 3; */
  grid-column-start: 2;
}
.four {
  /* grid-row-start: 3; */
  grid-column-start: 3;
}
</style>
