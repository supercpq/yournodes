import { defineStore } from "pinia";
import { userType } from "./types";
import { store } from "../index";
// import { useRouter, useRoute } from "vue-router";
import { routerStore } from "./routerPinia";
import { getToken, setToken, removeToken } from "../../utils/user";
import { getLogin, refreshToken } from "../../api/user";
import { storageSession } from "@pureadmin/utils";
import { baseInfo } from "../../api/userinfo";
// import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
// const router = useRouter();
const routerPath = routerStore();
const data = getToken();
let token = "";
let name = "your name";
let profession = "your job";
let userMail = "";
let avatarLink = "src/assets/avatar.svg";
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    name = dataJson?.name ?? "admin";
    profession = dataJson?.job ?? "your job";
  }
}

export const useUserStore = defineStore({
  id: "user-reader",
  state: () => {
    return {
      token,
      name,
      profession,
      avatarLink,
      // 登录显示组件判断 0：登录 1：手机登录 2：二维码登录 3：注册 4：忘记密码，默认0：登录
      // 目前只有0 3 4 其他的后续添加
      userMail,
      currentPage: 0,
    };
  },
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
    getBaseInfo() {
      baseInfo().then(
        (res: any) => {
          console.log(res.data);
          if (res.data.status == 0) {
            this.name = res.data.info.userName;
            this.profession = res.data.info.profession;
            this.avatarLink = res.data.info.avatarLink;
            this.userMail = res.data.info.userMail;
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
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
      // 回退到主界面
      // router.push("/");
      routerPath.routerPath = "";
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
