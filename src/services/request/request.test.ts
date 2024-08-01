import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest'

import WdRequest from './index'
import { WdRequestConstructorConfig } from './type'

export function mockAsyncRequest(mockRequestModelConfig: {
  data: any
  time: number
  isError?: boolean
  errorInfo?: any
}) {
  return new Promise((resolve, reject) => {
    if (mockRequestModelConfig.isError) {
      reject(mockRequestModelConfig.errorInfo)
    } else {
      setTimeout(() => {
        resolve(mockRequestModelConfig.data)
      }, mockRequestModelConfig.time)
    }
  })
}
const uni = {
  request: vi.fn(),
  uploadFile: vi.fn(),
}
vi.stubGlobal('uni', uni)
// test WdRequest class
describe('WdRequest', () => {
  let request: WdRequest
  const baseUrl = 'https://example.com'
  const config: WdRequestConstructorConfig = {
    baseUrl,
    timeout: 3000,
    interceptor: {
      responseSuccessFn: vi.fn((config) => config),
      requestSuccessFn: vi.fn((config) => config),
    },
  }

  beforeEach(() => {
    request = new WdRequest(config)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should correctly URL with http', async () => {
    const url = 'http://example.com2/api/test'
    uni.request.mockImplementation(({ success }) => {
      setTimeout(() => {
        success({
          code: 200,
          message: '请求成功！',
        })
      })
    })
    await request.request({ url })
    expect(request.url).toBe(url)
  })
  it('should correctly URL without http', async () => {
    const url = '/api/test'
    await request.request({ url })
    expect(request.url).toBe(baseUrl + url)
  })
  it('当请求超时是否进入catch', async () => {
    uni.request.mockImplementation(({ timeout, success, fail }) => {
      setTimeout(() => {
        fail({
          code: 500,
          message: '请求超时！',
        })
      }, timeout)
      setTimeout(() => {
        success({
          code: 200,
          message: '请求成功！',
        })
      }, 5000)
    })
    await request.request({ url: '/api/test' }).catch((err) => {
      expect(err.message).toBe('请求超时！')
    })
  })
})
