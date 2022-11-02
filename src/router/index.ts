import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "title", component: title },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
