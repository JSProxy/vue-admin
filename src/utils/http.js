import axios from 'axios';
import store from '@/store/index';
import config from '@/config/index';
import router from '@/router/index';

import {
    Message
} from 'element-ui'

import {
    logSuccess,
    logError
} from './log'
import {
    showLoading,
    HideLoading
} from './loading'
const {
    baseClientURL,
    withCredentials,
    timeout
} = config.axios_config;
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
    // transformRequest: [function (data, headers) {
    //     headers.token = store.state.token;
    //     if (headers['Content-type'] === 'multipart/form-data') {
    //         return data;
    //     } else {
    //         return JSON.stringify(data);
    //     }
    // }]
});
// 超时时间 http请求拦截器
axiosInstance.interceptors.request.use(
    async (data) => {
            if (debug) {
                console.log('res:debug-log');
                logError({
                    url: data.url,
                    params: data.data
                });
            }
            return data;
        },
        (error) => {
            _key = '';
            if (debug) {
            }
            Message.error({
                message: '请求错误',
                onClose: function () {}
            })

            return Promise.reject(error);
        }
);
// http响应拦截器
axiosInstance.interceptors.response.use(
    (data) => {
        if (_key) {
            _key = '';
        }

        if (debug) {
            console.log('req:debug-log');
            logSuccess({
                url: data.config.url,
                params: data.params,
                result: data.data
            });
        }
        if (data.data) {
            if (data.data.code !== 0) {
                switch (data.data.code) {
                    case 999:

                        Message.error({
                            message: '999',
                            onClose: function () {}
                        })

                        break;
                    case 1000:
                        Message.error({
                            message: '1000',
                            onClose: function () {}
                        })
                        break;
                    default:

                }
                return {
                    ...data.data,
                    ok: false
                }
            } else {
                return data.data;
            }
        }
    },
    (error) => {
        _key = '';
        if (debug) {
           
        }
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 301) {
                setTimeout(
                    () => router.replace("login"), 1000
                );
            }
        }
        return Promise.reject(error);
    }
);

export function get(url, params = {}) {
    // if(params!={}){
    //     const arr = [];
    //     for (const key in params) 
    //     {
    //         arr.push(`${key}=${encodeURIComponent(params[key])}`);
    //     }
    //     url = `${url}?${arr.join('&')}`
    // }
    return axiosInstance.get(url, params);
}
export function post(url, body, key = _key, ) {
    _key = key;
    return axiosInstance.post(url, JSON.stringify(body));
}