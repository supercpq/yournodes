import Axios, {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export type resultType = {
  accessToken?: string;
};
// 匹配Method 和 下面方法中的哪个相同
export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface qHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface qHttpResponse extends AxiosResponse {
  config: qHttpResponseConfig;
}

// TODO:这个补一下
export interface qHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: qHttpResponseConfig) => void;
  beforeResponseCallback?: (response: qHttpResponse) => void;
  headers?: any;
}

//
export default class qHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    params?: AxiosRequestConfig,
    axiosConfig?: qHttpResponseConfig
  ): Promise<T>;
  post<T, P>(url: string, params?: T, config?: qHttpResponseConfig): Promise<P>;
  get<T, P>(url: string, params?: T, config?: qHttpResponseConfig): Promise<P>;
}
