export {}
declare global {
  interface Fn<T = unknown> {
    (...arg: T[]): T
  }

  type Nullable<T> = T | null

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

  type Recordable<T = unknown, K = string> = Record<K extends null | undefined ? string : K, T>

  type ComponentRef<T> = InstanceType<T>

  type LocaleType = 'zh-CN' | 'en' | 'jp'

  // global.d.ts 或其他声明文件

  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  type AxiosHeaders = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data'

  type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'GET' | 'POST' | 'DELETE' | 'PUT'

  type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  interface Window {
    // 标记 window 为 unknown 类型
    [key: string]: unknown
  }

  interface AxiosConfig {
    params?: unknown
    data?: unknown
    url?: string
    method?: AxiosMethod
    headersType?: string
    responseType?: AxiosResponseType
  }

  interface IResponse<T> {
    code: string
    data: T
  }

  interface PageParam {
    pageSize?: number
    pageNo?: number
  }

  interface Tree {
    id: number
    name: string
    children?: Tree[] | unknown[]
  }
  // 分页数据公共返回
  interface PageResult<T> {
    list: T // 数据
    total: number // 总量
  }
}
