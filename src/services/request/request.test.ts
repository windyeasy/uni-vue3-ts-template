import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest'
import type { Mock } from 'vitest'
import WdRequest from './index'
import { WdRequestConstructorConfig } from './type'

const uni = {
  request: vi.fn(),
  uploadFile: vi.fn(),
}
vi.stubGlobal('uni', uni)
// test WdRequest class
describe('WdRequest', () => {
  let request: WdRequest
  const baseURL = 'https://example.com'
  const config: WdRequestConstructorConfig = {
    baseURL,
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
    expect(request.url).toBe(baseURL + url)
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
  it('全局请求拦截器是否调用修改成功', async () => {
    ;(config.interceptor.requestSuccessFn as Mock).mockImplementation(
      (config) => {
        config.url = 'https://example.com/api/test-requestSucccessFn'
        return config
      },
    )
    uni.request.mockImplementation(({ url, success }) => {
      setTimeout(() => {
        success({
          url,
        })
      })
    })
    await request.request({ url: '/api/test' }).then((res) => {
      expect(res.url).toBe('https://example.com/api/test-requestSucccessFn')
    })
  })
  it('全局响应拦截器是否调用修改成功', async () => {
    ;(config.interceptor.responseSuccessFn as Mock).mockImplementation(
      (config) => {
        return config ? config.data : config
      },
    )
    uni.request.mockImplementation(({ success }) => {
      setTimeout(() => {
        success({
          code: 200,
          message: '请求成功！',
          data: {
            url: 'https://example.com/api/test-responseSucccessFn',
          },
        })
      })
    })
    await request.request({ url: '/api/test' }).then((res) => {
      expect(res.url).toBe('https://example.com/api/test-responseSucccessFn')
    })
  })
  it('全局响应拦截器出现异常直接进入catch', async () => {
    ;(config.interceptor.responseSuccessFn as Mock).mockImplementation(
      (config) => {
        if (config.code !== 200) {
          throw new Error(config.message)
        }
        return config
      },
    )
    uni.request.mockImplementation(({ success }) => {
      setTimeout(() => {
        success({
          code: 400,
          message: '请数据有问题！',
        })
      })
    })
    await request.request({ url: '/api/test' }).catch((err) => {
      expect(err.message).toBe('请数据有问题！')
    })
  })
  it('全局响应拦截器调用Promise.reject直接进入catch', async () => {
    ;(config.interceptor.responseSuccessFn as Mock).mockImplementation(
      (config) => {
        if (config.code !== 200) {
          return Promise.reject(config.message)
        }
        return config
      },
    )
    uni.request.mockImplementation(({ success }) => {
      setTimeout(() => {
        success({
          code: 400,
          message: '请数据有问题！',
        })
      })
    })
    await request.request({ url: '/api/test' }).catch((err) => {
      expect(err).toBe('请数据有问题！')
    })
  })
})
