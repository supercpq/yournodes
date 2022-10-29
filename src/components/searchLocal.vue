<template>
  <el-space direction="vertical" alignment="flex-start">
    <div>
      <el-switch v-model="loading" />
    </div>
    <el-skeleton
      style="width: 300px; text-align: left"
      :loading="loading"
      animated
      :rows="2"
    >
    </el-skeleton>
  </el-space>
  <div class="infinite-list-wrapper" style="overflow: auto" v-show="!loading">
    <ul v-infinite-scroll="load1" class="list">
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
    <p>No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const loading = ref(true);
const count = ref(21);
const load1 = () => {};
</script>

<style>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  /* background: var(--el-color-danger-light-9); */
  /* color: var(--el-color-danger); */
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>
