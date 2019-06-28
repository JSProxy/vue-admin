import axios from 'axios';
import config from '@/config/config';
import router from '@/routers/router';
import {Message} from 'element-ui'
import {logSuccess,logError} from './log'
import { showLoading,HideLoading} from './loading'

const { baseClientURL, withCredentials,timeout } = config.axios_config;
const debug = config.debug;
let loadinginstace; //load加载
let _key = '';
// 创建接口连接实例
let axiosInstance = axios.create({
    baseURL: baseClientURL,
    timeout,
    withCredentials, //带cookie
    headers: {
        Accept: 'application/json, text/javascript, */*',
        'Content-Type': 'application/json;charset=utf-8'
    },
});
// 超时时间 http请求拦截器
axiosInstance.interceptors.request.use(
    async (data) => {
        
          if(debug)
          {
            logError({url:data.url,params:data.data});
          }
         
         showLoading();// 请求打开loading
        
        //   if('imgheader' in Object.keys(data.data)){

        //     delete data.data[imgheader];
        //     data.headers =  {
        //         Accept: 'application/json, text/javascript, */*',
        //         'Content-Type': 'image/png'
        //     }
        //   }
        // if (_key) {
        //     // post统一加密处理
        //     console.log('config---?', encryptionDatagram(JSON.parse(config.data), _key), '_key:', _key);
        //     config = {
        //         ...config,
        //         data: { med: encryptionDatagram(JSON.parse(config.data), _key) },
        //     };
        //     _key = '';
        // }
        return data;
    },
    (error) => {
        _key = '';
        if(debug){
            console.log(error);
          }
          Message.error({
            message: '请求错误',
            onClose: function () {
            }
          })

        return Promise.reject(error);
    }
);
// http响应拦截器
axiosInstance.interceptors.response.use(
    (data) => {
       
        HideLoading(); // 响应成功关闭loading
    
        if (_key) {
            _key = '';
        }
        if(debug){
            logSuccess({url:data.config.url,params:data.params,result:data.data});
            console.log('status-', data);
        }
        if (data.data) {
            if (data.data.code !== 0) {
                switch (data.data.code) {
                    case 999:
                        // Toast(`code: 999  ${data.data.msg}`);
                        // Toast('登录失效，请重新登录');
                        // cookie 失效
                        // router.replace("/login");
                        // debugger
                        window.location.reload(true);
                        
                        break;
                    case 1000:
                        router.replace("/login");
                        break;
                    default:
                        // console.log('Toast', Toast, `code: ${data.data.code}  ${data.data.msg}`);
                        // Toast(`code: ${data.data.code}  ${data.data.msg}`);
                       
                }
                return {...data.data.data,ok:false}
            } else {
                
                if(Object.prototype.toString.call(data.data.data) === '[object Array]')
                {
                       if(data.data.data.length){
                        return {array:[...data.data.data],ok:true}
                       }else{
                        return {array:[],ok:true}
                       }
                       
                }else if(Object.prototype.toString.call(data.data) === '[object String]'){
                    return data.data;
                }else{
                    return {...data.data.data,ok:true}
                }
            }
        }
    },
    (error) => {
        _key = '';
        if(debug){
            console.log('status-error',error);
        }
       
        loadinginstace.close(); // 响应成功关闭loading
    
        if(error.response)
        {
             if (error.response.status === 401|| error.response.status === 301) 
             {
                setTimeout(
                    () =>  router.replace("login"), 1000
                    );
             }
        }
        return Promise.reject(error);
    }
);

export function get(url,params={}) {
    // if(params!={}){
    //     const arr = [];
    //     for (const key in params) 
    //     {
    //         arr.push(`${key}=${encodeURIComponent(params[key])}`);
    //     }
    //     url = `${url}?${arr.join('&')}`
    // }
    return axiosInstance.get(url,params);
}
export function post(url, body, key = _key,) {
    _key = key;
    return axiosInstance.post(url, JSON.stringify(body));
}

