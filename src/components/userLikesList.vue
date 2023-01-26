<template>
  <div v-show="loading">
    <el-space direction="vertical" alignment="flex-start">
      <!-- <div>
      <el-switch v-model="gitstore.loading" />
    </div> -->
      <el-skeleton
        style="width: 600px; text-align: left"
        :loading="loading"
        animated
        :rows="6"
      >
      </el-skeleton>
    </el-space>
  </div>
  <div class="list-title" v-show="!loading">
    <h4>{{ $t("likes") }}</h4>
  </div>
  <div
    class="outsideLike"
    @scroll="handleScroll"
    ref="myList"
    v-show="!loading"
  >
    <ul>
      <li v-for="item in likeList" :key="item.articalID" @click="readArc(item)">
        <div :title="item.articaName" class="title">
          <span>
            {{ item.articaName }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { mylike, moreLikes } from "../api/userinfo";
import _ from "lodash"; //防抖节流

interface likeArcticle {
  articaName: string;
  articalLink: string;
  articalImgLink: string;
  articalID: number;
}
var nodata: likeArcticle = {
  articaName: "还没有点赞过文章哦~",
  articalLink: "#",
  articalImgLink: "",
  articalID: -1,
};
const likeList = ref(<any[]>[]);
const myList = ref<any>(null);
likeList.value = [];
const screenHeight = ref(0);
const start = ref(0);
const end = ref(0);
const itemSize = 43.3;
const arcticelEnd = ref(false); //是否全部加载
const lazy = ref(false); // 是否已触发懒加载
const loading = ref(true);
function readArc(item: likeArcticle) {
  window.open(item.articalLink, "_blank");
}
onMounted(() => {
  mylike().then(
    (res: any) => {
      likeList.value = [];
      if (res.status == 0) {
        likeList.value = res.dataLikes;
      } else {
        likeList.value.push(nodata);
      }
      loading.value = false;
    },
    (err) => {
      nodata.articaName = "网络问题，没有更多数据";
      likeList.value.push(nodata);
    }
  );
});
let visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / itemSize);
});
onMounted(() => {
  screenHeight.value = document.body.clientHeight;
  start.value = 0;
  end.value = start.value + visibleCount.value;
});
function scrollEvent() {
  let scrollTop = Math.floor(myList.value.scrollTop);
  //此时的开始索引
  start.value = Math.floor(scrollTop / itemSize!);
  //此时的结束索引
  end.value = start.value + visibleCount.value;
  if (end.value - likeList.value.length > 0) {
    // alert("qwr");
    lazySearch();
  }
}

const lazySearch = _.throttle(
  function () {
    //懒加载
    if (!arcticelEnd.value && !lazy.value) {
      // alert("qwr");
      lazy.value = true;
      moreLikes({ num: likeList.value.length }).then(
        (res: any) => {
          if (res.status == 0) {
            likeList.value = likeList.value.concat(res.dataLikes);
            // console.log(res.data);
            lazy.value = false;
          } else {
            likeList.value.push(nodata);
            lazy.value = false;
          }
          if (res.status == 3) {
            // 数据全部获取
            arcticelEnd.value = true;
            lazy.value = false;
          }
        },
        (err) => {
          console.log(err.message);
          lazy.value = false;
        }
      );
    }
  },
  500,
  { trailing: false }
);

const handleScroll = _.throttle(
  function () {
    scrollEvent();
  },
  16.7,
  { trailing: false }
);
</script>

<style scoped lang="scss">
.outsideLike {
  overflow: auto;
  font-size: 23px;
  line-height: 22px;
  max-height: 500px;
  min-width: 660px;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.1);
}
li {
  list-style-type: none;
  margin-left: -33px;
  text-align: left;
  padding: 5px 20px;

  div {
    padding: 5px 20px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    span {
      text-shadow: rgba(43, 184, 219, 0.5) 3px 0 10px;
      font-family: "微软雅黑";
      padding-left: 20px;
    }
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.title {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: nowrap;
}
.list-title {
  text-align: left;
  //   background-color: rgba(255, 255, 255, 0.1);
  margin-left: 20px;
}
</style>
