import { http } from "../utils/http";

// 查看具体文章
export const getArticle = (data: object) => {
  return http.request("get", "/api/article/:articleID", { data });
};
