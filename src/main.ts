import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n/index";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia()).use(router).use(i18n).mount("#app");

// 全局后置钩子
router.afterEach((to) => {
  // 设置title
  if (typeof to.meta?.title === "string") {
    document.title = to.meta?.title;
  }
});
