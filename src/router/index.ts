import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");
const myinfo = () => import("./myinfo.vue");
const setting = () => import("./userInfoSetting.vue");
const reading = () => import("./readArticle.vue");
const writeAr = () => import("./createArticle.vue");

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
  {
    path: "/creator/write",
    name: "writear",
    component: writeAr,
    props: true,
    meta: {
      keepAlive: false,
    },
  },
  {
    path: "/reading",
    name: "reading",
    component: reading,
    props: true,
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
