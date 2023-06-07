/*
 * @author: zhiheng.hu
 * @date: 2021-10-20
 * @desc: 封装 axios HTTP接口调用
 */
import axios from "axios";
import Qs from "qs";
import baseUrl from "~/config/base-url";
import { createDiscreteApi } from "naive-ui";

const { message, loadingBar } = createDiscreteApi(["message", "loadingBar"]);

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.timeout = 300000;

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
  ): any;
}

function tellIfIsLogout(data: TNomalObject) {
  return String(data).indexOf("账户登录失败") !== -1;
}

function makeRequest(
  requestType: string,
  url: string,
  dataOrParam: TNomalObject | string,
  responseType: string,
  additionalHeader: TNomalObject = {}
) {
  const header: TNomalObject = {};
  if (process.env.NODE_ENV === "local") {
    // header["Access-Control-Allow-Origin"] = "*";
    // header["x-account-email"] = "yuchou.zou@klook.com";
    // header["x-account-fullname"] = "yuchou.zou";
  } else {
    // header["Access-Control-Allow-Origin"] = "*";
  }

  Object.keys(additionalHeader).forEach((key) => {
    header[key] = additionalHeader[key];
  });
  const config: TNomalObject = {
    headers: header,
    responseType: "json",
    maxRedirects: 5,
  };
  if (responseType === "data") {
    console.log(responseType);
    dataOrParam = Qs.stringify(dataOrParam);
  } else if (responseType === "blob") {
    config.responseType = "blob";
    config.method = "get";
  }
  if (requestType === "get") {
    config.params = dataOrParam;
    return axios.get(url, config);
  } else if (requestType === "post") {
    return axios.post(url, dataOrParam, config);
  } else if (requestType === "delete") {
    return axios.delete(url, config);
  } else if (requestType === "put") {
    return axios.put(url, dataOrParam, config);
  }
  return axios.request(config);
}

function commonRequest(
  requestType: string,
  url: string,
  dataOrParam: TNomalObject,
  responseType: string,
  isLoading = true,
  additionalHeader: TNomalObject = {}
) {
  if (isLoading) {
    loadingBar.start();
  }
  /* 请求拦截器 */
  axios.interceptors.request.use(
    function (config) {
      let token = sessionStorage.token;
      if (token) {
        if (config && config?.headers) {
          token = `bearer ${token}`;
          config.headers.common.Authorization = token;
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // 添加响应拦截器
  axios.interceptors.response.use(
    function (res) {
      // // 2xx 范围内的状态码都会触发该函数,对响应数据做点什么
      return res;
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      if (error.response.status === 401) {
        message.error("token失效");
        // this.$router.push({ path: '/' });
        sessionStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );
  return makeRequest(
    requestType,
    url,
    dataOrParam,
    responseType,
    additionalHeader
  )
    .then((resp) => {
      if (isLoading) {
        loadingBar.finish();
      }
      const res = resp.data;
      if (res.success === false) {
        return Promise.reject(res);
      }
      return res;
    })
    .catch((error) => {
      let response = {};
      if (Object.prototype.hasOwnProperty.call(error, "response")) {
        response = error.response.data;
      } else {
        response = error;
      }
      console.log("error: ", error);
      /*
        error格式:
        {
          data: {
            datetime: "2020-06-23 11:13"
            username: "test"
          }
          error:{
              code: "0"
              message: "need is deleted"
          }
          success: false
        }
      * */

      if (tellIfIsLogout(response)) {
        window.location.reload();
        return;
      }

      if (isLoading) {
        loadingBar.finish();
      }
      return error;
    });
}

const get: TRequest = function (
  url,
  params = {},
  responseType = "json",
  isLoading = false,
  additionalHeader = {}
) {
  return commonRequest(
    "get",
    url,
    params,
    responseType,
    isLoading,
    additionalHeader
  );
};

const post: TRequest = function (
  url,
  params = {},
  responseType = "json",
  isLoading = false,
  additionalHeader = {}
) {
  return commonRequest(
    "post",
    url,
    params,
    responseType,
    isLoading,
    additionalHeader
  );
};

const del: TRequest = function (
  url,
  params = {},
  responseType = "json",
  isLoading = false,
  additionalHeader = {}
) {
  return commonRequest(
    "delete",
    url,
    params,
    responseType,
    isLoading,
    additionalHeader
  );
};

const patch: TRequest = function (
  url,
  params = {},
  responseType = "json",
  isLoading = false,
  additionalHeader = {}
) {
  return commonRequest(
    "patch",
    url,
    params,
    responseType,
    isLoading,
    additionalHeader
  );
};

const put: TRequest = function (
  url,
  params = {},
  responseType = "json",
  isLoading = false,
  additionalHeader = {}
) {
  return commonRequest(
    "put",
    url,
    params,
    responseType,
    isLoading,
    additionalHeader
  );
};

export default {
  get,
  post,
  del,
  patch,
  put,
};
