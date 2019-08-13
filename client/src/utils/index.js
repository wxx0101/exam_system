const axios = require("axios")

const request = axios.create();
request.interceptors.require.use((config)=>{
    return {
        ...config,
        headers:{
            ...config.headers,
            authorization:window.localStorage.getItem("authorization")
        }
    }
},(err)=>{
    return Promise.reject(err)
})

request.interceptors.response.use((response)=>{
    return response.data;
},(err)=>{
    const response = err.response;
    const status = response.status;
    if(status > 400){
        switch(status){
            case 401:
                alert("您还没有登录,请登录")
            break;
            case 403:
                alert("没有权限")
            break;
            case 404:
                alert("页面走丢了")
            break;
        }
    }
    return Promise.reject(err)
})


export default request;

