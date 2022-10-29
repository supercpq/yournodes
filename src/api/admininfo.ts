import { http } from "../utils/http";

// 拉黑用户
export const banUser = (data: object) => {
  return http.request("post", "/admin/banUser", { data });
};

//
