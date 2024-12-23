import * as qs from 'qs'
import type {
  WdRequestOptions,
  WdRequestConstructorConfig,
  WdUploadFileOptions,
} from './type'

class WdRequest {
  config: WdRequestConstructorConfig

  url?: string

  constructor(config: WdRequestConstructorConfig) {
    this.config = config
  }

  private _fetchUrl(url: string) {
    if (url.includes('http')) {
      this.url = url
    } else {
      this.url = this.config.baseURL + url
    }
    return this.url
  }

  request<T = any>(config: WdRequestOptions) {
    return new Promise<T>((resolve, reject) => {
      config.url = this._fetchUrl(config.url)

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config)
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config)
      }

      // 解析query方法，有可能拦截器里面也注入query方法
      if (config.query) {
        const queryStr = qs.stringify(config.query)
        if (config.url.includes('?')) {
          config.url += `&${queryStr}`
        } else {
          config.url += `?${queryStr}`
        }
      }

      uni.request({
        timeout: this.config.timeout, // 延迟时间
        dataType: 'json',
        url: config.url as string,
        ...config,
        success: (res: any) => {
          if ((res && res.statusCode < 200) || res.statusCode > 300) {
            reject(res)
          } else {
            // 有可能在执行的过程出现异常后抛出异常
            try {
              // 实现全局响应拦截
              if (this.config?.interceptor?.responseSuccessFn) {
                res = this.config.interceptor.responseSuccessFn(res)
              }
              // 实现局部响应拦截
              if (config?.interceptor?.responseSuccessFn) {
                res = config.interceptor.responseSuccessFn(res)
              }
              resolve(res)
            } catch (error) {
              reject(error)
            }
          }
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error)
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error)
          }
          reject(error)
        },
      })
    })
  }

  get<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'GET',
      data,
      ...config,
    })
  }

  post<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  put<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    })
  }

  delete<T = any>(
    url: string,
    data?: WdRequestOptions['data'],
    config?: WdRequestOptions,
  ) {
    return this.request<T>({
      url,
      method: 'DELETE',
      data,
      ...config,
    })
  }

  // 文件上传
  uploadFile<T = any>(config: WdUploadFileOptions) {
    return new Promise<T>((resolve, reject) => {
      config.url = this._fetchUrl(config.url)

      // 实现全局请求拦截
      if (this.config?.interceptor?.requestSuccessFn) {
        config = this.config.interceptor.requestSuccessFn(config)
      }
      // 实现局部请求拦截
      if (config.interceptor?.requestSuccessFn) {
        config = config.interceptor.requestSuccessFn(config)
      }

      uni.uploadFile({
        ...config,
        success: (res: any) => {
          if ((res && res.statusCode < 200) || res.statusCode > 300) {
            reject(res)
          } else {
            try {
              // 将json字符串先转为对象
              if (res && res.data) {
                res.data = JSON.parse(res.data)
              }

              // 实现全局响应拦截
              if (this.config?.interceptor?.responseSuccessFn) {
                res = this.config.interceptor.responseSuccessFn(res)
              }
              // 实现局部响应拦截
              if (config?.interceptor?.responseSuccessFn) {
                res = config.interceptor.responseSuccessFn(res)
              }
              resolve(res)
            } catch (error) {
              reject(error)
            }
          }
        },
        fail: (error) => {
          if (this.config?.interceptor?.responseErrorFn) {
            error = this.config.interceptor.responseErrorFn(error)
          }
          if (config?.interceptor?.responseErrorFn) {
            error = config?.interceptor?.responseErrorFn(error)
          }
          reject(error)
        },
      })
    })
  }
}
export default WdRequest
