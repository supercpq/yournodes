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
  url: "#",
  description: "no data",
  likes: 0,
  reads: 0,
  pubTime: "--",
  imglink: "src/assets/avatar.svg",
};
var b: searchInputItem = {
  // 没加载出来用的
  id: 0,
  title: "nothing",
  url: "#",
  description: "no data",
  likes: 0,
  reads: 0,
  pubTime: "--",
  imglink: "src/assets/avatar.svg",
};
var list = <searchInputItem[]>[];
var list2 = <searchInputItem[]>[];

for (var i = 0; i < 10; i++) {
  a.title = "once data";
  a.id++;
  list.push(a);
}
for (var i = 0; i < 10; i++) {
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
        code: 0,
        data: {
          status: 0,
          list,
        },
      };
    },
  },
  {
    url: "/api/article/getarticle",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        data: {
          status: 0,
          list,
        },
      };
    },
  },
  {
    url: "/api/article/searchMoreByTitle",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        data: {
          status: 0,
          list: list2,
        },
      };
    },
  },
] as MockMethod[];
