import { http } from "../utils/http";

// 获取要编辑的文章内容
export const getDraft = (data: object) => {
  return http.request("post", "/my/draft", { data });
};

// 更新文章
export const updataArContent = (data: object) => {
  return http.request("post", "/my/updata.content", { data });
};
