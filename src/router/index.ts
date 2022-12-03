import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");
const myinfo = () => import("./myinfo.vue");
const setting = () => import("./userInfoSetting.vue");

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
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/myinfo/setting",
    name: "setting",
    component: setting,
    meta: {
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
