<script setup lang="ts">
import mainView from "./components/mainView.vue";
import searchGithub from "./components/searchGithub.vue";
import searchLocal from "./components/searchLocal.vue";
import { onMounted } from "vue";
import { routerStore } from "./store/modules/routerPinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const routerPathStore = routerStore();
const routerP = routerPathStore.$subscribe((mutations, state) => {
  localStorage.setItem("router", state.routerPath);
  router.push({ path: "/" + state.routerPath, replace: false });
});
</script>

<template>
  <div class="wrapper">
    <!-- <div class="one"> -->
    <nav class="one">
      <mainView />
    </nav>
    <!-- </div> -->
    <main class="therouters">
      <!-- <router-view></router-view>
       -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.167s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.wrapper {
  display: grid;
  grid-template-rows: 5% 90%;
  grid-gap: 10px;
  grid-template-columns: 100%;
}

.therouters {
  grid-row-start: 2;
}
.one {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: 4;
}
</style>
