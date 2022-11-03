import { defineStore } from "pinia";
import { userType } from "./types";
import { store } from "../index";
//
import { getToken, setToken, removeToken } from "../../utils/user";
import { getLogin, refreshToken } from "../../api/user";
import { storageSession } from "@pureadmin/utils";
// import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";

const data = getToken();
let token = "";
let name = "";
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    name = dataJson?.name ?? "admin";
  }
}

export const useUserStore = defineStore({
  id: "user-reader",
  state: (): userType => ({
    token,
    name,
    // 登录显示组件判断 0：登录 1：手机登录 2：二维码登录 3：注册 4：忘记密码，默认0：登录
    // 目前只有0 3 4
    currentPage: 0,
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME(name) {
      this.name = name;
    },
    SET_CURRENTPAGE(value) {
      this.currentPage = value;
    },
    // 登录
    async loginByUsername(data) {
      return new Promise<void>((reslove, reject) => {
        getLogin(data)
          .then((data) => {
            if (data) {
              setToken(data);
              reslove();
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    logOut() {
      this.token = "";
      this.name = "";
      removeToken();
      storageSession.clear();
      // 回退到登录界面
      //router.push("/login");
    },
    // 刷新token
    async refreshToken(data) {
      removeToken();
      return refreshToken(data).then((data) => {
        if (data) {
          setToken(data);
          return data;
        }
      });
    },
    //
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
