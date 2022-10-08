import { http } from "../utils/http"


//登录
export const getLogin = (data: object) => {
    return http.request("post","/api/login",{ data });
}

// 刷新token
export const refreshToken = (data: object) => {
    return http.request("post","/api/refreshToken",{ data });
}

// 注册
export const reguser = (data: object) => {
    return http.request("post","/api/reguser",{ data });
}

// 邮箱找回密码
export const emailCode = (data: object) => {
    return http.request("post","/api/code/user",{ data });
}

// 找回密码验证
export const updatepwd = (data: object) => {
    return http.request("post","/api/code/updatepwd",{ data });
}