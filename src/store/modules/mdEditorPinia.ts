import { defineStore } from "pinia";
// 保存用于跳转的路由
type Theme = "light" | "dark";
export const mdStore = defineStore("mdStore", {
  state: () => {
    return {
      theme: "light" as Theme,
      previewTheme: "cyanosis",
    };
  },
  getters: {
    getTheme: (state) => {
      // 'light' | 'dark'
      return state.theme || "light";
    },
    getPreviewTheme: (state) => {
      // 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'
      return state.previewTheme || "cyanosis";
    },
  },
  actions: {
    setTheme(theme: Theme) {
      const themeList: Array<Theme> = ["light", "dark"];
      this.theme = themeList.includes(theme) ? theme : "light";
    },
    setPreviewTheme(previewTheme: string) {
      const previewThemeList = [
        "default",
        "github",
        "vuepress",
        "mk-cute",
        "smart-blue",
        "cyanosis",
      ];
      this.previewTheme = previewThemeList.includes(previewTheme)
        ? previewTheme
        : "cyanosis";
    },
  },
});
