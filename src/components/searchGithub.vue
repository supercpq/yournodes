<template>
  <!-- <button @click="hellogit()">click</button>
  <br /> -->
  <div class="gitSelect">
    <div v-show="gitstore.loading">
      <el-space direction="vertical" alignment="flex-start">
        <!-- <div>
      <el-switch v-model="gitstore.loading" />
    </div> -->
        <el-skeleton
          style="width: 300px; text-align: left"
          :loading="gitstore.loading"
          animated
          :rows="2"
        >
        </el-skeleton>
      </el-space>
    </div>
    <div v-show="!gitstore.loading" class="searchLi">
      <div class="langOptions">
        <div class="langOptionsItem">
          <a href="https://github.com/" target="_blank">
            <span><img :src="githublogo" alt="github logo" /></span>
            <span> Github</span>
          </a>
        </div>
        <div class="langOptionsItem">
          <span>
            <div class="transoptions">
              <el-select
                v-model="value"
                class="m-2"
                placeholder="Select"
                size="small"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </span>
        </div>
      </div>
      <ul class="ul-list-item">
        <li v-for="item in gitstore.allList" :key="item.id" class="list-item">
          <div class="outsideI">
            <div class="outsideItem" @click="getfocus(item)">
              <div class="itemName">
                <h4>
                  <a :href="item.picUrl" target="_blank">
                    <span>{{ item.name }}</span>
                  </a>
                </h4>
              </div>
              <div class="itemDescription">
                <div :title="item.description" class="descri">
                  {{ item.description }}
                </div>
              </div>
              <div class="itemName">
                <span
                  ><el-icon><StarFilled /></el-icon>{{ item.stars }}
                </span>
                <span>
                  &nbsp<el-icon><Share /></el-icon> {{ item.forks }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- <p>No more</p> -->
</template>

<script lang="ts" setup>
import { githubHotStore } from "../store/modules/searchGithubPinia";
import _ from "lodash";
import { ref, watch, onMounted } from "vue";
const value = ref("Vue");
const githublogo = "githublogo.svg";
const options = [
  {
    value: "Vue",
    label: "Vue",
  },
  {
    value: "Rust",
    label: "Rust",
  },
  {
    value: "JavaScript",
    label: "JavaScript",
  },
  {
    value: "CSS",
    label: "CSS",
  },
  {
    value: "HTML",
    label: "HTML",
  },
  {
    value: "TypeScript",
    label: "TypeScript",
  },
  {
    value: "CoffeeScript",
    label: "CoffeeScript",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "C#",
    label: "C#",
  },
  {
    value: "C++",
    label: "C++",
  },
  {
    value: "Diff",
    label: "Diff",
  },
  {
    value: "Go",
    label: "Go",
  },
  {
    value: "Java",
    label: "Java",
  },
  {
    value: "PHP",
    label: "PHP",
  },
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "Shell",
    label: "Shell",
  },
];
const gitstore = githubHotStore();
interface githubHotItem {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  stars: number;
  forks: number;
}
const load1 = () => {
  // 目前还没做懒加载
};

const hellogit = _.debounce(
  (lang: string = "vue") => {
    gitstore.loading = true;
    localStorage.setItem("lang", lang);
    gitstore.searchrepositories(lang);
  },
  200,
  {
    leading: true,
  }
);

const getfocus = (item: githubHotItem) => {
  // console.log("1aaaaaaaaaa1");
  window.open(item.picUrl, "_blank");
};
watch(value, (newValue, oldValue) => {
  // console.log("value变化", newValue, oldValue);
  hellogit(newValue);
});

onMounted(() => {
  // console.log("11111111111111111111111", localStorage.getItem("lang"));
  value.value = localStorage.getItem("lang") ?? "Vue";
  if (!gitstore.show) {
    hellogit(value.value);
  }
});
</script>

<style lang="scss" scoped>
::v-deep transoptions {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000000;
}
.langOptions {
  /* text-align: right;
  margin-right: 25px; */
  margin: auto;
  display: -webkit-flex;
  display: flex;
  width: 400px;
  height: 20px;
}
.langOptions img {
  height: 20px;
  width: 20px;
}
.langOptionsItem {
  width: 175px;
  height: 15px;
  margin: 10px;
}
ul li {
  list-style: none;
}
.gitSelect {
  height: 800px;
  width: 430px;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.searchLi {
  height: 800px;
  width: 430px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.15);
}
/* overflow-y:auto; */
.ul-list-item {
  width: 380px;
  overflow: auto;
  /* display: none; */
}
.list-item {
  width: 350px;
}
.descri {
  color: var(--jjext-color-secondary-app);
  flex: 1 0 auto;
  font-size: 13px;
  line-height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: nowrap;
}
.outsideI {
  padding: 6px;
  width: 350px;
}
.outsideItem {
  text-align: left;
  flex-grow: 1;
  width: 350px;
  overflow: hidden;
  display: flex;
  padding: 2px;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.564);
  height: 100px;
}
.outsideItem:hover {
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.itemName {
  width: 330px;
  height: 30px;
  margin: 2px;
}
.itemDescription {
  width: 350px;
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
