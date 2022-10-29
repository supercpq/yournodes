import { http } from "../utils/http";

// 发送验证码
export const sentVerification = (data: object) => {
  return http.request("post", "/api/code", { data });
};

// 检验验证码
export const checkCode = (data: object) => {
  return http.request("post", "/api/code/check", { data });
};
