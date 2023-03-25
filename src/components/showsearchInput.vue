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
      <ul class="ul-list-item-ar" @click="getfocus">
        <li
          class="list-item-ar"
          v-for="(item, index) in searchinputStore.allList"
          :key="item.id"
          :data-index="index"
        >
          <div class="outsideIt-ar">
            <div class="imglinks">
              <!-- TODO -->
              <img
                :src="item.imglink"
                alt="img"
                style="
                  width: 90%;
                  height: 90%;
                  margin: auto;
                  padding: auto;
                  max-width: 110px;
                  max-height: 110px;
                "
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
                  &nbsp;<el-icon><View /></el-icon> {{ item.reads }}
                </span>
                <span>
                  &nbsp;<el-icon><Clock /></el-icon> {{ item.pubTime }}
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
// import { useUserStore } from "../store/modules/user";
import { routerStore } from "../store/modules/routerPinia";
import { ardataStore } from "../store/modules/ardata";
const routerPath = routerStore();
// const userStore = useUserStore();
const ardata = ardataStore();
const props = defineProps({
  isSelf: { type: Boolean, required: true },
});
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
  if (end.value - searchinputStore.list.length > 0) {
    // alert("qwr");
    lazySearch();
  }
}

const lazySearch = _.throttle(
  function () {
    //懒加载
    if (!arcticelEnd.value && searchinputStore.lazy) {
      if (props.isSelf) {
        // 继续获取自己写的文章的列表
        searchinputStore.searchSelf();
      } else {
        searchinputStore.searchMore(); // 正常懒加载获得
      }
    }
  },
  500,
  { trailing: false }
);

const getfocus = (e) => {
  let el = e.target;
  if (el.matches("h4")) {
    // 点击连接跳转
    return;
  }
  if (el.matches("ul")) {
    return;
  }
  // 查询父元素是否为li
  while (!el.matches("li")) {
    el = el.parentNode;
    if (!el) {
      break;
    }
  }
  const index = el.dataset.index;
  const item = searchinputStore.allList[index];
  if (props.isSelf) {
    ardata.getline(item.id, item.title);
  } else {
    let routerPa =
      window.location.protocol +
      "//" +
      window.location.host +
      "/reading?ar_id=" +
      item.id;
    routerPath.prop = true;
    routerPath.datas = { Ar_id: item.id };
    window.open(routerPa, item.title);
  }
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
:deep(.transoptions) {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000000;
}

ul li {
  list-style: none;
}
.searchSelect-ar {
  height: 800px;
  width: 98%;
  min-width: 360px;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.searchLi-ar {
  height: 100%;
  width: 100%;
  min-width: 360px;
  container-type: inline-size;
  overflow: auto;
  overflow-x: hidden;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.15);
}
/* overflow-y:auto; */
.ul-list-item-ar {
  width: 95%;
  overflow: auto;
  /* display: none; */
}
.list-item-ar {
  // width: 670px;
  width: 90%;
}

.outsideIt-ar {
  display: grid;
  /* grid-gap: 3px; */
  grid-template-columns: 20% 80%;
  padding: 6px;
  cursor: pointer;
  // width: 650px;
  width: 100%;
}

.outseideItem-ar {
  grid-column-start: 2;
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
  width: 70%;
  height: 30px;
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
}
.itemDecri {
  width: 90%;
  height: 70px;
  line-height: 22px;
  padding: 5px;
}
.descri {
  flex: 1 0 auto;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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

@container (max-width: 440px) {
  .searchSelect-ar {
    max-width: 400px;
    width: 100%;
  }
  .outsideIt-ar {
    grid-template-columns: 100%;
    max-width: 400px;
    width: 100%;
  }
  .imglinks {
    display: none;
  }
  .outseideItem-ar {
    grid-column-start: 1;
    margin-left: -40px;
  }
  .ul-list-item-ar {
    max-width: 400px;
    width: 88%;
    overflow-x: hidden;
  }
  .itemTitle {
    max-width: 400px;
    width: 100%;
  }
  .itemDecri {
    max-width: 400px;
    width: 95%;
  }
  .list-item-ar {
    max-width: 400px;
    width: 100%;
  }
}
</style>
