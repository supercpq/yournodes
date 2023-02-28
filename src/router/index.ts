import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const title = () => import("./title.vue");
const myinfo = () => import("./myinfo.vue");
const setting = () => import("./userInfoSetting.vue");
const reading = () => import("./readArticle.vue");
const writeAr = () => import("./createArticle.vue");
const arData = () => import("./articleData.vue");
const error404 = () => import("./error404.vue");
const login = () => import("./login.vue");
const reguser = () => import("./reguser.vue");
const chatG = () => import("./chatG.vue");
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "title",
    component: title,
    meta: {
      keepAlive: true, // 需要被缓存
      title: "首页-yournotes",
    },
  },
  {
    path: "/myinfo",
    name: "myinfo",
    component: myinfo,
    meta: {
      keepAlive: false,
      title: "个人主页-yournotes",
    },
  },
  {
    path: "/myinfo/setting",
    name: "setting",
    component: setting,
    meta: {
      keepAlive: false,
      title: "个人信息设置-yournotes",
    },
  },
  {
    path: "/creator/write",
    name: "writear",
    component: writeAr,
    meta: {
      keepAlive: false,
      title: "创作作品-yournotes",
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
  {
    path: "/creator/data",
    name: "arData",
    component: arData,
    meta: {
      keepAlive: false,
      title: "文章数据-yournotes",
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      keepAlive: true, // 需要被缓存
      title: "登录-yournotes",
    },
  },
  {
    path: "/reguser",
    name: "reguser",
    component: reguser,
    meta: {
      keepAlive: true, // 需要被缓存
      title: "注册/找回密码-yournotes",
    },
  },
  {
    path: "/404",
    name: "error404",
    component: error404,
    meta: {
      keepAlive: false,
      title: "未知界面-yournotes",
    },
  },
  {
    path: "/AI",
    name: "AI",
    component: chatG,
    meta: {
      keepAlive: false,
      title: "AI-yournotes",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
