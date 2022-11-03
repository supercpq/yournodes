import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "title",
    component: title,
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
