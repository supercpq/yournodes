import { ar } from "element-plus/es/locale";
import { MockMethod } from "vite-plugin-mock";

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

var a: searchInputItem = {
  // 没加载出来用的
  id: 0,
  title: "nothing",
  url: "reading?ar_id=123",
  description: `
  这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，
  这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，这是文章描述，
  `,
  likes: 0,
  reads: 0,
  pubTime: "--",
  imglink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
};
var b: searchInputItem = {
  // 没加载出来用的
  id: 0,
  title: "nothing",
  url: "reading?ar_id=123",
  description: "no data",
  likes: 0,
  reads: 0,
  pubTime: "--",
  imglink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
};
var c: searchInputItem = {
  // 没加载出来用的
  id: 0,
  title: "nothing",
  url: "../reading?ar_id=123",
  description: "no data",
  likes: 0,
  reads: 0,
  pubTime: "--",
  imglink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
};
var list = <searchInputItem[]>[];
var list2 = <searchInputItem[]>[];
var selfList = <searchInputItem[]>[];

for (let i = 0; i < 10; i++) {
  a.title = "once data";
  a.id++;
  list.push(a);
}
for (let i = 0; i < 10; i++) {
  b.title = "more data";
  b.id++;
  list2.push(b);
}

export default [
  {
    url: "/api/article/searchByTitle",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        list,
      };
    },
  },
  {
    url: "/api/article/getarticle",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        list,
      };
    },
  },
  {
    url: "/api/article/searchMoreByTitle",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        list: list2,
      };
    },
  },
  {
    url: "/api/article/getTools",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        items: [
          {
            url: "http://121.36.131.50:8000/",
            title: "五楼没有秘密基地",
          },
          {
            url: "http://120.55.84.232/",
            title: "朋友博客",
          },
        ],
      };
    },
  },
  {
    url: "/myarlist",
    method: "get",
    timeout: 500,
    response: (data) => {
      selfList.length = 0;
      for (let i = 0; i < 10; i++) {
        c.title = "self data title" + data.query.num;
        c.id++;
        selfList.push(c);
      }
      return {
        status: 0,
        list: selfList,
      };
    },
  },
] as MockMethod[];
