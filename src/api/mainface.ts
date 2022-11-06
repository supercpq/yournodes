import { http } from "../utils/http";

// 搜索文章
export const searchByTitle = (data) => {
  return http.request("post", "/api/article/searchByTitle", { data });
};

// 懒加载搜索
export const searchMoreByTitle = (data) => {
  return http.request("post", "/api/article/searchMoreByTitle", { data });
};

// 默认顺序显示
export const getarticle = (params?: object) => {
  return http.request("get", "/api/article/getarticle", { params });
};

// 懒加载
// export const getMorearticle = (params?: object ) => {
//     return http.request("get","/api/article/getmorearticle",{ params })
// }
