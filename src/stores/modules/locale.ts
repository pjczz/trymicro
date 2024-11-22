import { defineStore } from 'pinia'
import { store } from '../index'
import zhCn from 'ant-design-vue/lib/locale/zh_CN'
import en from 'ant-design-vue/lib/locale/en_US'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

const elLocaleMap = {
  'zh-CN': zhCn,
  en: en,
}
interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => {
    return {
      currentLocale: {
        lang: wsCache.get(CACHE_KEY.LANG) || 'zh-CN',
        elLocale: elLocaleMap[wsCache.get(CACHE_KEY.LANG) || 'zh-CN'],
      },
      // 多语言
      localeMap: [
        {
          lang: 'zh-CN',
          name: '简体中文',
        },
        {
          lang: 'en',
          name: 'English',
        },
      ],
    }
  },
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    },
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      wsCache.set(CACHE_KEY.LANG, localeMap?.lang)
    },
  },
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
