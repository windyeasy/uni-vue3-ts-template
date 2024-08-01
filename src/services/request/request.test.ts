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
const mockSuccessFn = () => ({
  data: {
    code: 200,
    data: {
      id: 1,
      name: 'test',
      age: 18,
    },
    message: 'success',
  },
})

const uni = {
  request: (config: any) => {
    setTimeout(() => {
      config.fail('请求超时')
    }, config.timeout)
    config.success(mockSuccessFn())
  },
  uploadFile: vi.fn(() => ({
    code: 200,
    data: {
      id: 1,
      path: 'https://example.com/upload/test.png',
    },
    message: '文件上传成功',
  })),
}
vi.stubGlobal('uni', uni)

// test WdRequest class
describe('WdRequest', () => {
  let request: WdRequest
  const baseUrl = 'https://example.com'
  const config: WdRequestConstructorConfig = {
    baseUrl,
    timeout: 10000,
    interceptor: {
      responseSuccessFn: (config) => config,
      requestSuccessFn: (config) => config,
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
    await request.request({ url })
    expect(request.url).toBe(url)
  })
  it('should correctly URL without http', async () => {
    const url = '/api/test'
    await request.request({ url })
    expect(request.url).toBe(baseUrl + url)
  })
})
