<template>
  <div class="outsideLike">
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
import { ref, onMounted } from "vue";
import { mylike, moreLikes } from "../api/userinfo";
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
  articalID: 0,
};
const likeList = ref(<likeArcticle[]>[]);
likeList.value = [
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12352,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12351,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1235112,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 122352,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123351,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1235512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123652,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123251,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1623512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1235452,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12345451,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12351942,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123252,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1282351,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12352612,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1235572,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1231751,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123135512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123513542,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12374551,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123247512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12246352,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12246351,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 12351262,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1272352,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1352351,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123357512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1235272,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1232751,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 123876512,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1237852,
  },
  {
    articaName: "superxxx",
    articalLink: "student",
    articalImgLink:
      "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
    articalID: 1238851,
  },
];
function readArc(item: likeArcticle) {
  window.open(item.articalLink, "_blank");
}
onMounted(() => {
  mylike().then(
    (res: any) => {
      likeList.value = [];
      if (res.data.status == 0) {
        likeList.value = res.data.dataLikes;
      } else {
        likeList.value.push(nodata);
      }
    },
    (err) => {
      nodata.articaName = "网络问题，没有更多数据";
      likeList.value.push(nodata);
    }
  );
});
</script>

<style scoped lang="scss">
.outsideLike {
  overflow: auto;
  font-size: 23px;
  line-height: 22px;
  max-height: 400px;
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
    span {
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
</style>
