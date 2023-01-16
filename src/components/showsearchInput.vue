<template>
  <!-- interface searchInputItem {
  id: number;
  title: string;
  url: string;
  description: string;
  likes: number;
  reads: number;
  pubTime: string;
} -->
  <div class="searchSelect-ar">
    <div v-show="searchinputStore.loading">
      <el-space direction="vertical" alignment="flex-start">
        <el-skeleton
          style="width: 500px; text-align: left"
          :loading="searchinputStore.loading"
          animated
          :rows="2"
        >
        </el-skeleton>
      </el-space>
    </div>
    <div
      class="searchLi-ar"
      v-show="!searchinputStore.loading"
      id="articleScroll"
      @scroll="handleScroll"
      ref="myList"
    >
      <ul class="ul-list-item-ar">
        <li
          class="list-item-ar"
          v-for="item in searchinputStore.allList"
          :key="item.id"
        >
          <div class="outsideIt-ar" @click="getfocus(item)">
            <div class="imglinks">
              <!-- TODO -->
              <img
                :src="item.imglink"
                alt="img"
                style="width: 90%; height: 90%; margin: auto; padding: auto"
              />
            </div>
            <div class="outseideItem-ar">
              <div class="itemTitle">
                <h4 :title="item.title">
                  <a :href="item.url" target="_blank">
                    <h4
                      style="
                        width: 400px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ item.title }}
                    </h4>
                  </a>
                </h4>
              </div>
              <div class="itemDecri">
                <div :title="item.description" class="descri">
                  {{ item.description }}
                </div>
              </div>
              <div class="itemTitle">
                <span
                  ><el-icon><Pointer /></el-icon>{{ item.likes }}
                </span>
                <span>
                  &nbsp<el-icon><View /></el-icon> {{ item.reads }}
                </span>
                <span>
                  &nbsp<el-icon><Clock /></el-icon> {{ item.pubTime }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { searchInputStore } from "../store/modules/searchInputPinia";
import _ from "lodash"; //防抖节流
import { useUserStore } from "../store/modules/user";
import { routerStore } from "../store/modules/routerPinia";
const routerPath = routerStore();
const userStore = useUserStore();

interface searchInputItem {
  id: number;
  title: string;
  url: string;
  description: string;
  likes: number;
  reads: number;
  pubTime: string;
  imglink?: string;
}
const arcticelEnd = ref(false); // 是否全部加载
const searchinputStore = searchInputStore();

const screenHeight = ref(0);
const start = ref(0);
const end = ref(0);
const myList = ref<any>(null);
const itemSize = 120;
//可显示的列表项数
let visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / itemSize);
});

//获取真实显示列表数据
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
  if (end.value - searchinputStore.allList.length > 0) {
    // alert("qwr");
    lazySearch();
  }
}

const lazySearch = _.throttle(
  function () {
    //懒加载
    if (!arcticelEnd.value && searchinputStore.lazy) {
      // alert("qwr");
      searchinputStore.searchMore();
    }
  },
  500,
  { trailing: false }
);

const getfocus = (item: searchInputItem) => {
  // console.log("1aaaaaaaaaa1");
  // window.open(item.url, "_blank");
  var routerPa = "reading?ar_id=" + item.id;
  routerPath.prop = true;
  routerPath.datas = { Ar_id: item.id };
  window.open(routerPa, item.title);
  // window.open(routerPa, "hello, your news,是supercpq的一篇博客的具体内容");
};

const handleScroll = _.throttle(
  function () {
    scrollEvent();
  },
  16.7,
  { trailing: false }
);
</script>

<style scoped lang="scss">
::v-deep transoptions {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000000;
}

ul li {
  list-style: none;
}
.searchSelect-ar {
  height: 800px;
  width: 710px;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.searchLi-ar {
  height: 800px;
  width: 730px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.15);
}
/* overflow-y:auto; */
.ul-list-item-ar {
  width: 690px;
  overflow: auto;
  /* display: none; */
}
.list-item-ar {
  width: 670px;
}

.outsideIt-ar {
  display: grid;
  /* grid-gap: 3px; */
  grid-template-columns: 20% 80%;
  padding: 6px;
  cursor: pointer;
  width: 650px;
}

.outseideItem-ar {
  grid-column-start: 0;
  text-align: left;
  flex-grow: 1;
  /* width: 350px; */
  overflow: hidden;
  display: flex;
  padding: 2px;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.564);
  height: 120px;
}
.imglinks {
  grid-column-start: 1;
  padding: 3px;
  background-color: rgba(255, 255, 255, 0.564);
}
.imglinks:hover {
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.outseideItem-ar:hover {
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.itemTitle {
  width: 500px;
  height: 30px;
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
}
.itemDecri {
  width: 500px;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  padding: 5px;
}
.descri {
  flex: 1 0 auto;
  font-size: 13px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  width: 100%;
}
h4 {
  margin-block-start: 0.13em;
  margin-block-end: 0.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
