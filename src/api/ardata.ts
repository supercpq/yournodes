import { http } from "../utils/http";

/*  
获取自己写的文章列表(
    参数说明：
    input（可选,有就是bytitle，没有就是default），
    num(必须，文章列表已有数量)
    )
 */
export const getMyList = (params: object) => {
  return http.request("get", "/myarlist", { params });
};
// 获取所有文章总体数据
export const allArDatas = (params?: object) => {
  return http.request("get", "/allardatas", { params });
};
// 获取某一文章的数据 参数必选：文章id
export const arData = (params: object) => {
  return http.request("get", "/ardata", { params });
};
