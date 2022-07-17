import axios from 'axios'

class ZyyRequest {
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 创建单独实例的请求拦截和响应拦截
    // this.interceptors.request.use(
    //   this.interceptors.requestInterceptor,
    //   this.interceptors.requestInterceptorCatch
    // )
    // this.interceptors.response.use(
    //   this.interceptors.responseInterceptor,
    //   this.interceptors.responseInterceptorsCatch
    // )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default ZyyRequest
