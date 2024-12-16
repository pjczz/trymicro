import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { getSignature } from '../../utils/index'

import { message as Message, Modal, notification } from 'ant-design-vue'
import qs from 'qs'
import { config } from '@/config/axios/config'
import { getAccessToken, getRefreshToken, getTenantId, removeToken, setToken } from '@/utils/auth'
import errorCode from './errorCode'

import { deleteUserCache } from '@/hooks/web/useCache'

const tenantEnable = import.meta.env.VITE_APP_TENANT_ENABLE
const { result_code, base_url, request_timeout } = config
interface InternalAxiosRequestConfigWithRaw extends InternalAxiosRequestConfig {
  isRaw?: boolean
}

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  '无效的刷新令牌', // 刷新令牌被删除时，不用提示
  '刷新令牌已过期', // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]
// 是否显示重新登录
export const isRelogin = { show: false }
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
// 请求队列
let requestList = []
// 是否正在刷新中
let isRefreshToken = false
// 请求白名单，无须token的接口
const whiteList: string[] = ['/login', '/refresh-token']

// 创建axios实例
const service: AxiosInstance = axios.create({
  // baseURL: base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
})

const getHttpError = (config, reason, error: unknown = null) => {
  // console.log('在请求中初始化',app)
  if (!config.url.includes('/adapter/log/reportOperationLog')) {
    const useTrack = window.$useTrack
    if (useTrack) {
      useTrack.setErrorParams({
        // url: to.path,
        eventRes: reason,
        params: JSON.stringify({
          params: {},
          data: { error },
        }),
        remarks: '',
      })
    }
  }
}
// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfigWithRaw) => {
    // 获取时间戳和签名
    const { timestamp, signature, uuid } = getSignature(config.data)
    if (config.headers) {
      config.headers.timestamp = timestamp
      config.headers.signature = signature
      config.headers.uuid = uuid
    }

    // 是否需要设置 token
    let isToken = config.headers ? (config.headers.isToken ? false : true) : true
    whiteList.forEach((v) => {
      if (config.url && config.url.indexOf(v) > -1) {
        isToken = false
      }
    })
    if (getAccessToken() && !isToken) {
      config.headers.Authorization = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token
    }
    // 设置租户
    if (tenantEnable && tenantEnable === 'true') {
      const tenantId = getTenantId()
      if (tenantId) config.headers['tenant-id'] = tenantId
    }
    const params = config.params || {}
    const data = config.data || false
    if (
      config.method?.toUpperCase() === 'POST' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(data)
    }
    // get参数编码
    if (config.method?.toUpperCase() === 'GET' && params) {
      config.params = {}
      const paramsStr = qs.stringify(params, { allowDots: true })
      if (paramsStr) {
        config.url = config.url + '?' + paramsStr
      }
    }
    if (!config.url?.includes('http')) {
      config.url = base_url + config.url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    // 埋点
    getHttpError(config, '请求前错误', error)
    return Promise.reject(error)
  },
)

// response 拦截器

service.interceptors.response.use(
  async (response) => {
    let { data } = response
    const config: InternalAxiosRequestConfigWithRaw = response.config

    if (!data) {
      // 返回“[HTTP]请求没有返回值”;
      // 埋点
      throw new Error()
    }
    const { t } = useI18n()
    // 未设置状态码则默认成功状态
    // 二进制数据则直接返回，例如说 Excel 导出
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      // 注意：如果导出的响应为 json，说明可能失败了，不直接返回进行下载
      if (response.data.type !== 'application/json') {
        return response.data
      }
      data = await new Response(response.data).json()
    }
    const code = data.code || result_code

    // 获取错误信息
    const msg = data.msg || errorCode[code] || errorCode['default']
    if (ignoreMsgs.indexOf(msg) !== -1) {
      // 如果是忽略的错误码，直接返回 msg 异常
      return Promise.reject(msg)
    } else if (code === 401) {
      // 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了
      if (!isRefreshToken) {
        isRefreshToken = true
        // 1. 如果获取不到刷新令牌，则只能执行登出操作
        if (!getRefreshToken()) {
          return handleAuthorized()
        }
        // 2. 进行刷新访问令牌
        try {
          const refreshTokenRes = await refreshToken()
          // 2.1 刷新成功，则回放队列的请求 + 当前请求
          setToken((await refreshTokenRes).data.data)
          config.headers!.Authorization = 'Bearer ' + getAccessToken()
          requestList.forEach((cb) => {
            cb()
          })
          requestList = []
          return service(config)
        } catch (e) {
          // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
          // 2.2 刷新失败，只回放队列的请求
          console.log(e, 'ncaa')
          requestList.forEach((cb) => {
            cb()
          })
          return handleAuthorized()
        } finally {
          requestList = []
          isRefreshToken = false
        }
      } else {
        // 添加到队列，等待刷新获取到新的令牌
        return new Promise((resolve) => {
          requestList.push(() => {
            config.headers!.Authorization = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            resolve(service(config))
          })
        })
      }
    } else if (code === 500) {
      Message.error(t('sys.api.errMsg500'))
      return Promise.reject(new Error(msg))
    } else if (code === 901) {
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      if (msg === '无效的刷新令牌') {
        // hard coding：忽略这个提示，直接登出
        console.log(msg)
        return handleAuthorized()
      } else {
        notification.open({ message: msg })
      }
      return Promise.reject('系统未知错误，请反馈给管理员' + 'code=' + code)
    } else if (config.isRaw) {
      return response
    } else {
      return data
    }
  },
  (error: AxiosError) => {
    console.log('debugger')
    console.log('err' + error, 'debuger') // for debug
    let { message } = error
    const { t } = useI18n()
    if (message === 'Network Error') {
      message = t('sys.api.errorMessage')
    } else if (message.includes('timeout')) {
      message = t('sys.api.apiTimeoutMessage')
    } else if (message.includes('Request failed with status code')) {
      message = t('sys.api.apiRequestFailed') + message.substr(message.length - 3)
    }
    Message.error(message)
    getHttpError(config, message, error)
    return Promise.reject(error)
  },
)

const refreshToken = async () => {
  axios.defaults.headers.common['tenant-id'] = getTenantId()
  return await axios.post(base_url + '/system/auth/refresh-token?refreshToken=' + getRefreshToken())
}
const handleAuthorized = () => {
  const { t } = useI18n()
  if (!isRelogin.show) {
    isRelogin.show = true
    Modal.warning({
      content: t('sys.api.timeoutMessage'),
      title: t('common.confirmTitle'),
      okText: t('login.relogin'),
      onOk: () => {
        deleteUserCache() // 删除用户缓存
        removeToken()
        isRelogin.show = false
        // 干掉token后再走一次路由让它过router.beforeEach的校验
        window.location.href = window.location.href
      },
    })
  }
  return Promise.reject(t('sys.api.timeoutMessage'))
}
export { service }