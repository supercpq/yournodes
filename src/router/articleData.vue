<template>
  <div class="wrapperT">
    <section class="ar-list">
      <searchLocal :isSelf="true" style="padding: 0 60px; min-width: 300px" />
      <showsearchInputVue :isSelf="true" />
      <el-dialog
        v-model="dialogTableVisible"
        class="dialog"
        width="100%"
        top="0"
      >
        <dataChats />
      </el-dialog>
    </section>
    <aside class="ar-data">
      <dataChats />
    </aside>
  </div>
</template>

<script setup lang="ts">
import searchLocal from "../components/searchLocal.vue";
import showsearchInputVue from "../components/showsearchInput.vue";
import dataChats from "../components/ardataChats.vue";
import { ref } from "vue";
import { ardataStore } from "../store/modules/ardata";
const ardata = ardataStore();
const dialogTableVisible = ref(false);
ardata.$subscribe((mutations, state) => {
  if (document.body.clientWidth < 767) {
    dialogTableVisible.value = true;
  }
});
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
.dialog {
  display: none;
}
@media only screen and (max-width: 767px) {
  .wrapperT {
    grid-template-columns: 100%;
  }
  .ar-data {
    display: none;
  }
  .dialog {
    display: block;
  }
}
</style>
