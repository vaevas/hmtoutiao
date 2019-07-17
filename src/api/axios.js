// 配置axios
import axios from 'axios'
import jsonbig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',

  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    if (data) {
      return jsonbig.parse(data)
    }
    return data
  }]
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const users = window.sessionStorage.getItem('tokens')
  if (users) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(users).token
    }
  }
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
