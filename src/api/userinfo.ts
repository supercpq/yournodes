import { http } from "../utils/http";

export const infoTabs = (params?: object) => {
  return http.request("get", "/user/infoTabs", { params });
};
// 基础信息
export const baseInfo = (params?: object) => {
  return http.request("get", "/user/baseInfo", { params });
};

// 获取用户点赞的文章
export const mylike = (params?: object) => {
  return http.request("get", "/user/myLikes", { params });
};

// 懒加载获取更多
export const moreLikes = (params?: object) => {
  return http.request("get", "/user/moreLikes", { params });
};

// 换绑邮箱
export const changeMail = (data: object) => {
  return http.request("post", "/user/account/changemail", { data });
};

// 换绑邮箱第二步
export const newEmail = (data: object) => {
  return http.request("post", "/user/account/newEmail", { data });
};

// 改用户名
export const changeName = (data: object) => {
  return http.request("post", "/user/account/changeusername", { data });
};

// 更换头像
export const changeImg = (data: object) => {
  return http.request("post", "/user/account/changeImg", { data });
};
