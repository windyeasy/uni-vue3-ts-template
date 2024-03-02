export interface WdRequestConfig extends UniApp.RequestOptions {}
export interface WdRequestConstructorConfig {
  baseUrl: string
  timeout: number
  interceptor?: {
    requestSuccessFn?: (config: UniApp.RequestOptions) => UniApp.RequestOptions
    responseSuccessFn?: (config: any) => any
  }
}
