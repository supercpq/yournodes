import { http } from "../utils/http";

// 提交Ai聊天内容
export const chatAi = (data: object) => {
  return http.request("post", "/my/chat", { data });
};
