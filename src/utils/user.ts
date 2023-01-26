import Cookies from "js-cookie";
import { useUserStoreHook } from "../store/modules/user";

const TokenKey = "authorized-token";

type paramsMapType = {
  name: string;
  expires: number;
  accessToken: string;
};

// 获取token
export function getToken() {
  return Cookies.get("authorized-token");
  //{%22accessToken%22:%22eyJhbGciOiJIUzUxMiJ9.admin%22%2C%22expires%22:1698595200000}  注意：(%22是"  %2C是,)
}

export function getuseid() {
  return Cookies.get("authorized-id");
}

// 设置token以及过期时间
export function setToken(data) {
  const { accessToken, expires, name, id } = data;
  const paramsMap: paramsMapType = {
    name,
    expires: Date.now() + parseInt(expires), //过期时间
    accessToken,
  };
  const dataString = JSON.stringify(paramsMap);
  useUserStoreHook().SET_TOKEN(accessToken);
  useUserStoreHook().SET_NAME(name);
  expires > 0
    ? Cookies.set(TokenKey, dataString, {
        expires: expires / 86400000,
      })
    : Cookies.set(TokenKey, dataString);
  expires > 0
    ? Cookies.set("authorized-id", id, {
        expires: expires / 86400000,
      })
    : Cookies.set("authorized-id", id);
  sessionStorage.setItem("authorized-id", id);
  sessionStorage.setItem(TokenKey, dataString);
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove("authorized-id");
  sessionStorage.removeItem("authorized-id");
  sessionStorage.removeItem(TokenKey);
}
// 一些表单校验的规则
export const pwdRegex = new RegExp(/[\u4e00-\u9fff]/g); // 中文
export const pwdcheck = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}"); // 字母 + 数字
export const emailcheck = new RegExp(
  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/
); // 邮箱
