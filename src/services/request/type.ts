interface IInterceptor {
  requestSuccessFn?: (config: UniApp.RequestOptions) => UniApp.RequestOptions
  responseSuccessFn?: (config: any) => any
}

// 构造函数的配置
export interface WdRequestConstructorConfig {
  baseUrl: string
  timeout: number
  interceptor?: IInterceptor
}

// 请求配置
export interface WdRequestOptions extends UniApp.RequestOptions {
  interceptor?: IInterceptor
  query?: Record<string, any>
}
