import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/draft",
    method: "post",
    timeout: 500,
    response: (data) => {
      if (data.body.arid === "abc") {
        return {
          status: 1,
          text: "### 你又不是作者",
        };
      } else {
        return {
          status: 0,
          text: "### 这是一篇supercpq的博客\n - 1\n - 2\n",
        };
      }
    },
  },
  {
    url: "/updata.content",
    method: "post",
    timeout: 500,
    response: (data) => {
      return {
        status: 1,
        arid: "1234",
        isPublish: data.body.isPublish,
      };
    },
  },
] as MockMethod[];
