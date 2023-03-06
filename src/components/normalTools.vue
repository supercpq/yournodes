<template>
  <div class="nomal-tool">
    <div class="tool" v-for="(item, index) in toolList" :key="index">
      <button class="tool-contant" @click="openOutside(item.url, item.title)">
        <div class="tool-icon">
          <img
            :src="item.img"
            alt="img"
            style="width: 60%; height: 60%; margin: auto; padding: auto"
          />
          <!-- <el-icon :size="40"><LocationFilled /></el-icon> -->
        </div>
        <span class="tool-title">{{ item.title }}</span>
      </button>
    </div>
  </div>
  <el-drawer v-model="drawer" :title="title" direction="rtl" size="70%">
    <iframe
      :src="Weburl"
      frameborder="0"
      style="width: 100%; height: 100%"
    ></iframe>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTools } from "../api/tools";
interface tool {
  url: string;
  img: string;
  title: string;
}
var toolList = ref<tool[]>([]);
const drawer = ref(false);
const Weburl = ref("");
const title = ref("");
function openOutside(url: string, tit: string) {
  //打开抽屉，显示网页
  Weburl.value = url;
  title.value = tit;
  drawer.value = true;
}

onMounted(() => {
  getTools().then(
    (res: any) => {
      toolList.value = [
        {
          url: "https://ip.cn/",
          img: "/IP.svg",
          title: "ip查询",
        },
        {
          url: "https://tool.lu/timestamp/",
          img: "/time.svg",
          title: "时间戳",
        },
        {
          url: "https://www.liantu.com/",
          img: "/qr.svg",
          title: "二维码",
        },
        {
          // url: "https://www.bing.com/translator?ref=TThis&text=&from=zh-Hans&to=en",
          url: "https://www.iciba.com/",
          img: "/trans.svg",
          title: "翻译",
        },
        {
          url: "https://juejin.cn/user/3171425354782893",
          img: "/icon_cpq.svg",
          title: "hellocpq",
        },
      ];
      for (var i in res.items) {
        var a: tool = {
          url: res.items[i].url,
          img: res.items[i].img || "/bock.svg",
          title: res.items[i].title,
        };
        toolList.value.push(a);
      }
    },
    (err) => {
      console.log(err.message);
      toolList.value = [
        {
          url: "https://ip.cn/",
          img: "/IP.svg",
          title: "ip查询",
        },
        {
          url: "https://tool.lu/timestamp/",
          img: "/time.svg",
          title: "时间戳",
        },
        {
          url: "https://www.bing.com/translator?ref=TThis&text=&from=zh-Hans&to=en",
          img: "/qr.svg",
          title: "二维码",
        },
        {
          url: "http://www.iciba.com/",
          img: "/trans.svg",
          title: "翻译",
        },
        {
          url: "https://juejin.cn/user/3171425354782893",
          img: "/icon_cpq.svg",
          title: "hellocpq",
        },
      ];
    }
  );
});
</script>

<style scoped lang="scss">
.nomal-tool {
  width: 60px;
  height: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.tool {
  .tool-contant {
    display: grid;
    padding: 1px;
    grid-template-rows: 60% 40%;
    max-width: 70px;
    min-width: 60px;
    max-height: 80px;
    min-height: 70px;
    border: none;
    outline: none;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    :hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .tool-icon {
      grid-row-start: 1;
      :hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    .tool-title {
      grid-row-start: 2;
      font-size: small;
      :hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
