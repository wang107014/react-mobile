import axios, { AxiosRequestConfig, Method } from "axios";
import { Toast,Modal } from 'antd-mobile'

export const baseURL = '/v1/epms-console';

export const axiosBaseURL = `${
  process.env.NODE_ENV === "development" ? "http://10.69.41.52" : ""
}${baseURL}`;
//	自定义anxios请求
export const http = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: axiosBaseURL,
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 10000,
  //	表示服务器响应的数据类型
  responseType: "json",
  //	表示跨域请求时是否需要使用凭证
  withCredentials: false,
  //	即将被发送的自定义请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  //	允许在向服务器发送前，修改请求数据，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  //	这里将json格式转为字符串格式
  /* transformRequest: [
    function (data) {
      data = JSON.stringify(data);
      return data;
    },
  ], */
});

//	添加请求拦截器
http.interceptors.request.use(
  (config:any) => {
    //	请求时动态添加token
    const aut = 'getToken';
    if (aut) {
      config.headers["Authorization"] = "Bearer " + aut;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 返回状态判断(添加响应拦截器),第一个参数为resolve时的方法，第二个参数为reject时的方法
http.interceptors.response.use(
  (res) => {
    return res;
  },
  //	http请求报错信息处理
  (error) => {
    if (!error.response) {
      Toast.show({
        icon: 'fail',
        content: '网络或服务异常',
      })
      return Promise.reject(error);
    }
    if (error.response.status === 404 || error.response.status === 403) {
      Toast.show({
        icon: 'fail',
        content: '您访问的页面或接口不存在',
      })
    }
    if (error.response.status === 500 || error.response.status === 505) {
      Toast.show({
        icon: 'fail',
        content: '网络或服务异常',
      })
    }
    return Promise.reject(error);
  }
);

//  通用接口调用
const httpProxy: (
  methodType: Method,
  url: string,
  params: any,
  options?: AxiosRequestConfig
) => Promise<any> = async (methodType, url, params, options) => {
  const returnData = await http({
    method: methodType,
    url: url,
    data: methodType === "POST" ? params : null,
    params: methodType === "GET" ? params : null,
    ...options,
  });
  switch (returnData.data.code) {
    //  接口返回正常
    case 0:
      return returnData.data;
    //  登录失效
    case 9999:
      Modal.confirm({
        content: '未登录或已失效，请重新登录!',
        onConfirm: () => {
          console.log('跳转登录页')
        },
      })
      break;
    default:
      //  其他错误提示
      Toast.show({
        icon: 'fail',
        content:returnData.data.message,
      })
  }
};
export default httpProxy;
