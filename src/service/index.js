import ZyyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const zyyRequest = new ZyyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // token验证
      console.log('请求成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败')
      return err
    }
  }
})

export default zyyRequest
