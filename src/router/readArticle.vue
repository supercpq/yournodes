<template>
  <div class="grid-content">
    <aside class="likes">
      <div
        class="options"
        v-for="(item, index) in options"
        :badge="item.counts"
        @click="likeAr(index)"
        :key="index"
      >
        <!-- <small class="counts">{{ item.counts }}</small> -->
        <img :src="item.icon" v-if="!item.active" alt="" class="img-icon" />
        <img :src="item.activeIcon" v-else alt="" class="img-icon" />
      </div>
    </aside>
    <main class="content">
      <div class="editor-theme">
        <editor-theme flexDisplay="row" />
        <div class="transoptions">
          <el-select
            class="m-2"
            ref="phoneCatalog"
            placeholder="Select"
            size="small"
            v-model="titleI"
          >
            <el-option
              id="phone-catalog"
              v-for="(item, index) in arCatalog"
              :key="index"
              :label="item"
              :value="item"
              @click="gotoTitle(index)"
            />
          </el-select>
        </div>
      </div>
      <md-editor
        class="mgb20"
        v-model="Ar_content"
        :previewTheme="mdEditorStore.getPreviewTheme"
        :theme="mdEditorStore.getTheme"
        :readOnly="true"
        :previewOnly="true"
        :sanitize="(html: string) => {
          return getTitle(html);
          }"
        :onGetCatalog="
          (list) => {
            Catalog(list);
          }
        "
      />
    </main>
    <aside class="directory">
      <div class="catatitle" @click="backTop" :title="$t('backTop')">
        <strong>{{ $t("catalog") }}</strong>
      </div>
      <div class="catalog" id="catalog">
        <div
          class="cata"
          v-for="(item, index) in arCatalog"
          :id="`arCatalog-${index}`"
          @click="gotoTitle(index)"
          :title="item"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="aside-setting">
        <div>
          <div style="width: 100px; height: 100px" v-html="qr_svg"></div>
          <p style="text-align: left; font-size: smaller">{{ $t("qrinfo") }}</p>
        </div>
        <editor-theme flexDisplay="column" />
      </div>
    </aside>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { arLikes, getArContent, getArLikes, getQr } from "../api/readAr";
import { ref, onBeforeMount } from "vue";
// import { useUserStore } from "../store/modules/user";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";
import _ from "lodash"; //防抖节流
import { getuseid } from "../utils/user";
import { mdStore } from "../store/modules/mdEditorPinia";
import editorTheme from "../components/editorTheme.vue";
// import type { ExposeParam } from "md-editor-v3";

// const phoneCatalog = ref<any>(null);
const mdEditorStore = mdStore();
// import { useI18n } from "vue-i18n";
// const { t } = useI18n({
//   useScope: "global",
// });
// const editorRef = ref();
const arCatalog = ref<Array<string>>([]);
const titleI = ref("目录  catalog");
const $route = useRoute();
const Ar_content = ref("");
const isedit = ref(false);
const Ar_id = ref($route.query.ar_id);
const qr_svg = ref("");
// const qrinfo = ref(t("qrinfo"));
// props: [id];
interface useroptions {
  icon: string;
  counts: number;
  active: boolean;
  activeIcon: string;
  disactiveIcon: string;
}
const options = ref<useroptions[]>([]);
const intersectionObserver = new IntersectionObserver((entries) => {
  // 如果 intersectionRatio 为 0，则目标在视野外，
  // 我们不需要做任何事情。
  // console.log("editorRef.value", editorRef.value, editorRef);
  if (entries[0].intersectionRatio <= 0) return;
  entries.forEach((item) => {
    if (item.intersectionRatio > 0) {
      // console.log(item.target.id);
      const index = item.target.id.slice(6, item.target.id.length);
      const el = document.querySelector(`#arCatalog-${index}`) as HTMLElement;
      // console.log(el.title);
      titleI.value = el.title;
      for (let elIndex = 0; elIndex < arCatalog.value.length; elIndex++) {
        const cataElement = document.querySelector(
          `#arCatalog-${elIndex}`
        ) as HTMLElement;
        cataElement.className = "cata";
      }
      el.className = "cata-active";
      const catalog = document.getElementById("catalog");
      const itemSrollTop = Number(index) - 3 > 0 ? Number(index) - 3 : 0;
      const catalogPhone = document.getElementById("phone-catalog");
      if (catalog) {
        // catalog.scrollTop = itemSrollTop * 50;
        catalog.scrollTo({ top: itemSrollTop * 50, behavior: "smooth" });
      }
      // (phoneCatalog.value as HTMLElement).scrollTop = itemSrollTop * 40;
      // console.log(phoneCatalog.value);
      if (catalogPhone?.parentNode?.parentNode) {
        (catalogPhone.parentNode.parentNode as HTMLElement).scrollTop! =
          itemSrollTop * 40;
      }
      // window.location.hash = `#arCatalog-${index}`;
    }
  });
});
// 开始监听
// intersectionObserver.observe(document.querySelector('#实例方法'));
async function Catalog(list) {
  // 开启目录监视和调整标题缩进
  // console.log(list);
  setTimeout(() => {
    for (let index = 0; index < arCatalog.value.length; index++) {
      intersectionObserver.observe(
        document.querySelector(`#title-${index}`) as HTMLElement
      );
    }
  }, 1000);
  for (
    let index = 0;
    index < list.length && index < arCatalog.value.length;
    index++
  ) {
    const blankString = "\u3000";
    arCatalog.value[index] =
      blankString.repeat(list[index].level - 1) + arCatalog.value[index];
  }
}
const likeAr = _.throttle(
  function (index: number) {
    // 切换活跃状态
    let count = options.value[index].counts;
    options.value[index].active = !options.value[index].active;
    if (options.value[index].active) {
      options.value[index].counts++;
    } else {
      options.value[index].counts--;
    }
    // 点赞
    arLikes({
      id: Ar_id.value,
      active: options.value[index].active, // true为点赞，false为取消（对后端而言）
    }).then(
      (res) => {
        console.log("");
      },
      (err) => {
        console.log(err.message);
        options.value[index].active = !options.value[index].active;
        options.value[index].counts = count;
      }
    );
  },
  50,
  { trailing: false }
);
async function backTop() {
  window.location.hash = `#title-1`;
  window.location.hash = `#title-0`;
}
async function gotoTitle(title: number) {
  // document.querySelector(`#title-${title}`)?.scrollIntoView(true);
  titleI.value = arCatalog.value[title];
  window.location.hash = `#title-${title}`;
  const index = title;
  const el = document.querySelector(`#arCatalog-${index}`) as HTMLElement;
  for (let elIndex = 0; elIndex < arCatalog.value.length; elIndex++) {
    const cataElement = document.querySelector(
      `#arCatalog-${elIndex}`
    ) as HTMLElement;
    cataElement.className = "cata";
  }
  el.className = "cata-active";
}
function getTitle(html: string) {
  /*
    替换html里的<a href="#部分，修改成title-0  -1这样的锚点，
    然后把a的文字内容放入一个数组里，作为目录
  */
  let geth = /<h([1-6]) id=".*?">/; // 获取h标签的正则
  let geta = /<a href="#.*?>/; // 获取a标签的正则
  // console.log(html.search(geth));
  let arHtml =
    html.search(geth) === -1 ? html : html.slice(0, html.search(geth)); // 存要显示的html
  let changeHtml =
    html.search(geth) === -1
      ? html
      : html.slice(html.search(geth), html.length); // 用于存还没改的html
  let title = 0;
  // let hello = new Array<string>();
  arCatalog.value.length = 0; //防止因markdown内容改变重复渲染目录
  while (changeHtml.search(geta) !== -1) {
    // 先处理h再处理a
    // 处理h和把标题名加入数组
    // console.log(
    //   "H:",
    //   changeHtml.slice(changeHtml.search(geth), changeHtml.search(geth) + 30),
    //   "A:",
    //   changeHtml.slice(changeHtml.search(geta), changeHtml.search(geta) + 30)
    // );
    let test = changeHtml.match(geth)?.[0];
    let h = changeHtml.match(geth)?.[0][2];
    let titleindex = test?.slice(8, test?.length - 2); // 各个小标题名
    if (typeof titleindex === "string") {
      arCatalog.value.push(titleindex);
    }
    // console.log("title", title, changeHtml);
    changeHtml = changeHtml.replace(geth, `<h${h} id="title-${title}">`);
    arHtml += changeHtml.slice(0, 6);
    changeHtml = changeHtml.slice(6, changeHtml.length);
    let index = changeHtml.search(geta);
    arHtml +=
      index === -1 ? changeHtml : changeHtml.slice(0, changeHtml.search(geta));
    changeHtml =
      index === -1
        ? changeHtml
        : changeHtml.slice(changeHtml.search(geta), changeHtml.length);
    // console.log("H处理结束", title, changeHtml);
    // 处理a
    changeHtml = changeHtml.replace(geta, `<a href="#title-${title}">`);
    arHtml += changeHtml.slice(0, 6);
    changeHtml = changeHtml.slice(6, changeHtml.length);
    index = changeHtml.search(geth);
    arHtml +=
      index === -1 ? changeHtml : changeHtml.slice(0, changeHtml.search(geth));
    changeHtml =
      index === -1
        ? ""
        : changeHtml.slice(changeHtml.search(geth), changeHtml.length);
    // console.log("A处理结束", title, changeHtml);
    title++;
  }
  // console.log(arHtml, "\n\n", html, "\n\n", hello);
  // console.log(hello);
  if (isedit.value) {
    let editPath = window.location.protocol + "//" + window.location.host;
    arHtml =
      `<a href='${editPath}/creator/write?arid=${Ar_id.value}'>edit<a>` +
      arHtml;
  }
  return arHtml;
}
// onMounted(() => {
//   console.log("open catalog", editorRef.value?.toggleCatalog);
//   editorRef.value?.toggleCatalog();
// });
onBeforeMount(async () => {
  // 获取用户文字内容，评论，点赞等
  // console.log($route.query.ar_id, Ar_id.value);
  // let qrinfo = t("qrinfo");
  let user = getuseid();
  getArContent({
    id: Ar_id.value,
    user,
  }).then(
    (res: any) => {
      //更新Ar_content
      Ar_content.value = res.content;
      isedit.value = res.isEdit;
      if (typeof res.title === "string") {
        document.title = res.title;
      }
    },
    (err) => {
      location.replace(
        window.location.protocol + "//" + window.location.host + "/404"
      );
      console.log(err.message);
    }
  );
  getArLikes({
    id: Ar_id.value,
    user, //user 为空代表不需要获取文章是否被此用户点赞过，activie都为false
  }).then(
    (res: any) => {
      //更新options
      options.value = res.options;
    },
    (err) => {
      console.log(err.message);
    }
  );
  getQr({ url: window.location.href }).then(
    (res: any) => {
      //更新options
      qr_svg.value = res.svg_string;
    },
    (err) => {
      console.log(err.message);
    }
  );
});
</script>

<style lang="scss" scoped>
.md-editor {
  height: 850px;
  text-align: left;
  opacity: 0.8;
  padding: 0 20px;
}
:v-deep(.md-editor) {
  ::-webkit-scrollbar {
    width: 3px;
  }
}
.catalog {
  display: flex;
  max-height: 400px;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.15);
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.cata {
  width: 100%;
  min-height: 30px;
  line-height: 30px;
  padding: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.cata-active {
  width: 100%;
  min-height: 30px;
  line-height: 30px;
  padding: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  color: #007fff;
  font-weight: bold;
}
.catatitle {
  width: 100%;
  padding: 10px 20px;
  width: 100%;
  font-size: larger;
  background-color: rgba(255, 255, 255, 0.15);
  :hover {
    cursor: pointer;
  }
}
.img-icon {
  width: 30px;
  height: 30px;
  position: relative;
  left: 25%;
  top: 25%;
  transform: translateX(-50%) translateY(-75%);
}
.grid-content {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 10% 65% 20%;
  // grid-template-columns: 10% 89%;
  gap: 10px;
  margin: 10px auto;
}
::-webkit-scrollbar {
  width: 3px;
}
.likes {
  display: flex;
  grid-column-start: 1;
  height: 850px;
  max-width: 70px;
  flex-direction: column;
  justify-content: start;
  :hover {
    cursor: pointer;
  }
  :before {
    content: attr(badge);
    margin-left: 35px;
    background-color: #c2c8d1;
    padding: 0 5px;
    color: #fff;
    border-radius: 6px;
    font-size: 11px;
    text-align: center;
  }
}
.content {
  grid-template-columns: 2;
  height: 850px;
  background-color: rgba(255, 255, 255, 0.3);
}
.directory {
  height: 850px;
  grid-template-columns: 3;
}
.options {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 6px auto;
  background-color: white;
}
.counts {
  margin-left: 25px;
  background-color: gray;
  opacity: 0.6;
}
.editor-theme {
  display: none;
}
.transoptions {
  position: relative;
  top: 10px;
}
//pc端
@media only screen and (min-width: 1150px) {
  .grid-content {
    // grid-template-columns: 10% 89%;
    grid-template-columns: 10% 65% 20%;
  }
  .editor-theme {
    display: none;
  }
}
//pad端
@media only screen and (min-width: 768px) and (max-width: 1150px) {
  .grid-content {
    grid-template-columns: 70% 30%;
    // grid-template-columns: 100%;
  }
  .editor-theme {
    display: none;
  }
  .likes {
    display: none !important;
  }
  .content {
    grid-template-columns: 1;
  }
  .directory {
    grid-template-columns: 2;
  }
}
// 手机端
@media only screen and (max-width: 767px) {
  .grid-content {
    grid-template-columns: 100%;
  }
  .likes {
    display: none !important;
  }
  .content {
    grid-template-columns: 1;
  }
  .editor-theme {
    display: flex;
  }
  .directory {
    display: none !important;
  }
}

.aside-setting {
  display: flex;
  justify-items: auto;
  margin: 3px;
}
</style>
