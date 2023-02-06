// axios 封装
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  resultType,
  qHttpError,
  qHttpResponse,
  qHttpRequestConfig,
  RequestMethods,
} from "./types";
import qs from "qs";
import NProgress from "../progress";
import { getToken, removeToken } from "../user";
import { useUserStoreHook } from "../../store/modules/user";
// import router from "src/router";
// import { routerStore } from "../../store/modules/routerPinia";

// const routerPath = routerStore();

// axios封装的相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1

const defaultConfig: AxiosRequestConfig = {
  baseURL: "",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  // 数组格式参数序列化
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
};
class qHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  // 初始化配置对象
  private static initConfig: qHttpRequestConfig = {};

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  // 拦截请求
  private httpInterceptorsRequest(): void {
    qHttp.axiosInstance.interceptors.request.use(
      (config: qHttpRequestConfig) => {
        const $config = config;
        // 开启进度条动画
        NProgress.start();
        const whitelist = ["/api"];

        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback($config);
          return $config;
        }
        if (qHttp.initConfig.beforeRequestCallback) {
          qHttp.initConfig.beforeRequestCallback($config);
          return $config;
        }
        const token = getToken();
        // if (whitelist.includes($config.url || "")) {
        const str = $config.url || "";
        if (str.startsWith(whitelist[0])) {
          // console.log("api!!!!!!!!");
          return $config;
        } else if (token) {
          const data = JSON.parse(token);
          const now = new Date().getTime();
          const expired = parseInt(data.expires) - now <= 0;
          console.log(data);
          // console.log("not api!!!!!!!!");
          if (expired) {
            // token过期刷新
            useUserStoreHook()
              .refreshToken(data)
              .then((res: resultType | any) => {
                config.headers["Authorization"] = "Bearer " + res.accessToken;
                return $config;
              });
          } else {
            config.headers["Authorization"] = "Bearer " + data.accessToken;
            return $config;
          }
        } else {
          // 请求不在白名单还没有token则跳转登录
          // routerPath.routerPath = "login";
          location.replace(
            window.location.protocol + "//" + window.location.host + "/login"
          );
          console.log("请求不在白名单还没有token则跳转登录");
          return $config;
        }
        return $config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = qHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: qHttpResponse) => {
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 最优先判断服务器返回的状态，规定status===401(没有权限xxx)为服务器端因重启等原因导致token提前过期的处理
        if (response.data.status === 401) {
          location.replace(
            window.location.protocol + "//" + window.location.host + "/login"
          );
          removeToken();
          return;
        }
        // 404情况是get或者post请求的内容服务器找不到，手动跳转用
        if (response.data.status === 404) {
          location.replace(
            window.location.protocol + "//" + window.location.host + "/404"
          );
          return;
        }
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (qHttp.initConfig.beforeResponseCallback) {
          qHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error: qHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: qHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as qHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      qHttp.axiosInstance
        .request(config)
        .then((response: undefined | any) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /** 单独抽离的post工具函数 */
  public post<T extends AxiosRequestConfig<any>, P>(
    url: string,
    params?: T,
    config?: qHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T extends AxiosRequestConfig<any>, P>(
    url: string,
    params?: T,
    config?: qHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new qHttp();
