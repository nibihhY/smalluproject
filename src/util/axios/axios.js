// 引入axios
import axios from "axios"

// 实例化一个axios的实例
let http = axios.create({
    baseURL:"/api"
})

// 请求拦截器
http.interceptors.request.use((request)=>{
    return request
})

// 响应拦截器
http.interceptors.response.use((response)=>{
    return response.data
})

// 暴露
export default http