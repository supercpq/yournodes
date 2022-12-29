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
    <main class="content"></main>
    <aside class="directory"></aside>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { arLikes, getArContent, getArLikes } from "../api/readAr";
import { ref, reactive, onBeforeMount } from "vue";
import { useUserStore } from "../store/modules/user";
import _ from "lodash"; //防抖节流
const userStore = useUserStore();
const $route = useRoute();
const Ar_content = ref("");
const Ar_id = ref($route.query.Ar_id);
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

onBeforeMount(async () => {
  // 获取用户文字内容，评论，点赞等
  console.log($route.query.Ar_id, Ar_id.value);
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
  margin: 10px auto;
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
    grid-template-columns: 10% 65% 25%;
  }
}
//pad端
@media only screen and (min-width: 768px) and (max-width: 1150px) {
  .grid-content {
    grid-template-columns: 70% 30%;
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
