import { defineStore } from "pinia";
import { userType } from "./types";
import { store } from "../index";
// import { useRouter, useRoute } from "vue-router";
import { routerStore } from "./routerPinia";
import { getToken, setToken, removeToken } from "../../utils/user";
import { getLogin, refreshToken, reguser, getPublicKey } from "../../api/user";
import { storageSession } from "@pureadmin/utils";
import { baseInfo } from "../../api/userinfo";
import { JSEncrypt } from "jsencrypt";
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
      id: "",
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
          if (res.status == 0) {
            this.name = res.info.userName;
            this.profession = res.info.profession;
            this.avatarLink = res.info.avatarLink;
            this.userMail = res.info.userMail;
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    // 登录
    loginByUsername(data) {
      getPublicKey()
        .then(
          (res: any) => res.pubkey,
          (err) => {
            console.log(err.message);
          }
        )
        .then(
          (PUBLIC_KEY) => {
            let encryptor = new JSEncrypt();
            encryptor.setPublicKey(PUBLIC_KEY);
            let result = encryptor.encrypt(data.pass);
            // console.log("key:", PUBLIC_KEY, data, "加密后：", result);
            if (result) {
              getLogin({ email: data.email, pass: result }).then(
                (res: any) => {
                  if (res.status === 0) {
                    setToken(res);
                    location.href = "myinfo";
                  }
                },
                (err) => {
                  console.log(err.message);
                }
              );
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      // return new Promise<void>((reslove, reject) => {
      //   getLogin(data)
      //     .then((data) => {
      //       if (data) {
      //         setToken(data);
      //         reslove();
      //       }
      //     })
      //     .catch((error) => {
      //       reject(error);
      //     });
      // });
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
    // 注册
    reguser(data) {
      getPublicKey()
        .then(
          (res: any) => res.pubkey,
          (err) => {
            console.log(err.message);
          }
        )
        .then(
          (PUBLIC_KEY) => {
            let encryptor = new JSEncrypt();
            encryptor.setPublicKey(PUBLIC_KEY);
            let result = encryptor.encrypt(data.newpassword);
            let { check, email, code } = data;
            console.log(reguser);
            if (result) {
              reguser({ email, check, code, pass: result }).then(
                (res: any) => {
                  if (res.status === 0) {
                    setToken(res);
                    location.href = "myinfo";
                  }
                },
                (err) => {
                  console.log(err.message);
                }
              );
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
