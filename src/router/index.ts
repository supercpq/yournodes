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
      title: "your notes首页",
    },
  },
  {
    path: "/myinfo",
    name: "myinfo",
    component: myinfo,
    meta: {
      keepAlive: false,
      title: "个人主页",
    },
  },
  {
    path: "/myinfo/setting",
    name: "setting",
    component: setting,
    meta: {
      keepAlive: false,
      title: "个人信息设置",
    },
  },
  {
    path: "/creator/write",
    name: "writear",
    component: writeAr,
    meta: {
      keepAlive: false,
      title: "创作作品",
    },
  },
  {
    path: "/reading",
    name: "reading",
    component: reading,
    props: true,
    meta: {
      keepAlive: false,
      // title: "具体文章",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
