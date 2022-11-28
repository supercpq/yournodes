// user/moreLike
import { MockMethod } from "vite-plugin-mock";
interface searchLike {
  articaName: string;
  articalLink: string;
  articalImgLink: string;
  articalID: number;
}
var list = <searchLike[]>[];
var a: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/arcticle/1231241",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 1231241,
};
for (var i = 0; i < 20; i++) {
  a.articaName = "once data superxxx123456789";
  a.articalID++;
  list.push(a);
}
var list1 = <searchLike[]>[];

var b: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/arcticle/1231241",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 12312411,
};
for (var i = 0; i < 20; i++) {
  b.articaName = "more data superxxx123456789";
  b.articalID++;
  list1.push(b);
}
export default [
  {
    url: "/user/myLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        data: {
          status: 0,
          dataLikes: list,
        },
      };
    },
  },
  {
    url: "/user/moreLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        data: {
          status: 0,
          dataLikes: list1,
        },
      };
    },
  },
  // /user/baseInfo
  {
    url: "/user/baseInfo",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        data: {
          status: 0,
          info: {
            avatarLink: "https://avatars.githubusercontent.com/u/87625173?v=4",
            userName: "superCPQ",
            profession: "程序员",
            userMail: "supercpq@outlook.com",
          },
        },
      };
    },
  },
] as MockMethod[];
