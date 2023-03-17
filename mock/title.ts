// import { ar } from "element-plus/es/locale";
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

const a: searchInputItem = {
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
const b: searchInputItem = {
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
const c: searchInputItem = {
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
const list = <searchInputItem[]>[];
const list2 = <searchInputItem[]>[];
const selfList = <searchInputItem[]>[];

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
            url: "https://tbghg.top/",
            img: "./bock.svg",
            title: "学长博客",
          },
        ],
      };
    },
  },
  {
    url: "/api/qr-code",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        svg_string: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M1 1h7v7h-7zM10 1h3v1h-1v1h1v1h-2v1h-1v4h-1v-6h2v-1h-1zM14 1h1v1h2v-1h2v2h2v-1h-1v-1h2v1h1v1h2v-1h1v2h-4v1h-2v-1h-2v1h-1v-2h-2v1h-1zM24 1h1v1h-1zM27 1h7v7h-7zM2 2v5h5v-5zM28 2v5h5v-5zM3 3h3v3h-3zM29 3h3v3h-3zM15 4h1v1h-1zM16 5h1v1h2v-1h1v4h-1v-2h-1v1h-1v-1h-1zM22 5h4v1h-4zM11 6h3v3h1v-2h1v1h1v1h2v1h-3v1h-1v-1h-3v1h-2v-2h1zM21 6h1v2h-1zM12 7v2h1v-2zM23 7h1v3h1v1h-1v2h-2v-1h1v-1h-1v-1h1v-1h-1v-1h1zM25 7h1v1h-1zM1 9h1v1h1v-1h5v1h-3v2h-1v2h-2v-1h1v-1h-1v-1h-1zM27 9h5v2h1v2h-2v1h2v-1h1v2h-1v1h-1v1h-1v-2h-1v-1h-1v-3h1v1h1v-1h-1v-1h-1v1h-2zM8 10h1v3h-1v-1h-1v1h-1v-2h2zM19 10h2v1h-1v1h-1zM33 10h1v1h-1zM13 11h1v3h-1v1h1v-1h2v-1h1v1h1v1h-2v4h1v1h-2v-1h-1v1h-1v-1h-1v-1h1v-2h-1v-1h-1v-1h1v-2h1zM16 11h2v2h-1v-1h-1zM26 11h1v2h-1zM1 12h1v1h-1zM10 12h1v1h-1zM15 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM19 13h1v1h-1zM4 14h1v1h-1zM6 14h1v1h1v1h-2v1h-1v-2h1zM8 14h2v2h-1v-1h-1zM21 14h8v1h-1v2h-1v1h1v-1h3v1h1v1h1v1h1v3h-1v-1h-1v-1h-1v2h2v1h-1v1h-1v-1h-3v-1h-2v1h2v1h3v1h-1v2h1v-2h2v2h-1v1h-1v1h-1v1h-1v-1h-2v1h2v1h-1v1h-1v-1h-2v1h-1v-1h-1v-1h1v-1h1v-1h-2v1h-1v-1h-1v-1h3v-2h1v-3h-2v1h1v1h-2v-1h-1v-1h1v-1h7v1h1v-1h-1v-1h-2v-1h1v-1h-1v1h-1v1h-1v-2h1v-1h-1v-1h1v-1h-1v-1h-2v2h-1v1h1v-1h1v1h1v1h-1v1h-1v1h-1v1h-2v-1h-2v1h-1v-2h1v-1h-1v-1h1v-1h1v1h1v-3h1v1h1v-1h-1zM29 15h1v1h-1zM1 16h1v1h-1zM10 16h2v2h-1v-1h-1zM17 16h1v1h-1zM24 16h1v1h-1zM3 17h2v1h2v1h-1v1h-1v-1h-1v-1h-1zM7 17h3v1h1v1h-3v-1h-1zM33 17h1v2h-1zM1 18h1v3h-1zM29 18v1h1v1h1v-1h-1v-1zM7 19h1v1h-1zM19 19v1h2v-1zM4 20h1v1h-1zM9 20h4v1h-1v1h-3zM14 20h1v2h-1zM3 21h1v1h1v-1h1v1h1v1h-2v2h-1v-2h-2v3h-1v-4h2zM7 21h1v1h-1zM8 22h1v1h-1zM15 22h2v1h1v1h-1v2h-1v-2h-1zM19 22h1v2h-1zM7 23h1v1h-1zM9 23h1v1h-1zM11 23h2v1h2v1h-1v1h-1v-1h-1v-1h-1zM6 24h1v1h-1zM3 25h1v1h-1zM5 25h1v1h-1zM7 25h1v1h-1zM11 25h1v1h1v1h1v2h1v2h-1v1h-1v2h-1v-1h-1v-2h2v-3h-2v1h-1v1h1v1h-1v1h-1v-4h1v-1h1zM18 25h1v1h-1zM9 26h1v1h-1zM17 26h1v2h-1v1h-2v-2h2zM19 26h4v1h-3v1h-1zM26 26v3h3v-3zM1 27h7v7h-7zM27 27h1v1h-1zM2 28v5h5v-5zM33 28h1v1h-1zM3 29h3v3h-3zM19 29h1v1h-1zM16 30h2v1h-2zM21 30h1v1h-1zM31 30h3v1h-2v2h-1v-1h-1v-1h1zM20 31h1v1h2v1h-1v1h-2v-1h-1v-1h1zM14 32h2v2h-2zM17 32h1v1h-1zM29 32h1v1h-1zM9 33h2v1h-2zM18 33h1v1h-1zM23 33h1v1h-1zM25 33h2v1h-2zM28 33h1v1h-1zM30 33h1v1h-1zM32 33h1v1h-1z"/></svg>`,
      };
    },
  },
  {
    url: "/my/myarlist",
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
  {
    url: "/api/getbarrages",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        list: [
          {
            content: "Pinia好用！",
            time: "",
            textColor: "#409EFF",
            fontSize: 30,
            barrId: "1",
          },
          {
            content: "深度学习！",
            time: "",
            textColor: "rgb(255,0,0)",
            fontSize: 30,
            barrId: "2",
          },
          {
            content: "2023.3.17发一条！！",
            time: "",
            textColor: "#409EFF",
            fontSize: 30,
            barrId: "3",
          },
          {
            content: "666666",
            time: "",
            textColor: "rgb(255,0,0)",
            fontSize: 30,
            barrId: "4",
          },
          {
            content: "哈哈哈哈哈哈哈哈哈哈哈哈",
            time: "",
            textColor: "#409EFF",
            fontSize: 30,
            barrId: "5",
          },
          {
            content: "放飞自我！！",
            time: "",
            textColor: "rgb(255,0,0)",
            fontSize: 30,
            barrId: "6",
          },
          {
            content: "supercpq",
            time: "",
            textColor: "rgb(0,0,255)",
            fontSize: 30,
            barrId: "7",
          },
          {
            content: "hello hello",
            time: "",
            textColor: "rgb(255,0,255)",
            fontSize: 30,
            barrId: "8",
          },
          {
            content: "I'm happpy!!!!!!!!!!!!!!!!!!",
            time: "",
            textColor: "rgb(255,255,0)",
            fontSize: 30,
            barrId: "9",
          },
          {
            content: "Vue.js + TS",
            time: "",
            textColor: "rgb(0,135,255)",
            fontSize: 30,
            barrId: "10",
          },
          {
            content: "学React",
            time: "",
            textColor: "rgb(108,252,255)",
            fontSize: 30,
            barrId: "11",
          },
          {
            content: "用用tailwind",
            time: "",
            textColor: "rgb(125,0,255)",
            fontSize: 30,
            barrId: "12",
          },
        ],
      };
    },
  },
  {
    url: "/sendbarrages",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        time: Date.parse(new Date().toString()),
        barrId: Date.parse(new Date().toString()),
      };
    },
  },
  {
    url: "/deletebarrages",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
] as MockMethod[];
