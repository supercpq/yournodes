<template>
  <div class="wrapperT">
    <div class="searchInput">
      <searchLocal :isSelf="false" :autoComp="true" />
    </div>
    <div class="manyContents">
      <div class="two">
        <searchGithub />
      </div>
      <div class="three">
        <showsearchInputVue :isSelf="false" />
      </div>
      <aside class="four">
        <nomalTool />
      </aside>
    </div>

    <!-- <searchLocal /> -->
  </div>
</template>

<script setup lang="ts">
import searchGithub from "../components/searchGithub.vue";
import searchLocal from "../components/searchLocal.vue";
import showsearchInputVue from "../components/showsearchInput.vue";
import nomalTool from "../components/normalTools.vue";
</script>

<style scoped>
.wrapperT {
  max-width: 1280px;
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
  grid-template-columns: 33% 60% 7%;
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

@media only screen and (max-width: 767px) {
  .searchInput {
    grid-row-start: 1;
    width: 90%;
    margin: auto;
  }

  .manyContents {
    display: grid;
    grid-gap: 10px;
    grid-row-start: 2;
    grid-template-columns: 1% 90% 1%;
  }
  .three {
    /* grid-row-start: 3; */
    /* display: none; */
    grid-column-start: 2;
    /* margin-left: 20px; */
  }
  .two {
    display: none;
    grid-column-start: 1;
  }
  .four {
    display: none;
    grid-column-start: 3;
  }
}
</style>
