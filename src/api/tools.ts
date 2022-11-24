import { http } from "../utils/http";

// 默认工具显示
export const getTools = (params?: object) => {
  return http.request("get", "/api/article/getTools", { params });
};
