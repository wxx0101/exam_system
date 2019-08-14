import axios from 'axios'
import router from "../router/index"

const request = axios.create()
//请求之前拦截器
request.interceptors.request.use((config) => {
    
})