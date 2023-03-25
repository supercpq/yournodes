<template>
  <!-- <button @click="hellogit()">click</button>
  <br /> -->
  <div class="gitSelect">
    <div v-show="loading">
      <el-space direction="vertical" alignment="flex-start">
        <!-- <div>
      <el-switch v-model="gitstore.loading" />
    </div> -->
        <el-skeleton
          style="width: 300px; text-align: left"
          :loading="loading"
          animated
          :rows="2"
        >
        </el-skeleton>
      </el-space>
    </div>
    <div v-show="!loading" class="searchLi">
      <div class="langOptions">
        <div class="langOptionsItem">
          <a
            href="https://github.com/supercpq/yournodes"
            target="_blank"
            title="your notes"
            style="display: flex"
          >
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
          <span>
            <div class="transoptions">
              <el-select
                v-model="sort"
                class="m-2"
                placeholder="Select"
                size="small"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </span>
        </div>
      </div>
      <ul class="ul-list-item" @click="getfocus">
        <li
          v-for="(item, index) in list"
          :key="item.id"
          :data-index="index"
          class="list-item"
        >
          <div class="outsideI">
            <div class="outsideItem">
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
                  <el-icon><Share /></el-icon> {{ item.forks }}
                </span>
                <span>
                  <el-icon><UploadFilled /></el-icon>{{ item.updatedTime }}
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <a href="https://beian.miit.gov.cn/" target="_blank" class="icp"
    >辽ICP备2022003671号-2</a
  >

  <!-- <p>No more</p> -->
</template>

<script lang="ts" setup>
// import { githubHotStore } from "../store/modules/searchGithubPinia";
import _ from "lodash";
import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";
const value = ref("Vue");
const sort = ref("stars"); // stars or updated
const githublogo = "githublogo.svg";
const sortOptions = [
  {
    value: "stars",
    label: "stars",
  },
  {
    value: "updated",
    label: "updated",
  },
];
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
// const gitstore = githubHotStore();
interface githubHotItem {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  stars: number;
  forks: number;
  updatedTime: string;
}
const list = ref<githubHotItem[]>([]);
const loading = ref(true);
const show = computed(() => {
  return list.value.length > 0;
});
const hellogit = _.debounce(
  (lang = "vue", sort = "stars") => {
    loading.value = true;
    localStorage.setItem("lang", lang);
    searchrepositories(lang, sort);
  },
  200,
  {
    leading: true,
  }
);

const getfocus = (e) => {
  let el = e.target;
  console.log(el);
  if (el.matches("span")) {
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
  window.open(list.value[index].picUrl, "_blank");
};
watch(value, (newValue, oldValue) => {
  // console.log("value变化", newValue, oldValue);
  hellogit(newValue, sort.value);
});
watch(sort, (newValue, oldValue) => {
  // console.log("value变化", newValue, oldValue);
  hellogit(value.value, newValue);
});
function searchrepositories(lang = "vue", sort = "stars") {
  lang = lang.trim().slice(0, 20);
  if (lang) {
    axios
      .get(
        `https://api.github.com/search/repositories?q=language:${lang}&sort=${sort}`
      )
      .then(
        (res) => {
          // console.log(typeof res.data.errors);
          if (typeof res.data.errors == "undefined") {
            list.value = [];
            for (const i in res.data.items) {
              const listItem: githubHotItem = {
                id: res.data.items[i].id,
                name: res.data.items[i].full_name,
                picUrl: res.data.items[i].html_url,
                description: res.data.items[i].description,
                stars: res.data.items[i].stargazers_count,
                forks: res.data.items[i].forks_count,
                updatedTime: res.data.items[i].updated_at,
              };
              list.value.push(listItem);
              // console.log(res.data.result.songs[i].id, res.data.result.songs[i].name, res.data.result.songs[i].al.picUrl)
            }
            loading.value = false;
            // console.log(this.list);
            // console.log(this.list.length);
          } else {
            if (!show.value) {
              const listItem: githubHotItem = {
                id: 0,
                name: "nothing",
                picUrl: "#",
                description: "no data",
                stars: 0,
                forks: 0,
                updatedTime: "-- --",
              };
              list.value.push(listItem);
            }
            loading.value = false;
          }
        },
        (err) => {
          // console.log('searchMusicListByName3')
          if (!show.value) {
            const listItem: githubHotItem = {
              id: 0,
              name: "nothing",
              picUrl: "#",
              description: "no data",
              stars: 0,
              forks: 0,
              updatedTime: "-- --",
            };
            list.value.push(listItem);
          }
          console.log(err.message);
          loading.value = false;
        }
      );
  }
}
onMounted(() => {
  // console.log("11111111111111111111111", localStorage.getItem("lang"));
  value.value = localStorage.getItem("lang") ?? "Vue";
  if (!show.value) {
    hellogit(value.value);
  }
});
</script>

<style lang="scss" scoped>
:deep(.transoptions) {
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
  justify-content: center;
}
.langOptions img {
  height: 20px;
  width: 20px;
}
.langOptionsItem {
  width: 175px;
  height: 15px;
  margin: 10px 0;
  display: flex;
}
ul li {
  list-style: none;
}
.gitSelect {
  height: 800px;
  // width: 430px;
  width: 100%;
  padding: 20px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.searchLi {
  height: 800px;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;

  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.15);
}
/* overflow-y:auto; */
.ul-list-item {
  width: 100%;
  overflow: auto;
  transform: translateX(-10px);
  /* display: none; */
}
.list-item {
  width: 85%;
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
  width: 100%;
}
.outsideItem {
  text-align: left;
  flex-grow: 1;
  width: 100%;
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
  display: flex;
  justify-content: space-between;
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
