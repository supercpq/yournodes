import { http } from "../utils/http";

// 获取要编辑的文章内容
export const getDraft = (data: object) => {
  return http.request("post", "/draft", { data });
};

// 更新文章
export const updataArContent = (data: object) => {
  return http.request("post", "/updata.content", { data });
};
