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
        :language="mdEditorStore.getLang"
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
      <div class="barr">
        <!-- <el-dialog v-model="dialogVisible">
          <div
            style="
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            "
          >
            <el-switch
              v-model="barrageShow"
              class="mt-2"
              :active-value="true"
              :inactive-value="false"
              style="margin-left: 24px"
              inline-prompt
              :active-icon="Operation"
              :inactive-icon="Close"
              size="large"
              :change="changeShowBarrages()"
            />
            <el-color-picker v-model="color1" />
          </div>
        </el-dialog> -->

        <el-input
          v-model="input"
          :placeholder="$t('sendBarrage')"
          maxlength="20"
          @keydown.enter="sendBarrage()"
        />
        <el-button
          type="success"
          :icon="Setting"
          circle
          @click="showSetting()"
        />
        <el-button
          type="primary"
          :icon="Position"
          circle
          @click="sendBarrage()"
          :disabled="disable"
        />
      </div>
      <Transition>
        <div
          style="display: flex; justify-content: space-between; flex-wrap: wrap"
          v-show="dialogVisible"
        >
          <!-- <el-switch
          v-model="barrageShow"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Operation"
          :inactive-icon="Close"
          size="large"
          :change="change()"
        /> -->
          <el-button
            type="primary"
            :icon="barrageShow ? Operation : Close"
            circle
            @click="change()"
            :disabled="disable"
          />
          <el-color-picker v-model="color1" />
          <div style="width: 100%">
            <span>{{ $t("fontSize") }}: {{ fontSizeBarrages }}</span>
            <el-slider
              v-model="fontSizeBarrages"
              :step="1"
              :min="20"
              :max="30"
            />
          </div>
          <div style="width: 100%">
            <span>{{ $t("opacity") }}: {{ opacityBarrages }}</span>
            <el-slider
              v-model="opacityBarrages"
              :step="0.01"
              :min="0"
              :max="1"
            />
          </div>
        </div>
      </Transition>
    </aside>
    <div class="barrage-wrap" v-show="barrageShow">
      <div
        v-for="item in barrages"
        :key="item.id"
        class="barrage"
        :style="{
          color: item.textColor,
          'font-size': item.fontSize + 'px',
          top: item.line + '0%',
          'font-weight': 'bold',
        }"
        @mouseenter="rotateOver(item.id)"
        @mouseleave="rotateOut(item.id)"
        :id="`barrages-${item.id}`"
      >
        <p
          :style="{
            opacity: opacityBarrages,
            'white-space': 'nowrap',
            'min-width': 100 + 'px',
          }"
        >
          {{ item.content }}
        </p>
        <Transition>
          <div class="bartool">
            <div class="triangle" v-if="item.stop"></div>
            <div class="tools" v-if="item.stop">
              <el-button
                type="info"
                :icon="DocumentCopy"
                circle
                @click="copyBarrage(item.content)"
              />
              <el-button
                type="info"
                :icon="Delete"
                @click="deleteBarrage(item.id)"
                circle
                v-if="isedit"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  arLikes,
  getArContent,
  getArLikes,
  getQr,
  getBarr,
  sendBarr,
  deleteBarr,
} from "../api/readAr";
import { ref, onBeforeMount, onBeforeUnmount, onDeactivated } from "vue";
// import { useUserStore } from "../store/modules/user";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";
import _ from "lodash"; //防抖节流
import { getuseid, getToken } from "../utils/user";
import { mdStore } from "../store/modules/mdEditorPinia";
import editorTheme from "../components/editorTheme.vue";
import jwtDecode from "jwt-decode";
import {
  Delete,
  DocumentCopy,
  Position,
  Setting,
  Operation,
  Close,
} from "@element-plus/icons-vue";

// import type { ExposeParam } from "md-editor-v3";
interface Barrage {
  content: string;
  time: string;
  textColor: string;
  fontSize: number;
  barrId: string | number;
  line: number; // fontend add
  stop: boolean; // fontend add
  distance: number; // fontend add
  id: number; // fontend add
  move: boolean; // fontend add
}
const barrages = ref<Array<Barrage>>([
  // 需要渲染的弹幕列表
]);
const allBarrages = ref<Array<Barrage>>([
  // 等待发送弹幕列表
]);
const waitClearList: Array<number> = [];
const dialogVisible = ref(false);
const disable = ref(false);
const currentLine = ref(0);
const opacityBarrages = ref(1);
// const barrageShow = ref(false);
const barrageShow = ref(false);
const input = ref("");
const fontSizeBarrages = ref(20);
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
const color1 = ref("#409EFF");
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
function copyBarrage(content: string) {
  navigator.clipboard.writeText(content);
}
function change() {
  barrageShow.value = !barrageShow.value;
}
function getIndex(id: number) {
  for (let i = 0; i < barrages.value.length; i++) {
    if (barrages.value[i].id === id) {
      return i;
    }
  }
  return -1;
}
const intersectionObserver = new IntersectionObserver(
  (entries) => {
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
  },
  { threshold: 1.0 }
);
onBeforeUnmount(() => {
  //
  barrages.value = [];
});

function deleteBarrage(id: number) {
  const justBarr = _.remove(barrages.value, function (n) {
    return n.id === id;
  });
  currentLine.value = -1;
  const nextBarrage = allBarrages.value.shift();
  if (nextBarrage) {
    // console.log("删除！", barrages.value, id, nextBarrage);
    barrages.value.push(nextBarrage);
    setTimeout(() => {
      barragesMove(nextBarrage.id);
    }, 1000);
  }
  if (justBarr[0]) {
    deleteBarr({ arid: Ar_id.value, id: justBarr[0].barrId }).then(
      (res) => {
        //
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
function showSetting() {
  dialogVisible.value = !dialogVisible.value;
}
const sendBarrage = _.throttle(
  function () {
    sendBarrages();
  },
  3000,
  { trailing: false }
);
function sendBarrages() {
  // 发给服务器，并将新弹幕放入数组第一个，要等服务器返回barrid后再放入
  const inputBar = input.value;
  input.value = "";
  sendBarr({
    arid: Ar_id.value,
    content: input.value,
    textColor: color1.value,
    fontSize: fontSizeBarrages.value,
  }).then(
    (res: any) => {
      if (res.status === 0) {
        const next: Barrage = {
          content: inputBar,
          time: res.time,
          textColor: color1.value,
          fontSize: fontSizeBarrages.value,
          barrId: res.barrId,
          line: Math.floor(Math.random() * (6 + 1)), // fontend add
          stop: false, // fontend add
          distance: Math.floor(Math.random() * (200 + 1)), // fontend add
          id: barrages.value.length + allBarrages.value.length, // fontend add
          move: false, // fontend add
        };
        barrages.value.push(next);
        setTimeout(() => {
          if (next) {
            barragesMove(next.id);
          }
        }, 1000);
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
}
function rotateOver(id: number) {
  currentLine.value = id;
  for (let i = 0; i < barrages.value.length; i++) {
    if (barrages.value[i].id === id) {
      barrages.value[i].stop = true;
      break;
    }
  }
}

function rotateOut(id: number) {
  currentLine.value = -1;
  for (let i = 0; i < barrages.value.length; i++) {
    if (barrages.value[i].id === id) {
      barrages.value[i].stop = false;
      break;
    }
  }
  barragesMove(id);
}

function barragesMove(barrageId: number) {
  // 弹幕移动
  let barrageIndex = getIndex(barrageId);
  // console.log(barrageIndex, "动了");
  const element = document.getElementById(`barrages-${barrageId}`);
  let start, previousTimeStamp;
  let done = false;
  function step(timestamp) {
    barrageIndex = getIndex(barrageId);
    if (barrages.value[barrageIndex].stop) return;
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (previousTimeStamp !== timestamp) {
      // 这里使用 `Math.min()` 确保元素刚好停在 3000px 的位置。
      barrages.value[barrageIndex].distance = Math.min(
        barrages.value[barrageIndex].distance + 1.5,
        3000
      );
      // console.log(element);
      if (element) {
        element.style.transform =
          "translateX(-" + barrages.value[barrageIndex].distance + "px)";
      } else {
        // console.log(element);
        return;
      }
      if (barrages.value[barrageIndex].distance >= 3000) done = true;
    }
    if (elapsed < 20000) {
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      } else {
        barrageIndex = getIndex(barrageId);
        // // let barr = barrages.value;
        // // _.pullAt(barr, barrageIndex);
        // // barrages.value = barr;
        // console.log(barrages.value[barrageIndex].id, "到了");
        waitClearList.push(barrages.value[barrageIndex].id);
        if (currentLine.value === -1) {
          // 证明没有被悬停的，可以清理
          currentLine.value = 0;
          // console.log(waitClearList, barrages.value);
          // alert(123);
          waitClearList.forEach((ele) => {
            let justFinishBar = _.remove(barrages.value, function (n) {
              return n.id === ele;
            });
            justFinishBar[0].distance = 0;
            // // cancelAnimationFrame(justFinishBar.id);
            allBarrages.value.push(justFinishBar[0]);
            let next = allBarrages.value.shift();
            if (next) {
              // console.log(next, justFinishBar[0]);
              barrages.value.push(next);
              setTimeout(() => {
                if (next) {
                  barragesMove(next.id);
                }
              }, 1000);
            }
          });
          waitClearList.length = 0;
          currentLine.value = -1;
        }
        // 把播放完的这条弹幕pop出来并且重新push到弹幕列表最底下，并且barrages.value[barrageIndex].distance = 0
      }
    }
  }
  // console.log("here");
  window.requestAnimationFrame(step);
}
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
  let user = ""; // getuseid();
  const token = getToken();
  if (token) {
    const data: any = jwtDecode(token);
    user = data.userid;
  }
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
      qr_svg.value = res.svg_string;
    },
    (err) => {
      console.log(err.message);
    }
  );
  getBarr().then(
    (res: any) => {
      //更新弹幕
      if (res.status === 0) {
        let allBar = res.list;
        for (let index = 0; index < allBar.length; index++) {
          const distance = Math.floor(Math.random() * (200 + 1));
          // console.log(distance);
          if (index < 6) {
            barrages.value.push({
              content: allBar[index].content,
              time: allBar[index].time,
              textColor: allBar[index].textColor,
              fontSize: allBar[index].fontSize,
              barrId: allBar[index].barrId,
              line: (index + 1) % 7,
              stop: false,
              distance: distance,
              id: index,
              move: false,
            });
          } else {
            allBarrages.value.push({
              content: allBar[index].content,
              time: allBar[index].time,
              textColor: allBar[index].textColor,
              fontSize: allBar[index].fontSize,
              barrId: allBar[index].barrId,
              line: (index + 1) % 7,
              stop: false,
              distance: distance,
              id: index,
              move: false,
            });
          }
        }
        currentLine.value = -1;
        setTimeout(() => {
          for (let index = 0; index < barrages.value.length; index++) {
            barragesMove(barrages.value[index].id);
          }
        }, 2000);
        // allBarrages.value = res.list
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
});
</script>

<style lang="scss" scoped>
.bartool {
  transform: translateY(-20px);
  margin: 0 auto;
  width: 100px;
}
.triangle {
  margin: 0 auto;
  transform: translateY(-19px);
  width: 0;
  height: 0;
  border-bottom: 10px solid rgba(0, 0, 0, 0.6);
  border-top: 10px solid transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.barr {
  display: flex;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.tools {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px 0;
  margin-top: -30px;
  transform: scale(0.6);
}
.barrage-wrap {
  height: 500px;
  pointer-events: none;
  width: 80%;
  // margin-left: -200px;
  position: absolute;
  overflow: hidden;
  z-index: 3;
}
.barrage {
  position: absolute;
  pointer-events: auto;
  transform: rotateX(30deg);
  left: 100%;
}
.md-editor {
  // height: 850px;
  height: 100%;
  text-align: left;
  opacity: 0.8;
  padding: 0 20px;
}
:deep(.md-editor) {
  ::-webkit-scrollbar {
    width: 0px;
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
  .barrage-wrap {
    width: 90%;
  }
}

.aside-setting {
  display: flex;
  justify-items: auto;
  margin: 3px;
}
</style>
