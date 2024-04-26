import * as qs from 'qs'
import type { WdRequestOptions, WdRequestConstructorConfig } from './type'

class WdRequest {
  config: WdRequestConstructorConfig

  constructor(config: WdRequestConstructorConfig) {
    this.config = config
  }

  request<T = any>(config: WdRequestOptions) {
    return new Promise<T>((reslove, reject) => {
      config.url = this.config.baseUrl + config.url

      // 解析query方法
      if (config.query) {
        const queryStr = qs.stringify(config.query)
        if (config.url.includes('?')) {
          config.url += `&${queryStr}`
        } else {
          config.url += `?${queryStr}`
        }
      }

      // 实现请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config)
      }
      uni.request({
        timeout: this.config.timeout, // 延迟时间
        dataType: 'json',
        responseType: 'json',
        ...config, // 可以通过重写配置覆盖原有配置
        success: (res: any) => {
          // 实现响应拦截
          if (this.config?.interceptor?.responseSuccessFn) {
            res = this.config.interceptor.responseSuccessFn(res)
          }
          reslove(res)
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }

  post<T = any>(config: WdRequestOptions) {
    return this.request<T>({
      method: 'POST',
      ...config,
    })
  }
}
export default WdRequest
