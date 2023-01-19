import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
    svgLoader(),
  ],
});
/*// 2.配置vite.config.js
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()]
})

// 3.项目是ts的，要非常注意，需要单独声明模块！！！
// tsconfig.json
    "compilerOptions": {
        "types": [
        // 一定要声明
            "vite-svg-loader"
        ],
} */
