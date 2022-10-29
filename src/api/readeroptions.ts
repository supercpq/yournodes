import { http } from '../utils/http'

// 给文章点赞
export const likeArticle = (data: object) => {
    return http.request('post',"/my/like",{ data })
}

// 查看具体文章
export const getArticle = (data: object) => {
    return http.request('get','/api/article/:articleID',{ data })
}