import { http } from "../utils/http";

// 给文章点赞
/* 
data: {
    Ar_id 文章id
    点赞状态（active：true/false）（用于判断点赞和取消）
}
*/
export const arLikes = (data: object) => {
  return http.request("post", "/reading/like", { data });
};

// 获取文章内容
export const getArContent = (params?: object) => {
  return http.request("get", "/api/reading/content", { params });
};

// 获取点赞等信息
export const getArLikes = (params?: object) => {
  return http.request("get", "/api/reading/likeinfo", { params });
};

// 获取文章分享二维码
export const getQr = (data: object) => {
  return http.request("post", "/api/qr-code", { data });
};
