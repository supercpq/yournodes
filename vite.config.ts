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
      // localEnabled: true,
      // // 以下是新增，上面两行为build后mock不加入生产环境
      // prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
      // injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `,
      // logger: false, //是否在控制台显示请求日志
      // supportTs: false, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      localEnabled: true,
      prodEnabled: false,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false,
    }),
    svgLoader(),
  ],
  // 后端开发时候连本地node用，生产环境有nginx解决跨域
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://127.0.0.1:3000", //目标url
  //       changeOrigin: true, //支持跨域
  //     },
  //     "/user": {
  //       target: "http://127.0.0.1:3000", //目标url
  //       changeOrigin: true, //支持跨域
  //     },
  //     "/myinfo": {
  //       target: "http://127.0.0.1:3000", //目标url
  //       changeOrigin: true, //支持跨域
  //     },
  //   },
  // },
});
/*
viteMockServe({// 更多配置见最下方
     	mockPath: "./mock/", //mock文件地址 
     	localEnabled: false, // 开发打包开关 
     	prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内 
     	injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `, 
     	logger: false, //是否在控制台显示请求日志 
     	supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件 
     })
*/
