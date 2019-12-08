import axios from "axios";
import { Message } from "element-ui";

//创建axios
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 60000 //超时时间
});

//拦截器
service.interceptors.request.use(
  function(config) {
    //在发送请求之前做什么
    return config;
  },

  function(error) {
    //请求错误做什么
    return Promise.reject(error);
  }
);
//响应器
service.interceptors.response.use(
  function(response) {
    //对相应数据做点什么
    let data = response.data;
    //业务需求
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default service;
