import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");
const myinfo = () => import("./myinfo.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "title",
    component: title,
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
  {
    path: "/myinfo",
    name: "myinfo",
    component: myinfo,
    meta: {},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
