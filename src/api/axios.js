// 配置axios
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const users = window.sessionStorage.getItem('tokens')
  if (users) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(users).token
    }
  }
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
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
