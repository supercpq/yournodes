<template>
  <div class="grid-content">
    <aside class="likes">
      <div
        class="options"
        v-for="(item, index) in options"
        :badge="item.counts"
        @click="likeAr(index)"
      >
        <!-- <small class="counts">{{ item.counts }}</small> -->
        <img :src="item.icon" v-if="!item.active" alt="" class="img-icon" />
        <img :src="item.activeIcon" v-else alt="" class="img-icon" />
      </div>
    </aside>
    <main class="content">
      <md-editor
        class="mgb20"
        v-model="Ar_content"
        previewTheme="cyanosis"
        :readOnly="true"
        ref="editorRef"
        :previewOnly="true"
        :sanitize="(html: string) => {
          
          return getTitle(html);
          }"
      />
    </main>
    <aside class="directory"></aside>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { arLikes, getArContent, getArLikes } from "../api/readAr";
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { useUserStore } from "../store/modules/user";
import "md-editor-v3/lib/style.css";
import MdEditor from "md-editor-v3";
import _ from "lodash"; //防抖节流
// import type { ExposeParam } from "md-editor-v3";
// const editorRef = ref<ExposeParam>();

const userStore = useUserStore();
const $route = useRoute();
const Ar_content = ref("");
const Ar_id = ref($route.query.ar_id);
// props: [id];
interface useroptions {
  icon: string;
  counts: number;
  active: boolean;
  activeIcon: string;
  disactiveIcon: string;
}
const options = ref(<useroptions[]>[]);

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
      (res) => {},
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
  let hello = new Array<string>();

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
      hello.push(titleindex);
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
  return arHtml;
}
// onMounted(() => {
//   console.log("open catalog", editorRef.value?.toggleCatalog);
//   editorRef.value?.toggleCatalog();
// });
onBeforeMount(async () => {
  // 获取用户文字内容，评论，点赞等
  // console.log($route.query.ar_id, Ar_id.value);
  getArContent({
    id: Ar_id.value,
  }).then(
    (res: any) => {
      //更新Ar_content
      Ar_content.value = res.content;
      if (typeof res.title === "string") {
        document.title = res.title;
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
  let user = userStore.id;
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
});
</script>

<style lang="scss" scoped>
.md-editor {
  height: 850px;
  text-align: left;
  opacity: 0.7;
  padding: 0 20px;
}
:v-deep(.md-editor) {
  ::-webkit-scrollbar {
    width: 3px;
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
  grid-template-columns: 10% 65% 25%;
  // grid-template-columns: 10% 89%;
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
//pc端
@media only screen and (min-width: 1150px) {
  .grid-content {
    // grid-template-columns: 10% 89%;
    grid-template-columns: 10% 65% 25%;
  }
}
//pad端
@media only screen and (min-width: 768px) and (max-width: 1150px) {
  .grid-content {
    grid-template-columns: 70% 30%;
    // grid-template-columns: 100%;
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
  .directory {
    display: none !important;
  }
}
</style>
