import { defineStore } from "pinia";
// 保存用于跳转的路由
export const routerStore = defineStore("routerP", {
  state: () => {
    return {
      routerPath: "",
    };
  },
  getters: {
    getPath: (state) => {
      return state.routerPath;
    },
  },
});
