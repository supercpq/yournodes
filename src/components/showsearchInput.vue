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
          style="width: 300px; text-align: left"
          :loading="searchinputStore.loading"
          animated
          :rows="2"
        >
        </el-skeleton>
      </el-space>
    </div>
    <div class="searchLi-ar" v-show="!searchinputStore.loading">
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
                <h4>
                  <a :href="item.url" target="_blank">
                    <span>{{ item.title }}</span>
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
import { searchInputStore } from "../store/modules/searchInputPinia";

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

const searchinputStore = searchInputStore();

const getfocus = (item: searchInputItem) => {
  // console.log("1aaaaaaaaaa1");
  window.open(item.url, "_blank");
};
</script>

<style scoped>
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
.descri {
  color: var(--jjext-color-secondary-app);
  flex: 1 0 auto;
  font-size: 13px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
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
  white-space: nowrap;
  padding: 5px;
}
h4 {
  margin-block-start: 0.13em;
  margin-block-end: 0.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
