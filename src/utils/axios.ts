/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { message } from "antd";
import i18next from "@/utils/language/index";


//使用create方法创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 20000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    const token = window.localStorage.getItem("token");
    config.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    // 如果你想对所有成功的HTTP请求都做统一处理，可以在这里写逻辑
    return response;
  },
  (error) => {
    console.log(error);
    // 对响应错误进行处理
    // 如果发生网络错误、超时或其他异常，可以在这里捕获并处理
    return Promise.reject(error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function axiosPost(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((response) => {
        if (response.data.code === 200) {
          resolve(response?.data || response);
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        if (
          error.response.status === 403 &&
          !error.config.url.includes("addBag")
        ) {
          message.error(i18next.t("codeTxt.serviceError"));
          reject(error);
        }
      });
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function axiosGet(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    if (params) {
      service
        .get(url, { params })
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          message.error(i18next.t("codeTxt.serviceError"));
          reject(error);
        });
    } else {
      service
        .get(url)
        .then((response) => {
          resolve(response?.data || response);
        })
        .catch((error) => {
          message.error(i18next.t("codeTxt.serviceError"));
          reject(error);
        });
    }
  });
}

export default service;
