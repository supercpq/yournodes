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
        status: 0,
        dataLikes: list,
      };
    },
  },
  {
    url: "/user/moreLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        dataLikes: list1,
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
        status: 0,
        info: {
          avatarLink: "https://avatars.githubusercontent.com/u/87625173?v=4",
          userName: "superCPQ",
          profession: "程序员",
          userMail: "supercpq@outlook.com",
        },
      };
    },
  },
  {
    url: "/user/infoTabs",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,

        status: 0,
        tabs: [
          {
            tabName: "个人资料",
            componentName: "basicSetting",
            tabUrl: "myinfo/setting/setUserInfo",
            tabIcon: "/infoset.svg",
          },
          {
            tabName: "账号设置",
            componentName: "accountSetting",
            tabUrl: "myinfo/setting/setAccountInfo",
            tabIcon: "/accountset.svg",
          },
          {
            tabName: "待开发",
            componentName: "",
            tabUrl: "myinfo/setting",
          },
        ],
      };
    },
  },
  {
    url: "/myinfo/settingbase",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/myinfo/settingnewimg",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/reading/like",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/api/reading/likeinfo",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        options: [
          {
            icon: "like.svg",
            counts: 100,
            active: false,
            activeIcon: "likeit.svg",
            disactiveIcon: "like.svg",
          },
        ],
      };
    },
  },
  {
    url: "/api/reading/content",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        content: "# 123",
        title: "hello, your news,这是supercpq的一篇博客的具体内容",
      };
    },
  },
  {
    url: "/api/refreshToken",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        accessToken: "agauwrhgahjioatenhjtlmjimoa",
        expires: 4827988371000,
        name: "supercpq",
      };
    },
  },
] as MockMethod[];
