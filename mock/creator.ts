import { MockMethod } from "vite-plugin-mock";
import { shuffle } from "lodash";

export default [
  {
    url: "/my/draft",
    method: "post",
    timeout: 500,
    response: (data) => {
      if (data.body.arid === "abc") {
        return {
          status: 1,
          text: "### 你又不是作者",
          id: data.body.arid,
          isPublish: true,
        };
      } else {
        return {
          status: 0,
          text: "### 这是一篇supercpq的博客\n - 1\n - 2\n",
          id: data.body.arid,
          isPublish: false,
        };
      }
    },
  },
  {
    url: "/my/updata.content",
    method: "post",
    timeout: 500,
    response: (data) => {
      // console.log(data.body);
      if (data.body.content) {
        return {
          status: 0,
          arid: "1234",
          isPublish: data.body.isPublish,
        };
      } else {
        return {
          status: 0,
          arid: "-1",
          isPublish: data.body.isPublish,
        };
      }
    },
  },
  {
    url: "/my/allardatas",
    method: "get",
    timeout: 500,
    response: (data) => {
      // console.log(data.body);
      return {
        status: 0,
        barData: [10, 20, 10, 30, 30, 60, 30],
        barLable: ["6天前", "5天前", "4天前", "3天前", "2天前", "昨天", "今天"],
      };
    },
  },
  {
    url: "/my/ardata",
    method: "get",
    timeout: 500,
    response: (data) => {
      // console.log(data.body);
      return {
        status: 0,
        lineData: shuffle([1, 2, 1, 3, 3, 6, 3]),
        lineLable: [
          "6天前",
          "5天前",
          "4天前",
          "3天前",
          "2天前",
          "昨天",
          "今天",
        ],
      };
    },
  },
  {
    url: "/my/ardatalable",
    method: "get",
    timeout: 500,
    response: (data) => {
      // console.log(data.body);
      return {
        status: 0,
        chartlable: "文章总数据",
      };
    },
  },
] as MockMethod[];
