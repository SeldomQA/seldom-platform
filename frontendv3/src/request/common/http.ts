/*
 * @author: zhiheng.hu
 * @date: 2021-10-20
 * @desc: 封装 axios HTTP接口调用
 */
import axios, { AxiosRequestConfig } from "axios";
import Qs from "qs";
import baseUrl from "~/config/base-url";
import { createDiscreteApi } from "naive-ui";

const { message, loadingBar } = createDiscreteApi(["message", "loadingBar"]);

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.timeout = 300000;

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface TNomalObject {
  [key: string]: any;
}

interface TRequest {
  (
    url: string,
    params?: TNomalObject,
    responseType?: string,
    isLoading?: boolean,
    additionalHeader?: TNomalObject
  ): Promise<any>;
}

function tellIfIsLogout(data: TNomalObject) {
  return String(data).includes("账户登录失败");
}

function makeRequest(
  requestType: string,
  url: string,
  dataOrParam: TNomalObject | string,
  responseType: string,
  additionalHeader: TNomalObject = {}
) {
  const token = sessionStorage.getItem('token');
  const headers = { 
    ...additionalHeader,
    Authorization: token ? `Bearer ${token}` : ''
  };

  const config: AxiosRequestConfig = {
    headers,
    responseType: responseType === "blob" ? "blob" : "json",
    maxRedirects: 5,
  };

  if (requestType === "get" || requestType === "delete") {
    config.params = dataOrParam;
    config.paramsSerializer = params => Qs.stringify(params);
  } else if (requestType === "post" || requestType === "put" || requestType === "patch") {
    config.data = dataOrParam;
  }

  switch (requestType) {
    case "get":
      return axios.get(url, config);
    case "post":
      return axios.post(url, dataOrParam, config);
    case "delete":
      return axios.delete(url, config);
    case "put":
      return axios.put(url, dataOrParam, config);
    case "patch":
      return axios.patch(url, dataOrParam, config);
    default:
      return axios.request(config);
  }
}

function commonRequest(
  requestType: string,
  url: string,
  dataOrParam: TNomalObject,
  responseType: string,
  isLoading = true,
  additionalHeader: TNomalObject = {}
) {
  if (isLoading) loadingBar.start();

  return makeRequest(requestType, url, dataOrParam, responseType, additionalHeader)
    .then((resp) => {
      if (isLoading) {
        loadingBar.finish();
      }
      if (!resp.data || typeof resp.data.success !== 'boolean') {
        return Promise.reject(resp.data);
      }
      return resp.data;
    })
    .catch((error) => {
      if (isLoading) loadingBar.finish();
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          message.error("token失效");
          sessionStorage.removeItem("token");
        }
      }
      console.error("Error:", error);
      return Promise.reject(error.response?.data || error);
    });
}

const get: TRequest = (url, params = {}, responseType = "json", isLoading = false, additionalHeader = {}) =>
  commonRequest("get", url, params, responseType, isLoading, additionalHeader);

const post: TRequest = (url, params = {}, responseType = "json", isLoading = false, additionalHeader = {}) =>
  commonRequest("post", url, params, responseType, isLoading, additionalHeader);

const del: TRequest = (url, params = {}, responseType = "json", isLoading = false, additionalHeader = {}) =>
  commonRequest("delete", url, params, responseType, isLoading, additionalHeader);

const put: TRequest = (url, params = {}, responseType = "json", isLoading = false, additionalHeader = {}) =>
  commonRequest("put", url, params, responseType, isLoading, additionalHeader);

const patch: TRequest = (url, params = {}, responseType = "json", isLoading = false, additionalHeader = {}) =>
  commonRequest("patch", url, params, responseType, isLoading, additionalHeader);

export default {
  get,
  post,
  del,
  put,
  patch,
};
