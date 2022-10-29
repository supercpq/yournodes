import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia()).mount("#app");
