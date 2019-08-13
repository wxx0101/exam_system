import axios from 'axios';
import {Message} from "element-ui"
const request=axios.create({
    timeout:2000
});

// const errorTip={
//     "401":"没有权限",
//     "405":""
// }
//请求之前拦截器
request.interceptors.request.use((config)=>{
    return {
        ...config,
        headers:{
            ...config.headers,
            "authorization":window.sessionStorage.getItem('authorization')
        }
    }
},(error)=>{
    return Promise.reject(error)
})
//相应之前
request.interceptors.response.use((response)=>{
    let {code,msg}=response.data;
    if(code){ 
        return response.data;
    }
    Message({
        message:msg,
        type:"error"
    });
   return  Promise.reject(response.data)
},(error)=>{
    Message({
        message:error.response.data.msg,
        type:"error"
    });
    return Promise.reject(error)
})  

export default request;

// export {
//     request as axios
// }

// export default {
//     install(Vue){
//         Object.defineProperty(Vue.prototype,"$http",{
//             value:request
//         })
//     }
// }