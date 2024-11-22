import { service } from './service'

import { config } from './config'

const { default_headers } = config

const request = (option) => {
  const { url, method, params, data, headersType, responseType, ...config } = option
  return service({
    url: url,
    method,
    params,
    data,
    ...config,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers,
    },
  })
}
export default {
  get: async <T>(option) => {
    const res = await request({ method: 'GET', ...option })
    return res.data as unknown as T
  },
  post: async <T>(option) => {
    const res = await request({ method: 'POST', ...option })
    return res.data as unknown as T
  },
  postOriginal: async (option) => {
    const res = await request({ method: 'POST', ...option })
    return res
  },
  delete: async <T>(option) => {
    const res = await request({ method: 'DELETE', ...option })
    return res.data as unknown as T
  },
  put: async <T>(option) => {
    const res = await request({ method: 'PUT', ...option })
    return res.data as unknown as T
  },
  download: async <T>(option) => {
    const res = await request({ method: 'GET', responseType: 'blob', ...option })
    return res as unknown as Promise<T>
  },
  upload: async <T>(option) => {
    option.headersType = 'multipart/form-data'
    const res = await request({ method: 'POST', ...option })
    return res as unknown as Promise<T>
  },
}
