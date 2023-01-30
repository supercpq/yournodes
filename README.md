# your notes —— 一个浏览器主页兼博客网站的前端

[点我查看项目预览](https://www.wxhzny.top/)
## 项目简介

`yournodes` 是一个浏览器主页+博客网站的前端，使用`Vue3`、`Vite`、`Element-Plus`、`TypeScript`、`Pinia`、`scss`等主流技术开发。
## 尝试这个项目

- install: `git clone https://github.com/supercpq/yournodes.git`
- run:
```
cd yournodes
npm i
npm run dev
```
- build: `npm run build` 和 `npm run preview`
(**build时注意**：若需要从项目中已经写好的mock中获取数据，则直接运行 `npm run build` 和 `npm run preview`即可，否则需要将vite.config.ts进行更改：`prodEnabled: false`)
- 服务器部署：本次路由采用HTML5　history模式，直接进行静态资源托管将导致除首页外的刷新返回`Cannot　GET`，可选择更改使用hash模式或参考[vue-router文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html)来进行对服务器端的微调。

## 浏览器的兼容性支持
推荐使用Google/Edge开发，支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :------: | :----: | :-----: | :------: | :-----: |
|     not support    |    last 2 versions    |     last 2 versions    |    last 2 versions     |     last 2 versions    |

- 由于项目内容（比如文章数据和markdown编辑页的功能和展示需要，仅有文章阅读界面有响应式布局）
- 本项目的后端在开发中